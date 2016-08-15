import * as React from 'react';
import * as hoistStatics from 'hoist-non-react-statics';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createStore, applyMiddleware } from 'redux';
import friningApp from '../reducers';

import CanvasContainer from '../containers/CanvasContainer';
import DOMContainer from '../containers/DomContainer';
import DecoratorsContainer from '../containers/DecoratorsContainer';

import { normalize, DataStructureManager } from '../functions';

import { FriningConfig } from '../definitions/index';

const defaultConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  nodes: [],
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function providerFunction(configs: FriningConfig = defaultConfig) {
  const store = createStore(
    friningApp,
    { configs: normalize(configs) }
  );

  return function wrapWithPrivider(WrappedComponent) {
    const connectDisplayName = `FriningProvider(${getDisplayName(WrappedComponent)})`;

    const childContext = {
      container: new DataStructureManager(),
    };


    @DragDropContext(HTML5Backend)
    class FringingProviderClass extends React.Component<FriningConfig, any> {
      static displayName: string;
      static WrappedComponent: Element;

      static childContextTypes = {
        container: React.PropTypes.object,
      };

      getChildContext() {
        return childContext;
      }

      render() {
        return (<Provider store={store}>
          <div className="fringing-provider" {...this.props}>
            <CanvasContainer />
            <DOMContainer>
              <WrappedComponent />
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
