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



