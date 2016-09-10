import getControllerPosition from './getControllerPosition';
import Point from '../Model/Point';
import V from 'victor';

export function defaultProjection(item) {
  return [item.x, item.y];
}

export function reduceArray(prev, curr) {
  prev = prev || [];
  return prev.concat(curr);
}

const CORNER_PADDING = 10;

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
      padding = Math.max(startPosition.x, endPosition.x) + CORNER_PADDING;
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
      padding = Math.min(startPosition.x, endPosition.x) - CORNER_PADDING;
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

  return [p0, p1, p2, p3].map(defaultProjection).reduce(reduceArray);
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

function equals(vector1, vector2) {
  return vector1.distance(vector2) === 0;
}

export default function getPath(source, target) {
  const startPosition = new Point(source);
  const endPosition =  new Point(target);

  return getPoints(startPosition, endPosition);
}

const xVector = new V(1, 0);
const xVectorReverse = new V(-1, 0);
const yVector = new V(0, 1);
const yVectorReverse = new V(0, -1);
const XDIRECTION = 'x';
const YDIRECTION = 'y';

function getPoints(start, end) {
  const connectVector = new V(end.x - start.x, end.y - start.y).normalize();
  const endVector = end.vectorInvert;
  const vector = start.vector.dot(end.vectorInvert);
  const directVector = connectVector.clone().add(start.vectorInvert);
  const nagetiveCross = directVector.dot(endVector);

  const p0 = {
    x: start.x,
    y: start.y,
  };
  const pn = {
    x: end.x,
    y: end.y,
  };
  const points = [p0];
  console.log('>> vector', vector,  nagetiveCross);
  switch (vector) {
    // 当 A B 平行时,需要经过 0,2,4....次转向和平移
    case 1:
      if (equals(start.vector, xVector) || equals(start.vector, xVectorReverse)) {
        if (nagetiveCross < 0 && end.x * start.vector.x <= start.x * start.vector.x) {
          const mid = (p0.y + pn.y) / 2;
          points.push({x: start.x + start.vector.x * CORNER_PADDING, y: start.y + start.vector.y * CORNER_PADDING});
          points.push({x: start.x + start.vector.x * CORNER_PADDING, y: mid});
          points.push({x: end.x + end.vector.x * CORNER_PADDING, y: mid});
          points.push({x: end.x + end.vector.x * CORNER_PADDING, y: pn.y});
          points.push(pn);
          return points.map(defaultProjection).reduce(reduceArray);
        } else {
          const mid = (p0.x + pn.x) / 2;
          return [p0, {x: mid, y: p0.y}, {x: mid, y: pn.y}, pn].map(defaultProjection).reduce(reduceArray);
        }
      } else {
        if (nagetiveCross < 0 && end.y * start.vector.y >= start.y * start.vector.y) {
          const mid = (p0.x + pn.x) / 2;
          points.push({x: start.x + start.vector.x * CORNER_PADDING, y: start.y - start.vector.y * CORNER_PADDING});
          points.push({y: start.y - start.vector.y * CORNER_PADDING, x: mid});
          points.push({y: end.y - end.vector.y * CORNER_PADDING, x: mid});
          points.push({y: end.y - end.vector.y * CORNER_PADDING, x: pn.x});
          points.push(pn);
          return points.map(defaultProjection).reduce(reduceArray);
        } else {
          const mid = (p0.y + pn.y) / 2;
          return [p0, {y: mid, x: p0.x}, {y: mid, x: pn.x}, pn].map(defaultProjection).reduce(reduceArray);
        }
      }
    // 当 A B 垂直时,需要经过 1,3,5....次转向和平移
    // 垂直时需要额外判断：
    // 比如 (-1,0) 和 (0, 1) 互相垂直，
    // 但是如果
    case 0:
    //   // 如果从 x 轴连出
      console.log('==>> vector', nagetiveCross);
      if (equals(start.vector, xVector) || equals(start.vector, xVectorReverse)) {
        if (nagetiveCross < 0) {
          points.push({x: start.x + start.vector.x * CORNER_PADDING, y: start.y + start.vector.y * CORNER_PADDING});
          points.push({x: pn.x, y: p0.y});
        } else {
          points.push({x: p0.x + start.vector.x * CORNER_PADDING, y: p0.y});
          points.push({x: p0.x + start.vector.x * CORNER_PADDING, y: pn.y - end.vector.y * CORNER_PADDING });
          points.push({x: pn.x,  y: pn.y - end.vector.y * CORNER_PADDING });
        }
      } else {
        if ((equals(start.vector, yVector) && end.y >= start.y) ||
          (equals(start.vector, yVectorReverse) && end.y < start.y)) {
          points.push({x: start.x + start.vector.x * CORNER_PADDING, y: start.y + start.vector.y * CORNER_PADDING});
          points.push({x: pn.x, y: p0.y});
        } else {
          points.push({x: p0.x, y: pn.y});
        }
      }
      points.push(pn);
      return points.map(defaultProjection).reduce(reduceArray);
    // // 当 A B 相向时,需要经过 2,4,6....次转向和平移
    case -1:
      let attr;
      let getFunc;
      let startVector;
      if (equals(start.vector, xVector) || equals(start.vector, xVectorReverse)) {
        attr = 'x';
        getFunc = start.vector.x > 0 ? Math.max : Math.min;
        startVector = start.vector;
      } else {
        attr = 'y';
        getFunc = start.vector.y > 0 ? Math.min : Math.max;
        startVector = start.vectorInvert;
      }
      const maxNumber = getFunc(p0[attr], pn[attr]);
      points.push(Object.assign({}, p0, {[attr] : maxNumber + CORNER_PADDING * startVector[attr]}));
      points.push(Object.assign({}, pn, {[attr] : maxNumber + CORNER_PADDING * startVector[attr]}));

      points.push(pn);
      return points.map(defaultProjection).reduce(reduceArray);
  }
}
