declare module hoistStatics {
  function hoistStaticFunction() : any;
}

declare module 'hoist-non-react-statics' {
  export = hoistStatics;
}

export interface Node {
  __level__: number;
  parent: Node;
  children: Array<Node>;
  x?: number;
  y?: number;
}


type Tree = Node;


