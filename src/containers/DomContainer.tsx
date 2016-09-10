import * as React from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
// definitions
import ItemTypes from '../definitions/itemTypes';

//functions
import { triggerEvent } from '../functions';
// actions
import {CLEAR_ACTIVE_NODE, CLEAR_TARGET_NODE, UPDATE_NODE_POSITION} from '../actions';


export interface DomContainerProps{
  connections: Array<any>;
  configs: any;
  activeNode: any;
  targetNode: any;
  eventListeners: any;
  onNodeChange?: Function;
  dispatch: any;
  eventProxy: {
    canvasContainer: any;
  };
}
const nodeTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.x + delta.x);
    const top = Math.round(item.y + delta.y);

    component.moveNode(item.id, left, top);
  }
};

const proxyEvents = ['click', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'mousedown'];

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.NODE, nodeTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class DomContainer extends React.Component<DomContainerProps, any> {
  private context: any;
  private refs: any;
  private _didProxy: boolean = false;

  static childContextTypes = {
    container: React.PropTypes.object,
  };

  getChildContext() {
    return this.context;
  }

  static contextTypes = {
    container: React.PropTypes.object,
  };

  componentDidMount() {
    this.refs.eventHelper.addEventListener('mousedown', (ev) => {
      if (ev.target === this.refs.eventHelper) {
        this.clearActiveNode();
        this.clearTargetNode();
      }
    });

  }
  componentDidUpdate() {
    // console.log('>> canvas', this.refs.canvas);
    const { eventListeners } = this.props;
    for (const key in eventListeners) {
      if (eventListeners.hasOwnProperty(key)) {
        const events = eventListeners[key];
        events.forEach( event => {
          if (event.enable) {
            this.refs.eventHelper.addEventListener(key, (ev) => {
              if (ev.target === this.refs.eventHelper) {
                event.handler(ev);
              }
            }, false);
          } else {
            this.refs.eventHelper.removeEventListener(key, (ev) => {
              if (ev.target === this.refs.eventHelper) {
                event.handler(ev);
              }
            }, false);
          }
        });
      }
    }

    if (this.props.eventProxy.canvasContainer && !this._didProxy) {
      // proxy events
      proxyEvents.forEach(event => {
        this.refs.eventHelper.addEventListener(event, (ev) => {
          triggerEvent(this.props.eventProxy.canvasContainer, ev);
        });
      });
      this._didProxy = true;
    }

  }

  clearActiveNode = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLEAR_ACTIVE_NODE,
    });
  }
  clearTargetNode = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLEAR_TARGET_NODE,
    });
  }

  moveNode(id, x, y) {
    this.props.dispatch({
      type: UPDATE_NODE_POSITION,
      payload: {
        id,
        x,
        y
      },
    });
    if (this.props.configs.onNodeChange) {
      this.props.configs.onNodeChange(id, { x, y});
    }
  }

  render() {
    const { children, connectDropTarget, configs, activeNode } = this.props;
    const { width, height } = configs;
    return connectDropTarget(<div className="fringing-dom-container" style={{width, height}} >
      <div className="dropTargetHelper" style={{width, height}} ref="eventHelper" >
        {children}
      </div>
    </div>);
  }
}

export default connect(props => props)(DomContainer);
