import '../definitions/reactART';
import * as React from 'react';
import { Surface } from 'react-art';
import { connect } from 'react-redux';

import { ContainerProps } from '../definitions';

export interface CanvasProps extends ContainerProps {

}

class CanvasContainer extends React.Component<CanvasProps, any> {
  render() {
    const { width, height } = this.props.configs;
    return <Surface width={width} height={height} ref="canvas" />;
  }
}

export default connect(props => props)(CanvasContainer);
