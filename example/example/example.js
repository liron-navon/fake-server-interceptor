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
/******/ 	__webpack_require__.p = "compiled";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Invariant Violation: Invalid Option: The 'modules' option must be either 'false' to indicate no modules, or a\n    module type which can be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'. (While processing preset: \"/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-preset-env/lib/index.js\")\n    at invariant (/Users/lironnavon/Desktop/fake-server/example/node_modules/invariant/invariant.js:40:15)\n    at validateModulesOption (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-preset-env/lib/normalize-options.js:92:27)\n    at normalizeOptions (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-preset-env/lib/normalize-options.js:121:17)\n    at buildPreset (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-preset-env/lib/index.js:136:57)\n    at /Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/options/option-manager.js:317:46\n    at Array.map (<anonymous>)\n    at OptionManager.resolvePresets (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/options/option-manager.js:275:20)\n    at OptionManager.mergePresets (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/options/option-manager.js:264:10)\n    at OptionManager.mergeOptions (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/options/option-manager.js:249:14)\n    at OptionManager.init (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/options/option-manager.js:368:12)\n    at File.initOptions (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/index.js:212:65)\n    at new File (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/file/index.js:135:24)\n    at Pipeline.transform (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\n    at transpile (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-loader/lib/index.js:50:20)\n    at /Users/lironnavon/Desktop/fake-server/example/node_modules/babel-loader/lib/fs-cache.js:118:18\n    at ReadFileContext.callback (/Users/lironnavon/Desktop/fake-server/example/node_modules/babel-loader/lib/fs-cache.js:31:21)\n    at FSReqWrap.readFileAfterOpen [as oncomplete] (fs.js:437:13)");

/***/ })
/******/ ]);
//# sourceMappingURL=example.js.map