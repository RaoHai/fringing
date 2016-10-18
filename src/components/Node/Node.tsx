import * as React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import classnames from 'classnames';

import ItemTypes from '../../definitions/itemTypes';
import ControllerPoint from './ControllerPoint';
import BaryCentre from './BaryCentre';

import {
  UPDATE_ACTIVE_NODE, UPDATE_TARGET_NODE, CLEAR_TARGET_NODE, ADD_CONNECTION,
  CLEAR_ACTIVE_NODE, ADD_NODE_REF
} from '../../actions';

const nodeSource = {
  beginDrag(props) {
    const currentNode = props.hooks.getNode();
    return {
      id: currentNode.id,
      x: currentNode.x,
      y: currentNode.y,
    };
  },
  canDrag(props) {
    return props.canDrag ? props.canDrag(props) : true;
  }
};



function getActiveControllerId(source, target) {
  if (target.x > source.x) {
    return 3;
  } else {
    return 4;
  }
}

const controllerPointsMap = ['tl', 't', 'tr', 'l', 'r', 'bl', 'b', 'br'];
const controllerPoints = [];
for (let i = 0; i < 8; i ++) {
  controllerPoints.push(<ControllerPoint key={i} type={controllerPointsMap[i]} />);
}


export interface NodeProps {
  dispatch: any;
  hooks: any;
  activeNode: any;
  onActive?: Function;
  onConnect?: Function;
  targetNode: any;
  isDragging: boolean;
  connectDragSource: Function;
  canSelect?: Function;
  canConnectFrom?: Function;
  canConnectTo?: Function;
  style?: any;
}

@DragSource(ItemTypes.NODE, nodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Node extends React.Component<NodeProps, any> {
  constructor() {
    super();
  }
  public refs: any;

  activeNode(data) {
    const { dispatch } = this.props;
    dispatch({
      type: UPDATE_ACTIVE_NODE,
      data,
    });
    this.props.onActive(data);
  }

  connectNode(source, target) {
    const { dispatch } = this.props;
    this.props.onConnect(source, target);
    dispatch({
      type: CLEAR_TARGET_NODE,
    });
    dispatch({
      type: CLEAR_ACTIVE_NODE,
    });
  }

  componentDidMount() {
    // this.updatePosition();
    const currentNode = this.getCurrentNode();
    this.props.dispatch({
      type: ADD_NODE_REF,
      payload: {
        id:  currentNode.id,
        element: this.refs.element,
        width: this.refs.element.clientWidth,
        height: this.refs.element.clientHeight,
      },
    });
  }

  // componentDidUpdate() {
  //   this.updatePosition();
  // }
  //
  // updatePosition() {
  //   const { hooks } = this.props;
  //   const data = hooks.getNode();
  //
  //   const width = this.refs.element.clientWidth;
  //   const height = this.refs.element.clientHeight;
  //
  //   this.refs.element.style.left = data.x - width / 2 + 'px';
  //   this.refs.element.style.top = data.y - height / 2 + 'px';
  // }

  renderControllerPoint = (child, index) => {
    const { activeNode, hooks } = this.props;
    const data = hooks.getNode();
    const isActiveNode = activeNode && data.id === activeNode.id;

    const controllerPointProps = {
      onMouseDown: () => this.selectControllerPoint(index),
      className : classnames({
        ['active']: isActiveNode && activeNode && activeNode.activeControllerId === index,
      }),
    };

    return React.cloneElement(child, controllerPointProps);
  }
  getCurrentNode(assignProps = {}) {
    const { hooks, dispatch } = this.props;
    const data = hooks.getNode();
    const width = this.refs.element.clientWidth;
    const height = this.refs.element.clientHeight;
    return Object.assign({}, data, {
      width,
      height,
    }, assignProps);
  }
  selectControllerPoint = (index) => {
    const { dispatch } = this.props;
    const data = this.getCurrentNode({ activeControllerId: index });
    dispatch({
      type: UPDATE_ACTIVE_NODE,
      data,
    });
    this.props.onActive(data);
  }
  mouseDown = (ev) => {
    const data = this.getCurrentNode();
    const {activeNode, targetNode} = this.props;

    if (this.canConnectTo() 
      && activeNode && activeNode.activeControllerId !== null
      && targetNode // && targetNode.activeControllerId !== null
      && targetNode.id === data.id) {
      return this.connectNode(activeNode, targetNode);
    }
    if (!activeNode || activeNode.id !== data.id) {
      if (!this.props.canSelect || (this.props.canSelect && this.props.canSelect(this.props))) {
        return this.activeNode(data);
      }
    }
  }
  mouseEnter = (ev) => {
    const { dispatch, activeNode } = this.props;
    if (activeNode && this.canConnectTo()) {
      const data = this.getCurrentNode();
      const activeControllerId = getActiveControllerId(activeNode, ev.nativeEvent);
      data.activeControllerId = activeControllerId;
      dispatch({
        type: UPDATE_TARGET_NODE,
        data,
      });
    }
  }
  mouseLeave = (ev) => {
    const { dispatch } = this.props;
    dispatch({
      type: CLEAR_TARGET_NODE,
    });
  }
  canConnectFrom = () => {
    if (!this.props.canConnectFrom) {
      return true;
    }
    return this.props.canConnectFrom(this.props);
  }
  canConnectTo = () => {
    if (!this.props.canConnectTo) {
      return true;
    }
    return this.props.canConnectTo(this.props);
  }
  render() {
    const { isDragging, connectDragSource, hooks, activeNode, targetNode, style } = this.props;
    const { getNode } = hooks;
    const data = getNode();
    const nodeStyle = Object.assign({}, style, {
      opacity: isDragging ? .6 : 1,
      left: data.x,
      top: data.y,
    });
    const cls = classnames({
      ['node-wrapper']: true,
      ['active']: (activeNode && data.id === activeNode.id) || (targetNode && data.id === targetNode.id),
    });

    return (
        <div className={cls}
             style={nodeStyle}
             onMouseEnter={this.mouseEnter}
             onMouseLeave={this.mouseLeave}
             onMouseDown={this.mouseDown}
             ref="element">
          {connectDragSource(<div className="editor-node" >{this.props.children}</div>)}
          {this.canConnectFrom() ? React.Children.map(controllerPoints, this.renderControllerPoint) : null}
          <BaryCentre />
        </div>
    );
  }
}

export default connect(props => ({
  activeNode: props.activeNode,
  targetNode: props.targetNode,
}))(Node);
