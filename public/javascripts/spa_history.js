/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _spaOne = __webpack_require__(1);

	var _spaOne2 = _interopRequireDefault(_spaOne);

	var _spaTwo = __webpack_require__(8);

	var _spaTwo2 = _interopRequireDefault(_spaTwo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new Vue({
	    el: '.wrapper',
	    data: {
	        navbar: [{
	            name: "第一列",
	            cur: true,
	            hash: 'one',
	            url: '/page/one'
	        }, {
	            name: '第二列',
	            cur: false,
	            hash: 'two',
	            url: '/page/two'
	        }],
	        currentView: ''
	    },
	    components: {
	        one: _spaOne2.default,
	        two: _spaTwo2.default
	    },
	    methods: {
	        //手动切换tab
	        eqTab: function eqTab(item) {
	            // console.log(item.cur);
	            if (item.cur) return;
	            window.history.pushState({ hash: item.hash }, null, item.url);
	            this.currentView = item.hash;
	            // 处理 nav 高亮
	            this.navbar.forEach(function (rs) {
	                return rs.cur = rs.hash == item.hash ? true : false;
	            });
	        }
	    },
	    created: function created() {
	        var _this = this;

	        this.currentView = _spaOne2.default; // 默认加载
	        // 浏览器返回 历史记录
	        window.addEventListener("popstate", function (e) {
	            if (!e.state) return;
	            _this.currentView = e.state.hash;
	            //处理 nav 高亮
	            _this.navbar.forEach(function (rs) {
	                return rs.cur = rs.hash == e.state.hash ? true : false;
	            });
	        }, false);
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(2)
	__vue_script__ = __webpack_require__(6)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] public/vue/spaOne.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./spaOne.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spaOne.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spaOne.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\nul,li{\n    padding:0;\n    margin:0;\n    list-style: none;\n}\nul{\n    width:100%;\n    background: blue;\n}\nul li{\n    line-height: 30px;\n    text-align: center;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    data: function data() {
	        return {
	            name: 'spaOne'
	        };
	    },
	    created: function created() {}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<ul>\n    <li>\n        <h2>{{name}}</h2>\n        hello\n    </li>\n    <li>1helloasdf</li>\n    <li>2hello</li>\n    <li>3hello</li>\n    <li>4hellsdafo</li>\n    <li>5hello</li>\n    <li>6hello</li>\n    <li>7hello</li>\n    <li>8helloasdfsdafsd</li>\n    <li>9hello</li>\n    <li>10hellsdafasdfsdao</li>\n    <li>11hello</li>\n    <li>12hello</li>\n    <li>13helloasdf</li>\n    <li>14hello</li>\n    <li>15hello</li>\n    <li>16hellsdafo</li>\n    <li>17hello</li>\n    <li>18hello</li>\n    <li>19hello</li>\n    <li>20helloasdfsdafsd</li>\n    <li>21hello</li>\n    <li>22hellsdafasdfsdao</li>\n    <li>23hello</li>\n    <li>24hello</li>\n    <li>25helloasdf</li>\n    <li>26hello</li>\n    <li>27hello</li>\n    <li>28hellsdafo</li>\n    <li>29hello</li>\n    <li>30hello</li>\n    <li>31hello</li>\n    <li>32helloasdfsdafsd</li>\n    <li>33hello</li>\n    <li>34hellsdafasdfsdao</li>\n    <li>35hello</li>\n    <li>36hello</li>\n    <li>37helloasdf</li>\n    <li>38hello</li>\n    <li>39hello</li>\n    <li>40hellsdafo</li>\n    <li>41hello</li>\n    <li>42hello</li>\n    <li>43hello</li>\n    <li>44helloasdfsdafsd</li>\n    <li>45hello</li>\n    <li>46hellsdafasdfsdao</li>\n    <li>47hello</li>\n    <li>48hello</li>\n    <li>49helloasdf</li>\n    <li>50hello</li>\n    <li>hello</li>\n    <li>hellsdafo</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>helloasdfsdafsd</li>\n    <li>hello</li>\n    <li>hellsdafasdfsdao</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>helloasdf</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>hellsdafo</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>helloasdfsdafsd</li>\n    <li>hello</li>\n    <li>hellsdafasdfsdao</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>helloasdf</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>hellsdafo</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>hello</li>\n    <li>helloasdfsdafsd</li>\n    <li>hello</li>\n    <li>hellsdafasdfsdao</li>\n    <li>hello</li>\n</ul>\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(9)
	__vue_script__ = __webpack_require__(11)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] public/vue/spaTwo.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./spaTwo.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spaTwo.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spaTwo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n.list{\n    width:100%;\n    background: yellow;\n\n}\n.item{\n    line-height: 30px;\n    text-align: center;\n}\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    data: function data() {
	        return {
	            name: 'spaTwo'
	        };
	    },
	    created: function created() {}
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"list\">\n    <h2>{{name}}</h2>\n    <div class=\"item\">1spaTwo</div>\n    <div class=\"item\">2spaTwo</div>\n    <div class=\"item\">3spaTwo</div>\n    <div class=\"item\">4spaTwo</div>\n    <div class=\"item\">5spaTwo</div>\n    <div class=\"item\">6spaTwo</div>\n    <div class=\"item\">7spaTwo</div>\n    <div class=\"item\">8spaTwo</div>\n    <div class=\"item\">9spaTwo</div>\n    <div class=\"item\">10spaTwo</div>\n    <div class=\"item\">11spaTwo</div>\n    <div class=\"item\">12spaTwo</div>\n    <div class=\"item\">13spaTwo</div>\n    <div class=\"item\">14spaTwo</div>\n    <div class=\"item\">15spaTwo</div>\n    <div class=\"item\">16spaTwo</div>\n    <div class=\"item\">17spaTwo</div>\n    <div class=\"item\">18spaTwo</div>\n    <div class=\"item\">19spaTwo</div>\n    <div class=\"item\">20spaTwo</div>\n    <div class=\"item\">21spaTwo</div>\n    <div class=\"item\">22spaTwo</div>\n    <div class=\"item\">23spaTwo</div>\n    <div class=\"item\">24spaTwo</div>\n    <div class=\"item\">25spaTwo</div>\n    <div class=\"item\">26spaTwo</div>\n    <div class=\"item\">27spaTwo</div>\n    <div class=\"item\">28spaTwo</div>\n    <div class=\"item\">29spaTwo</div>\n    <div class=\"item\">30spaTwo</div>\n</div>\n";

/***/ }
/******/ ]);