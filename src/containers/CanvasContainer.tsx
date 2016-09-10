import * as React from 'react';
import { Map } from 'immutable';

import { Surface } from 'react-art';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';

import { REGISTER_CANVAS_CONTAINER } from '../actions';
import { Node } from '../functions';

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
    if (!node) {
      return null;
    }
    return Object.assign({}, {
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
    }, {
      activeControllerId: Node.pointMap[data.point],
    });
  }
  renderLink = (connections) => {
    return connections
      .map( connect => ({
        source: this.getNodeData(connect.from),
        target: this.getNodeData(connect.to),
      }))
      .filter( connect =>  connect.source && connect.target )
      .map( (data, index) => <Link data={data} key={`link-${index}`} /> );
  }
  componentDidMount() {
    this.props.dispatch({
      type: REGISTER_CANVAS_CONTAINER,
      container: this.refs.layer.canvas._canvas,
    });
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
  eventProxy: props.eventProxy,
}))(CanvasContainer);
