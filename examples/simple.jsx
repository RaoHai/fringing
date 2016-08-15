import { Container, NodeProvider } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

class Node extends React.Component {
  render() {
    return <div> Node </div>
  }
}

const NODES = [{ id : 1 }];
// @Provider(...)
class App extends React.Component {
  render() {
    const nodes = NODES.map( (nodeData, idx) => {
      const WrappedNode = NodeProvider(collect => ({
        getNodeData: () => nodeData,
      }))(Node);
      return <WrappedNode key={idx} />;
    });
    return <div>{nodes}</div>
  }
}

const SimpleApp = Container({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
})(App);


ReactDOM.render(<SimpleApp />, document.getElementById('__react-content'));
