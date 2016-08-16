import React from 'react';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import { Container, NodeProvider } from 'rc-fringing';

import 'rc-fringing/assets/index.less';

const app = dva();

// 2. Model
app.model({
  namespace: 'nodes',
  state: [{ id : 1, x: 100, y: 200 }, { id : 2, x: 200, y: 100}],
});


function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

const WrappedNode = NodeProvider(collect => ({
  getNodeData: (props) => props.data,
}))(Node);

// @Provider(...)
class App extends React.Component {
  render() {
    const nodes = this.props.nodes.map((nodeData, idx) => <WrappedNode key={idx} data={nodeData} />);
    return <div>{nodes}</div>
  }
}

let Canvas = Container({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
})(App);

const DvaApp = connect(({ nodes }) => ({
  nodes
}))(Canvas);

app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={DvaApp} />
  </Router>
);

// 5. Start
app.start(document.getElementById('__react-content'));
