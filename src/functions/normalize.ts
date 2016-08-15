import { FriningConfig } from '../definitions/index';

export default function normalize(configs: FriningConfig) {
  const { width, height, nodes } = configs;
  return Object.assign(configs, {
    width: Number(width),
    height: Number(height),
  });
}


