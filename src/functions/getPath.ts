import getControllerPosition from './getControllerPosition';
import Point from '../Model/Point';
import * as v2d from 'vector2d';
const { Float32Vector } = v2d;

export function defaultProjection(item) {
  return [item.x, item.y];
}

export function reduceArray(prev, curr) {
  prev = prev || [];
  return prev.concat(curr);
}

// 绘制双折线
export function getTwoBrokeLine(startPosition, endPosition) {
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

  switch (startPosition.activeControllerId) {
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

/**
 * 节点的连出线和连入线可以分别看作两个向量
 * 那么求折线的算法其实可以等效于
 * 求向量 A 经过 N 转向(+90deg, -90deg) 和 N 次平移, 等于向量 B
 *
 * 当 A B 平行时,需要经过 0,2,4....次转向和平移
 * 当 A B 垂直时,需要经过 1,3,5....次转向和平移
 * 当 A B 相向时,需要经过 2,4,6....次转向和平移
 * */


export default function getPath(source, target) {
  const startPosition = new Point(source);
  const endPosition =  new Point(target);

  return getPoints(startPosition, endPosition);
  // if (vectorDot === 1) {
  //   const mid = (p0.x + p3.x) / 2;
  //   return getPoints(p0, p3, 1)
  //   return [p0, {x: mid, y: p0.y}, {x: mid, y: p3.y}, p3].map(defaultProjection).reduce(reduceArray);
  // }
  // if (source.activeControllerId
  //   && target.activeControllerId
  //   && source.activeControllerId === target.activeControllerId) {
  //   // 如果起始点和终结点在同一侧,则使用双折线绘制
  //   return getTwoBrokeLine(startPosition, endPosition);
  // }
  //
  // const p0 = {
  //   x: startPosition.x,
  //   y: startPosition.y,
  // };
  // const p3 = {
  //   x: endPosition.x,
  //   y: endPosition.y,
  // };
  //
  //
  // if (source.activeControllerId === 3 || source.activeControllerId === 4) {
  //   const mid = (p0.x + p3.x) / 2;
  //   return [p0, {x: mid, y: p0.y}, {x: mid, y: p3.y}, p3].map(defaultProjection).reduce(reduceArray);
  // } else {
  //   const mid = (p0.y + p3.y) / 2;
  //   return [p0, {x: p0.x, y: mid}, {x: p3.x, y: mid}, p3].map(defaultProjection).reduce(reduceArray);
  // }
}

const xVector = Float32Vector(1, 0);
const xVectorReverse = Float32Vector(-1, 0);
const yVector = Float32Vector(0, 1);
const yVectorReverse = Float32Vector(0, -1);
const XDIRECTION = 'x';
const YDIRECTION = 'y';

function getPoints(start, end) {
  let brokes = 0;
  const connectVector = Float32Vector(end.x - start.x, end.y - start.y).normalize();
  const distanceToX = Math.min(connectVector.distance(xVector), connectVector.distance(xVectorReverse));
  const distanceToY = Math.min(connectVector.distance(yVector), connectVector.distance(yVectorReverse));
  const direction = distanceToX <= distanceToY ? XDIRECTION : YDIRECTION;
  const startVector = start.vector;
  const endVector = end.vectorRevert;
  const vector = start.vector.dot(end.vectorRevert);
  const p0 = {
    x: start.x,
    y: start.y,
  };
  const pn = {
    x: end.x,
    y: end.y,
  }
  console.log('>> vector', vector, distanceToX, distanceToY);
  switch (vector) {
    // 当 A B 平行时,需要经过 0,2,4....次转向和平移
    case 1:
      if (start.vector.equals(xVector) || start.vector.equals(xVectorReverse)) {
        if (end.x <= start.x) {
          const points = [p0];
          const mid = (p0.y + pn.y) / 2;
          points.push({x: start.x + start.vector.getX() * 20, y: start.y + start.vector.getY() * 20});
          points.push({x: start.x + start.vector.getX() * 20, y: mid});
          points.push({x: end.x + end.vector.getX() * 20, y: mid});
          points.push({x: end.x + end.vector.getX() * 20, y: pn.y});
          points.push(pn);
          return points.map(defaultProjection).reduce(reduceArray);
        } else {
          const mid = (p0.x + pn.x) / 2;
          return [p0, {x: mid, y: p0.y}, {x: mid, y: pn.y}, pn].map(defaultProjection).reduce(reduceArray);
        }
      }
     //
     break;
    // 当 A B 垂直时,需要经过 1,3,5....次转向和平移
    case 2:
     break;
    // 当 A B 相向时,需要经过 2,4,6....次转向和平移
    case 3:
     break;

  }
}
