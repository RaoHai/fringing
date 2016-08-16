import '../definitions/reactART';
import * as React from 'react';

import { Surface } from 'react-art';
import { connect } from 'react-redux';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';


export interface CanvasProps {
  connections: Array<any>;
  configs: any;
  activeNode: any;
  targetNode: any;
}

class CanvasContainer extends React.Component<CanvasProps, any> {
  public refs: any;
  private context: any;

  static contextTypes = {
    container: React.PropTypes.object,
  };

  getNodeData(data) {
    const { nodes } = this.context.container;
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
  renderLink = (data, index) => {
    return <Link data={{
      source: this.getNodeData(data.source),
      target: this.getNodeData(data.target)
    }} key={`link-${index}`} />;
  }
  render() {
    const { connections } = this.props;
    const { width, height } = this.props.configs;
    return (<Surface width={width} height={height} >
      <TempLink />
      {connections.map(this.renderLink)}
    </Surface>);
  }
}

export default connect(props => ({
  configs: props.configs,
  activeNode: props.activeNode,
  targetNode: props.targetNode,
  connections: props.connections,
}))(CanvasContainer);
