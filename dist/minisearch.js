(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("minisearch", [], factory);
	else if(typeof exports === 'object')
		exports["minisearch"] = factory();
	else
		root["MiniSearch"] = factory();
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/SearchableMap/TreeIterator.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* @private
*/
var TreeIterator =
/*#__PURE__*/
function () {
  function TreeIterator(set, type) {
    _classCallCheck(this, TreeIterator);

    var node = set._tree;
    var keys = Object.keys(node);
    this.set = set;
    this.type = type;
    this.path = keys.length > 0 ? [{
      node: node,
      keys: keys
    }] : [];
  }

  _createClass(TreeIterator, [{
    key: "next",
    value: function next() {
      var value = this.dive();
      this.backtrack();
      return value;
    }
  }, {
    key: "dive",
    value: function dive() {
      if (this.path.length === 0) {
        return {
          done: true
        };
      }

      var _last = last(this.path),
          node = _last.node,
          keys = _last.keys;

      if (last(keys) === LEAF) {
        return {
          done: false,
          value: this.result()
        };
      }

      this.path.push({
        node: node[last(keys)],
        keys: Object.keys(node[last(keys)])
      });
      return this.dive();
    }
  }, {
    key: "backtrack",
    value: function backtrack() {
      if (this.path.length === 0) {
        return;
      }

      last(this.path).keys.pop();

      if (last(this.path).keys.length > 0) {
        return;
      }

      this.path.pop();
      this.backtrack();
    }
  }, {
    key: "key",
    value: function key() {
      return this.set._prefix + this.path.map(function (_ref) {
        var keys = _ref.keys;
        return last(keys);
      }).filter(function (key) {
        return key !== LEAF;
      }).join('');
    }
  }, {
    key: "value",
    value: function value() {
      return last(this.path).node[LEAF];
    }
  }, {
    key: "result",
    value: function result() {
      if (this.type === VALUES) {
        return this.value();
      }

      if (this.type === KEYS) {
        return this.key();
      }

      return [this.key(), this.value()];
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this;
    }
  }]);

  return TreeIterator;
}();
/** @ignore */


var ENTRIES = 'ENTRIES';
/** @ignore */

var KEYS = 'KEYS';
/** @ignore */

var VALUES = 'VALUES';
/** @ignore */

var LEAF = '';

var last = function last(array) {
  return array[array.length - 1];
};


// CONCATENATED MODULE: ./src/SearchableMap/fuzzySearch.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
* @ignore
*/

var fuzzySearch_fuzzySearch = function fuzzySearch(node, query, maxDistance) {
  var stack = [{
    distance: 0,
    i: 0,
    key: '',
    node: node
  }];
  var results = {};
  var innerStack = [];

  var _loop = function _loop() {
    var _stack$pop = stack.pop(),
        node = _stack$pop.node,
        distance = _stack$pop.distance,
        key = _stack$pop.key,
        i = _stack$pop.i,
        edit = _stack$pop.edit;

    Object.keys(node).forEach(function (k) {
      if (k === LEAF) {
        var totDistance = distance + (query.length - i);

        var _ref = results[key] || [null, Infinity],
            _ref2 = _slicedToArray(_ref, 2),
            d = _ref2[1];

        if (totDistance <= maxDistance && totDistance < d) {
          results[key] = [node[k], totDistance];
        }
      } else {
        withinDistance(query, k, maxDistance - distance, i, edit, innerStack).forEach(function (_ref3) {
          var d = _ref3.distance,
              i = _ref3.i,
              edit = _ref3.edit;
          stack.push({
            node: node[k],
            distance: distance + d,
            key: key + k,
            i: i,
            edit: edit
          });
        });
      }
    });
  };

  while (stack.length > 0) {
    _loop();
  }

  return results;
};
/**
* @ignore
*/

var withinDistance = function withinDistance(a, b, maxDistance, i, edit, stack) {
  stack.push({
    distance: 0,
    ia: i,
    ib: 0,
    edit: edit
  });
  var results = [];

  while (stack.length > 0) {
    var _stack$pop2 = stack.pop(),
        distance = _stack$pop2.distance,
        ia = _stack$pop2.ia,
        ib = _stack$pop2.ib,
        _edit = _stack$pop2.edit;

    if (ib === b.length) {
      results.push({
        distance: distance,
        i: ia,
        edit: _edit
      });
      continue;
    }

    if (a[ia] === b[ib]) {
      stack.push({
        distance: distance,
        ia: ia + 1,
        ib: ib + 1,
        edit: NONE
      });
    } else {
      if (distance >= maxDistance) {
        continue;
      }

      if (_edit !== ADD) {
        stack.push({
          distance: distance + 1,
          ia: ia,
          ib: ib + 1,
          edit: DELETE
        });
      }

      if (ia < a.length) {
        if (_edit !== DELETE) {
          stack.push({
            distance: distance + 1,
            ia: ia + 1,
            ib: ib,
            edit: ADD
          });
        }

        if (_edit !== DELETE && _edit !== ADD) {
          stack.push({
            distance: distance + 1,
            ia: ia + 1,
            ib: ib + 1,
            edit: CHANGE
          });
        }
      }
    }
  }

  return results;
};
var NONE = 0;
var CHANGE = 1;
var ADD = 2;
var DELETE = 3;
/* harmony default export */ var SearchableMap_fuzzySearch = (fuzzySearch_fuzzySearch);
// CONCATENATED MODULE: ./src/SearchableMap/SearchableMap.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SearchableMap_slicedToArray(arr, i) { return SearchableMap_arrayWithHoles(arr) || SearchableMap_iterableToArrayLimit(arr, i) || SearchableMap_nonIterableRest(); }

function SearchableMap_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function SearchableMap_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function SearchableMap_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function SearchableMap_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SearchableMap_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SearchableMap_createClass(Constructor, protoProps, staticProps) { if (protoProps) SearchableMap_defineProperties(Constructor.prototype, protoProps); if (staticProps) SearchableMap_defineProperties(Constructor, staticProps); return Constructor; }



/**
* A class implementing the same interface as a standard JavaScript `Map` with
* string keys, but adding support for efficiently searching entries with prefix
* or fuzzy search. This is the class internally used by `MiniSearch` as the
* inverted index data structure. The implementation is a radix tree (compressed
* prefix tree).
*
* @implements {Map}
*/

var SearchableMap_SearchableMap =
/*#__PURE__*/
function () {
  function SearchableMap() {
    var tree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    SearchableMap_classCallCheck(this, SearchableMap);

    /** @private */
    this._tree = tree;
    /** @private */

    this._prefix = prefix;
  }
  /**
  * Creates and returns a mutable view of this `SearchableMap`, containing only
  * entries that share the given prefix.
  *
  * @example
  * let map = new SearchableMap()
  * map.set("unicorn", 1)
  * map.set("universe", 2)
  * map.set("university", 3)
  * map.set("unique", 4)
  * map.set("hello", 5)
  *
  * let uni = map.atPrefix("uni")
  * uni.get("unique") // => 4
  * uni.get("unicorn") // => 1
  * uni.get("hello") // => undefined
  *
  * let univer = map.atPrefix("univer")
  * uni.get("unique") // => undefined
  * uni.get("universe") // => 2
  * uni.get("university") // => 3
  *
  * @param {string} prefix - The prefix
  * @return {SearchableMap} A `SearchableMap` representing a mutable view of the original Map at the given prefix
  */


  SearchableMap_createClass(SearchableMap, [{
    key: "atPrefix",
    value: function atPrefix(prefix) {
      if (!prefix.startsWith(this._prefix)) {
        throw new Error('Mismatched prefix');
      }

      var _trackDown = SearchableMap_trackDown(this._tree, prefix.slice(this._prefix.length)),
          _trackDown2 = SearchableMap_slicedToArray(_trackDown, 2),
          node = _trackDown2[0],
          path = _trackDown2[1];

      if (node === undefined) {
        var _last = SearchableMap_last(path),
            _last2 = SearchableMap_slicedToArray(_last, 2),
            parentNode = _last2[0],
            key = _last2[1];

        var nodeKey = Object.keys(parentNode).find(function (k) {
          return k !== LEAF && k.startsWith(key);
        });

        if (nodeKey !== undefined) {
          return new SearchableMap(_defineProperty({}, nodeKey.slice(key.length), parentNode[nodeKey]), prefix);
        }
      }

      return new SearchableMap(node || {}, prefix);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
    * @return {undefined}
    */

  }, {
    key: "clear",
    value: function clear() {
      delete this._size;
      this._tree = {};
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
    * @param {string} key
    * @return {undefined}
    */

  }, {
    key: "delete",
    value: function _delete(key) {
      delete this._size;
      return SearchableMap_remove(this._tree, key);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
    * @return {Iterator}
    */

  }, {
    key: "entries",
    value: function entries() {
      return new TreeIterator(this, ENTRIES);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
    * @param {function(key: string, value: any): any} fn
    * @return {undefined}
    */

  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = SearchableMap_slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          fn(key, value, this);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
    * Returns a key-value object of all the entries that have a key within the
    * given edit distance from the search key. The keys of the returned object are
    * the matching keys, while the values are two-elements arrays where the first
    * element is the value associated to the key, and the second is the edit
    * distance of the key to the search key.
    *
    * @example
    * let map = new SearchableMap()
    * map.set('hello', 'world')
    * map.set('hell', 'yeah')
    * map.set('ciao', 'mondo')
    *
    * // Get all entries that match the key 'hallo' with a maximum edit distance of 2
    * map.fuzzyGet('hallo', 2)
    * // => { "hello": ["world", 1], "hell": ["yeah", 2] }
    *
    * // In the example, the "hello" key has value "world" and edit distance of 1
    * // (change "e" to "a"), the key "hell" has value "yeah" and edit distance of 2
    * // (change "e" to "a", delete "o")
    *
    * @param {string} key - The search key
    * @param {number} maxEditDistance - The maximum edit distance
    * @return {Object<string, Array>} A key-value object of the matching keys to their value and edit distance
    */

  }, {
    key: "fuzzyGet",
    value: function fuzzyGet(key, maxEditDistance) {
      return SearchableMap_fuzzySearch(this._tree, key, maxEditDistance);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
    * @param {string} key
    * @return {any}
    */

  }, {
    key: "get",
    value: function get(key) {
      var node = SearchableMap_lookup(this._tree, key);
      return node !== undefined ? node[LEAF] : undefined;
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
    * @param {string} key
    * @return {boolean}
    */

  }, {
    key: "has",
    value: function has(key) {
      var node = SearchableMap_lookup(this._tree, key);
      return node !== undefined && node.hasOwnProperty(LEAF);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
    * @return {Iterator}
    */

  }, {
    key: "keys",
    value: function keys() {
      return new TreeIterator(this, KEYS);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
    * @param {string} key
    * @param {any} value
    * @return {SearchableMap} The `SearchableMap` itself, to allow chaining
    */

  }, {
    key: "set",
    value: function set(key, value) {
      if (typeof key !== 'string') {
        throw new Error('key must be a string');
      }

      delete this._size;
      var node = SearchableMap_createPath(this._tree, key);
      node[LEAF] = value;
      return this;
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
    * @type {number}
    */

  }, {
    key: "update",

    /**
    * Updates the value at the given key using the provided function. The function
    * is called with the current value at the key, and its return value is used as
    * the new value to be set.
    *
    * @example
    * // Increment the current value by one
    * searchableMap.update('somekey', (currentValue) => currentValue == null ? 0 : currentValue + 1)
    *
    * @param {string} key - The key
    * @param {function(currentValue: any): any} fn - The function used to compute the new value from the current one
    * @return {SearchableMap} The `SearchableMap` itself, to allow chaining
    */
    value: function update(key, fn) {
      if (typeof key !== 'string') {
        throw new Error('key must be a string');
      }

      delete this._size;
      var node = SearchableMap_createPath(this._tree, key);
      node[LEAF] = fn(node[LEAF]);
      return this;
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
    * @return {Iterator}
    */

  }, {
    key: "values",
    value: function values() {
      return new TreeIterator(this, VALUES);
    }
    /**
    * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
    * @return {Iterator}
    */

  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.entries();
    }
  }, {
    key: "size",
    get: function get() {
      var _this = this;

      if (this._size) {
        return this._size;
      }
      /** @ignore */


      this._size = 0;
      this.forEach(function () {
        _this._size += 1;
      });
      return this._size;
    }
  }]);

  return SearchableMap;
}();
/**
* Creates a `SearchableMap` from an `Iterable` of entries
*
* @param {Iterable|Array} entries - Entries to be inserted in the `SearchableMap`
* @return {SearchableMap} A new `SearchableMap` with the given entries
**/


SearchableMap_SearchableMap.from = function (entries) {
  var tree = new SearchableMap_SearchableMap();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = SearchableMap_slicedToArray(_step2.value, 2),
          key = _step2$value[0],
          value = _step2$value[1];

      tree.set(key, value);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return tree;
};
/**
* Creates a `SearchableMap` from the iterable properties of a JavaScript object
*
* @param {Object} object - Object of entries for the `SearchableMap`
* @return {SearchableMap} A new `SearchableMap` with the given entries
**/


SearchableMap_SearchableMap.fromObject = function (object) {
  return SearchableMap_SearchableMap.from(Object.entries(object));
};

var SearchableMap_trackDown = function trackDown(tree, key) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (key.length === 0) {
    return [tree, path];
  }

  var nodeKey = Object.keys(tree).find(function (k) {
    return k !== LEAF && key.startsWith(k);
  });

  if (nodeKey === undefined) {
    return trackDown(undefined, '', [].concat(_toConsumableArray(path), [[tree, key]]));
  }

  return trackDown(tree[nodeKey], key.slice(nodeKey.length), [].concat(_toConsumableArray(path), [[tree, nodeKey]]));
};

var SearchableMap_lookup = function lookup(tree, key) {
  if (key.length === 0) {
    return tree;
  }

  var nodeKey = Object.keys(tree).find(function (k) {
    return k !== LEAF && key.startsWith(k);
  });

  if (nodeKey === undefined) {
    return undefined;
  }

  return lookup(tree[nodeKey], key.slice(nodeKey.length));
};

var SearchableMap_createPath = function createPath(tree, key) {
  if (key.length === 0) {
    return tree;
  }

  var nodeKey = Object.keys(tree).find(function (k) {
    return k !== LEAF && key.startsWith(k);
  });

  if (nodeKey === undefined) {
    var toSplit = Object.keys(tree).find(function (k) {
      return k !== LEAF && k.startsWith(key[0]);
    });

    if (toSplit === undefined) {
      tree[key] = {};
    } else {
      var prefix = commonPrefix(key, toSplit);
      tree[prefix] = _defineProperty({}, toSplit.slice(prefix.length), tree[toSplit]);
      delete tree[toSplit];
      return createPath(tree[prefix], key.slice(prefix.length));
    }

    return tree[key];
  }

  return createPath(tree[nodeKey], key.slice(nodeKey.length));
};

var commonPrefix = function commonPrefix(a, b) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var length = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.min(a.length, b.length);
  var prefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (i >= length) {
    return prefix;
  }

  if (a[i] !== b[i]) {
    return prefix;
  }

  return commonPrefix(a, b, i + 1, length, prefix + a[i]);
};

var SearchableMap_remove = function remove(tree, key) {
  var _trackDown3 = SearchableMap_trackDown(tree, key),
      _trackDown4 = SearchableMap_slicedToArray(_trackDown3, 2),
      node = _trackDown4[0],
      path = _trackDown4[1];

  if (node === undefined) {
    return;
  }

  delete node[LEAF];
  var keys = Object.keys(node);

  if (keys.length === 0) {
    cleanup(path);
  }

  if (keys.length === 1) {
    merge(path, keys[0], node[keys[0]]);
  }
};

var cleanup = function cleanup(path) {
  if (path.length === 0) {
    return;
  }

  var _last3 = SearchableMap_last(path),
      _last4 = SearchableMap_slicedToArray(_last3, 2),
      node = _last4[0],
      key = _last4[1];

  delete node[key];

  if (Object.keys(node).length === 0) {
    cleanup(path.slice(0, -1));
  }
};

var merge = function merge(path, key, value) {
  if (path.length === 0) {
    return;
  }

  var _last5 = SearchableMap_last(path),
      _last6 = SearchableMap_slicedToArray(_last5, 2),
      node = _last6[0],
      nodeKey = _last6[1];

  node[nodeKey + key] = value;
  delete node[nodeKey];
};

var SearchableMap_last = function last(array) {
  return array[array.length - 1];
};

/* harmony default export */ var src_SearchableMap_SearchableMap = (SearchableMap_SearchableMap);

// CONCATENATED MODULE: ./src/MiniSearch.js
var _combinators;

function MiniSearch_toConsumableArray(arr) { return MiniSearch_arrayWithoutHoles(arr) || MiniSearch_iterableToArray(arr) || MiniSearch_nonIterableSpread(); }

function MiniSearch_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function MiniSearch_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function MiniSearch_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function MiniSearch_slicedToArray(arr, i) { return MiniSearch_arrayWithHoles(arr) || MiniSearch_iterableToArrayLimit(arr, i) || MiniSearch_nonIterableRest(); }

function MiniSearch_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function MiniSearch_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function MiniSearch_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { MiniSearch_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MiniSearch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MiniSearch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MiniSearch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MiniSearch_createClass(Constructor, protoProps, staticProps) { if (protoProps) MiniSearch_defineProperties(Constructor.prototype, protoProps); if (staticProps) MiniSearch_defineProperties(Constructor, staticProps); return Constructor; }


var OR = 'or';
var AND = 'and';
/**
* MiniSearch is the main entrypoint class, and represents a full-text search
* engine.
*
* @example
* const documents = [
*   {
*     id: 1,
*     title: 'Moby Dick',
*     text: 'Call me Ishmael. Some years ago...',
*     category: 'fiction'
*   },
*   {
*     id: 2,
*     title: 'Zen and the Art of Motorcycle Maintenance',
*     text: 'I can see by my watch...',
*     category: 'fiction'
*   },
*   {
*     id: 3,
*     title: 'Neuromancer',
*     text: 'The sky above the port was...',
*     category: 'fiction'
*   },
*   {
*     id: 4,
*     title: 'Zen and the Art of Archery',
*     text: 'At first sight it must seem...',
*     category: 'non-fiction'
*   },
*   // ...and more
* ]
*
* // Create a search engine that indexes the 'title' and 'text' fields for
* // full-text search. Search results will include 'title' and 'category' (plus the
* // id field, that is always stored and returned)
* const miniSearch = MiniSearch.new({
*   fields: ['title', 'text'],
*   storeFields: ['title', 'category']
* })
*
* // Add documents to the index
* miniSearch.addAll(documents)
*
* // Search for documents:
* let results = miniSearch.search('zen art motorcycle')
* // => [
*   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258 },
*   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629 }
* ]
* */

var MiniSearch_MiniSearch =
/*#__PURE__*/
function () {
  /**
  * @param {Object} options - Configuration options
  * @param {Array<string>} options.fields - Fields to be indexed. Required.
  * @param {string} [options.idField='id'] - ID field, uniquely identifying a document
  * @param {Array<string>} [options.storeFields] - Fields to store, so that search results would include them. By default none, so resuts would only contain the id field.
  * @param {function(document: Object, fieldName: string): string} [options.extractField] - Function used to get the value of a field in a document
  * @param {function(text: string, [fieldName]: string): Array<string>} [options.tokenize] - Function used to split a field into individual terms
  * @param {function(term: string, [fieldName]: string): string} [options.processTerm] - Function used to process a term before indexing it or searching
  * @param {Object} [options.searchOptions] - Default search options (see the `search` method for details)
  *
  * @example
  * // Create a search engine that indexes the 'title' and 'text' fields of your
  * // documents:
  * const miniSearch = MiniSearch.new({ fields: ['title', 'text'] })
  *
  * @example
  * // Your documents are assumed to include a unique 'id' field, but if you want
  * // to use a different field for document identification, you can set the
  * // 'idField' option:
  * const miniSearch = MiniSearch.new({ idField: 'key', fields: ['title', 'text'] })
  *
  * @example
  * // The full set of options (here with their default value) is:
  * const miniSearch = MiniSearch.new({
  *   // idField: field that uniquely identifies a document
  *   idField: 'id',
  *
  *   // extractField: function used to get the value of a field in a document.
  *   // By default, it assumes the document is a flat object with field names as
  *   // property keys and field values as string property values, but custom logic
  *   // can be implemented by setting this option to a custom extractor function.
  *   extractField: (document, fieldName) => document[fieldName],
  *
  *   // tokenize: function used to split fields into individual terms. By
  *   // default, it is also used to tokenize search queries, unless a specific
  *   // `tokenize` search option is supplied. When tokenizing an indexed field,
  *   // the field name is passed as the second argument.
  *   tokenize: (string, _fieldName) => string.split(SPACE_OR_PUNCTUATION),
  *
  *   // processTerm: function used to process each tokenized term before
  *   // indexing. It can be used for stemming and normalization. Return a falsy
  *   // value in order to discard a term. By default, it is also used to process
  *   // search queries, unless a specific `processTerm` option is supplied as a
  *   // search option. When processing a term from a indexed field, the field
  *   // name is passed as the second argument.
  *   processTerm: (term, _fieldName) => term.toLowerCase(),
  *
  *   // searchOptions: default search options, see the `search` method for
  *   // details
  *   searchOptions: undefined,
  *
  *   // fields: document fields to be indexed. Mandatory, but not set by default
  *   fields: undefined
  *
  *   // storeFields: document fields to be stored and returned as part of the
  *   // search results.
  *   storeFields: []
  * })
  */
  function MiniSearch() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    MiniSearch_classCallCheck(this, MiniSearch);

    /** @private */
    this._options = _objectSpread({}, defaultOptions, {}, options);
    this._options.searchOptions = _objectSpread({}, defaultSearchOptions, {}, this._options.searchOptions || {});
    var fields = this._options.fields;

    if (fields == null) {
      throw new Error('MiniSearch: option "fields" must be provided');
    }
    /** @private */


    this._index = new src_SearchableMap_SearchableMap();
    /** @private */

    this._documentCount = 0;
    /** @private */

    this._documentIds = {};
    /** @private */

    this._fieldIds = {};
    /** @private */

    this._fieldLength = {};
    /** @private */

    this._averageFieldLength = {};
    /** @private */

    this._nextId = 0;
    /** @private */

    this._storedFields = {};
    addFields(this, fields);
  }
  /**
  * Adds a document to the index
  *
  * @param {Object} document - the document to be indexed
  */


  MiniSearch_createClass(MiniSearch, [{
    key: "add",
    value: function add(document) {
      var _this = this;

      var _this$_options = this._options,
          extractField = _this$_options.extractField,
          tokenize = _this$_options.tokenize,
          processTerm = _this$_options.processTerm,
          fields = _this$_options.fields,
          idField = _this$_options.idField;

      if (document[idField] == null) {
        throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
      }

      var shortDocumentId = addDocumentId(this, document[idField]);
      saveStoredFields(this, shortDocumentId, document);
      fields.forEach(function (field) {
        var tokens = tokenize(extractField(document, field) || '', field);
        addFieldLength(_this, shortDocumentId, _this._fieldIds[field], _this.documentCount - 1, tokens.length);
        tokens.forEach(function (term) {
          var processedTerm = processTerm(term, field);

          if (isTruthy(processedTerm)) {
            addTerm(_this, _this._fieldIds[field], shortDocumentId, processedTerm);
          }
        });
      });
    }
    /**
    * Adds all the given documents to the index
    *
    * @param {Object[]} documents - an array of documents to be indexed
    */

  }, {
    key: "addAll",
    value: function addAll(documents) {
      var _this2 = this;

      documents.forEach(function (document) {
        return _this2.add(document);
      });
    }
    /**
    * Adds all the given documents to the index asynchronously.
    *
    * Returns a promise that resolves to undefined when the indexing is done. This
    * method is useful when index many documents, to avoid blocking the main
    * thread. The indexing is performed asynchronously and in chunks.
    *
    * @param {Object[]} documents - an array of documents to be indexed
    * @param {Object} [options] - Configuration options
    * @param {number} [options.chunkSize] - Size of the document chunks indexed, 10 by default
    * @return {Promise} A promise resolving to `null` when the indexing is done
    */

  }, {
    key: "addAllAsync",
    value: function addAllAsync(documents) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$chunkSize = options.chunkSize,
          chunkSize = _options$chunkSize === void 0 ? 10 : _options$chunkSize;
      var acc = {
        chunk: [],
        promise: Promise.resolve(null)
      };

      var _documents$reduce = documents.reduce(function (_ref, document, i) {
        var chunk = _ref.chunk,
            promise = _ref.promise;
        chunk.push(document);

        if ((i + 1) % chunkSize === 0) {
          return {
            chunk: [],
            promise: promise.then(function () {
              return _this3.addAll(chunk);
            })
          };
        } else {
          return {
            chunk: chunk,
            promise: promise
          };
        }
      }, acc),
          chunk = _documents$reduce.chunk,
          promise = _documents$reduce.promise;

      return promise.then(function () {
        return _this3.addAll(chunk);
      });
    }
    /**
    * Removes the given document from the index.
    *
    * The document to delete must NOT have changed between indexing and deletion,
    * otherwise the index will be corrupted. Therefore, when reindexing a document
    * after a change, the correct order of operations is:
    *
    *   1. remove old version
    *   2. apply changes
    *   3. index new version
    *
    * @param {Object} document - the document to be indexed
    */

  }, {
    key: "remove",
    value: function remove(document) {
      var _this4 = this;

      var _this$_options2 = this._options,
          tokenize = _this$_options2.tokenize,
          processTerm = _this$_options2.processTerm,
          fields = _this$_options2.fields,
          idField = _this$_options2.idField;

      if (document[idField] == null) {
        throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
      }

      var _ref2 = Object.entries(this._documentIds).find(function (_ref4) {
        var _ref5 = MiniSearch_slicedToArray(_ref4, 2),
            _ = _ref5[0],
            longId = _ref5[1];

        return document[idField] === longId;
      }) || [],
          _ref3 = MiniSearch_slicedToArray(_ref2, 1),
          shortDocumentId = _ref3[0];

      if (shortDocumentId == null) {
        throw new Error("MiniSearch: cannot remove document with ID ".concat(document[idField], ": it is not in the index"));
      }

      fields.filter(function (field) {
        return document[field] != null;
      }).forEach(function (field) {
        tokenize(document[field], field).forEach(function (term) {
          var processedTerm = processTerm(term);

          if (isTruthy(processedTerm)) {
            removeTerm(_this4, _this4._fieldIds[field], shortDocumentId, processTerm(term));
          }
        });
      });
      delete this._storedFields[shortDocumentId];
      delete this._documentIds[shortDocumentId];
      this._documentCount -= 1;
    }
    /**
    * Search for documents matching the given search query.
    *
    * The result is a list of scored document IDs matching the query, sorted by
    * descending score, and each including data about which terms were matched and
    * in which fields.
    *
    * @param {string} queryString - Query string to search for
    * @param {Object} [options] - Search options. Each option, if not given, defaults to the corresponding value of `searchOptions` given to the constructor, or to the library default.
    * @param {Array<string>} [options.fields] - Fields to search in. If omitted, all fields are searched
    * @param {Object<string, number>} [options.boost] - Key-value object of boosting values for fields
    * @param {boolean|function(term: string, i: number, terms: Array<string>): boolean} [options.prefix=false] - Whether to perform prefix search. Value can be a boolean, or a function computing the boolean from each tokenized and processed query term. If a function is given, it is called with the following arguments: `term: string` - the query term; `i: number` - the term index in the query terms; `terms: Array<string>` - the array of query terms.
    * @param {number|function(term: string, i: number, terms: Array<string>): boolean|number} [options.fuzzy=false] - If set to a number greater than or equal 1, it performs fuzzy search within a maximum edit distance equal to that value. If set to a number less than 1, it performs fuzzy search with a maximum edit distance equal to the term length times the value, rouded at the nearest integer. If set to a function, it calls the function for each tokenized and processed query term and expects a numeric value indicating the maximum edit distance, or a falsy falue if fuzzy search should not be performed. If a function is given, it is called with the following arguments: `term: string` - the query term; `i: number` - the term index in the query terms; `terms: Array<string>` - the array of query terms.
    * @param {string} [options.combineWith='OR'] - How to combine term queries (it can be 'OR' or 'AND')
    * @param {function(query: string): Array<string>} [options.tokenize] - Function used to tokenize the search query. It defaults to the same tokenizer used for indexing.
    * @param {function(term: string): string|null|undefined|false} [options.processTerm] - Function used to process each search term. Return a falsy value to discard a term. Defaults to the same function used to process terms upon indexing.
    * @param {function(result: Object): boolean} [options.filter] - Function used to filter search results, for example on the basis of stored fields
    * @return {Array<{ id: any, score: number, match: Object }>} A sorted array of scored document IDs matching the search
    *
    * @example
    * // Search for "zen art motorcycle" with default options: terms have to match
    * // exactly, and individual terms are joined with OR
    * miniSearch.search('zen art motorcycle')
    * // => [ { id: 2, score: 2.77258, match: { ... } }, { id: 4, score: 1.38629, match: { ... } } ]
    *
    * @example
    * // Search only in the 'title' field
    * miniSearch.search('zen', { fields: ['title'] })
    *
    * @example
    * // Boost a field
    * miniSearch.search('zen', { boost: { title: 2 } })
    *
    * @example
    * // Search for "moto" with prefix search (it will match documents
    * // containing terms that start with "moto" or "neuro")
    * miniSearch.search('moto neuro', { prefix: true })
    *
    * @example
    * // Search for "ismael" with fuzzy search (it will match documents containing
    * // terms similar to "ismael", with a maximum edit distance of 0.2 term.length
    * // (rounded to nearest integer)
    * miniSearch.search('ismael', { fuzzy: 0.2 })
    *
    * @example
    * // Mix of exact match, prefix search, and fuzzy search
    * miniSearch.search('ismael mob', {
    *  prefix: true,
    *  fuzzy: 0.2
    * })
    *
    * @example
    * // Perform fuzzy and prefix search depending on the search term. Here
    * // performing prefix and fuzzy search only on terms longer than 3 characters
    * miniSearch.search('ismael mob', {
    *  prefix: term => term.length > 3
    *  fuzzy: term => term.length > 3 ? 0.2 : null
    * })
    *
    * @example
    * // Combine search terms with AND (to match only documents that contain both
    * // "motorcycle" and "art")
    * miniSearch.search('motorcycle art', { combineWith: 'AND' })
    *
    * @example
    * // Filter only results in the 'fiction' category (assuming that 'category'
    * // is a stored field)
    * miniSearch.search('motorcycle art', {
    *   filter: (result) => result.category === 'fiction'
    * })
    */

  }, {
    key: "search",
    value: function search(queryString) {
      var _this5 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$_options3 = this._options,
          tokenize = _this$_options3.tokenize,
          processTerm = _this$_options3.processTerm,
          searchOptions = _this$_options3.searchOptions;
      options = _objectSpread({
        tokenize: tokenize,
        processTerm: processTerm
      }, searchOptions, {}, options);
      var _options = options,
          searchTokenize = _options.tokenize,
          searchProcessTerm = _options.processTerm;
      var queries = searchTokenize(queryString).map(function (term) {
        return searchProcessTerm(term);
      }).filter(isTruthy).map(termToQuery(options));
      var results = queries.map(function (query) {
        return _this5.executeQuery(query, options);
      });
      var combinedResults = this.combineResults(results, options.combineWith);
      return Object.entries(combinedResults).reduce(function (results, _ref6) {
        var _ref7 = MiniSearch_slicedToArray(_ref6, 2),
            docId = _ref7[0],
            _ref7$ = _ref7[1],
            score = _ref7$.score,
            match = _ref7$.match,
            terms = _ref7$.terms;

        var result = {
          id: _this5._documentIds[docId],
          terms: uniq(terms),
          score: score,
          match: match
        };
        Object.assign(result, _this5._storedFields[docId]);

        if (options.filter == null || options.filter(result)) {
          results.push(result);
        }

        return results;
      }, []).sort(function (_ref8, _ref9) {
        var a = _ref8.score;
        var b = _ref9.score;
        return a < b ? 1 : -1;
      });
    }
    /**
    * Provide suggestions for the given search query
    *
    * The result is a list of suggested modified search queries, derived from the
    * given search query, each with a relevance score, sorted by descending score.
    *
    * @param {string} queryString - Query string to be expanded into suggestions
    * @param {Object} [options] - Search options. The supported options and default values are the same as for the `search` method, except that by default prefix search is performed on the last term in the query.
    * @return {Array<{ suggestion: string, score: number }>} A sorted array of suggestions sorted by relevance score.
    *
    * @example
    * // Get suggestions for 'neuro':
    * miniSearch.autoSuggest('neuro')
    * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 0.46240 } ]
    *
    * @example
    * // Get suggestions for 'zen ar':
    * miniSearch.autoSuggest('zen ar')
    * // => [
    * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
    * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
    * // ]
    *
    * @example
    * // Correct spelling mistakes using fuzzy search:
    * miniSearch.autoSuggest('neromancer', { fuzzy: 0.2 })
    * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 1.03998 } ]
    *
    * @example
    * // Get suggestions for 'zen ar', but only within the 'fiction' category
    * // (assuming that 'category' is a stored field):
    * miniSearch.autoSuggest('zen ar', {
    *   filter: (result) => result.category === 'fiction'
    * })
    * // => [
    * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
    * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
    * // ]
    */

  }, {
    key: "autoSuggest",
    value: function autoSuggest(queryString) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = _objectSpread({}, defaultAutoSuggestOptions, {}, options);
      var suggestions = this.search(queryString, options).reduce(function (suggestions, _ref10) {
        var score = _ref10.score,
            terms = _ref10.terms;
        var phrase = terms.join(' ');

        if (suggestions[phrase] == null) {
          suggestions[phrase] = {
            score: score,
            terms: terms,
            count: 1
          };
        } else {
          suggestions[phrase].score += score;
          suggestions[phrase].count += 1;
        }

        return suggestions;
      }, {});
      return Object.entries(suggestions).map(function (_ref11) {
        var _ref12 = MiniSearch_slicedToArray(_ref11, 2),
            suggestion = _ref12[0],
            _ref12$ = _ref12[1],
            score = _ref12$.score,
            terms = _ref12$.terms,
            count = _ref12$.count;

        return {
          suggestion: suggestion,
          terms: terms,
          score: score / count
        };
      }).sort(function (_ref13, _ref14) {
        var a = _ref13.score;
        var b = _ref14.score;
        return a < b ? 1 : -1;
      });
    }
    /**
    * Number of documents in the index
    *
    * @type {number}
    */

  }, {
    key: "executeQuery",

    /**
    * @private
    * @ignore
    */
    value: function executeQuery(query) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = _objectSpread({}, this._options.searchOptions, {}, options);

      var boosts = (options.fields || this._options.fields).reduce(function (boosts, field) {
        return _objectSpread({}, boosts, MiniSearch_defineProperty({}, field, boosts[field] || 1));
      }, options.boost || {});

      var _options2 = options,
          boostDocument = _options2.boostDocument,
          _options2$weights = _options2.weights,
          _options2$weights$fuz = _options2$weights.fuzzy,
          fuzzyWeight = _options2$weights$fuz === void 0 ? 0.9 : _options2$weights$fuz,
          _options2$weights$pre = _options2$weights.prefix,
          prefixWeight = _options2$weights$pre === void 0 ? 0.75 : _options2$weights$pre;
      var exactMatch = termResults(this, query.term, boosts, boostDocument, this._index.get(query.term));

      if (!query.fuzzy && !query.prefix) {
        return exactMatch;
      }

      var results = [exactMatch];

      if (query.prefix) {
        var i = 0;

        this._index.atPrefix(query.term).forEach(function (term, data) {
          if (++i > 50) return;
          var weightedDistance = 0.3 * (term.length - query.term.length) / term.length;
          results.push(termResults(_this6, term, boosts, boostDocument, data, prefixWeight, weightedDistance));
        });
      }

      if (query.fuzzy) {
        var maxDistance = query.fuzzy < 1 ? Math.round(query.term.length * query.fuzzy) : query.fuzzy;
        Object.entries(this._index.fuzzyGet(query.term, maxDistance)).forEach(function (_ref15) {
          var _ref16 = MiniSearch_slicedToArray(_ref15, 2),
              term = _ref16[0],
              _ref16$ = MiniSearch_slicedToArray(_ref16[1], 2),
              data = _ref16$[0],
              distance = _ref16$[1];

          var weightedDistance = distance / term.length;
          results.push(termResults(_this6, term, boosts, boostDocument, data, fuzzyWeight, weightedDistance));
        });
      }

      return results.reduce(combinators[OR], {});
    }
    /**
    * @private
    * @ignore
    */

  }, {
    key: "combineResults",
    value: function combineResults(results) {
      var combineWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OR;

      if (results.length === 0) {
        return {};
      }

      var operator = combineWith.toLowerCase();
      return results.reduce(combinators[operator], null);
    }
    /**
    * Allows serialization of the index to JSON, to possibly store it and later
    * deserialize it with MiniSearch.loadJSON
    *
    * **Warning:** JSON (de)serialization of the index is currently tightly
    * coupled to the index implementation. For this reason, the current
    * implementation is to be considered a _beta_ feature, subject to breaking
    * changes changes in future releases. If a breaking change is introduced,
    * though, it will be reported in the changelog.
    *
    * @return {Object} the serializeable representation of the search index
    */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        index: this._index,
        documentCount: this._documentCount,
        nextId: this._nextId,
        documentIds: this._documentIds,
        fieldIds: this._fieldIds,
        fieldLength: this._fieldLength,
        averageFieldLength: this._averageFieldLength,
        storedFields: this._storedFields
      };
    }
  }, {
    key: "documentCount",
    get: function get() {
      return this._documentCount;
    }
    /**
    * Deserializes a JSON index (serialized with `miniSearch.toJSON()`) and
    * instantiates a MiniSearch instance. It should be given the same options
    * originally used when serializing the index.
    *
    * **Warning:** JSON (de)serialization of the index is currently tightly
    * coupled to the index implementation. For this reason, the current
    * implementation is to be considered a _beta_ feature, subject to breaking
    * changes changes in future releases. If a breaking change is introduced,
    * though, it will be properly reported in the changelog.
    *
    * @param {string} json - JSON-serialized index
    * @param {Object} options - configuration options, same as the constructor
    * @return {MiniSearch} an instance of MiniSearch
    */

  }], [{
    key: "loadJSON",
    value: function loadJSON(json, options) {
      if (options == null) {
        throw new Error('MiniSearch: loadJSON should be given the same options used when serializing the index');
      }

      return MiniSearch.loadJS(JSON.parse(json), options);
    }
    /**
    * Get the default value of an option. It will throw an error if no option with
    * the given name exists.
    *
    * @param {string} optionName - name of the option
    * @return {*} the default value of the given option
    *
    * @example
    * // Get default tokenizer
    * MiniSearch.getDefault('tokenize')
    *
    * @example
    * // Get default term processor
    * MiniSearch.getDefault('processTerm')
    *
    * @example
    * // Unknown options will throw an error
    * MiniSearch.getDefault('notExisting')
    * // => throws 'MiniSearch: unknown option "notExisting"'
    */

  }, {
    key: "getDefault",
    value: function getDefault(optionName) {
      var validKeys = Object.keys(defaultOptions);

      if (validKeys.includes(optionName)) {
        return defaultOptions[optionName];
      } else {
        throw new Error("MiniSearch: unknown option \"".concat(optionName, "\""));
      }
    }
    /**
    * @private
    */

  }, {
    key: "loadJS",
    value: function loadJS(js) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _js$index = js.index,
          _tree = _js$index._tree,
          _prefix = _js$index._prefix,
          documentCount = js.documentCount,
          nextId = js.nextId,
          documentIds = js.documentIds,
          fieldIds = js.fieldIds,
          fieldLength = js.fieldLength,
          averageFieldLength = js.averageFieldLength,
          storedFields = js.storedFields;
      var miniSearch = new MiniSearch(options);
      miniSearch._index = new src_SearchableMap_SearchableMap(_tree, _prefix);
      miniSearch._documentCount = documentCount;
      miniSearch._nextId = nextId;
      miniSearch._documentIds = documentIds;
      miniSearch._fieldIds = fieldIds;
      miniSearch._fieldLength = fieldLength;
      miniSearch._averageFieldLength = averageFieldLength;
      miniSearch._fieldIds = fieldIds;
      miniSearch._storedFields = storedFields || {};
      return miniSearch;
    }
  }]);

  return MiniSearch;
}();

MiniSearch_MiniSearch.SearchableMap = src_SearchableMap_SearchableMap;

var addTerm = function addTerm(self, fieldId, documentId, term) {
  self._index.update(term, function (indexData) {
    indexData = indexData || {};
    var fieldIndex = indexData[fieldId] || {
      df: 0,
      ds: {}
    };

    if (fieldIndex.ds[documentId] == null) {
      fieldIndex.df += 1;
    }

    fieldIndex.ds[documentId] = (fieldIndex.ds[documentId] || 0) + 1;
    return _objectSpread({}, indexData, MiniSearch_defineProperty({}, fieldId, fieldIndex));
  });
};

var removeTerm = function removeTerm(self, fieldId, documentId, term) {
  if (!self._index.has(term)) {
    warnDocumentChanged(self, documentId, fieldId, term);
    return;
  }

  self._index.update(term, function (indexData) {
    var fieldIndex = indexData[fieldId];

    if (fieldIndex == null || fieldIndex.ds[documentId] == null) {
      warnDocumentChanged(self, documentId, fieldId, term);
      return indexData;
    }

    if (fieldIndex.ds[documentId] <= 1) {
      if (fieldIndex.df <= 1) {
        delete indexData[fieldId];
        return indexData;
      }

      fieldIndex.df -= 1;
    }

    if (fieldIndex.ds[documentId] <= 1) {
      delete fieldIndex.ds[documentId];
      return indexData;
    }

    fieldIndex.ds[documentId] -= 1;
    return _objectSpread({}, indexData, MiniSearch_defineProperty({}, fieldId, fieldIndex));
  });

  if (Object.keys(self._index.get(term)).length === 0) {
    self._index["delete"](term);
  }
};

var warnDocumentChanged = function warnDocumentChanged(self, shortDocumentId, fieldId, term) {
  if (console == null || console.warn == null) {
    return;
  }

  var fieldName = Object.entries(self._fieldIds).find(function (_ref17) {
    var _ref18 = MiniSearch_slicedToArray(_ref17, 2),
        name = _ref18[0],
        id = _ref18[1];

    return id === fieldId;
  })[0];
  console.warn("MiniSearch: document with ID ".concat(self._documentIds[shortDocumentId], " has changed before removal: term \"").concat(term, "\" was not present in field \"").concat(fieldName, "\". Removing a document after it has changed can corrupt the index!"));
};

var addDocumentId = function addDocumentId(self, documentId) {
  var shortDocumentId = self._nextId.toString(36);

  self._documentIds[shortDocumentId] = documentId;
  self._documentCount += 1;
  self._nextId += 1;
  return shortDocumentId;
};

var addFields = function addFields(self, fields) {
  fields.forEach(function (field, i) {
    self._fieldIds[field] = i;
  });
};

var termResults = function termResults(self, term, boosts, boostDocument, indexData) {
  var weight = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var editDistance = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

  if (indexData == null) {
    return {};
  }

  return Object.entries(boosts).reduce(function (results, _ref19) {
    var _ref20 = MiniSearch_slicedToArray(_ref19, 2),
        field = _ref20[0],
        boost = _ref20[1];

    var fieldId = self._fieldIds[field];

    var _ref21 = indexData[fieldId] || {
      ds: {}
    },
        df = _ref21.df,
        ds = _ref21.ds;

    Object.entries(ds).forEach(function (_ref22) {
      var _ref23 = MiniSearch_slicedToArray(_ref22, 2),
          documentId = _ref23[0],
          tf = _ref23[1];

      var docBoost = boostDocument ? boostDocument(self._documentIds[documentId], term) : 1;

      if (!docBoost) {
        return;
      }

      var normalizedLength = self._fieldLength[documentId][fieldId] / self._averageFieldLength[fieldId];
      results[documentId] = results[documentId] || {
        score: 0,
        match: {},
        terms: []
      };
      results[documentId].terms.push(term);
      results[documentId].match[term] = results[documentId].match[term] || [];
      results[documentId].score += docBoost * score(tf, df, self._documentCount, normalizedLength, boost, editDistance);
      results[documentId].match[term].push(field);
    });
    return results;
  }, {});
};

var addFieldLength = function addFieldLength(self, documentId, fieldId, count, length) {
  self._averageFieldLength[fieldId] = self._averageFieldLength[fieldId] || 0;
  var totalLength = self._averageFieldLength[fieldId] * count + length;
  self._fieldLength[documentId] = self._fieldLength[documentId] || {};
  self._fieldLength[documentId][fieldId] = length;
  self._averageFieldLength[fieldId] = totalLength / (count + 1);
};

var saveStoredFields = function saveStoredFields(self, documentId, doc) {
  var _self$_options = self._options,
      storeFields = _self$_options.storeFields,
      extractField = _self$_options.extractField;

  if (storeFields == null || storeFields.length === 0) {
    return;
  }

  self._storedFields[documentId] = self._storedFields[documentId] || {};
  storeFields.forEach(function (fieldName) {
    var fieldValue = extractField(doc, fieldName);

    if (fieldValue === undefined) {
      return;
    }

    self._storedFields[documentId][fieldName] = fieldValue;
  });
};

var combinators = (_combinators = {}, MiniSearch_defineProperty(_combinators, OR, function (a, b) {
  return Object.entries(b).reduce(function (combined, _ref24) {
    var _ref25 = MiniSearch_slicedToArray(_ref24, 2),
        documentId = _ref25[0],
        _ref25$ = _ref25[1],
        score = _ref25$.score,
        match = _ref25$.match,
        terms = _ref25$.terms;

    if (combined[documentId] == null) {
      combined[documentId] = {
        score: score,
        match: match,
        terms: terms
      };
    } else {
      combined[documentId].score += score;
      combined[documentId].score *= 1.5;
      combined[documentId].terms = [].concat(MiniSearch_toConsumableArray(combined[documentId].terms), MiniSearch_toConsumableArray(terms));
      Object.assign(combined[documentId].match, match);
    }

    return combined;
  }, a || {});
}), MiniSearch_defineProperty(_combinators, AND, function (a, b) {
  if (a == null) {
    return b;
  }

  return Object.entries(b).reduce(function (combined, _ref26) {
    var _ref27 = MiniSearch_slicedToArray(_ref26, 2),
        documentId = _ref27[0],
        _ref27$ = _ref27[1],
        score = _ref27$.score,
        match = _ref27$.match,
        terms = _ref27$.terms;

    if (a[documentId] === undefined) {
      return combined;
    }

    combined[documentId] = combined[documentId] || {};
    combined[documentId].score = a[documentId].score + score;
    combined[documentId].match = _objectSpread({}, a[documentId].match, {}, match);
    combined[documentId].terms = [].concat(MiniSearch_toConsumableArray(a[documentId].terms), MiniSearch_toConsumableArray(terms));
    return combined;
  }, {});
}), _combinators);

var tfIdf = function tfIdf(tf, df, n) {
  return tf * Math.log(n / df);
};

var score = function score(termFrequency, documentFrequency, documentCount, normalizedLength, boost, editDistance) {
  var weight = boost / (1 + 0.333 * boost * editDistance);
  return weight * tfIdf(termFrequency, documentFrequency, documentCount) / normalizedLength;
};

var termToQuery = function termToQuery(options) {
  return function (term, i, terms) {
    var fuzzy = typeof options.fuzzy === 'function' ? options.fuzzy(term, i, terms) : options.fuzzy;
    var prefix = typeof options.prefix === 'function' ? options.prefix(term, i, terms) : options.prefix;
    return {
      term: term,
      fuzzy: fuzzy,
      prefix: prefix
    };
  };
};

var uniq = function uniq(array) {
  return array.filter(function (element, i, array) {
    return array.indexOf(element) === i;
  });
};

var isTruthy = function isTruthy(x) {
  return !!x;
};

var defaultOptions = {
  idField: 'id',
  extractField: function extractField(document, fieldName) {
    return document[fieldName];
  },
  tokenize: function tokenize(string, _fieldName) {
    return string.split(SPACE_OR_PUNCTUATION);
  },
  processTerm: function processTerm(term, _fieldName) {
    return term.toLowerCase();
  },
  fields: undefined,
  searchOptions: undefined,
  storeFields: []
};
var defaultSearchOptions = {
  combineWith: OR,
  prefix: false,
  fuzzy: false,
  weights: {}
};
var defaultAutoSuggestOptions = {
  prefix: function prefix(term, i, terms) {
    return i === terms.length - 1;
  } // This regular expression matches any Unicode space or punctuation character
  // Adapted from https://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BZ%7D%5Cp%7BP%7D&abb=on&c=on&esc=on

};
var SPACE_OR_PUNCTUATION = /[\n\r -#%-\*,-\/:;\?@\[-\]_\{\}\xA0\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/;
/* harmony default export */ var src_MiniSearch = (MiniSearch_MiniSearch);
// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (src_MiniSearch);

/***/ })
/******/ ])["default"];
});