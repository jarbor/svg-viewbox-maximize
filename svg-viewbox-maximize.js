(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SvgViewboxMaximize"] = factory();
	else
		root["SvgViewboxMaximize"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementCoordinates = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SvgMaximize =
/*#__PURE__*/
function () {
  function SvgMaximize(config) {
    _classCallCheck(this, SvgMaximize);

    this.element = config.element;
    this.container = config.container || config.element.parentElement;
    this.resized = config.resized;
    this.original = {};

    var _element$getAttribute = this.element.getAttribute('viewBox').split(' ').map(Number);

    var _element$getAttribute2 = _slicedToArray(_element$getAttribute, 4);

    this.original.left = _element$getAttribute2[0];
    this.original.top = _element$getAttribute2[1];
    this.original.width = _element$getAttribute2[2];
    this.original.height = _element$getAttribute2[3];
    this.original.bottom = this.original.top + this.original.height;
    this.original.right = this.original.left + this.original.width;
    this.current = Object.assign({}, this.original);
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }

  _createClass(SvgMaximize, [{
    key: "resize",
    value: function resize() {
      var svgRatio = this.original.width / this.original.height;
      var containerRatio = this.containerRatio;

      if (containerRatio > svgRatio) {
        // Window wider than SVG
        this.current.width = this.original.height * containerRatio;
        this.current.left = this.original.left + (this.original.width - this.current.width) / 2;
        this.current.right = this.current.left + this.current.width;
      } else if (containerRatio < svgRatio) {
        // Window taller than SVG
        this.current.height = this.original.width / containerRatio;
        this.current.top = this.original.top + (this.original.height - this.current.height) / 2;
        this.current.bottom = this.current.top + this.current.height;
      } // Perform the resize


      this.element.setAttribute('viewBox', "".concat(this.current.left, " ").concat(this.current.top, " ").concat(this.current.width, " ").concat(this.current.height)); // Perform the callback

      this.resized && this.resized.call(this);
    }
  }, {
    key: "svgX",
    value: function svgX(viewportX) {
      var fractionX = viewportX / (document.body.clientWidth || document.width);
      return this.current.left + fractionX * this.current.width;
    }
  }, {
    key: "svgY",
    value: function svgY(viewportY) {
      var fractionY = viewportY / (document.body.clientHeight || document.height);
      return this.current.top + fractionY * this.current.height;
    }
  }, {
    key: "rectangle",
    value: function rectangle(element) {
      var rectangle = new _elementCoordinates.default(element).paddingBox;
      return {
        top: this.svgY(rectangle.top),
        bottom: this.svgY(rectangle.bottom),
        left: this.svgX(rectangle.left),
        right: this.svgX(rectangle.right),
        height: this.svgY(rectangle.height),
        width: this.svgX(rectangle.width)
      };
    }
  }, {
    key: "containerRatio",
    get: function get() {
      return this.container.clientWidth / this.container.clientHeight;
    }
  }]);

  return SvgMaximize;
}();

var _default = SvgMaximize;
exports.default = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ElementCoordinates"] = factory();
	else
		root["ElementCoordinates"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElementCoordinates =
/*#__PURE__*/
function () {
  function ElementCoordinates(element) {
    _classCallCheck(this, ElementCoordinates);

    this.element = element;
  }

  _createClass(ElementCoordinates, [{
    key: "scrollTop",
    get: function get() {
      return window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
    }
  }, {
    key: "scrollLeft",
    get: function get() {
      return window.scrollX !== undefined ? window.scrollX : window.pageXOffset;
    }
  }, {
    key: "scrollPosition",
    get: function get() {
      return {
        top: this.scrollTop,
        left: this.scrollLeft
      };
    }
  }, {
    key: "borderBox",
    get: function get() {
      return new Rectangle(this.element.getBoundingClientRect(), this.scrollPosition);
    }
  }, {
    key: "paddingBox",
    get: function get() {
      var style = window.getComputedStyle(this.element);
      return new Rectangle(this.element.getBoundingClientRect(), this.scrollPosition, {
        top: Number(style.getPropertyValue('border-top-width').split('px')[0]),
        bottom: Number(style.getPropertyValue('border-bottom-width').split('px')[0]),
        left: Number(style.getPropertyValue('border-left-width').split('px')[0]),
        right: Number(style.getPropertyValue('border-right-width').split('px')[0])
      });
    }
  }, {
    key: "contentBox",
    get: function get() {
      var style = window.getComputedStyle(this.element);
      return new Rectangle(this.element.getBoundingClientRect(), this.scrollPosition, {
        top: Number(style.getPropertyValue('border-top-width').split('px')[0]) + Number(style.getPropertyValue('padding-top').split('px')[0]),
        bottom: Number(style.getPropertyValue('border-bottom-width').split('px')[0]) + Number(style.getPropertyValue('padding-bottom').split('px')[0]),
        left: Number(style.getPropertyValue('border-left-width').split('px')[0]) + Number(style.getPropertyValue('padding-left').split('px')[0]),
        right: Number(style.getPropertyValue('border-right-width').split('px')[0]) + Number(style.getPropertyValue('padding-right').split('px')[0])
      });
    }
  }]);

  return ElementCoordinates;
}();

var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle(values, scroll, offsets) {
    _classCallCheck(this, Rectangle);

    this.values = values;
    this.scroll = scroll;
    this.offsets = offsets || {};
  }

  _createClass(Rectangle, [{
    key: "top",
    get: function get() {
      return this.values.top + this.scroll.top + (this.offsets.top || 0);
    }
  }, {
    key: "left",
    get: function get() {
      return this.values.left + this.scroll.left + (this.offsets.left || 0);
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.values.bottom + this.scroll.top + (this.offsets.top || 0) - (this.offsets.bottom || 0);
    }
  }, {
    key: "right",
    get: function get() {
      return this.values.right + this.scroll.left + (this.offsets.left || 0) - (this.offsets.right || 0);
    }
  }, {
    key: "height",
    get: function get() {
      return this.values.height - (this.offsets.top || 0) - (this.offsets.bottom || 0);
    }
  }, {
    key: "width",
    get: function get() {
      return this.values.width - (this.offsets.left || 0) - (this.offsets.right || 0);
    }
  }]);

  return Rectangle;
}();

var _default = ElementCoordinates;
exports.default = _default;

/***/ })
/******/ ])["default"];
});

/***/ })
/******/ ])["default"];
});