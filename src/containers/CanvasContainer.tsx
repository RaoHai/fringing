import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from 'immutable';

import { Surface } from 'react-art';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';

import { SET_ACTIVE_LINK, REGISTER_CANVAS_CONTAINER } from '../actions';
import { Node } from '../functions';

export interface CanvasProps {
  connections: Array<any>;
  nodes: Map<string, any>;
  configs: any;
  activeNode: any;
  targetNode: any;
  activeLink: any;
  dispatch: any;
  connectFunction?: Function;
  autoMargin: Boolean;
  canDeleteLink?: Boolean;
}

class CanvasContainer extends React.Component<CanvasProps, any> {
  public refs: any;
  public context: any;

  static contextTypes = {
    onConnectionsChange: React.PropTypes.func,
  };
  getNodeData(data) {
    const { nodes } = this.props;
    const node = nodes.get(data.id);
    if (!node) {
      return null;
    }
    return Object.assign({}, {
      id: node.id,
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
        id: connect.id,
        source: this.getNodeData(connect.from),
        target: this.getNodeData(connect.to),
      }))
      .filter( connect =>  connect.source && connect.target )
      .map( (data, index) => {
        const id = `${data.source.id}-${data.target.id}-${index}`;
        return <Link
          autoMargin={this.props.autoMargin}
          isActive={data.id === this.props.activeLink}
          data={data}
          key={`link-${index}`}
          connectFunction={this.props.connectFunction}
          toggeActive={() => this.props.dispatch({
            type: SET_ACTIVE_LINK,
            id: data.id,
          })}
        />
      });
  }
  componentDidMount() {
    this.props.dispatch({
      type: REGISTER_CANVAS_CONTAINER,
      container: this.refs.layer.canvas._canvas,
    });

    document.addEventListener('keydown', ev => {
      const { connections } = this.props;
      if ((ev.keyCode === 46 || ev.keyCode === 8)
        && this.props.activeLink && this.props.canDeleteLink) {
        this.context.onConnectionsChange(connections, connections.filter(connect => connect.id !== this.props.activeLink));
      }
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
  activeLink: props.activeLink,
}))(CanvasContainer);
