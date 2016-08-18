import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import  friningApp from '../reducers/index';

import CanvasContainer from '../containers/CanvasContainer';
import DOMContainer from '../containers/DomContainer';
import DecoratorsContainer from '../containers/DecoratorsContainer';

import { normalize } from '../functions/index';

const defaultConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  nodes: [],
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export interface FringingProviderProps {
  children: any;
}

export interface ProviderConfig {
  connects?: Array<any>;
}

const pointMap = {
  't': 1,
  'l': 3,
  'r': 4,
  'b': 6,
}

function getConnect(connect) {
  if (typeof connect === 'object') {
    return {
      id: connect.id,
      activeControllerId: pointMap[connect.point]
    };
  }
  return {
    id: connect
  };
}
function initialConnectionsByConfig(connects: Array<any>) {
  if (!connects || !connects.length) {
    return [];
  }
  return connects.map(connect => ({
    source: getConnect(connect.from),
    target: getConnect(connect.to),
  }));
}

export default function providerFunction(configs: ProviderConfig = defaultConfig) {

  const initialStore = {
    connections: initialConnectionsByConfig(configs.connects),
    configs: normalize(configs),
    activeNode: null,
    targetNode: null,
    eventListeners: [],
  };

  const store = createStore(
    friningApp,
    initialStore
  );

  return function wrapWithPrivider(WrappedComponent) {
    const connectDisplayName = `FriningProvider(${getDisplayName(WrappedComponent)})`;

    const childContext = {
      store,
    };

    class FringingProviderClass extends React.Component<FringingProviderProps, any> {
      static displayName: string;
      static WrappedComponent: Element;

      static childContextTypes = {
        store: React.PropTypes.any,
      };

      getChildContext() {
        return childContext;
      }

      constructor(props, context) {
        super(props, context);
      }

      render() {
        return (<Provider store={store}>
          <div className="fringing-provider">
            <DOMContainer>
              <WrappedComponent {...this.props} />
              <DecoratorsContainer />
            </DOMContainer>
            <CanvasContainer />
          </div>
        </Provider>);
      }
    }

    FringingProviderClass.displayName = connectDisplayName;
    FringingProviderClass.WrappedComponent = WrappedComponent;

    return hoistStatics(FringingProviderClass, WrappedComponent);
  };
}
