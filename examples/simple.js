// use jsx to render html, do not modify simple.html

import '@ali/rc-flow/assets/index.less';
import Flow from '@ali/rc-flow';
import React from 'react';
import ReactDOM from 'react-dom';

const request = new Request('./tree.json');

fetch(request)
  .then(resp => resp.json())
  .then(json => {
    ReactDOM.render(<Flow data={json} />, document.getElementById('__react-content'));
  });

