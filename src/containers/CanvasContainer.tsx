import '../definitions/reactART';
import * as React from 'react';

import { Surface } from 'react-art';
import { connect } from 'react-redux';

import TempLink from '../components/Link/TempLink';
import Link from '../components/Link/Link';

import { ContainerProps } from '../definitions';


export interface CanvasProps extends ContainerProps {
  connections: Array<any>;
  configs: any;
  activeNode: any;
  targetNode: any;
}

class CanvasContainer extends React.Component<CanvasProps, any> {
  public refs: any;

  renderLink = (data, index) => {
    return <Link data={data} key={`link-${index}`} />;
  }
  render() {
    const { connections } = this.props;
    const { width, height } = this.props.configs;
    console.log('>> connections', connections);
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
