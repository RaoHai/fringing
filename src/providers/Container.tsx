import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
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


export default function providerFunction(configs = defaultConfig) {
  const initialStore = {
    connections: [],
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

    @DragDropContext(HTML5Backend)
    class FringingProviderClass extends React.Component<FringingProviderProps, any> {
      static displayName: string;
      static WrappedComponent: Element;

      static childContextTypes = {
        store: React.PropTypes.any,
      };

      getChildContext() {
        return childContext;
      }

      render() {
        return (<Provider store={store}>
          <div className="fringing-provider">
            <CanvasContainer />
            <DOMContainer>
              <WrappedComponent {...this.props} />
              <DecoratorsContainer />
            </DOMContainer>
          </div>
        </Provider>);
      }
    }

    FringingProviderClass.displayName = connectDisplayName;
    FringingProviderClass.WrappedComponent = WrappedComponent;

    return hoistStatics(FringingProviderClass, WrappedComponent);
  };
}
