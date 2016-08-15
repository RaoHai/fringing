export interface Node {
  __level__: number;
  parent: Node;
  children: Array<Node>;
  x?: number;
  y?: number;
}

type Node = {
  id: number;
  children: Array<Node>;
}

type Tree = Node;

export interface FriningDataNode {
  id: number;
}

export interface FriningConfig {
  width: number; // width of Canvas
  height: number; // height of Canvas
  nodes: Array<FriningDataNode>;
  onNodeChange?: Function;
}

export interface ContainerProps {
  configs: FriningConfig;
}


