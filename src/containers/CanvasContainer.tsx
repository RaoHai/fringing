import '../definitions/reactART';
import * as React from 'react';
import { Map } from 'immutable';

import { Surface } from 'react-art';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';

import { REGISTER_CANVAS_CONTAINER } from '../actions';

export interface CanvasProps {
  connections: Array<any>;
  nodes: Map;
  configs: any;
  activeNode: any;
  targetNode: any;
  dispatch: any;
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
  componentDidMount() {
    this.props.dispatch({
      type: REGISTER_CANVAS_CONTAINER,
      container: this.refs.layer.canvas._canvas,
    });
    console.log('>> stage', this.refs.layer);
  }
  render() {
    const { connections } = this.props;
    const { width, height } = this.props.configs;
    return (<Stage width={width} height={height} ref="stage">
      <Layer ref="layer">
        <TempLink />
        {this.renderLink(connections)}
      </Layer>
    </Stage>);
  }
}

export default connect(props => ({
  nodes: props.nodes,
  configs: props.configs,
  activeNode: props.activeNode,
  targetNode: props.targetNode,
  connections: props.connections,
  eventProxy: props.eventProxy,
}))(CanvasContainer);
