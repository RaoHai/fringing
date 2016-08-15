import * as React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import ItemTypes from '../../definitions/itemTypes';
import ControllerPoint from './ControllderPoint';
import BaryCentre from './BaryCentre';

import { UPDATE_ACTIVE_NODE, UPDATE_TARGET_NODE, CLEAR_TARGET_NODE, ADD_CONNECTION } from '../../actions';

const nodeSource = {
  beginDrag(props) {
    const currentNode = props.hooks.getNode();
    return {
      id: currentNode.id,
      x: currentNode.x,
      y: currentNode.y,
    };
  }
};

const controllerPointsMap = ['tl', 't', 'tr', 'l', 'r', 'bl', 'b', 'br'];
const controllerPoints = [];
for (let i = 0; i < 8; i ++) {
  controllerPoints.push(<ControllerPoint key={i} type={controllerPointsMap[i]} />);
}

@DragSource(ItemTypes.NODE, nodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Node extends React.Component<any, any> {
  constructor() {
    super();
  }
  private refs: any;

  activeNode(data) {
    const { dispatch } = this.props;
    dispatch({
      type: UPDATE_ACTIVE_NODE,
      data,
    });
  }

  connectNode(source, target) {
    const { dispatch } = this.props;
    dispatch({
      type: ADD_CONNECTION,
      source,
      target,
    });
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  updatePosition() {
    const { hooks } = this.props;
    const data = hooks.getNode();

    const width = this.refs.element.clientWidth;
    const height = this.refs.element.clientHeight;

    this.refs.element.style.left = data.x - width / 2 + 'px';
    this.refs.element.style.top = data.y - height / 2 + 'px';
  }

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
    return Object.assign(data, {
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
  }
  mouseDown = (ev) => {
    const data = this.getCurrentNode();
    const { activeNode, targetNode } = this.props;

    if (!activeNode) {
      return this.activeNode(data);
    }
    if (activeNode && targetNode && targetNode.id === data.id) {
      return this.connectNode(activeNode, targetNode);
    }
  }
  mouseEnter = (ev) => {
    const { dispatch } = this.props;
    const data = this.getCurrentNode();
    dispatch({
      type: UPDATE_TARGET_NODE,
      data,
    });
  }
  mouseLeave = (ev) => {
    const { dispatch } = this.props;
    dispatch({
      type: CLEAR_TARGET_NODE,
    });
  }
  render() {
    const { isDragging, connectDragSource, hooks, activeNode, targetNode } = this.props;
    const { getNode } = hooks;
    const data = getNode();
    const style = {
      opacity: isDragging ? .6 : 1,
    };
    const cls = classnames({
      ['node-wrapper']: true,
      ['active']: (activeNode && data.id === activeNode.id) || (targetNode && data.id === targetNode.id),
    });

    return (
        <div className={cls}
             style={style}
             onMouseEnter={this.mouseEnter}
             onMouseLeave={this.mouseLeave}
             onMouseDown={this.mouseDown}
             ref="element">
          {connectDragSource(<div className="editor-node" >{this.props.children}</div>)}
          {React.Children.map(controllerPoints, this.renderControllerPoint)}
          <BaryCentre />
        </div>
    );
  }
}

export default connect(props => ({
  activeNode: props.activeNode,
  targetNode: props.targetNode,
}))(Node);
