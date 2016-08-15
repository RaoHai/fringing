import '../definitions/reactART';
// dependencies
import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

// definitions
import ItemTypes from '../definitions/itemTypes';
import { ContainerProps } from '../definitions';

// function
import { DataStructureManager } from '../functions';

// actions
import {CLEAR_ACTIVE_NODE, CLEAR_TARGET_NODE} from '../actions';

export interface DomContainerProps extends ContainerProps {
  onNodeChange?: Function;
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



@DropTarget(ItemTypes.NODE, nodeTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class DomContainer extends React.Component<DomContainerProps, any> {
  private context: any;
  private refs: any;

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
    this.context.container.updateNodePosition(id, { x, y });
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
