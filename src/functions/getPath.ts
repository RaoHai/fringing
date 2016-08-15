export function defaultProjection(item) {
  return [item.y, item.x];
}

export default function getPath(link, projection = defaultProjection) {
  const p0 = {
    x: link.source.x,
    y: link.source.y,
  };
  const p3 = {
    x: link.target.x,
    y: link.target.y,
  };
  const mid = (p0.y + p3.y) / 2;
  const points = [p0, { x: p0.x, y: mid }, { x: p3.x, y: mid }, p3].map(projection);
  return `M${points[0]}C${points[1]} ${points[2]} ${points[3]}`;
}
