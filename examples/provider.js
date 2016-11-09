webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(659);


/***/ },

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _rcFringing = __webpack_require__(2);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(280);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	__webpack_require__(389);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      ' privider demo '
	    );
	  }
	});
	
	App = (0, _rcFringing.createContainer)({ width: 800, height: 600 })(App);
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=provider.js.map