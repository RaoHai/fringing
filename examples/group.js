webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(621);


/***/ },

/***/ 621:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcFringing = __webpack_require__(2);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(290);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(399);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var NODES = [{ id: 1, x: 100, y: 200 }, { id: 2, x: 200, y: 100 }];
	
	function Node(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    ' Node [',
	    props.data.id,
	    '] '
	  );
	}
	
	var WrappedNode = (0, _rcFringing.createNode)(function (collect) {
	  return {
	    getNodeData: function getNodeData(props) {
	      return props.data;
	    }
	  };
	})(Node);
	
	function Group(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    ' Group: ',
	    props.children
	  );
	}
	
	var WrappedGroup = (0, _rcFringing.createGroup)({
	  id: 'group_1',
	  position: { x: 100, y: 100 }
	})(Group);
	
	var nodes = NODES.map(function (nodeData, idx) {
	  return _react2.default.createElement(WrappedNode, { key: idx, data: nodeData });
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
	      WrappedGroup,
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
	  connects: [{ from: 1, to: 2 }],
	  groups: [[1, 2], [2, 3]]
	})(App);
	
	_reactDom2.default.render(_react2.default.createElement(SimpleApp, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=group.js.map