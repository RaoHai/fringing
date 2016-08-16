
export default function normalize(configs) {
  const { width, height, nodes } = configs;
  return Object.assign(configs, {
    width: Number(width),
    height: Number(height),
  });
}
