/// <reference path="../../../typings/globals/react/index.d.ts" />

declare module __reactArt {
  import React = __React;
  interface Transform {}
    class Shape extends React.Component<any, any> {}
    interface Text {}
    class Surface extends React.Component<any, any> {}
    class Group extends React.Component<any, any> {}
    interface Path {
      call(): any;
    }
}
declare module 'react-art' {
    export = __reactArt;
}
