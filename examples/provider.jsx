import { createContainer } from 'rc-fringing';
import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-fringing/assets/index.less';

let App = React.createClass({
  render() {
    return <div> privider demo </div>
  }
});

App = createContainer({ width: 800, height: 600})(App);


ReactDOM.render(<App />, document.getElementById('__react-content'));
