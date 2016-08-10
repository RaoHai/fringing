import '../definitions/reactART';
import * as React from 'react';
import { Group, Transform, Surface } from 'react-art';

import { connect } from 'react-redux';
import { parseData, renderNodes, getNodes, renderLinks } from '../functions';
import { updateConfig } from '../actions';

import NodeContainer from './NodeContainer';

export interface FlowProps {
  data: Object;
  configs: Array<number>;
};

class Flow extends React.Component<FlowProps, any> {
  constructor(props) {
    super(props);
    const { data, size } = parseData(props.data);
    const { nodes, links } = getNodes(data);
    this.state = {
      data,
      nodes,
      links,
    };
    props.dispatch(updateConfig(size));
  }

  render() {
    const { nodes, links } = this.state;
    const { configs } = this.props;
    const width = configs[1] + 200;
    const height = configs[0];

    return (<div className="flow" style={{width, height}}>

      <div className="link-canvas">
        <Surface width={width} height={height} ref="canvas">
          {renderLinks(links)}
        </Surface>
      </div>

      <NodeContainer>
        {renderNodes(nodes)}
      </NodeContainer>
    </div>);
  }
}

export default connect(props => props)(Flow);
