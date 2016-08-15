import * as React from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import ItemTypes from '../../definitions/itemTypes';
import ControllerPoint from './ControllderPoint';

import { UPDATE_ACTIVE_NODE } from '../../actions';

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
  activeNode(id) {
    const { dispatch } = this.props;
    dispatch({
      type: UPDATE_ACTIVE_NODE,
      id,
    });
  }
  render() {
    const { isDragging, connectDragSource, hooks, activeNode } = this.props;
    const { getNode } = hooks;
    const data = getNode();
    const style = {
      left: data.x,
      top: data.y,
      opacity: isDragging ? .6 : 1,
    };
    const cls = classnames({
      ['node-wrapper']: true,
      ['active']: data.id === activeNode,
    });

    return connectDragSource(
        <div className={cls} style={style} onMouseDown={() => this.activeNode(data.id)}>
          <div className="editor-node" >{this.props.children}</div>
          {controllerPoints}
        </div>
    );
  }
}

export default connect(props => ({
  activeNode: props.activeNode,
}))(Node);
