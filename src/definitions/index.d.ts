/// <reference path="./hoist-non-react-statics/index.d.ts" />
/// <reference path="./reactArt/index.d.ts" />
/// <reference path="./objectAssign/index.d.ts" />
/// <reference path="./victor/index.d.ts" />

export interface Node {
  __level__: number;
  parent: Node;
  children: Array<Node>;
  x?: number;
  y?: number;
}


type Tree = Node;


