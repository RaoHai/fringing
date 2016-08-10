import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class NodeContainer extends React.Component<any, any> {
  constructor(){
    super()
  }
  render() {
    return (<div className="node-canvas">
      {this.props.children}
    </div>);
  }
}
