import { createContainer, createNode, createConnects } from 'rc-fringing';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu , { Item} from 'rc-menu';

import 'rc-fringing/assets/index.less';
import 'rc-menu/assets/index.css';

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
  onContextMenu: (ev, type, data) => <Menu 
    onClick={() => console.log('menu onclick')}
    style={{ backgroundColor: 'white', zIndex: 1009, width: 200 }}>
    <Item> 右键菜单 </Item>
  </Menu>,
})(App);


class Wrapper extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      connections: [
        { from: { id: 4, point: 't' }, to: { id: 3, point: 't'}}, // 反向
        { from: { id: 5, point: 'b' }, to: { id: 6, point: 'l'}}, // 垂直
        { from: { id: 5, point: 'l' }, to: { id: 4, point: 'b'}}, // 垂直
        { from: { id: 5, point: 'r' }, to: { id: 4, point: 'l'}},
        { from: { id: 5, point: 'l' }, to: { id: 6, point: 'b'}},
      ],
    }
  }
  handleClick() {
    this.setState({
      connections: [
        { from: { id: 1, point: 'r' }, to: { id: 2, point: 'l'}}, // 同向
        { from: { id: 1, point: 'l' }, to: { id: 2, point: 'r'}}, // 同向,弯折
        { from: { id: 4, point: 't'}, to: { id: 3, point: 'b'}}, // 同向，竖直
        { from: { id: 4, point: 'r' }, to: { id: 3, point: 'r'}}, // 反向
        { from: { id: 3, point: 'l' }, to: { id: 4, point: 'l'}}, // 反向
        { from: { id: 3, point: 'b' }, to: { id: 4, point: 'b'}}, // 反向
      ],
    });
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
      <button onClick={::this.handleClick}>change connections</button>
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
