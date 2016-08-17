
export function defaultProjection(item) {
  return [item.x, item.y];
}

export default function getPath(startPosition, endPosition) {
  const p0 = {
    x: startPosition.x,
    y: startPosition.y,
  };
  const p3 = {
    x: endPosition.x,
    y: endPosition.y,
  };
  // const length = Math.sqrt(Math.pow(p3.x - p0.x, 2) + Math.pow(p3.y - p0.y, 2));
  // // const path = Path().moveTo(-.5, 0).lineTo()
  // return Path()
  //   .moveTo(p0.x - 0.5, p0.y - 0.5)
  //   .lineTo(p3.x, p3.y)
  //   .lineTo(p0.x, p0.y)
  //   .close();
  // //
  // //
  const mid = (p0.y + p3.y) / 2;
  const points = [p0, { x: p0.x, y: mid }, { x: p3.x, y: mid }, p3].map(defaultProjection);
  return `M${points[0]}L${points[3]}`;
}
