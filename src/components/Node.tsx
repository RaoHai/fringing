import * as React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../definitions/itemTypes';
import NodePlaceHolder from './NodePlaceHolder';

const nodeSource = {
  beginDrag(props) {
    return props.data;
  }
};


@DragSource(ItemTypes.NODE, nodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Node extends React.Component<any, any> {
  constructor() {
    super()
  }
  render() {
    const { isDragging, connectDragSource, data } = this.props;
    const style = {
      left: data.y - 50,
      top: data.x - 17,
      opacity: isDragging ? .6 : 1,
    };
    return connectDragSource(
        <div className="node-wrapper" style={style}>
          <NodePlaceHolder data={data} previous/>
          <div className="editor-node"  >{data.text}</div>
          <NodePlaceHolder data={data} next/>
        </div>
    );
  }
}
