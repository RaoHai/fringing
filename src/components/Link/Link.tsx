import * as React from 'react';
// import { Group, Text, Shape, Path } from 'react-art';
import { getPath, getControllerPosition } from '../../functions';

import { Group, Path, Arrow } from 'react-konva';

export default class Link extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }
  mouseMove = (ev) => {
    document.body.style.cursor = 'pointer';
    this.setState({
      hover: true,
    });
  }
  mouseOut = (ev) => {
    document.body.style.cursor = 'default';
    this.setState({
      hover: false,
    });
  }
  render() {
    const { data, connectFunction } = this.props;
    const { source, target } = data;
    const pathId = `link-path-${source.id}-${target.id}`;

    const points = getPath(source, target, connectFunction);
    return <Group>
      <Arrow
        points={points}
        key={pathId}
        stroke="#d9d9d9"
        fill="#d9d9d9"
        pointerLength="5"
        pointerWidth="5"
        strokeWidth={this.state.hover ? 4 : 2}
        onMouseOver={this.mouseMove}
        onMouseOut={this.mouseOut}
      />

    </Group>
  }
}
