import { createContainer, createNode, createConnects } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [
  { id : 1,x: 50, y: 0},
  { id : 2, x: 200, y: 50},
  {id: 3, x: 300, y: 0},
  {id: 4, x: 300, y: 200},
  {id: 5, x: 450, y: 0},
  {id: 6, x: 550, y: 200}
];

function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

console.log('>> NodeProvider', createNode);

const WrappedNode = createNode(collect => ({
  getNodeData: (props) => props.data,
}))(Node);

const nodes = NODES.map((nodeData, idx) => <WrappedNode key={idx} data={nodeData} />);
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
  connects: [
    { from: { id: 1, point: 'r' }, to: { id: 2, point: 'l'}},
    { from: { id: 4, point: 'r' }, to: { id: 3, point: 'r'}},
    { from: { id: 3, point: 'l' }, to: { id: 4, point: 'l'}},
    { from: { id: 5, point: 'b' }, to: { id: 6, point: 'l'}},
    { from: { id: 5, point: 'r' }, to: { id: 4, point: 'l'}},
  ],
})(App);


ReactDOM.render(<SimpleApp />, document.getElementById('__react-content'));
