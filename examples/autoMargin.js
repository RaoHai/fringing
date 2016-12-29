import { createContainer, createNode, createConnects } from 'rc-fringing';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [
  {id : 1,x: 50, y: 0},
  {id : 2, x: 150, y: 100},
  {id: 3, x: 300, y: 50},
  {id: 4, x: 350, y: 200},
  {id: 5, x: 450, y: 100},
  {id: 6, x: 550, y: 200}
];

function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

console.log('>> NodeProvider', createNode);

const WrappedNode = createNode(collect => ({
  getNodeData: (props) => props.data,
}))(Node);

const nodes = NODES.map((nodeData, idx) => <WrappedNode
  onConnect={(a, b) => { console.log('onConnect', a, b); }}
  onActive={(data) => { console.log('onActive', data); }}
  key={idx}
  data={nodeData}
/>);
// @Provider(...)
class App extends React.Component {
  render() {
    return <div>{nodes}</div>
  }
}

const SimpleApp = createContainer({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
  connectFunction: (start, end) => [start.x, start.y, end.x, end.y],
  autoMargin: true,
})(App);


class Wrapper extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      connections: [
        { from: { id: 1}, to: { id: 3 }}, // 垂直
        { from: { id: 2}, to: { id: 4 }}, // 垂直
        { from: { id: 4}, to: { id: 3 }}, // 反向
        { from: { id: 5}, to: { id: 6 }}, // 垂直
        { from: { id: 5}, to: { id: 4 }}, // 垂直
      ],
    }
  }
  handleConnectionsChange(before, after) {
    this.setState({
      connections: after,
    });
  }
  handleActiveNodesChange(data) {
    console.log('onActiveNode change', data);
  }
  render() {
    return (<div>
      <SimpleApp
        connections={this.state.connections}
        onConnectionsChange={this.handleConnectionsChange.bind(this)}
        onActiveNodesChange={this.handleActiveNodesChange.bind(this)}
      />
    </div>);
  }
}


ReactDOM.render(<div>
  <Wrapper />
</div>, document.getElementById('__react-content'));
