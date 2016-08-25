import getControllerPosition from './getControllerPosition';

export function defaultProjection(item) {
  return [item.x, item.y];
}

export function reduceArray(prev, curr) {
  prev = prev || [];
  return prev.concat(curr);
}

// 绘制双折线
export function getTwoBrokeLine(source, target) {
  const startPosition = getControllerPosition(source);
  const endPosition =  getControllerPosition(target);

  const p0 = {
    x: startPosition.x,
    y: startPosition.y,
  };
  const p3 = {
    x: endPosition.x,
    y: endPosition.y,
  };

  let p1, p2;
  let padding = 0;

  switch (source.activeControllerId) {
    case 4: // r
      padding = Math.max(startPosition.x, endPosition.x) + 20;
      p1 = {
        x: padding,
        y: p0.y
      };
      p2 = {
        x: padding,
        y: p3.y
      };
      break;
    case 3: // l
      padding = Math.min(startPosition.x, endPosition.x) - 20;
      p1 = {
        x: padding,
        y: p0.y
      };
      p2 = {
        x: padding,
        y: p3.y
      };
      break;
  }

  return [p0, p1, p2, p3].map(defaultProjection).reduce(reduceArray)
}

export default function getPath(source, target) {
  const startPosition = getControllerPosition(source);
  const endPosition =  getControllerPosition(target);

  if (source.activeControllerId
    && target.activeControllerId
    && source.activeControllerId === target.activeControllerId) {
    // 如果起始点和终结点在同一侧,则使用双折线绘制
    return getTwoBrokeLine(source, target);
  }
  // source right
  // if (source.activeControllerId === 4) {
  //   if (endPosition.x <= startPosition.x) {
  //     return getTwoBrokeLine(source, target);
  //   }
  // }
  //
  // const expectedDirection = {}
  // if (source.activeControllerId)
  // // 实际链接的方向
  // const linkDirection = {
  //   x: endPosition.x - startPosition.x,
  //   y: endPosition.y - startPosition.y
  // }

  const p0 = {
    x: startPosition.x,
    y: startPosition.y,
  };
  const p3 = {
    x: endPosition.x,
    y: endPosition.y,
  };

  const mid = (p0.x + p3.x) / 2;
  const points = [p0, { x: mid, y: p0.y }, { x: mid, y: p3.y }, p3].map(defaultProjection);
  return points.reduce(reduceArray);
}
