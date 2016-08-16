// // export this package's api
// import * as React from 'react';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import flowApp from './reducers';
// import Flow from './components/Flow';
//
{/*const store = createStore(flowApp);*/}

{/*export default class ProviderContainer extends React.Component<any, any> {*/}
  {/*render() {*/}
    {/*const { props } = this;*/}
    {/*return (<Provider store={store}>*/}
      {/*<Flow {...props} />*/}
    {/*</Provider>);*/}
  {/*}*/}
{/*}*/}

import Container from './providers/Container';
import NodeProvider from './providers/Node';

export default {
  NodeProvider,
  Container,
};
