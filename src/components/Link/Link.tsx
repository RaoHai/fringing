import '../../definitions/reactART';
import * as React from 'react';
// import { Group, Text, Shape, Path } from 'react-art';
import { getPath, getControllerPosition } from '../../functions';
var RING_THREE_PATH = "M84,121 C130.391921,121 168,106.673113 168,89 C168,71.3268871 130.391921,57 84,57 C37.6080787,57 0,71.3268871 0,89 C0,106.673113 37.6080787,121 84,121 Z M84,121";

import { Group, Path } from 'react-konva';

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
    const path = getPath(start, end);

    return <Group>
      <Path
        data={path}
        key={pathId}
        stroke="#d9d9d9"
        strokeWidth={this.state.hover ? 5 : 3}
        onMouseOver={this.mouseMove}
        onMouseOut={this.mouseOut}
      />

    </Group>
  }
}
