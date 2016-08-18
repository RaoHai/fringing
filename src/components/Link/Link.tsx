import '../../definitions/reactART';
import * as React from 'react';
// import { Group, Text, Shape, Path } from 'react-art';
import { getPath, getControllerPosition } from '../../functions';

import { Group, Path, Arrow } from 'react-konva';

function box(x1, y1, x2, y2) {
  var minX = Math.min(x1, x2);
  var maxX = Math.max(x1, x2);
  var minY = Math.min(y1, y2);
  var maxY = Math.max(y1, y2);

  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

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
    const { data } = this.props;
    const { source, target } = data;
    const pathId = `link-path-${source.id}-${target.id}`;

    const start = getControllerPosition(source);
    const end =  getControllerPosition(target);
    // const path = getPath(start, end);
    const mid = (start.y + start.y) / 2;

    return <Group>
      <Arrow
        points={[start.x, start.y, end.x, end.y]}
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
