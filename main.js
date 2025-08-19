/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/dark-mode.js":
/*!*********************************!*\
  !*** ./js/modules/dark-mode.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ initDarkMode)\n/* harmony export */ });\nfunction initDarkMode() {\n  var DARK_MODE_CLASS = \"dark-mode\";\n  var DARK_MODE_ITEM = \"darkMode\";\n  var DARK_MODE_STATUS = \"active\";\n  var DARK_MODE_DISABLED_STATUS = \"null\";\n  var darkMode = localStorage.getItem(DARK_MODE_ITEM);\n  var themeToggle = document.querySelector(\".header__theme-toggle\");\n  function setDarkModeStatus(status) {\n    localStorage.setItem(DARK_MODE_ITEM, status);\n  }\n  function enableDarkMode() {\n    document.body.classList.add(DARK_MODE_CLASS);\n    setDarkModeStatus(DARK_MODE_STATUS);\n  }\n  function disableDarkMode() {\n    document.body.classList.remove(DARK_MODE_CLASS);\n    setDarkModeStatus(DARK_MODE_DISABLED_STATUS);\n  }\n  function isDarkModeEnabled() {\n    return darkMode === DARK_MODE_STATUS;\n  }\n  function toggleDarkMode() {\n    if (isDarkModeEnabled()) {\n      disableDarkMode();\n      darkMode = DARK_MODE_DISABLED_STATUS;\n    } else {\n      enableDarkMode();\n      darkMode = DARK_MODE_STATUS;\n    }\n  }\n  if (isDarkModeEnabled()) enableDarkMode();\n  themeToggle.addEventListener(\"click\", toggleDarkMode);\n}\n\n//# sourceURL=webpack://github-user-search-app/./js/modules/dark-mode.js?\n}");

/***/ }),

/***/ "./js/modules/fetch-github-user.js":
/*!*****************************************!*\
  !*** ./js/modules/fetch-github-user.js ***!
  \*****************************************/
/***/ (() => {

eval("{\n\n//# sourceURL=webpack://github-user-search-app/./js/modules/fetch-github-user.js?\n}");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dark_mode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dark-mode.js */ \"./js/modules/dark-mode.js\");\n/* harmony import */ var _modules_fetch_github_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/fetch-github-user.js */ \"./js/modules/fetch-github-user.js\");\n/* harmony import */ var _modules_fetch_github_user_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_fetch_github_user_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n(0,_modules_dark_mode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n_modules_fetch_github_user_js__WEBPACK_IMPORTED_MODULE_1___default()();\n\n//# sourceURL=webpack://github-user-search-app/./js/script.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;