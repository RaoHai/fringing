webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcFringing = __webpack_require__(2);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(389);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var NODES = [{ id: 1, x: 50, y: 0 }, { id: 2, x: 150, y: 100 }, { id: 3, x: 300, y: 50 }, { id: 4, x: 350, y: 200 }, { id: 5, x: 450, y: 100 }, { id: 6, x: 550, y: 200 }];
	
	function Node(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    ' Node [',
	    props.data.id,
	    '] '
	  );
	}
	
	console.log('>> NodeProvider', _rcFringing.createNode);
	
	var WrappedNode = (0, _rcFringing.createNode)(function (collect) {
	  return {
	    getNodeData: function getNodeData(props) {
	      return props.data;
	    }
	  };
	})(Node);
	
	var nodes = NODES.map(function (nodeData, idx) {
	  return _react2.default.createElement(WrappedNode, {
	    onConnect: function onConnect(a, b) {
	      console.log('onConnect', a, b);
	    },
	    onActive: function onActive(data) {
	      console.log('onActive', data);
	    },
	    key: idx,
	    data: nodeData
	  });
	});
	// @Provider(...)
	
	var App = function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  App.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      nodes
	    );
	  };
	
	  return App;
	}(_react2.default.Component);
	
	var SimpleApp = (0, _rcFringing.createContainer)({
	  width: 800,
	  height: 600,
	  onNodeChange: function onNodeChange(id, data) {
	    return console.log('>> onNodeChange', id, data);
	  },
	  connectFunction: function connectFunction(start, end) {
	    return [start.x, start.y, end.x, end.y];
	  }
	})(App);
	
	var Wrapper = function (_Component) {
	  _inherits(Wrapper, _Component);
	
	  function Wrapper() {
	    _classCallCheck(this, Wrapper);
	
	    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	      arg[_key] = arguments[_key];
	    }
	
	    var _this2 = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(arg)));
	
	    _this2.state = {
	      connections: [{ from: { id: 4, point: 't' }, to: { id: 3, point: 't' } }, // 反向
	      { from: { id: 5, point: 'b' }, to: { id: 6, point: 'l' } }, // 垂直
	      { from: { id: 5, point: 'l' }, to: { id: 4, point: 'b' } }, // 垂直
	      { from: { id: 5, point: 'r' }, to: { id: 4, point: 'l' } }, { from: { id: 5, point: 'l' }, to: { id: 6, point: 'b' } }]
	    };
	    return _this2;
	  }
	
	  Wrapper.prototype.handleClick = function handleClick() {
	    this.setState({
	      connections: [{ from: { id: 1, point: 'r' }, to: { id: 2, point: 'l' } }, // 同向
	      { from: { id: 1, point: 'l' }, to: { id: 2, point: 'r' } }, // 同向,弯折
	      { from: { id: 4, point: 't' }, to: { id: 3, point: 'b' } }, // 同向，竖直
	      { from: { id: 4, point: 'r' }, to: { id: 3, point: 'r' } }, // 反向
	      { from: { id: 3, point: 'l' }, to: { id: 4, point: 'l' } }, // 反向
	      { from: { id: 3, point: 'b' }, to: { id: 4, point: 'b' } }]
	    });
	  };
	
	  Wrapper.prototype.handleConnectionsChange = function handleConnectionsChange(before, after) {
	    this.setState({
	      connections: after
	    });
	  };
	
	  Wrapper.prototype.handleActiveNodesChange = function handleActiveNodesChange(data) {
	    console.log('onActiveNode change', data);
	  };
	
	  Wrapper.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.handleClick.bind(this) },
	        'change connections'
	      ),
	      _react2.default.createElement(SimpleApp, {
	        connections: this.state.connections,
	        onConnectionsChange: this.handleConnectionsChange.bind(this),
	        onActiveNodesChange: this.handleActiveNodesChange.bind(this)
	      })
	    );
	  };
	
	  return Wrapper;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(Wrapper, null)
	), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=connections.js.map