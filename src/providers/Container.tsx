import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import  friningApp from '../reducers/index';

import CanvasContainer from '../containers/CanvasContainer';
import DOMContainer from '../containers/DomContainer';
import DecoratorsContainer from '../containers/DecoratorsContainer';

import { normalize, Connection } from '../functions';

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
  onConnectionsChange?: Function;
  onActiveNodesChange?: Function;
  connections?: Array<any>;
}

export interface ProviderConfig {
  connects?: Array<any>;
}

function noop () {};
export default function providerFunction(configs: ProviderConfig = defaultConfig) {

  const initialStore = {
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

    class FringingProviderClass extends React.Component<FringingProviderProps, any> {
      static displayName: string;
      static WrappedComponent: Element;

      static childContextTypes = {
        store: React.PropTypes.any,
        onConnectionsChange: React.PropTypes.func,
        onActiveNodesChange: React.PropTypes.func,
        connections: React.PropTypes.array,
      };
      static defaultProps = {
        connections: [],
        onActiveNodesChange: noop,
        onConnectionsChange: noop,
      };

      getChildContext() {
        return {
          store,
          onConnectionsChange: this.props.onConnectionsChange,
          onActiveNodesChange: this.props.onActiveNodesChange,
          connections: this.props.connections.map(c => c.constructor === Connection ? c : new Connection(c)),
        };
      }

      constructor(props, context) {
        super(props, context);
        if (props.onConnectionsChange === noop) {
          console.warn('You must provide `onConnectionsChange` function to control `connection` props.');
        }
      }

      render() {
        const connections = this.props.connections.map(c => c.constructor === Connection ? c : new Connection(c));
        return (<Provider store={store}>
          <div className="fringing-provider">
            <DOMContainer>
              <WrappedComponent {...this.props} />
              <DecoratorsContainer />
            </DOMContainer>
            <CanvasContainer connections={connections}/>
          </div>
        </Provider>);
      }
    }

    FringingProviderClass.displayName = connectDisplayName;
    FringingProviderClass.WrappedComponent = WrappedComponent;

    return hoistStatics(FringingProviderClass, WrappedComponent);
  };
}
