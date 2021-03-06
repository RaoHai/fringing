import React from 'react';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import { createContainer, createNode } from 'rc-fringing';

import 'rc-fringing/assets/index.less';

const app = dva();

// 2. Model
app.model({
  namespace: 'app',
  state: {
    nodes: [{id: 1, x: 100, y: 200}, {id: 2, x: 200, y: 100}, {id: 3, x: 300, y: 300}],
    connections: []
  },
  reducers: {
    updateConnections(state, { payload }) {
      return Object.assign({}, state, { connections: payload.connections});
    },
    updateNode(state, { payload }) {
      const { x, y } = payload.data;
      const nodes = state.nodes.map(node => 
        node.id === payload.id ? ({...node, x, y }) : node );
      return Object.assign({}, state, {
        nodes,
      });
    }
  }
});


function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

const WrappedNode = createNode(collect => ({
  getNodeData: (props) => props.data,
  canDrag: (props) => props.data.id !== 1,
  canSelect: (props) => props.data.id !== 2,
  canConnectFrom: (props) => props.data.id !== 3,
  canConnectTo: (props) => props.data.id !== 3
}))(Node);

// @Provider(...)
class App extends React.Component {
  render() {
    const nodesList = this.props.nodes.map((nodeData, idx) => <WrappedNode key={idx} data={nodeData} />);
    return <div>{nodesList}</div>
  }
}

let Canvas = createContainer({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
})(App);

function Wrapper(props) {
  function onConnectionsChange(before, after) {
    props.dispatch({
      type: 'app/updateConnections',
      payload: {
        connections: after,
      }
    });
  }
  function onNodeChange(id, data) {
    props.dispatch({
      type: 'app/updateNode',
      payload: {
        id,
        data,
      },
    });
  }
  return <Canvas
    {...props}
    className="canvas-class"
    onConnectionsChange={onConnectionsChange}
    onNodeChange={onNodeChange}
    canDeleteLink={false}
  />
}


const DvaApp = connect(({ app }) => ({
  nodes: app.nodes,
  connections: app.connections,
}))(Wrapper);

app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={DvaApp} />
  </Router>
);

// 5. Start
app.start(document.getElementById('__react-content'));
