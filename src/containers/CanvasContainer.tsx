import '../definitions/reactART';
import * as React from 'react';
import { Map } from 'immutable';

import { Surface } from 'react-art';
import { connect } from 'react-redux';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';


export interface CanvasProps {
  connections: Array<any>;
  nodes: Map;
  configs: any;
  activeNode: any;
  targetNode: any;
}

class CanvasContainer extends React.Component<CanvasProps, any> {
  public refs: any;
  private context: any;

  getNodeData(data) {
    const { nodes } = this.props;
    const node = nodes.get(data.id);
    return Object.assign({}, {
      x: node.x,
      y: node.y,
    }, {
      activeControllerId: data.activeControllerId,
      width: data.width,
      height: data.height,
    });
  }
  renderLink = (connections) => {
    return connections
      .map( connect => ({
        source: this.props.nodes.get(connect.source.id),
        target: this.props.nodes.get(connect.target.id),
      }))
      .filter( connect => connect.source && connect.target )
      .map( (data, index) => <Link data={data} key={`link-${index}`} /> );
  }
  render() {
    const { connections } = this.props;
    console.log('>> renderConnections', connections);
    const { width, height } = this.props.configs;
    return (<Surface width={width} height={height} >
      <TempLink />
      {this.renderLink(connections)}
    </Surface>);
  }
}

export default connect(props => ({
  nodes: props.nodes,
  configs: props.configs,
  activeNode: props.activeNode,
  targetNode: props.targetNode,
  connections: props.connections,
}))(CanvasContainer);
