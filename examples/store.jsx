import { createContainer, createNode } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import 'rc-fringing/assets/index.less';

const NODES = [{ id : 1, x: 100, y: 200 }, { id : 2, x: 200, y: 100}];

function Node(props) {
  return <div> Node [{props.data.id}] </div>
}

const WrappedNode = createNode(collect => ({
  getNodeData: (props) => props.data,
}))(Node);

const nodes = NODES.map((nodeData, idx) => <WrappedNode key={idx} data={nodeData} />);
// @Provider(...)
class App extends React.Component {
  render() {
    console.log('>> render/App', this.props);
    return <div>{nodes}</div>
  }
}

let Canvas = createContainer({
  width: 800,
  height: 600,
  onNodeChange: (id, data) => console.log('>> onNodeChange', id, data),
})(App);

Canvas = connect(props => props)(Canvas);
const ConnectedApp = connect(props => props)(App);

function testStore(state = {foo: 'bar'}, actions) {
  return state;
}


const store = createStore(testStore);
const Test = React.createClass({
  render() {
    return (<Provider store={store}>
      <Canvas />
    </Provider>);
  }
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
