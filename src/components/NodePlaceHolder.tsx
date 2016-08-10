import * as React from 'react';
import * as classnames from 'classnames';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../definitions/itemTypes';

const nodeTarget = {
  canDrop(props, monitor) {
    const { data } = props;
    const item = monitor.getItem();

    return (data.id !== item.id && data.father_id === item.father_id)
  }
};

@DropTarget(ItemTypes.NODE, nodeTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
}))
export default class NodePlaceHolder extends React.Component<any, any> {
  constructor() {
    super();
  }
  render() {
    const { connectDropTarget, canDrop, previous, next } = this.props;
    const cls = classnames({
      ['node-placeholder']: true,
      ['active']: canDrop,
      ['previous']: previous,
      ['next']: next
    });
    return connectDropTarget(
      <div className={cls} />
    );
  }
}
