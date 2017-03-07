import * as React from 'react';
import * as ReactDOM from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';
import { Provider } from 'react-redux';
import classnames from 'classnames';
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
  autoMargin: false,
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export interface FringingProviderProps {
  children: any;
  onNodeChange?: Function;
  onConnectionsChange?: Function;
  onActiveNodesChange?: Function;
  connections?: Array<any>;
  canDeleteLink?: Boolean;
  className?: string;
  style?: any;
}

export interface ProviderConfig {
  connects?: Array<any>;
  connectFunction?: Function;
  onContextMenu?: (e: React.MouseEvent, type: string, data: any) => React.ReactElement<any>;
  autoMargin?: Boolean;
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
      
      private _contextMenu: React.ReactInstance;

      refs: any;

      static childContextTypes = {
        store: React.PropTypes.any,
        onConnectionsChange: React.PropTypes.func,
        onActiveNodesChange: React.PropTypes.func,
        connections: React.PropTypes.array,
        onContextMenu: React.PropTypes.func,
      };
      static defaultProps = {
        connections: [],
        onActiveNodesChange: noop,
        onConnectionsChange: noop,
        canDeleteLink: true,
      };

      getChildContext() {
        return {
          store,
          onConnectionsChange: this.props.onConnectionsChange,
          onActiveNodesChange: this.props.onActiveNodesChange,
          connections: this.props.connections.map(c => c.constructor === Connection ? c : new Connection(c)),
          onContextMenu: this.onContextMenu,
        };
      }

      constructor(props, context) {
        super(props, context);
        if (props.onConnectionsChange === noop) {
          console.warn('You must provide `onConnectionsChange` function to control `connection` props.');
        }
        this.state = {
          contextMenu: null,
        };
      }

      componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
      }

      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
      }

      handleOutsideClick = (e) => {
        if (!this._contextMenu) return;
        if (!ReactDOM.findDOMNode(this._contextMenu).contains(e.target)) {
          this.destroyContextMenu();
        }
      } 

      destroyContextMenu = () => {
        this.setState({ contextMenu: null });
      }

      onContextMenu = (e: React.MouseEvent, type: string, data) => {
        type menuProps = { style: any; onClick: (...any) => any; onSelect: (...any) => any; };
        
        let contextMenu: React.ReactElement<menuProps>;
        
        if (window.hoverLink) {
          contextMenu = configs.onContextMenu(e, 'link', window.hoverLink);
        } else {
          contextMenu = configs.onContextMenu(e, type, data);
        }

        if (contextMenu && React.isValidElement(contextMenu)) {
          this.setState({
            contextMenu: React.cloneElement(contextMenu, {
              ref: (ele) => this._contextMenu = ele,
              onClick: (...args) => {
                contextMenu.props.onClick && contextMenu.props.onClick(...args);
                setTimeout(this.destroyContextMenu, 1);
              },
              onSelect: (...args) => {
                contextMenu.props.onSelect && contextMenu.props.onSelect(...args);
                setTimeout(this.destroyContextMenu, 1);
              },
              style: {
                ...contextMenu.props.style,
                position: 'fixed',
                left: e.nativeEvent.x,
                top: e.nativeEvent.y,
              }
            }),
          });
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      render() {
        const connections = this.props.connections.map(c => c.constructor === Connection ? c : new Connection(c));
        const { style, className } = this.props;
        const { contextMenu } = this.state;
        const providerClass = classnames({
          [className]: true,
          ['fringing-provider']: true,
        });
        return (<Provider store={store}>
          <div
            style={style}
            className={providerClass}
            ref="container"
            onContextMenu={(ev) => this.onContextMenu(ev, 'canvas', configs)}
          >
            <DOMContainer onNodeChange={this.props.onNodeChange}>
              <WrappedComponent {...this.props} />
              <DecoratorsContainer />
            </DOMContainer>
            <CanvasContainer
              connections={connections}
              connectFunction={configs.connectFunction}
              autoMargin={configs.autoMargin}
              canDeleteLink={this.props.canDeleteLink}
            />
            <div className="contextMenuPlaceholder" >
              {contextMenu ? contextMenu : null}
            </div>
          </div>
        </Provider>);
      }
    }

    FringingProviderClass.displayName = connectDisplayName;
    FringingProviderClass.WrappedComponent = WrappedComponent;

    return hoistStatics(FringingProviderClass, WrappedComponent);
  };
}
