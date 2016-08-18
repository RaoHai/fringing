import { createContainer, createNode, createConnects } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [{ id : 1,x: 100, y: 0}, { id : 2, x: 200, y: 100}];

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
  connects: [{ from: { id: 1, point: 'r' }, to: { id: 2, point: 'l'}}],
})(App);


ReactDOM.render(<SimpleApp />, document.getElementById('__react-content'));
