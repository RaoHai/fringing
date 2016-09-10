
interface hoistStaticsFn {
  (wrapperClass: any, component: any): any;
}

declare var hoistStatics: hoistStaticsFn;

declare module "hoist-non-react-statics" {
  export = hoistStatics
}
