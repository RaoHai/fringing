
declare class Victor {
  constructor(x: number, y: number);
  clone(): Victor;
  invert(): Victor;
  normalize(): Victor;
  add(target: Victor): Victor;
  dot(target: Victor): number;
}

declare module 'victor' {
  export default Victor;
}
