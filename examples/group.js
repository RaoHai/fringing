import { createContainer, createNode, createConnects, createGroup } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [{ id : 1,x: 100, y: 200}, { id : 2, x: 200, y: 100}];

function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

const WrappedNode = createNode(collect => ({
  getNodeData: (props) => props.data,
}))(Node);

function Group(props) {
  return <div> Group: {props.children}</div>
}

const WrappedGroup = createGroup()(Group);

const nodes = NODES.map((nodeData, idx) => <WrappedNode key={idx} data={nodeData} />);
// @Provider(...)
class App extends React.Component {
  render() {
    return <div>
      <WrappedGroup>
        {nodes}
      </WrappedGroup>
    </div>
  }
}

const SimpleApp = createContainer({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
  connects: [{ from: 1, to: 2}],
  groups: [[1, 2], [2, 3]]
})(App);


ReactDOM.render(<SimpleApp />, document.getElementById('__react-content'));
