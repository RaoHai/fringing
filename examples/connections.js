import { createContainer, createNode, createConnects } from 'rc-fringing';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [
  { id : 1,x: 100, y: 0},
  { id : 2, x: 200, y: 100},
  {id: 3, x: 300, y: 0},
  {id: 4, x: 300, y: 200},
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
})(App);


class Wrapper extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      connections: [{ from: { id: 1, point: 'r' }, to: { id: 2, point: 'l' } }],
    }
  }
  handleClick() {
    this.setState({
      connections: [
        { from: { id: 1, point: 'r' }, to: { id: 2, point: 'l'}},
        { from: { id: 3, point: 'r' }, to: { id: 4, point: 'r'}},
        { from: { id: 3, point: 'l' }, to: { id: 4, point: 'l'}},
      ],
    });
  }
  handleConnectionsChange(before, after) {
    this.setState({
      connections: after,
    });
  }
  handleActiveNodeChange(data) {
    console.log('onActiveNode change', data);
  }
  render() {
    return (<div>
      <button onClick={this::this.handleClick}>change connections</button>
      <SimpleApp
        connections={this.state.connections}
        onConnectionsChange={this.handleConnectionsChange.bind(this)}
        onActiveNodeChange={this.handleActiveNodeChange.bind(this)}
      />
    </div>);
  }
}


ReactDOM.render(<div>
  <Wrapper />
</div>, document.getElementById('__react-content'));
