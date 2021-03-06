import { createContainer, createNode } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

const NODES = [{ id : 1, x: 100, y: 200 }, { id : 2, x: 200, y: 100}];

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
})(App);

const Wrapper = React.createClass({
  getInitialState() {
    return {
      connections: [],
    };
  },
  
  render() {
    return <SimpleApp
      connections={this.state.connections}
      onConnectionsChange={(before, after) => this.setState({ connections: after })}
    />;
  }
});

ReactDOM.render(<Wrapper />, document.getElementById('__react-content'));
