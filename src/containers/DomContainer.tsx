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
  static childContextTypes = {
    container: Object,
  };

  getChildContext() {
    return this.context;
  }

  static contextTypes = {
    container: Object,
  };

  moveNode(id, x, y) {
    this.context.container.updateNodePosition(id, { x, y });
    if (this.props.configs.onNodeChange) {
      this.props.configs.onNodeChange(id, { x, y});
    }
  }

  render() {
    const { children, connectDropTarget, configs, activeNode } = this.props;
    const { width, height } = configs;
    console.log('>> renderDom', activeNode);
    return connectDropTarget(<div className="fringing-dom-container" style={{width, height}} >
      {children}
    </div>);
  }
}

export default connect(props => props)(DomContainer);
