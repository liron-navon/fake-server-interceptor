/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceWritable = exports.clearTestValues = exports.createNewTestValue = exports.createKey = undefined;

var _urlsMapper = __webpack_require__(1);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// creates a key from a method and a url
var createKey = exports.createKey = function createKey(url, method) {
  return (method + ':' + url).toLowerCase();
};

// simple function to create a new test value
var createNewTestValue = exports.createNewTestValue = function createNewTestValue(options) {
  var _options$url = options.url,
      url = _options$url === undefined ? '' : _options$url,
      _options$method = options.method,
      method = _options$method === undefined ? 'GET' : _options$method,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 1 : _options$timeout,
      _options$code = options.code,
      code = _options$code === undefined ? 200 : _options$code,
      _options$response = options.response,
      response = _options$response === undefined ? {} : _options$response;


  var testKey = createKey(url, method);
  _urlsMapper.urlMapper[testKey] = { response: response, code: code, timeout: timeout };
};

//cleares the url mapper
var clearTestValues = exports.clearTestValues = function clearTestValues() {
  for (var key in _urlsMapper.urlMapper) {
    delete _urlsMapper.urlMapper[key];
  }
};

// forces a property to become writable
var forceWritable = exports.forceWritable = function forceWritable(object, key, value) {
  return Object.defineProperties(object, _defineProperty({}, key, {
    value: value,
    writable: true
  }));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// holds key value pairs of fake requests and responses
var urlMapper = exports.urlMapper = {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupFetchFakeServer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable no-global-assign */


var _helpers = __webpack_require__(0);

var _urlsMapper = __webpack_require__(1);

if (!window.fetch) {
  window.fetch = function () {
    console.error('fetch is not supported');
  };
}

// keep the original fetch to be used if we need it
var tempFetch = window.fetch;

// create a fake fetch with similar api
var fakeFetch = function fakeFetch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
    // to handle when passing a Request object
    options.method = url.method;
    url = url.url;
  }

  var _options$method = options.method,
      method = _options$method === undefined ? 'GET' : _options$method;

  var testUrl = (0, _helpers.createKey)(url, method);
  var testData = _urlsMapper.urlMapper[testUrl];

  // no test data, make fetch work as usual
  if (!testData) {
    return tempFetch(url, options);
  }

  // return test values
  var response = testData.response,
      timeout = testData.timeout,
      code = testData.code;

  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        json: function json() {
          return response;
        },
        status: code,
        ok: true,
        statusText: 'OK'
      });
    }, timeout);
  });
};

// assign our fake fetch to the real fetch
var setupFetchFakeServer = exports.setupFetchFakeServer = function setupFetchFakeServer() {
  window.fetch = fakeFetch;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupXhrFakeServer = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // overriding XMLHttpRequest


var _helpers = __webpack_require__(0);

var _urlsMapper = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xhrCopy = function () {
  _createClass(xhrCopy, [{
    key: 'addEventListener',
    value: function addEventListener(name, cb) {
      if (!this.events) {
        this.events = {};
      }
      this.events[name] = cb;
    }
  }, {
    key: '_emit',
    value: function _emit(name, data) {
      if (!this.events) {
        return;
      }
      if (this.events[name]) {
        this.events[name](data);
      }
    }
  }, {
    key: 'open',
    value: function open(method, url, b) {
      var testUrl = (0, _helpers.createKey)(url, method);
      this.$$testData = _urlsMapper.urlMapper[testUrl];

      // return this.$$defineMyPropsWritable('readyState', window.XMLHttpRequest.OPENED);
    }
  }, {
    key: 'overrideMimeType',
    value: function overrideMimeType() {
      // just an interface
    }
  }, {
    key: 'send',
    value: function send() {
      var _this = this;

      return setTimeout(function () {
        _this.$$defineMyPropsWritable('readyState', 4);
        _this.$$defineMyPropsWritable('status', _this.$$testData.code);
        if (_this.onreadystatechange) {
          _this.onreadystatechange();
        }

        _this._emit('load');
        _this._emit('loaded');
        _this._emit('loadend');
        if (_this.onload) {
          onload();
        }
        if (_this.loaded) {
          _this.loaded();
        }
      }, this.$$testData.timeout);
    }
  }]);

  function xhrCopy() {
    _classCallCheck(this, xhrCopy);

    this._response = {};
    this.$$defineMyPropsWritable('statusText', 'Replaced by xhrInterceptor, please make sure you never see this message in production');
  }

  // helper to define a writable property (when extending xhr)


  _createClass(xhrCopy, [{
    key: '$$defineMyPropsWritable',
    value: function $$defineMyPropsWritable(prop, value) {
      return this[prop] = value; // forceWritable(this, prop, value);
    }

    // this will appear as xhr data in the result

  }, {
    key: 'responseText',
    get: function get() {
      if (this.$$testData) {
        return this.$$testData.response;
      }
      return _get(xhrCopy.prototype.__proto__ || Object.getPrototypeOf(xhrCopy.prototype), 'responseText', this);
    }
  }, {
    key: 'response',
    get: function get() {
      if (this.$$testData) {
        return this.$$testData.response;
      }
      return _get(xhrCopy.prototype.__proto__ || Object.getPrototypeOf(xhrCopy.prototype), 'responseText', this);
    }
  }]);

  return xhrCopy;
}();

xhrCopy.OPENED = 4;

var setupXhrFakeServer = exports.setupXhrFakeServer = function setupXhrFakeServer() {
  window.XMLHttpRequest = xhrCopy;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

var _fetch = __webpack_require__(2);

var _xhr = __webpack_require__(3);

var fakeServer = {};

fakeServer.init = function () {
  (0, _xhr.setupXhrFakeServer)();
  (0, _fetch.setupFetchFakeServer)();
  return fakeServer;
};

fakeServer.set = function (options) {
  (0, _helpers.createNewTestValue)(options);
  return fakeServer;
};

fakeServer.clear = function () {
  (0, _helpers.clearTestValues)();
  return fakeServer;
};

exports.default = fakeServer;

/***/ })
/******/ ]);
//# sourceMappingURL=fake-server.js.map