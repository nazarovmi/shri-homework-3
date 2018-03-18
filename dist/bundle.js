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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(32);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(92);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var SRC = __webpack_require__(32)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(47);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(92);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(82);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(33);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(59);
  var $buffer = __webpack_require__(88);
  var ctx = __webpack_require__(18);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(31);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(118);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(11);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(79);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(81);
  var uid = __webpack_require__(32);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(50);
  var speciesConstructor = __webpack_require__(57);
  var ArrayIterators = __webpack_require__(84);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(54);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(83);
  var arrayCopyWithin = __webpack_require__(108);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(113);
var $export = __webpack_require__(0);
var shared = __webpack_require__(49)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(116))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(94);
var enumBugKeys = __webpack_require__(66);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(95);
var enumBugKeys = __webpack_require__(66);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(63)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(67).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(94);
var hiddenKeys = __webpack_require__(66).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(79);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(81);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(69);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(54);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(70);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(32);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(33) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(93);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(18)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(68).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(76);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(53);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(31);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(223);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(30);
var step = __webpack_require__(109);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(75)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(99);
var html = __webpack_require__(67);
var cel = __webpack_require__(63);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(85).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(33);
var $typed = __webpack_require__(59);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(118);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(83);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(126);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas2D = function (_Canvas) {
	_inherits(Canvas2D, _Canvas);

	function Canvas2D(width, height) {
		_classCallCheck(this, Canvas2D);

		var _this = _possibleConstructorReturn(this, (Canvas2D.__proto__ || Object.getPrototypeOf(Canvas2D)).call(this, width, height));

		_this._ctx = _this._el.getContext('2d');
		return _this;
	}

	_createClass(Canvas2D, [{
		key: 'ctx',
		get: function get() {
			return this._ctx;
		}
	}]);

	return Canvas2D;
}(_canvas2.default);

exports.default = Canvas2D;

/***/ }),
/* 91 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(63)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(50)(false);
var IE_PROTO = __webpack_require__(65)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(99);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 99 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(69);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(69) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 104 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(72);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(55)
});


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(87);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(114);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(58)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(18);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(75);
var step = __webpack_require__(109);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(114);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(58)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(29);
var assign = __webpack_require__(97);
var weak = __webpack_require__(117);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(58)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(11);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(51);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(52);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(18);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(71);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(47).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(124);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
	function Canvas(width, height) {
		_classCallCheck(this, Canvas);

		this._el = document.createElement('canvas');
		this._parent = null;
		this._width = null;
		this._height = null;
		this._ctx = null;

		this.resize(width, height);
	}

	_createClass(Canvas, [{
		key: 'resize',
		value: function resize(width, height) {
			var el = this._el;

			el.setAttribute('width', width);
			el.setAttribute('height', height);

			this._width = width;
			this._height = height;
		}
	}, {
		key: 'mount',
		value: function mount(parent) {
			if (this._parent) {
				this._parent.removeChild(this._el);
			}

			parent.appendChild(this._el);

			this._parent = parent;
		}
	}, {
		key: 'el',
		get: function get() {
			return this._el;
		}
	}, {
		key: 'parent',
		get: function get() {
			return this._parent;
		}
	}, {
		key: 'width',
		get: function get() {
			return this._width;
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height;
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 127 */
/***/ (function(module, exports) {

/**
 * tracking - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.1.2
 * @link http://trackingjs.com
 * @license BSD
 */
!function(t,r){t.tracking=t.tracking||{},tracking.inherits=function(t,r){function n(){}n.prototype=r.prototype,t.superClass_=r.prototype,t.prototype=new n,t.prototype.constructor=t,t.base=function(t,n){var e=Array.prototype.slice.call(arguments,2);return r.prototype[n].apply(t,e)}},tracking.initUserMedia_=function(r,n){t.navigator.getUserMedia({video:!0,audio:!(!n||!n.audio)},function(n){try{r.src=t.URL.createObjectURL(n)}catch(e){r.src=n}},function(){throw Error("Cannot capture user camera.")})},tracking.isNode=function(t){return t.nodeType||this.isWindow(t)},tracking.isWindow=function(t){return!!(t&&t.alert&&t.document)},tracking.one=function(t,r){return this.isNode(t)?t:(r||document).querySelector(t)},tracking.track=function(t,r,n){if(t=tracking.one(t),!t)throw new Error("Element not found, try a different element or selector.");if(!r)throw new Error("Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.");switch(t.nodeName.toLowerCase()){case"canvas":return this.trackCanvas_(t,r,n);case"img":return this.trackImg_(t,r,n);case"video":return n&&n.camera&&this.initUserMedia_(t,n),this.trackVideo_(t,r,n);default:throw new Error("Element not supported, try in a canvas, img, or video.")}},tracking.trackCanvas_=function(t,r){var n=this,e=new tracking.TrackerTask(r);return e.on("run",function(){n.trackCanvasInternal_(t,r)}),e.run()},tracking.trackCanvasInternal_=function(t,r){var n=t.width,e=t.height,i=t.getContext("2d"),a=i.getImageData(0,0,n,e);r.track(a.data,n,e)},tracking.trackImg_=function(t,r){var n=t.width,e=t.height,i=document.createElement("canvas");i.width=n,i.height=e;var a=new tracking.TrackerTask(r);return a.on("run",function(){tracking.Canvas.loadImage(i,t.src,0,0,n,e,function(){tracking.trackCanvasInternal_(i,r)})}),a.run()},tracking.trackVideo_=function(r,n){var e,i,a=document.createElement("canvas"),o=a.getContext("2d"),c=function(){e=r.offsetWidth,i=r.offsetHeight,a.width=e,a.height=i};c(),r.addEventListener("resize",c);var s,g=function(){s=t.requestAnimationFrame(function(){if(r.readyState===r.HAVE_ENOUGH_DATA){try{o.drawImage(r,0,0,e,i)}catch(t){}tracking.trackCanvasInternal_(a,n)}g()})},h=new tracking.TrackerTask(n);return h.on("stop",function(){t.cancelAnimationFrame(s)}),h.on("run",function(){g()}),h.run()},t.URL||(t.URL=t.URL||t.webkitURL||t.msURL||t.oURL),navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)}(window),function(){tracking.EventEmitter=function(){},tracking.EventEmitter.prototype.events_=null,tracking.EventEmitter.prototype.addListener=function(t,r){if("function"!=typeof r)throw new TypeError("Listener must be a function");return this.events_||(this.events_={}),this.emit("newListener",t,r),this.events_[t]||(this.events_[t]=[]),this.events_[t].push(r),this},tracking.EventEmitter.prototype.listeners=function(t){return this.events_&&this.events_[t]},tracking.EventEmitter.prototype.emit=function(t){var r=this.listeners(t);if(r){for(var n=Array.prototype.slice.call(arguments,1),e=0;e<r.length;e++)r[e]&&r[e].apply(this,n);return!0}return!1},tracking.EventEmitter.prototype.on=tracking.EventEmitter.prototype.addListener,tracking.EventEmitter.prototype.once=function(t,r){var n=this;n.on(t,function e(){n.removeListener(t,e),r.apply(this,arguments)})},tracking.EventEmitter.prototype.removeAllListeners=function(t){return this.events_?(t?delete this.events_[t]:delete this.events_,this):this},tracking.EventEmitter.prototype.removeListener=function(t,r){if("function"!=typeof r)throw new TypeError("Listener must be a function");if(!this.events_)return this;var n=this.listeners(t);if(Array.isArray(n)){var e=n.indexOf(r);if(0>e)return this;n.splice(e,1)}return this},tracking.EventEmitter.prototype.setMaxListeners=function(){throw new Error("Not implemented")}}(),function(){tracking.Canvas={},tracking.Canvas.loadImage=function(t,r,n,e,i,a,o){var c=this,s=new window.Image;s.crossOrigin="*",s.onload=function(){var r=t.getContext("2d");t.width=i,t.height=a,r.drawImage(s,n,e,i,a),o&&o.call(c),s=null},s.src=r}}(),function(){tracking.DisjointSet=function(t){if(void 0===t)throw new Error("DisjointSet length not specified.");this.length=t,this.parent=new Uint32Array(t);for(var r=0;t>r;r++)this.parent[r]=r},tracking.DisjointSet.prototype.length=null,tracking.DisjointSet.prototype.parent=null,tracking.DisjointSet.prototype.find=function(t){return this.parent[t]===t?t:this.parent[t]=this.find(this.parent[t])},tracking.DisjointSet.prototype.union=function(t,r){var n=this.find(t),e=this.find(r);this.parent[n]=e}}(),function(){tracking.Image={},tracking.Image.blur=function(t,r,n,e){if(e=Math.abs(e),1>=e)throw new Error("Diameter should be greater than 1.");for(var i=e/2,a=Math.ceil(e)+(1-Math.ceil(e)%2),o=new Float32Array(a),c=(i+.5)/3,s=c*c,g=1/Math.sqrt(2*Math.PI*s),h=-1/(2*c*c),k=0,u=Math.floor(a/2),f=0;a>f;f++){var l=f-u,p=g*Math.exp(l*l*h);o[f]=p,k+=p}for(var v=0;v<o.length;v++)o[v]/=k;return this.separableConvolve(t,r,n,o,o,!1)},tracking.Image.computeIntegralImage=function(t,r,n,e,i,a,o){if(arguments.length<4)throw new Error("You should specify at least one output array in the order: sum, square, tilted, sobel.");var c;o&&(c=tracking.Image.sobel(t,r,n));for(var s=0;n>s;s++)for(var g=0;r>g;g++){var h=s*r*4+4*g,k=~~(.299*t[h]+.587*t[h+1]+.114*t[h+2]);if(e&&this.computePixelValueSAT_(e,r,s,g,k),i&&this.computePixelValueSAT_(i,r,s,g,k*k),a){var u=h-4*r,f=~~(.299*t[u]+.587*t[u+1]+.114*t[u+2]);this.computePixelValueRSAT_(a,r,s,g,k,f||0)}o&&this.computePixelValueSAT_(o,r,s,g,c[h])}},tracking.Image.computePixelValueRSAT_=function(t,r,n,e,i,a){var o=n*r+e;t[o]=(t[o-r-1]||0)+(t[o-r+1]||0)-(t[o-r-r]||0)+i+a},tracking.Image.computePixelValueSAT_=function(t,r,n,e,i){var a=n*r+e;t[a]=(t[a-r]||0)+(t[a-1]||0)+i-(t[a-r-1]||0)},tracking.Image.grayscale=function(t,r,n,e){for(var i=new Uint8ClampedArray(e?t.length:t.length>>2),a=0,o=0,c=0;n>c;c++)for(var s=0;r>s;s++){var g=.299*t[o]+.587*t[o+1]+.114*t[o+2];i[a++]=g,e&&(i[a++]=g,i[a++]=g,i[a++]=t[o+3]),o+=4}return i},tracking.Image.horizontalConvolve=function(t,r,n,e,i){for(var a=e.length,o=Math.floor(a/2),c=new Float32Array(r*n*4),s=i?1:0,g=0;n>g;g++)for(var h=0;r>h;h++){for(var k=g,u=h,f=4*(g*r+h),l=0,p=0,v=0,m=0,y=0;a>y;y++){var d=k,w=Math.min(r-1,Math.max(0,u+y-o)),T=4*(d*r+w),C=e[y];l+=t[T]*C,p+=t[T+1]*C,v+=t[T+2]*C,m+=t[T+3]*C}c[f]=l,c[f+1]=p,c[f+2]=v,c[f+3]=m+s*(255-m)}return c},tracking.Image.verticalConvolve=function(t,r,n,e,i){for(var a=e.length,o=Math.floor(a/2),c=new Float32Array(r*n*4),s=i?1:0,g=0;n>g;g++)for(var h=0;r>h;h++){for(var k=g,u=h,f=4*(g*r+h),l=0,p=0,v=0,m=0,y=0;a>y;y++){var d=Math.min(n-1,Math.max(0,k+y-o)),w=u,T=4*(d*r+w),C=e[y];l+=t[T]*C,p+=t[T+1]*C,v+=t[T+2]*C,m+=t[T+3]*C}c[f]=l,c[f+1]=p,c[f+2]=v,c[f+3]=m+s*(255-m)}return c},tracking.Image.separableConvolve=function(t,r,n,e,i,a){var o=this.verticalConvolve(t,r,n,i,a);return this.horizontalConvolve(o,r,n,e,a)},tracking.Image.sobel=function(t,r,n){t=this.grayscale(t,r,n,!0);for(var e=new Float32Array(r*n*4),i=new Float32Array([-1,0,1]),a=new Float32Array([1,2,1]),o=this.separableConvolve(t,r,n,i,a),c=this.separableConvolve(t,r,n,a,i),s=0;s<e.length;s+=4){var g=o[s],h=c[s],k=Math.sqrt(h*h+g*g);e[s]=k,e[s+1]=k,e[s+2]=k,e[s+3]=255}return e}}(),function(){tracking.ViolaJones={},tracking.ViolaJones.REGIONS_OVERLAP=.5,tracking.ViolaJones.classifiers={},tracking.ViolaJones.detect=function(t,r,n,e,i,a,o,c){var s,g=0,h=[],k=new Int32Array(r*n),u=new Int32Array(r*n),f=new Int32Array(r*n);o>0&&(s=new Int32Array(r*n)),tracking.Image.computeIntegralImage(t,r,n,k,u,f,s);for(var l=c[0],p=c[1],v=e*i,m=v*l|0,y=v*p|0;r>m&&n>y;){for(var d=v*a+.5|0,w=0;n-y>w;w+=d)for(var T=0;r-m>T;T+=d)o>0&&this.isTriviallyExcluded(o,s,w,T,r,m,y)||this.evalStages_(c,k,u,f,w,T,r,m,y,v)&&(h[g++]={width:m,height:y,x:T,y:w});v*=i,m=v*l|0,y=v*p|0}return this.mergeRectangles_(h)},tracking.ViolaJones.isTriviallyExcluded=function(t,r,n,e,i,a,o){var c=n*i+e,s=c+a,g=c+o*i,h=g+a,k=(r[c]-r[s]-r[g]+r[h])/(a*o*255);return t>k?!0:!1},tracking.ViolaJones.evalStages_=function(t,r,n,e,i,a,o,c,s,g){var h=1/(c*s),k=i*o+a,u=k+c,f=k+s*o,l=f+c,p=(r[k]-r[u]-r[f]+r[l])*h,v=(n[k]-n[u]-n[f]+n[l])*h-p*p,m=1;v>0&&(m=Math.sqrt(v));for(var y=t.length,d=2;y>d;){for(var w=0,T=t[d++],C=t[d++];C--;){for(var _=0,E=t[d++],M=t[d++],x=0;M>x;x++){var I,b,O,A,S=a+t[d++]*g+.5|0,D=i+t[d++]*g+.5|0,R=t[d++]*g+.5|0,j=t[d++]*g+.5|0,F=t[d++];E?(I=S-j+R+(D+R+j-1)*o,b=S+(D-1)*o,O=S-j+(D+j-1)*o,A=S+R+(D+R-1)*o,_+=(e[I]+e[b]-e[O]-e[A])*F):(I=D*o+S,b=I+R,O=I+j*o,A=O+R,_+=(r[I]-r[b]-r[O]+r[A])*F)}var L=t[d++],V=t[d++],U=t[d++];w+=L*m>_*h?V:U}if(T>w)return!1}return!0},tracking.ViolaJones.mergeRectangles_=function(t){for(var r=new tracking.DisjointSet(t.length),n=0;n<t.length;n++)for(var e=t[n],i=0;i<t.length;i++){var a=t[i];if(tracking.Math.intersectRect(e.x,e.y,e.x+e.width,e.y+e.height,a.x,a.y,a.x+a.width,a.y+a.height)){var o=Math.max(e.x,a.x),c=Math.max(e.y,a.y),s=Math.min(e.x+e.width,a.x+a.width),g=Math.min(e.y+e.height,a.y+a.height),h=(o-s)*(c-g),k=e.width*e.height,u=a.width*a.height;h/(k*(k/u))>=this.REGIONS_OVERLAP&&h/(u*(k/u))>=this.REGIONS_OVERLAP&&r.union(n,i)}}for(var f={},l=0;l<r.length;l++){var p=r.find(l);f[p]?(f[p].total++,f[p].width+=t[l].width,f[p].height+=t[l].height,f[p].x+=t[l].x,f[p].y+=t[l].y):f[p]={total:1,width:t[l].width,height:t[l].height,x:t[l].x,y:t[l].y}}var v=[];return Object.keys(f).forEach(function(t){var r=f[t];v.push({total:r.total,width:r.width/r.total+.5|0,height:r.height/r.total+.5|0,x:r.x/r.total+.5|0,y:r.y/r.total+.5|0})}),v}}(),function(){tracking.Brief={},tracking.Brief.N=512,tracking.Brief.randomImageOffsets_={},tracking.Brief.randomWindowOffsets_=null,tracking.Brief.getDescriptors=function(t,r,n){for(var e=new Int32Array((n.length>>1)*(this.N>>5)),i=0,a=this.getRandomOffsets_(r),o=0,c=0;c<n.length;c+=2)for(var s=r*n[c+1]+n[c],g=0,h=0,k=this.N;k>h;h++)t[a[g++]+s]<t[a[g++]+s]&&(i|=1<<(31&h)),h+1&31||(e[o++]=i,i=0);return e},tracking.Brief.match=function(t,r,n,e){for(var i=t.length>>1,a=n.length>>1,o=new Array(i),c=0;i>c;c++){for(var s=1/0,g=0,h=0;a>h;h++){for(var k=0,u=0,f=this.N>>5;f>u;u++)k+=tracking.Math.hammingWeight(r[c*f+u]^e[h*f+u]);s>k&&(s=k,g=h)}o[c]={index1:c,index2:g,keypoint1:[t[2*c],t[2*c+1]],keypoint2:[n[2*g],n[2*g+1]],confidence:1-s/this.N}}return o},tracking.Brief.reciprocalMatch=function(t,r,n,e){var i=[];if(0===t.length||0===n.length)return i;for(var a=tracking.Brief.match(t,r,n,e),o=tracking.Brief.match(n,e,t,r),c=0;c<a.length;c++)o[a[c].index2].index2===c&&i.push(a[c]);return i},tracking.Brief.getRandomOffsets_=function(t){if(!this.randomWindowOffsets_){for(var r=0,n=new Int32Array(4*this.N),e=0;e<this.N;e++)n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16));this.randomWindowOffsets_=n}if(!this.randomImageOffsets_[t]){for(var i=0,a=new Int32Array(2*this.N),o=0;o<this.N;o++)a[i++]=this.randomWindowOffsets_[4*o]*t+this.randomWindowOffsets_[4*o+1],a[i++]=this.randomWindowOffsets_[4*o+2]*t+this.randomWindowOffsets_[4*o+3];this.randomImageOffsets_[t]=a}return this.randomImageOffsets_[t]}}(),function(){tracking.Fast={},tracking.Fast.THRESHOLD=40,tracking.Fast.circles_={},tracking.Fast.findCorners=function(t,r,n,e){var i=this.getCircleOffsets_(r),a=new Int32Array(16),o=[];void 0===e&&(e=this.THRESHOLD);for(var c=3;n-3>c;c++)for(var s=3;r-3>s;s++){for(var g=c*r+s,h=t[g],k=0;16>k;k++)a[k]=t[g+i[k]];this.isCorner(h,a,e)&&(o.push(s,c),s+=3)}return o},tracking.Fast.isBrighter=function(t,r,n){return t-r>n},tracking.Fast.isCorner=function(t,r,n){if(this.isTriviallyExcluded(r,t,n))return!1;for(var e=0;16>e;e++){for(var i=!0,a=!0,o=0;9>o;o++){var c=r[e+o&15];if(!this.isBrighter(t,c,n)&&(a=!1,i===!1))break;if(!this.isDarker(t,c,n)&&(i=!1,a===!1))break}if(a||i)return!0}return!1},tracking.Fast.isDarker=function(t,r,n){return r-t>n},tracking.Fast.isTriviallyExcluded=function(t,r,n){var e=0,i=t[8],a=t[12],o=t[4],c=t[0];return this.isBrighter(c,r,n)&&e++,this.isBrighter(o,r,n)&&e++,this.isBrighter(i,r,n)&&e++,this.isBrighter(a,r,n)&&e++,3>e&&(e=0,this.isDarker(c,r,n)&&e++,this.isDarker(o,r,n)&&e++,this.isDarker(i,r,n)&&e++,this.isDarker(a,r,n)&&e++,3>e)?!0:!1},tracking.Fast.getCircleOffsets_=function(t){if(this.circles_[t])return this.circles_[t];var r=new Int32Array(16);return r[0]=-t-t-t,r[1]=r[0]+1,r[2]=r[1]+t+1,r[3]=r[2]+t+1,r[4]=r[3]+t,r[5]=r[4]+t,r[6]=r[5]+t-1,r[7]=r[6]+t-1,r[8]=r[7]-1,r[9]=r[8]-1,r[10]=r[9]-t-1,r[11]=r[10]-t-1,r[12]=r[11]-t,r[13]=r[12]-t,r[14]=r[13]-t+1,r[15]=r[14]-t+1,this.circles_[t]=r,r}}(),function(){tracking.Math={},tracking.Math.distance=function(t,r,n,e){var i=n-t,a=e-r;return Math.sqrt(i*i+a*a)},tracking.Math.hammingWeight=function(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),16843009*(t+(t>>4)&252645135)>>24},tracking.Math.uniformRandom=function(t,r){return t+Math.random()*(r-t)},tracking.Math.intersectRect=function(t,r,n,e,i,a,o,c){return!(i>n||t>o||a>e||r>c)}}(),function(){tracking.Matrix={},tracking.Matrix.forEach=function(t,r,n,e,i){i=i||1;for(var a=0;n>a;a+=i)for(var o=0;r>o;o+=i){var c=a*r*4+4*o;e.call(this,t[c],t[c+1],t[c+2],t[c+3],c,a,o)}}}(),function(){tracking.EPnP={},tracking.EPnP.solve=function(t,r,n){}}(),function(){tracking.Tracker=function(){tracking.Tracker.base(this,"constructor")},tracking.inherits(tracking.Tracker,tracking.EventEmitter),tracking.Tracker.prototype.track=function(){}}(),function(){tracking.TrackerTask=function(t){if(tracking.TrackerTask.base(this,"constructor"),!t)throw new Error("Tracker instance not specified.");this.setTracker(t)},tracking.inherits(tracking.TrackerTask,tracking.EventEmitter),tracking.TrackerTask.prototype.tracker_=null,tracking.TrackerTask.prototype.running_=!1,tracking.TrackerTask.prototype.getTracker=function(){return this.tracker_},tracking.TrackerTask.prototype.inRunning=function(){return this.running_},tracking.TrackerTask.prototype.setRunning=function(t){this.running_=t},tracking.TrackerTask.prototype.setTracker=function(t){this.tracker_=t},tracking.TrackerTask.prototype.run=function(){var t=this;if(!this.inRunning())return this.setRunning(!0),this.reemitTrackEvent_=function(r){t.emit("track",r)},this.tracker_.on("track",this.reemitTrackEvent_),this.emit("run"),this},tracking.TrackerTask.prototype.stop=function(){return this.inRunning()?(this.setRunning(!1),this.emit("stop"),this.tracker_.removeListener("track",this.reemitTrackEvent_),this):void 0}}(),function(){tracking.ColorTracker=function(t){tracking.ColorTracker.base(this,"constructor"),"string"==typeof t&&(t=[t]),t&&(t.forEach(function(t){if(!tracking.ColorTracker.getColor(t))throw new Error('Color not valid, try `new tracking.ColorTracker("magenta")`.')}),this.setColors(t))},tracking.inherits(tracking.ColorTracker,tracking.Tracker),tracking.ColorTracker.knownColors_={},tracking.ColorTracker.neighbours_={},tracking.ColorTracker.registerColor=function(t,r){tracking.ColorTracker.knownColors_[t]=r},tracking.ColorTracker.getColor=function(t){return tracking.ColorTracker.knownColors_[t]},tracking.ColorTracker.prototype.colors=["magenta"],tracking.ColorTracker.prototype.minDimension=20,tracking.ColorTracker.prototype.maxDimension=1/0,tracking.ColorTracker.prototype.minGroupSize=30,tracking.ColorTracker.prototype.calculateDimensions_=function(t,r){for(var n=-1,e=-1,i=1/0,a=1/0,o=0;r>o;o+=2){var c=t[o],s=t[o+1];i>c&&(i=c),c>n&&(n=c),a>s&&(a=s),s>e&&(e=s)}return{width:n-i,height:e-a,x:i,y:a}},tracking.ColorTracker.prototype.getColors=function(){return this.colors},tracking.ColorTracker.prototype.getMinDimension=function(){return this.minDimension},tracking.ColorTracker.prototype.getMaxDimension=function(){return this.maxDimension},tracking.ColorTracker.prototype.getMinGroupSize=function(){return this.minGroupSize},tracking.ColorTracker.prototype.getNeighboursForWidth_=function(t){if(tracking.ColorTracker.neighbours_[t])return tracking.ColorTracker.neighbours_[t];var r=new Int32Array(8);return r[0]=4*-t,r[1]=4*-t+4,r[2]=4,r[3]=4*t+4,r[4]=4*t,r[5]=4*t-4,r[6]=-4,r[7]=4*-t-4,tracking.ColorTracker.neighbours_[t]=r,r},tracking.ColorTracker.prototype.mergeRectangles_=function(t){for(var r,n=[],e=this.getMinDimension(),i=this.getMaxDimension(),a=0;a<t.length;a++){var o=t[a];r=!0;for(var c=a+1;c<t.length;c++){var s=t[c];if(tracking.Math.intersectRect(o.x,o.y,o.x+o.width,o.y+o.height,s.x,s.y,s.x+s.width,s.y+s.height)){r=!1;var g=Math.min(o.x,s.x),h=Math.min(o.y,s.y),k=Math.max(o.x+o.width,s.x+s.width),u=Math.max(o.y+o.height,s.y+s.height);s.height=u-h,s.width=k-g,s.x=g,s.y=h;break}}r&&o.width>=e&&o.height>=e&&o.width<=i&&o.height<=i&&n.push(o)}return n},tracking.ColorTracker.prototype.setColors=function(t){this.colors=t},tracking.ColorTracker.prototype.setMinDimension=function(t){this.minDimension=t},tracking.ColorTracker.prototype.setMaxDimension=function(t){this.maxDimension=t},tracking.ColorTracker.prototype.setMinGroupSize=function(t){this.minGroupSize=t},tracking.ColorTracker.prototype.track=function(t,r,n){var e=this,i=this.getColors();if(!i)throw new Error('Colors not specified, try `new tracking.ColorTracker("magenta")`.');var a=[];i.forEach(function(i){a=a.concat(e.trackColor_(t,r,n,i))}),this.emit("track",{data:a})},tracking.ColorTracker.prototype.trackColor_=function(n,e,i,a){var o,c,s,g,h,k=tracking.ColorTracker.knownColors_[a],u=new Int32Array(n.length>>2),f=new Int8Array(n.length),l=this.getMinGroupSize(),p=this.getNeighboursForWidth_(e),v=new Int32Array(n.length),m=[],y=-4;if(!k)return m;for(var d=0;i>d;d++)for(var w=0;e>w;w++)if(y+=4,!f[y]){for(o=0,h=-1,v[++h]=y,v[++h]=d,v[++h]=w,f[y]=1;h>=0;)if(s=v[h--],c=v[h--],g=v[h--],k(n[g],n[g+1],n[g+2],n[g+3],g,c,s)){u[o++]=s,u[o++]=c;for(var T=0;T<p.length;T++){var C=g+p[T],_=c+t[T],E=s+r[T];!f[C]&&_>=0&&i>_&&E>=0&&e>E&&(v[++h]=C,v[++h]=_,v[++h]=E,f[C]=1)}}if(o>=l){var M=this.calculateDimensions_(u,o);M&&(M.color=a,m.push(M))}}return this.mergeRectangles_(m)},tracking.ColorTracker.registerColor("cyan",function(t,r,n){var e=50,i=70,a=t-0,o=r-255,c=n-255;return r-t>=e&&n-t>=i?!0:6400>a*a+o*o+c*c}),tracking.ColorTracker.registerColor("magenta",function(t,r,n){var e=50,i=t-255,a=r-0,o=n-255;return t-r>=e&&n-r>=e?!0:19600>i*i+a*a+o*o}),tracking.ColorTracker.registerColor("yellow",function(t,r,n){var e=50,i=t-255,a=r-255,o=n-0;return t-n>=e&&r-n>=e?!0:1e4>i*i+a*a+o*o});var t=new Int32Array([-1,-1,0,1,1,1,0,-1]),r=new Int32Array([0,1,1,1,0,-1,-1,-1])}(),function(){tracking.ObjectTracker=function(t){tracking.ObjectTracker.base(this,"constructor"),t&&(Array.isArray(t)||(t=[t]),Array.isArray(t)&&t.forEach(function(r,n){if("string"==typeof r&&(t[n]=tracking.ViolaJones.classifiers[r]),!t[n])throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.')})),this.setClassifiers(t)},tracking.inherits(tracking.ObjectTracker,tracking.Tracker),tracking.ObjectTracker.prototype.edgesDensity=.2,tracking.ObjectTracker.prototype.initialScale=1,tracking.ObjectTracker.prototype.scaleFactor=1.25,tracking.ObjectTracker.prototype.stepSize=1.5,tracking.ObjectTracker.prototype.getClassifiers=function(){return this.classifiers},tracking.ObjectTracker.prototype.getEdgesDensity=function(){return this.edgesDensity},tracking.ObjectTracker.prototype.getInitialScale=function(){return this.initialScale},tracking.ObjectTracker.prototype.getScaleFactor=function(){return this.scaleFactor},tracking.ObjectTracker.prototype.getStepSize=function(){return this.stepSize},tracking.ObjectTracker.prototype.track=function(t,r,n){var e=this,i=this.getClassifiers();if(!i)throw new Error('Object classifier not specified, try `new tracking.ObjectTracker("face")`.');var a=[];i.forEach(function(i){a=a.concat(tracking.ViolaJones.detect(t,r,n,e.getInitialScale(),e.getScaleFactor(),e.getStepSize(),e.getEdgesDensity(),i))}),this.emit("track",{data:a})},tracking.ObjectTracker.prototype.setClassifiers=function(t){this.classifiers=t},tracking.ObjectTracker.prototype.setEdgesDensity=function(t){this.edgesDensity=t},tracking.ObjectTracker.prototype.setInitialScale=function(t){this.initialScale=t},tracking.ObjectTracker.prototype.setScaleFactor=function(t){this.scaleFactor=t},tracking.ObjectTracker.prototype.setStepSize=function(t){this.stepSize=t}}();

/***/ }),
/* 128 */
/***/ (function(module, exports) {

/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
tracking.ViolaJones.classifiers.face=new Float64Array([20,20,.822689414024353,3,0,2,3,7,14,4,-1,3,9,14,2,2,.004014195874333382,.0337941907346249,.8378106951713562,0,2,1,2,18,4,-1,7,2,6,4,3,.0151513395830989,.1514132022857666,.7488812208175659,0,2,1,7,15,9,-1,1,10,15,3,3,.004210993181914091,.0900492817163467,.6374819874763489,6.956608772277832,16,0,2,5,6,2,6,-1,5,9,2,3,2,.0016227109590545297,.0693085864186287,.7110946178436279,0,2,7,5,6,3,-1,9,5,2,3,3,.002290664939209819,.1795803010463715,.6668692231178284,0,2,4,0,12,9,-1,4,3,12,3,3,.005002570804208517,.1693672984838486,.6554006934165955,0,2,6,9,10,8,-1,6,13,10,4,2,.007965989410877228,.5866332054138184,.0914145186543465,0,2,3,6,14,8,-1,3,10,14,4,2,-.003522701095789671,.1413166970014572,.6031895875930786,0,2,14,1,6,10,-1,14,1,3,10,2,.0366676896810532,.3675672113895416,.7920318245887756,0,2,7,8,5,12,-1,7,12,5,4,3,.009336147457361221,.6161385774612427,.2088509947061539,0,2,1,1,18,3,-1,7,1,6,3,3,.008696131408214569,.2836230993270874,.6360273957252502,0,2,1,8,17,2,-1,1,9,17,1,2,.0011488880263641477,.2223580926656723,.5800700783729553,0,2,16,6,4,2,-1,16,7,4,1,2,-.002148468978703022,.2406464070081711,.5787054896354675,0,2,5,17,2,2,-1,5,18,2,1,2,.002121906029060483,.5559654831886292,.136223703622818,0,2,14,2,6,12,-1,14,2,3,12,2,-.0939491465687752,.8502737283706665,.4717740118503571,0,3,4,0,4,12,-1,4,0,2,6,2,6,6,2,6,2,.0013777789426967502,.5993673801422119,.2834529876708984,0,2,2,11,18,8,-1,8,11,6,8,3,.0730631574988365,.4341886043548584,.7060034275054932,0,2,5,7,10,2,-1,5,8,10,1,2,.00036767389974556863,.3027887940406799,.6051574945449829,0,2,15,11,5,3,-1,15,12,5,1,3,-.0060479710809886456,.17984339594841,.5675256848335266,9.498542785644531,21,0,2,5,3,10,9,-1,5,6,10,3,3,-.0165106896311045,.6644225120544434,.1424857974052429,0,2,9,4,2,14,-1,9,11,2,7,2,.002705249935388565,.6325352191925049,.1288477033376694,0,2,3,5,4,12,-1,3,9,4,4,3,.002806986914947629,.1240288019180298,.6193193197250366,0,2,4,5,12,5,-1,8,5,4,5,3,-.0015402400167658925,.1432143002748489,.5670015811920166,0,2,5,6,10,8,-1,5,10,10,4,2,-.0005638627917505801,.1657433062791824,.5905207991600037,0,2,8,0,6,9,-1,8,3,6,3,3,.0019253729842603207,.2695507109165192,.5738824009895325,0,2,9,12,1,8,-1,9,16,1,4,2,-.005021484103053808,.1893538981676102,.5782774090766907,0,2,0,7,20,6,-1,0,9,20,2,3,.0026365420781075954,.2309329062700272,.5695425868034363,0,2,7,0,6,17,-1,9,0,2,17,3,-.0015127769438549876,.2759602069854736,.5956642031669617,0,2,9,0,6,4,-1,11,0,2,4,3,-.0101574398577213,.1732538044452667,.5522047281265259,0,2,5,1,6,4,-1,7,1,2,4,3,-.011953660286963,.1339409947395325,.5559014081954956,0,2,12,1,6,16,-1,14,1,2,16,3,.004885949194431305,.3628703951835632,.6188849210739136,0,3,0,5,18,8,-1,0,5,9,4,2,9,9,9,4,2,-.0801329165697098,.0912110507488251,.5475944876670837,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.0010643280111253262,.3715142905712128,.5711399912834167,0,3,3,1,4,8,-1,3,1,2,4,2,5,5,2,4,2,-.0013419450260698795,.5953313708305359,.331809788942337,0,3,3,6,14,10,-1,10,6,7,5,2,3,11,7,5,2,-.0546011403203011,.1844065934419632,.5602846145629883,0,2,2,1,6,16,-1,4,1,2,16,3,.0029071690514683723,.3594244122505188,.6131715178489685,0,2,0,18,20,2,-1,0,19,20,1,2,.0007471871795132756,.5994353294372559,.3459562957286835,0,2,8,13,4,3,-1,8,14,4,1,3,.004301380831748247,.4172652065753937,.6990845203399658,0,2,9,14,2,3,-1,9,15,2,1,3,.004501757211983204,.4509715139865875,.7801457047462463,0,2,0,12,9,6,-1,0,14,9,2,3,.0241385009139776,.5438212752342224,.1319826990365982,18.4129695892334,39,0,2,5,7,3,4,-1,5,9,3,2,2,.001921223010867834,.1415266990661621,.6199870705604553,0,2,9,3,2,16,-1,9,11,2,8,2,-.00012748669541906565,.6191074252128601,.1884928941726685,0,2,3,6,13,8,-1,3,10,13,4,2,.0005140993162058294,.1487396955490112,.5857927799224854,0,2,12,3,8,2,-1,12,3,4,2,2,.004187860991805792,.2746909856796265,.6359239816665649,0,2,8,8,4,12,-1,8,12,4,4,3,.005101571790874004,.5870851278305054,.2175628989934921,0,3,11,3,8,6,-1,15,3,4,3,2,11,6,4,3,2,-.002144844038411975,.5880944728851318,.2979590892791748,0,2,7,1,6,19,-1,9,1,2,19,3,-.0028977119363844395,.2373327016830444,.5876647233963013,0,2,9,0,6,4,-1,11,0,2,4,3,-.0216106791049242,.1220654994249344,.5194202065467834,0,2,3,1,9,3,-1,6,1,3,3,3,-.004629931878298521,.263123095035553,.5817409157752991,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.000593937118537724,.363862007856369,.5698544979095459,0,2,0,3,6,10,-1,3,3,3,10,2,.0538786612451077,.4303531050682068,.7559366226196289,0,2,3,4,15,15,-1,3,9,15,5,3,.0018887349870055914,.2122603058815002,.561342716217041,0,2,6,5,8,6,-1,6,7,8,2,3,-.0023635339457541704,.563184916973114,.2642767131328583,0,3,4,4,12,10,-1,10,4,6,5,2,4,9,6,5,2,.0240177996456623,.5797107815742493,.2751705944538117,0,2,6,4,4,4,-1,8,4,2,4,2,.00020543030404951423,.2705242037773132,.575256884098053,0,2,15,11,1,2,-1,15,12,1,1,2,.0008479019743390381,.5435624718666077,.2334876954555512,0,2,3,11,2,2,-1,3,12,2,1,2,.0014091329649090767,.5319424867630005,.2063155025243759,0,2,16,11,1,3,-1,16,12,1,1,3,.0014642629539594054,.5418980717658997,.3068861067295075,0,3,3,15,6,4,-1,3,15,3,2,2,6,17,3,2,2,.0016352549428120255,.3695372939109802,.6112868189811707,0,2,6,7,8,2,-1,6,8,8,1,2,.0008317275205627084,.3565036952495575,.6025236248970032,0,2,3,11,1,3,-1,3,12,1,1,3,-.0020998890977352858,.1913982033729553,.5362827181816101,0,2,6,0,12,2,-1,6,1,12,1,2,-.0007421398186124861,.3835555016994476,.552931010723114,0,2,9,14,2,3,-1,9,15,2,1,3,.0032655049581080675,.4312896132469177,.7101895809173584,0,2,7,15,6,2,-1,7,16,6,1,2,.0008913499186746776,.3984830975532532,.6391963958740234,0,2,0,5,4,6,-1,0,7,4,2,3,-.0152841797098517,.2366732954978943,.5433713793754578,0,2,4,12,12,2,-1,8,12,4,2,3,.004838141147047281,.5817500948905945,.3239189088344574,0,2,6,3,1,9,-1,6,6,1,3,3,-.0009109317907132208,.5540593862533569,.2911868989467621,0,2,10,17,3,2,-1,11,17,1,2,3,-.006127506028860807,.1775255054235458,.5196629166603088,0,2,9,9,2,2,-1,9,10,2,1,2,-.00044576259097084403,.3024170100688934,.5533593893051147,0,2,7,6,6,4,-1,9,6,2,4,3,.0226465407758951,.4414930939674377,.6975377202033997,0,2,7,17,3,2,-1,8,17,1,2,3,-.0018804960418492556,.2791394889354706,.5497952103614807,0,2,10,17,3,3,-1,11,17,1,3,3,.007088910788297653,.5263199210166931,.2385547012090683,0,2,8,12,3,2,-1,8,13,3,1,2,.0017318050377070904,.4319379031658173,.6983600854873657,0,2,9,3,6,2,-1,11,3,2,2,3,-.006848270073533058,.3082042932510376,.5390920042991638,0,2,3,11,14,4,-1,3,13,14,2,2,-15062530110299122e-21,.552192211151123,.3120366036891937,0,3,1,10,18,4,-1,10,10,9,2,2,1,12,9,2,2,.0294755697250366,.5401322841644287,.1770603060722351,0,2,0,10,3,3,-1,0,11,3,1,3,.008138732984662056,.5178617835044861,.121101900935173,0,2,9,1,6,6,-1,11,1,2,6,3,.0209429506212473,.5290294289588928,.3311221897602081,0,2,8,7,3,6,-1,9,7,1,6,3,-.009566552937030792,.7471994161605835,.4451968967914581,15.324139595031738,33,0,2,1,0,18,9,-1,1,3,18,3,3,-.00028206960996612906,.2064086049795151,.6076732277870178,0,2,12,10,2,6,-1,12,13,2,3,2,.00167906004935503,.5851997137069702,.1255383938550949,0,2,0,5,19,8,-1,0,9,19,4,2,.0006982791237533092,.094018429517746,.5728961229324341,0,2,7,0,6,9,-1,9,0,2,9,3,.0007895901217125356,.1781987994909287,.5694308876991272,0,2,5,3,6,1,-1,7,3,2,1,3,-.002856049919500947,.1638399064540863,.5788664817810059,0,2,11,3,6,1,-1,13,3,2,1,3,-.0038122469559311867,.2085440009832382,.5508564710617065,0,2,5,10,4,6,-1,5,13,4,3,2,.0015896620461717248,.5702760815620422,.1857215017080307,0,2,11,3,6,1,-1,13,3,2,1,3,.0100783398374915,.5116943120956421,.2189770042896271,0,2,4,4,12,6,-1,4,6,12,2,3,-.0635263025760651,.7131379842758179,.4043813049793243,0,2,15,12,2,6,-1,15,14,2,2,3,-.009103149175643921,.2567181885242462,.54639732837677,0,2,9,3,2,2,-1,10,3,1,2,2,-.002403500024229288,.1700665950775147,.559097409248352,0,2,9,3,3,1,-1,10,3,1,1,3,.001522636041045189,.5410556793212891,.2619054019451141,0,2,1,1,4,14,-1,3,1,2,14,2,.0179974399507046,.3732436895370483,.6535220742225647,0,3,9,0,4,4,-1,11,0,2,2,2,9,2,2,2,2,-.00645381910726428,.2626481950283051,.5537446141242981,0,2,7,5,1,14,-1,7,12,1,7,2,-.0118807600811124,.2003753930330277,.5544745922088623,0,2,19,0,1,4,-1,19,2,1,2,2,.0012713660253211856,.5591902732849121,.303197592496872,0,2,5,5,6,4,-1,8,5,3,4,2,.0011376109905540943,.2730407118797302,.5646508932113647,0,2,9,18,3,2,-1,10,18,1,2,3,-.00426519988104701,.1405909061431885,.5461820960044861,0,2,8,18,3,2,-1,9,18,1,2,3,-.0029602861031889915,.1795035004615784,.5459290146827698,0,2,4,5,12,6,-1,4,7,12,2,3,-.008844822645187378,.5736783146858215,.280921995639801,0,2,3,12,2,6,-1,3,14,2,2,3,-.006643068976700306,.2370675951242447,.5503826141357422,0,2,10,8,2,12,-1,10,12,2,4,3,.003999780863523483,.5608199834823608,.3304282128810883,0,2,7,18,3,2,-1,8,18,1,2,3,-.004122172016650438,.1640105992555618,.5378993153572083,0,2,9,0,6,2,-1,11,0,2,2,3,.0156249096617103,.5227649211883545,.2288603931665421,0,2,5,11,9,3,-1,5,12,9,1,3,-.0103564197197557,.7016193866729736,.4252927899360657,0,2,9,0,6,2,-1,11,0,2,2,3,-.008796080946922302,.2767347097396851,.5355830192565918,0,2,1,1,18,5,-1,7,1,6,5,3,.1622693985700607,.434224009513855,.744257926940918,0,3,8,0,4,4,-1,10,0,2,2,2,8,2,2,2,2,.0045542530715465546,.5726485848426819,.2582125067710877,0,2,3,12,1,3,-1,3,13,1,1,3,-.002130920998752117,.2106848061084747,.5361018776893616,0,2,8,14,5,3,-1,8,15,5,1,3,-.0132084200158715,.7593790888786316,.4552468061447144,0,3,5,4,10,12,-1,5,4,5,6,2,10,10,5,6,2,-.0659966766834259,.125247597694397,.5344039797782898,0,2,9,6,9,12,-1,9,10,9,4,3,.007914265617728233,.3315384089946747,.5601043105125427,0,3,2,2,12,14,-1,2,2,6,7,2,8,9,6,7,2,.0208942797034979,.5506049990653992,.2768838107585907,21.010639190673828,44,0,2,4,7,12,2,-1,8,7,4,2,3,.0011961159761995077,.1762690991163254,.6156241297721863,0,2,7,4,6,4,-1,7,6,6,2,2,-.0018679830245673656,.6118106842041016,.1832399964332581,0,2,4,5,11,8,-1,4,9,11,4,2,-.00019579799845814705,.0990442633628845,.5723816156387329,0,2,3,10,16,4,-1,3,12,16,2,2,-.0008025565766729414,.5579879879951477,.2377282977104187,0,2,0,0,16,2,-1,0,1,16,1,2,-.0024510810617357492,.2231457978487015,.5858935117721558,0,2,7,5,6,2,-1,9,5,2,2,3,.0005036185029894114,.2653993964195252,.5794103741645813,0,3,3,2,6,10,-1,3,2,3,5,2,6,7,3,5,2,.0040293349884450436,.5803827047348022,.2484865039587021,0,2,10,5,8,15,-1,10,10,8,5,3,-.0144517095759511,.1830351948738098,.5484204888343811,0,3,3,14,8,6,-1,3,14,4,3,2,7,17,4,3,2,.0020380979403853416,.3363558948040009,.6051092743873596,0,2,14,2,2,2,-1,14,3,2,1,2,-.0016155190533027053,.2286642044782639,.5441246032714844,0,2,1,10,7,6,-1,1,13,7,3,2,.0033458340913057327,.5625913143157959,.2392338067293167,0,2,15,4,4,3,-1,15,4,2,3,2,.0016379579901695251,.3906993865966797,.5964621901512146,0,3,2,9,14,6,-1,2,9,7,3,2,9,12,7,3,2,.0302512105554342,.524848222732544,.1575746983289719,0,2,5,7,10,4,-1,5,9,10,2,2,.037251990288496,.4194310903549194,.6748418807983398,0,3,6,9,8,8,-1,6,9,4,4,2,10,13,4,4,2,-.0251097902655602,.1882549971342087,.5473451018333435,0,2,14,1,3,2,-1,14,2,3,1,2,-.005309905856847763,.133997306227684,.5227110981941223,0,2,1,4,4,2,-1,3,4,2,2,2,.0012086479691788554,.3762088119983673,.6109635829925537,0,2,11,10,2,8,-1,11,14,2,4,2,-.0219076797366142,.266314297914505,.5404006838798523,0,2,0,0,5,3,-1,0,1,5,1,3,.0054116579703986645,.5363578796386719,.2232273072004318,0,3,2,5,18,8,-1,11,5,9,4,2,2,9,9,4,2,.069946326315403,.5358232855796814,.2453698068857193,0,2,6,6,1,6,-1,6,9,1,3,2,.00034520021290518343,.2409671992063522,.5376930236816406,0,2,19,1,1,3,-1,19,2,1,1,3,.0012627709656953812,.5425856709480286,.3155693113803864,0,2,7,6,6,6,-1,9,6,2,6,3,.0227195098996162,.4158405959606171,.6597865223884583,0,2,19,1,1,3,-1,19,2,1,1,3,-.001811100053600967,.2811253070831299,.5505244731903076,0,2,3,13,2,3,-1,3,14,2,1,3,.0033469670452177525,.526002824306488,.1891465038061142,0,3,8,4,8,12,-1,12,4,4,6,2,8,10,4,6,2,.00040791751234792173,.5673509240150452,.3344210088253021,0,2,5,2,6,3,-1,7,2,2,3,3,.0127347996458411,.5343592166900635,.2395612001419067,0,2,6,1,9,10,-1,6,6,9,5,2,-.007311972789466381,.6010890007019043,.4022207856178284,0,2,0,4,6,12,-1,2,4,2,12,3,-.0569487512111664,.8199151158332825,.4543190896511078,0,2,15,13,2,3,-1,15,14,2,1,3,-.005011659115552902,.2200281023979187,.5357710719108582,0,2,7,14,5,3,-1,7,15,5,1,3,.006033436860889196,.4413081109523773,.7181751132011414,0,2,15,13,3,3,-1,15,14,3,1,3,.0039437441155314445,.547886073589325,.2791733145713806,0,2,6,14,8,3,-1,6,15,8,1,3,-.0036591119132936,.635786771774292,.3989723920822144,0,2,15,13,3,3,-1,15,14,3,1,3,-.0038456181064248085,.3493686020374298,.5300664901733398,0,2,2,13,3,3,-1,2,14,3,1,3,-.007192626129835844,.1119614988565445,.5229672789573669,0,3,4,7,12,12,-1,10,7,6,6,2,4,13,6,6,2,-.0527989417314529,.2387102991342545,.54534512758255,0,2,9,7,2,6,-1,10,7,1,6,2,-.007953766733407974,.7586917877197266,.4439376890659332,0,2,8,9,5,2,-1,8,10,5,1,2,-.0027344180271029472,.2565476894378662,.5489321947097778,0,2,8,6,3,4,-1,9,6,1,4,3,-.0018507939530536532,.6734347939491272,.4252474904060364,0,2,9,6,2,8,-1,9,10,2,4,2,.0159189198166132,.548835277557373,.2292661964893341,0,2,7,7,3,6,-1,8,7,1,6,3,-.0012687679845839739,.6104331016540527,.4022389948368073,0,2,11,3,3,3,-1,12,3,1,3,3,.006288391072303057,.5310853123664856,.1536193042993546,0,2,5,4,6,1,-1,7,4,2,1,3,-.0062259892001748085,.1729111969470978,.524160623550415,0,2,5,6,10,3,-1,5,7,10,1,3,-.0121325999498367,.659775972366333,.4325182139873505,23.918790817260742,50,0,2,7,3,6,9,-1,7,6,6,3,3,-.0039184908382594585,.6103435158729553,.1469330936670303,0,2,6,7,9,1,-1,9,7,3,1,3,.0015971299726516008,.2632363140583038,.5896466970443726,0,2,2,8,16,8,-1,2,12,16,4,2,.0177801102399826,.587287425994873,.1760361939668655,0,2,14,6,2,6,-1,14,9,2,3,2,.0006533476989716291,.1567801982164383,.5596066117286682,0,2,1,5,6,15,-1,1,10,6,5,3,-.00028353091329336166,.1913153976202011,.5732036232948303,0,2,10,0,6,9,-1,10,3,6,3,3,.0016104689566418529,.2914913892745972,.5623080730438232,0,2,6,6,7,14,-1,6,13,7,7,2,-.0977506190538406,.194347694516182,.5648233294487,0,2,13,7,3,6,-1,13,9,3,2,3,.0005518235848285258,.3134616911411285,.5504639744758606,0,2,1,8,15,4,-1,6,8,5,4,3,-.0128582203760743,.253648191690445,.5760142803192139,0,2,11,2,3,10,-1,11,7,3,5,2,.004153023939579725,.5767722129821777,.36597740650177,0,2,3,7,4,6,-1,3,9,4,2,3,.0017092459602281451,.2843191027641296,.5918939113616943,0,2,13,3,6,10,-1,15,3,2,10,3,.007521735969930887,.4052427113056183,.6183109283447266,0,3,5,7,8,10,-1,5,7,4,5,2,9,12,4,5,2,.0022479810286313295,.578375518321991,.3135401010513306,0,3,4,4,12,12,-1,10,4,6,6,2,4,10,6,6,2,.0520062111318111,.5541312098503113,.1916636973619461,0,2,1,4,6,9,-1,3,4,2,9,3,.0120855299755931,.4032655954360962,.6644591093063354,0,2,11,3,2,5,-1,11,3,1,5,2,14687820112158079e-21,.3535977900028229,.5709382891654968,0,2,7,3,2,5,-1,8,3,1,5,2,7139518857002258e-21,.3037444949150085,.5610269904136658,0,2,10,14,2,3,-1,10,15,2,1,3,-.0046001640148460865,.7181087136268616,.4580326080322266,0,2,5,12,6,2,-1,8,12,3,2,2,.0020058949012309313,.5621951818466187,.2953684031963348,0,2,9,14,2,3,-1,9,15,2,1,3,.004505027085542679,.4615387916564941,.7619017958641052,0,2,4,11,12,6,-1,4,14,12,3,2,.0117468303069472,.5343837141990662,.1772529035806656,0,2,11,11,5,9,-1,11,14,5,3,3,-.0583163388073444,.1686245948076248,.5340772271156311,0,2,6,15,3,2,-1,6,16,3,1,2,.00023629379575140774,.3792056143283844,.6026803851127625,0,2,11,0,3,5,-1,12,0,1,5,3,-.007815618067979813,.151286706328392,.5324323773384094,0,2,5,5,6,7,-1,8,5,3,7,2,-.0108761601150036,.2081822007894516,.5319945216178894,0,2,13,0,1,9,-1,13,3,1,3,3,-.0027745519764721394,.4098246991634369,.5210328102111816,0,3,3,2,4,8,-1,3,2,2,4,2,5,6,2,4,2,-.0007827638182789087,.5693274140357971,.3478842079639435,0,2,13,12,4,6,-1,13,14,4,2,3,.0138704096898437,.5326750874519348,.2257698029279709,0,2,3,12,4,6,-1,3,14,4,2,3,-.0236749108880758,.1551305055618286,.5200707912445068,0,2,13,11,3,4,-1,13,13,3,2,2,-14879409718560055e-21,.5500566959381104,.3820176124572754,0,2,4,4,4,3,-1,4,5,4,1,3,.00361906411126256,.4238683879375458,.6639748215675354,0,2,7,5,11,8,-1,7,9,11,4,2,-.0198171101510525,.2150038033723831,.5382357835769653,0,2,7,8,3,4,-1,8,8,1,4,3,-.0038154039066284895,.6675711274147034,.4215297102928162,0,2,9,1,6,1,-1,11,1,2,1,3,-.0049775829538702965,.2267289012670517,.5386328101158142,0,2,5,5,3,3,-1,5,6,3,1,3,.002244102070108056,.4308691024780273,.6855735778808594,0,3,0,9,20,6,-1,10,9,10,3,2,0,12,10,3,2,.0122824599966407,.5836614966392517,.3467479050159454,0,2,8,6,3,5,-1,9,6,1,5,3,-.002854869933798909,.7016944885253906,.4311453998088837,0,2,11,0,1,3,-1,11,1,1,1,3,-.0037875669077038765,.2895345091819763,.5224946141242981,0,2,4,2,4,2,-1,4,3,4,1,2,-.0012201230274513364,.2975570857524872,.5481644868850708,0,2,12,6,4,3,-1,12,7,4,1,3,.010160599835217,.4888817965984345,.8182697892189026,0,2,5,0,6,4,-1,7,0,2,4,3,-.0161745697259903,.1481492966413498,.5239992737770081,0,2,9,7,3,8,-1,10,7,1,8,3,.0192924607545137,.4786309897899628,.7378190755844116,0,2,9,7,2,2,-1,10,7,1,2,2,-.003247953951358795,.7374222874641418,.4470643997192383,0,3,6,7,14,4,-1,13,7,7,2,2,6,9,7,2,2,-.009380348026752472,.3489154875278473,.5537996292114258,0,2,0,5,3,6,-1,0,7,3,2,3,-.0126061299815774,.2379686981439591,.5315443277359009,0,2,13,11,3,4,-1,13,13,3,2,2,-.0256219301372766,.1964688003063202,.5138769745826721,0,2,4,11,3,4,-1,4,13,3,2,2,-7574149640277028e-20,.5590522885322571,.3365853130817413,0,3,5,9,12,8,-1,11,9,6,4,2,5,13,6,4,2,-.0892108827829361,.0634046569466591,.516263484954834,0,2,9,12,1,3,-1,9,13,1,1,3,-.002767048077657819,.732346773147583,.4490706026554108,0,2,10,15,2,4,-1,10,17,2,2,2,.0002715257869567722,.411483496427536,.5985518097877502,24.52787971496582,51,0,2,7,7,6,1,-1,9,7,2,1,3,.001478621968999505,.266354501247406,.6643316745758057,0,3,12,3,6,6,-1,15,3,3,3,2,12,6,3,3,2,-.001874165958724916,.6143848896026611,.2518512904644013,0,2,0,4,10,6,-1,0,6,10,2,3,-.001715100952424109,.5766341090202332,.2397463023662567,0,3,8,3,8,14,-1,12,3,4,7,2,8,10,4,7,2,-.0018939269939437509,.5682045817375183,.2529144883155823,0,2,4,4,7,15,-1,4,9,7,5,3,-.005300605203956366,.1640675961971283,.5556079745292664,0,3,12,2,6,8,-1,15,2,3,4,2,12,6,3,4,2,-.0466625317931175,.6123154163360596,.4762830138206482,0,3,2,2,6,8,-1,2,2,3,4,2,5,6,3,4,2,-.000794313324149698,.5707858800888062,.2839404046535492,0,2,2,13,18,7,-1,8,13,6,7,3,.0148916700854898,.4089672863483429,.6006367206573486,0,3,4,3,8,14,-1,4,3,4,7,2,8,10,4,7,2,-.0012046529445797205,.5712450742721558,.2705289125442505,0,2,18,1,2,6,-1,18,3,2,2,3,.006061938125640154,.526250422000885,.3262225985527039,0,2,9,11,2,3,-1,9,12,2,1,3,-.0025286648888140917,.6853830814361572,.4199256896972656,0,2,18,1,2,6,-1,18,3,2,2,3,-.005901021882891655,.3266282081604004,.5434812903404236,0,2,0,1,2,6,-1,0,3,2,2,3,.005670276004821062,.5468410849571228,.2319003939628601,0,2,1,5,18,6,-1,1,7,18,2,3,-.003030410036444664,.557066798210144,.2708238065242767,0,2,0,2,6,7,-1,3,2,3,7,2,.002980364952236414,.3700568974018097,.5890625715255737,0,2,7,3,6,14,-1,7,10,6,7,2,-.0758405104279518,.2140070050954819,.5419948101043701,0,2,3,7,13,10,-1,3,12,13,5,2,.0192625392228365,.5526772141456604,.2726590037345886,0,2,11,15,2,2,-1,11,16,2,1,2,.00018888259364757687,.3958011865615845,.6017209887504578,0,3,2,11,16,4,-1,2,11,8,2,2,10,13,8,2,2,.0293695498257875,.5241373777389526,.1435758024454117,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0010417619487270713,.3385409116744995,.5929983258247375,0,2,6,10,3,9,-1,6,13,3,3,3,.0026125640142709017,.5485377907752991,.3021597862243652,0,2,14,6,1,6,-1,14,9,1,3,2,.0009697746718302369,.3375276029109955,.553203284740448,0,2,5,10,4,1,-1,7,10,2,1,2,.0005951265920884907,.563174307346344,.3359399139881134,0,2,3,8,15,5,-1,8,8,5,5,3,-.1015655994415283,.0637350380420685,.5230425000190735,0,2,1,6,5,4,-1,1,8,5,2,2,.0361566990613937,.5136963129043579,.1029528975486755,0,2,3,1,17,6,-1,3,3,17,2,3,.003462414024397731,.3879320025444031,.5558289289474487,0,2,6,7,8,2,-1,10,7,4,2,2,.0195549800992012,.5250086784362793,.1875859946012497,0,2,9,7,3,2,-1,10,7,1,2,3,-.0023121440317481756,.667202889919281,.4679641127586365,0,2,8,7,3,2,-1,9,7,1,2,3,-.001860528951510787,.7163379192352295,.4334670901298523,0,2,8,9,4,2,-1,8,10,4,1,2,-.0009402636205777526,.302136093378067,.5650203227996826,0,2,8,8,4,3,-1,8,9,4,1,3,-.005241833161562681,.1820009052753449,.5250256061553955,0,2,9,5,6,4,-1,9,5,3,4,2,.00011729019752237946,.3389188051223755,.544597327709198,0,2,8,13,4,3,-1,8,14,4,1,3,.0011878840159624815,.4085349142551422,.6253563165664673,0,3,4,7,12,6,-1,10,7,6,3,2,4,10,6,3,2,-.0108813596889377,.3378399014472961,.5700082778930664,0,2,8,14,4,3,-1,8,15,4,1,3,.0017354859737679362,.4204635918140411,.6523038744926453,0,2,9,7,3,3,-1,9,8,3,1,3,-.00651190523058176,.2595216035842896,.5428143739700317,0,2,7,4,3,8,-1,8,4,1,8,3,-.0012136430013924837,.6165143847465515,.3977893888950348,0,2,10,0,3,6,-1,11,0,1,6,3,-.010354240424931,.1628028005361557,.5219504833221436,0,2,6,3,4,8,-1,8,3,2,8,2,.0005585883045569062,.3199650943279266,.5503574013710022,0,2,14,3,6,13,-1,14,3,3,13,2,.0152996499091387,.4103994071483612,.6122388243675232,0,2,8,13,3,6,-1,8,16,3,3,2,-.021588210016489,.103491298854351,.519738495349884,0,2,14,3,6,13,-1,14,3,3,13,2,-.1283462941646576,.8493865132331848,.4893102943897247,0,3,0,7,10,4,-1,0,7,5,2,2,5,9,5,2,2,-.0022927189711481333,.3130157887935638,.5471575260162354,0,2,14,3,6,13,-1,14,3,3,13,2,.0799151062965393,.4856320917606354,.6073989272117615,0,2,0,3,6,13,-1,3,3,3,13,2,-.0794410929083824,.8394674062728882,.462453305721283,0,2,9,1,4,1,-1,9,1,2,1,2,-.00528000108897686,.1881695985794067,.5306698083877563,0,2,8,0,2,1,-1,9,0,1,1,2,.0010463109938427806,.5271229147911072,.2583065927028656,0,3,10,16,4,4,-1,12,16,2,2,2,10,18,2,2,2,.00026317298761568964,.4235304892063141,.5735440850257874,0,2,9,6,2,3,-1,10,6,1,3,2,-.0036173160187900066,.6934396028518677,.4495444893836975,0,2,4,5,12,2,-1,8,5,4,2,3,.0114218797534704,.590092122554779,.4138193130493164,0,2,8,7,3,5,-1,9,7,1,5,3,-.0019963278900831938,.6466382741928101,.4327239990234375,27.153350830078125,56,0,2,6,4,8,6,-1,6,6,8,2,3,-.00996912457048893,.6142324209213257,.2482212036848068,0,2,9,5,2,12,-1,9,11,2,6,2,.0007307305932044983,.5704951882362366,.2321965992450714,0,2,4,6,6,8,-1,4,10,6,4,2,.0006404530140571296,.2112251967191696,.5814933180809021,0,2,12,2,8,5,-1,12,2,4,5,2,.004542401991784573,.2950482070446014,.586631178855896,0,2,0,8,18,3,-1,0,9,18,1,3,9247744310414419e-20,.2990990877151489,.5791326761245728,0,2,8,12,4,8,-1,8,16,4,4,2,-.008660314604640007,.2813029885292053,.5635542273521423,0,2,0,2,8,5,-1,4,2,4,5,2,.008051581680774689,.3535369038581848,.6054757237434387,0,2,13,11,3,4,-1,13,13,3,2,2,.00043835240649059415,.5596532225608826,.2731510996818543,0,2,5,11,6,1,-1,7,11,2,1,3,-981689736363478e-19,.5978031754493713,.3638561069965363,0,2,11,3,3,1,-1,12,3,1,1,3,-.0011298790341243148,.2755252122879028,.5432729125022888,0,2,7,13,5,3,-1,7,14,5,1,3,.006435615010559559,.4305641949176788,.7069833278656006,0,2,11,11,7,6,-1,11,14,7,3,2,-.0568293295800686,.2495242953300476,.5294997096061707,0,2,2,11,7,6,-1,2,14,7,3,2,.004066816996783018,.5478553175926208,.2497723996639252,0,2,12,14,2,6,-1,12,16,2,2,3,481647984997835e-19,.3938601016998291,.5706356167793274,0,2,8,14,3,3,-1,8,15,3,1,3,.00617950176820159,.440760612487793,.7394766807556152,0,2,11,0,3,5,-1,12,0,1,5,3,.006498575210571289,.5445243120193481,.2479152977466583,0,2,6,1,4,9,-1,8,1,2,9,2,-.0010211090557277203,.2544766962528229,.5338971018791199,0,2,10,3,6,1,-1,12,3,2,1,3,-.005424752831459045,.2718858122825623,.5324069261550903,0,2,8,8,3,4,-1,8,10,3,2,2,-.0010559899965301156,.3178288042545319,.553450882434845,0,2,8,12,4,2,-1,8,13,4,1,2,.0006646580877713859,.4284219145774841,.6558194160461426,0,2,5,18,4,2,-1,5,19,4,1,2,-.00027524109464138746,.5902860760688782,.3810262978076935,0,2,2,1,18,6,-1,2,3,18,2,3,.004229320213198662,.381648987531662,.5709385871887207,0,2,6,0,3,2,-1,7,0,1,2,3,-.0032868210691958666,.1747743934392929,.5259544253349304,0,3,13,8,6,2,-1,16,8,3,1,2,13,9,3,1,2,.0001561187964398414,.3601722121238709,.5725612044334412,0,2,6,10,3,6,-1,6,13,3,3,2,-7362138148891972e-21,.540185809135437,.3044497072696686,0,3,0,13,20,4,-1,10,13,10,2,2,0,15,10,2,2,-.014767250046134,.3220770061016083,.5573434829711914,0,2,7,7,6,5,-1,9,7,2,5,3,.0244895908981562,.4301528036594391,.6518812775611877,0,2,11,0,2,2,-1,11,1,2,1,2,-.000376520911231637,.356458306312561,.5598236918449402,0,3,1,8,6,2,-1,1,8,3,1,2,4,9,3,1,2,736576885174145e-20,.3490782976150513,.556189775466919,0,3,0,2,20,2,-1,10,2,10,1,2,0,3,10,1,2,-.0150999398902059,.1776272058486939,.5335299968719482,0,2,7,14,5,3,-1,7,15,5,1,3,-.0038316650316119194,.6149687767028809,.4221394062042236,0,3,7,13,6,6,-1,10,13,3,3,2,7,16,3,3,2,.0169254001230001,.5413014888763428,.2166585028171539,0,2,9,12,2,3,-1,9,13,2,1,3,-.003047785023227334,.6449490785598755,.4354617893695831,0,2,16,11,1,6,-1,16,13,1,2,3,.003214058931916952,.5400155186653137,.3523217141628265,0,2,3,11,1,6,-1,3,13,1,2,3,-.004002320114523172,.2774524092674255,.5338417291641235,0,3,4,4,14,12,-1,11,4,7,6,2,4,10,7,6,2,.0074182129465043545,.567673921585083,.3702817857265472,0,2,5,4,3,3,-1,5,5,3,1,3,-.008876458741724491,.7749221920967102,.4583688974380493,0,2,12,3,3,3,-1,13,3,1,3,3,.002731173997744918,.5338721871376038,.3996661007404327,0,2,6,6,8,3,-1,6,7,8,1,3,-.0025082379579544067,.5611963272094727,.377749890089035,0,2,12,3,3,3,-1,13,3,1,3,3,-.008054107427597046,.291522890329361,.5179182887077332,0,3,3,1,4,10,-1,3,1,2,5,2,5,6,2,5,2,-.0009793881326913834,.5536432862281799,.3700192868709564,0,2,5,7,10,2,-1,5,7,5,2,2,-.005874590948224068,.3754391074180603,.5679376125335693,0,2,8,7,3,3,-1,9,7,1,3,3,-.00449367193505168,.7019699215888977,.4480949938297272,0,2,15,12,2,3,-1,15,13,2,1,3,-.00543892290443182,.2310364991426468,.5313386917114258,0,2,7,8,3,4,-1,8,8,1,4,3,-.0007509464048780501,.5864868760108948,.4129343032836914,0,2,13,4,1,12,-1,13,10,1,6,2,14528800420521293e-21,.3732407093048096,.5619621276855469,0,3,4,5,12,12,-1,4,5,6,6,2,10,11,6,6,2,.0407580696046352,.5312091112136841,.2720521986484528,0,2,7,14,7,3,-1,7,15,7,1,3,.006650593131780624,.4710015952587128,.6693493723869324,0,2,3,12,2,3,-1,3,13,2,1,3,.0045759351924061775,.5167819261550903,.1637275964021683,0,3,3,2,14,2,-1,10,2,7,1,2,3,3,7,1,2,.0065269311890006065,.5397608876228333,.2938531935214996,0,2,0,1,3,10,-1,1,1,1,10,3,-.0136603796854615,.7086488008499146,.453220009803772,0,2,9,0,6,5,-1,11,0,2,5,3,.0273588690906763,.5206481218338013,.3589231967926025,0,2,5,7,6,2,-1,8,7,3,2,2,.0006219755159690976,.3507075905799866,.5441123247146606,0,2,7,1,6,10,-1,7,6,6,5,2,-.0033077080734074116,.5859522819519043,.402489185333252,0,2,1,1,18,3,-1,7,1,6,3,3,-.0106311095878482,.6743267178535461,.4422602951526642,0,2,16,3,3,6,-1,16,5,3,2,3,.0194416493177414,.5282716155052185,.1797904968261719,34.55411148071289,71,0,2,6,3,7,6,-1,6,6,7,3,2,-.005505216773599386,.5914731025695801,.2626559138298035,0,2,4,7,12,2,-1,8,7,4,2,3,.001956227933987975,.2312581986188889,.5741627216339111,0,2,0,4,17,10,-1,0,9,17,5,2,-.008892478421330452,.1656530052423477,.5626654028892517,0,2,3,4,15,16,-1,3,12,15,8,2,.0836383774876595,.5423449873924255,.1957294940948486,0,2,7,15,6,4,-1,7,17,6,2,2,.0012282270472496748,.3417904078960419,.5992503762245178,0,2,15,2,4,9,-1,15,2,2,9,2,.0057629169896245,.3719581961631775,.6079903841018677,0,2,2,3,3,2,-1,2,4,3,1,2,-.0016417410224676132,.2577486038208008,.5576915740966797,0,2,13,6,7,9,-1,13,9,7,3,3,.0034113149158656597,.2950749099254608,.5514171719551086,0,2,8,11,4,3,-1,8,12,4,1,3,-.0110693201422691,.7569358944892883,.4477078914642334,0,3,0,2,20,6,-1,10,2,10,3,2,0,5,10,3,2,.0348659716546535,.5583708882331848,.2669621109962463,0,3,3,2,6,10,-1,3,2,3,5,2,6,7,3,5,2,.0006570109981112182,.5627313256263733,.2988890111446381,0,2,13,10,3,4,-1,13,12,3,2,2,-.0243391301482916,.2771185040473938,.5108863115310669,0,2,4,10,3,4,-1,4,12,3,2,2,.0005943520227447152,.5580651760101318,.3120341897010803,0,2,7,5,6,3,-1,9,5,2,3,3,.0022971509024500847,.3330250084400177,.5679075717926025,0,2,7,6,6,8,-1,7,10,6,4,2,-.0037801829166710377,.2990534901618958,.5344808101654053,0,2,0,11,20,6,-1,0,14,20,3,2,-.13420669734478,.1463858932256699,.5392568111419678,0,3,4,13,4,6,-1,4,13,2,3,2,6,16,2,3,2,.0007522454834543169,.3746953904628754,.5692734718322754,0,3,6,0,8,12,-1,10,0,4,6,2,6,6,4,6,2,-.040545541793108,.2754747867584229,.5484297871589661,0,2,2,0,15,2,-1,2,1,15,1,2,.0012572970008477569,.3744584023952484,.5756075978279114,0,2,9,12,2,3,-1,9,13,2,1,3,-.007424994837492704,.7513859272003174,.4728231132030487,0,2,3,12,1,2,-1,3,13,1,1,2,.0005090812919661403,.540489673614502,.2932321131229401,0,2,9,11,2,3,-1,9,12,2,1,3,-.001280845026485622,.6169779896736145,.4273349046707153,0,2,7,3,3,1,-1,8,3,1,1,3,-.0018348860321566463,.2048496007919312,.5206472277641296,0,2,17,7,3,6,-1,17,9,3,2,3,.0274848695844412,.5252984762191772,.1675522029399872,0,2,7,2,3,2,-1,8,2,1,2,3,.0022372419480234385,.5267782807350159,.2777658104896545,0,2,11,4,5,3,-1,11,5,5,1,3,-.008863529190421104,.69545578956604,.4812048971652985,0,2,4,4,5,3,-1,4,5,5,1,3,.004175397101789713,.4291887879371643,.6349195837974548,0,2,19,3,1,2,-1,19,4,1,1,2,-.0017098189564421773,.2930536866188049,.5361248850822449,0,2,5,5,4,3,-1,5,6,4,1,3,.006532854866236448,.4495325088500977,.7409694194793701,0,2,17,7,3,6,-1,17,9,3,2,3,-.009537290781736374,.3149119913578033,.5416501760482788,0,2,0,7,3,6,-1,0,9,3,2,3,.0253109894692898,.5121892094612122,.1311707943677902,0,2,14,2,6,9,-1,14,5,6,3,3,.0364609695971012,.5175911784172058,.2591339945793152,0,2,0,4,5,6,-1,0,6,5,2,3,.0208543296903372,.5137140154838562,.1582316011190414,0,2,10,5,6,2,-1,12,5,2,2,3,-.0008720774785615504,.5574309825897217,.439897894859314,0,2,4,5,6,2,-1,6,5,2,2,3,-15227000403683633e-21,.5548940896987915,.3708069920539856,0,2,8,1,4,6,-1,8,3,4,2,3,-.0008431650931015611,.3387419879436493,.5554211139678955,0,2,0,2,3,6,-1,0,4,3,2,3,.0036037859972566366,.5358061790466309,.3411171138286591,0,2,6,6,8,3,-1,6,7,8,1,3,-.006805789191275835,.6125202775001526,.4345862865447998,0,2,0,1,5,9,-1,0,4,5,3,3,-.0470216609537601,.2358165979385376,.519373893737793,0,2,16,0,4,15,-1,16,0,2,15,2,-.0369541086256504,.7323111295700073,.4760943949222565,0,2,1,10,3,2,-1,1,11,3,1,2,.0010439479956403375,.5419455170631409,.3411330878734589,0,2,14,4,1,10,-1,14,9,1,5,2,-.00021050689974799752,.2821694016456604,.5554947257041931,0,2,0,1,4,12,-1,2,1,2,12,2,-.0808315873146057,.9129930138587952,.4697434902191162,0,2,11,11,4,2,-1,11,11,2,2,2,-.0003657905908767134,.6022670269012451,.3978292942047119,0,2,5,11,4,2,-1,7,11,2,2,2,-.00012545920617412776,.5613213181495667,.384553998708725,0,2,3,8,15,5,-1,8,8,5,5,3,-.0687864869832993,.2261611968278885,.5300496816635132,0,2,0,0,6,10,-1,3,0,3,10,2,.0124157899990678,.4075691998004913,.5828812122344971,0,2,11,4,3,2,-1,12,4,1,2,3,-.004717481788247824,.2827253937721252,.5267757773399353,0,2,8,12,3,8,-1,8,16,3,4,2,.0381368584930897,.5074741244316101,.1023615971207619,0,2,8,14,5,3,-1,8,15,5,1,3,-.0028168049175292253,.6169006824493408,.4359692931175232,0,2,7,14,4,3,-1,7,15,4,1,3,.008130360394716263,.4524433016777039,.76060950756073,0,2,11,4,3,2,-1,12,4,1,2,3,.006005601957440376,.5240408778190613,.185971200466156,0,3,3,15,14,4,-1,3,15,7,2,2,10,17,7,2,2,.0191393196582794,.5209379196166992,.2332071959972382,0,3,2,2,16,4,-1,10,2,8,2,2,2,4,8,2,2,.0164457596838474,.5450702905654907,.3264234960079193,0,2,0,8,6,12,-1,3,8,3,12,2,-.0373568907380104,.6999046802520752,.4533241987228394,0,2,5,7,10,2,-1,5,7,5,2,2,-.0197279006242752,.2653664946556091,.54128098487854,0,2,9,7,2,5,-1,10,7,1,5,2,.0066972579807043076,.4480566084384918,.7138652205467224,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0007445752853527665,.4231350123882294,.5471320152282715,0,2,0,13,8,2,-1,0,14,8,1,2,.0011790640419349074,.5341702103614807,.3130455017089844,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0349806100130081,.5118659734725952,.343053013086319,0,3,1,7,6,4,-1,1,7,3,2,2,4,9,3,2,2,.0005685979267582297,.3532187044620514,.5468639731407166,0,2,12,6,1,12,-1,12,12,1,6,2,-.0113406497985125,.2842353880405426,.5348700881004333,0,2,9,5,2,6,-1,10,5,1,6,2,-.00662281084805727,.6883640289306641,.4492664933204651,0,2,14,12,2,3,-1,14,13,2,1,3,-.008016033098101616,.1709893941879273,.5224308967590332,0,2,4,12,2,3,-1,4,13,2,1,3,.0014206819469109178,.5290846228599548,.299338310956955,0,2,8,12,4,3,-1,8,13,4,1,3,-.002780171111226082,.6498854160308838,.4460499882698059,0,3,5,2,2,4,-1,5,2,1,2,2,6,4,1,2,2,-.0014747589593753219,.3260438144207001,.5388113260269165,0,2,5,5,11,3,-1,5,6,11,1,3,-.0238303393125534,.7528941035270691,.4801219999790192,0,2,7,6,4,12,-1,7,12,4,6,2,.00693697901442647,.5335165858268738,.3261427879333496,0,2,12,13,8,5,-1,12,13,4,5,2,.008280625566840172,.458039402961731,.5737829804420471,0,2,7,6,1,12,-1,7,12,1,6,2,-.0104395002126694,.2592320144176483,.5233827829360962,39.1072883605957,80,0,2,1,2,6,3,-1,4,2,3,3,2,.0072006587870419025,.325888603925705,.6849808096885681,0,3,9,5,6,10,-1,12,5,3,5,2,9,10,3,5,2,-.002859358908608556,.5838881134986877,.2537829875946045,0,3,5,5,8,12,-1,5,5,4,6,2,9,11,4,6,2,.0006858052802272141,.5708081722259521,.2812424004077911,0,2,0,7,20,6,-1,0,9,20,2,3,.007958019152283669,.2501051127910614,.5544260740280151,0,2,4,2,2,2,-1,4,3,2,1,2,-.0012124150525778532,.2385368049144745,.5433350205421448,0,2,4,18,12,2,-1,8,18,4,2,3,.00794261321425438,.3955070972442627,.6220757961273193,0,2,7,4,4,16,-1,7,12,4,8,2,.0024630590341985226,.5639708042144775,.2992357909679413,0,2,7,6,7,8,-1,7,10,7,4,2,-.006039659958332777,.218651294708252,.541167676448822,0,2,6,3,3,1,-1,7,3,1,1,3,-.0012988339876756072,.23507060110569,.5364584922790527,0,2,11,15,2,4,-1,11,17,2,2,2,.00022299369447864592,.380411297082901,.572960615158081,0,2,3,5,4,8,-1,3,9,4,4,2,.0014654280385002494,.2510167956352234,.5258268713951111,0,2,7,1,6,12,-1,7,7,6,6,2,-.0008121004211716354,.5992823839187622,.3851158916950226,0,2,4,6,6,2,-1,6,6,2,2,3,-.0013836020370945334,.5681396126747131,.3636586964130402,0,2,16,4,4,6,-1,16,6,4,2,3,-.0279364492744207,.1491317003965378,.5377560257911682,0,2,3,3,5,2,-1,3,4,5,1,2,-.0004691955109592527,.3692429959774017,.5572484731674194,0,2,9,11,2,3,-1,9,12,2,1,3,-.004982965998351574,.6758509278297424,.4532504081726074,0,2,2,16,4,2,-1,2,17,4,1,2,.001881530974060297,.5368022918701172,.2932539880275726,0,3,7,13,6,6,-1,10,13,3,3,2,7,16,3,3,2,-.0190675500780344,.1649377048015595,.5330067276954651,0,2,7,0,3,4,-1,8,0,1,4,3,-.0046906559728085995,.1963925957679749,.5119361877441406,0,2,8,15,4,3,-1,8,16,4,1,3,.005977713968604803,.467117190361023,.7008398175239563,0,2,0,4,4,6,-1,0,6,4,2,3,-.0333031304180622,.1155416965484619,.5104162096977234,0,2,5,6,12,3,-1,9,6,4,3,3,.0907441079616547,.5149660110473633,.1306173056364059,0,2,7,6,6,14,-1,9,6,2,14,3,.0009355589863844216,.3605481088161469,.543985903263092,0,2,9,7,3,3,-1,10,7,1,3,3,.0149016501381993,.4886212050914764,.7687569856643677,0,2,6,12,2,4,-1,6,14,2,2,2,.0006159411859698594,.5356813073158264,.3240939080715179,0,2,10,12,7,6,-1,10,14,7,2,3,-.0506709888577461,.1848621964454651,.5230404138565063,0,2,1,0,15,2,-1,1,1,15,1,2,.0006866574985906482,.3840579986572266,.5517945885658264,0,2,14,0,6,6,-1,14,0,3,6,2,.008371243253350258,.4288564026355743,.6131753921508789,0,2,5,3,3,1,-1,6,3,1,1,3,-.0012953069526702166,.2913674116134644,.528073787689209,0,2,14,0,6,6,-1,14,0,3,6,2,-.0419416800141335,.7554799914360046,.4856030941009522,0,2,0,3,20,10,-1,0,8,20,5,2,-.0235293805599213,.2838279902935028,.5256081223487854,0,2,14,0,6,6,-1,14,0,3,6,2,.0408574491739273,.4870935082435608,.6277297139167786,0,2,0,0,6,6,-1,3,0,3,6,2,-.0254068691283464,.7099707722663879,.4575029015541077,0,2,19,15,1,2,-1,19,16,1,1,2,-.00041415440500713885,.4030886888504028,.5469412207603455,0,2,0,2,4,8,-1,2,2,2,8,2,.0218241196125746,.4502024054527283,.6768701076507568,0,3,2,1,18,4,-1,11,1,9,2,2,2,3,9,2,2,.0141140399500728,.5442860722541809,.3791700005531311,0,2,8,12,1,2,-1,8,13,1,1,2,6721459067193791e-20,.4200463891029358,.5873476266860962,0,3,5,2,10,6,-1,10,2,5,3,2,5,5,5,3,2,-.00794176384806633,.3792561888694763,.5585265755653381,0,2,9,7,2,4,-1,10,7,1,4,2,-.00721444096416235,.7253103852272034,.4603548943996429,0,2,9,7,3,3,-1,10,7,1,3,3,.002581733977422118,.4693301916122437,.5900238752365112,0,2,4,5,12,8,-1,8,5,4,8,3,.1340931951999664,.5149213075637817,.1808844953775406,0,2,15,15,4,3,-1,15,16,4,1,3,.0022962710354477167,.5399743914604187,.3717867136001587,0,2,8,18,3,1,-1,9,18,1,1,3,-.002157584996894002,.2408495992422104,.5148863792419434,0,2,9,13,4,3,-1,9,14,4,1,3,-.004919618833810091,.6573588252067566,.4738740026950836,0,2,7,13,4,3,-1,7,14,4,1,3,.0016267469618469477,.4192821979522705,.6303114295005798,0,2,19,15,1,2,-1,19,16,1,1,2,.00033413388882763684,.5540298223495483,.3702101111412048,0,2,0,15,8,4,-1,0,17,8,2,2,-.0266980808228254,.1710917949676514,.5101410746574402,0,2,9,3,6,4,-1,11,3,2,4,3,-.0305618792772293,.1904218047857285,.5168793797492981,0,2,8,14,4,3,-1,8,15,4,1,3,.002851154888048768,.4447506964206696,.6313853859901428,0,2,3,14,14,6,-1,3,16,14,2,3,-.0362114794552326,.2490727007389069,.5377349257469177,0,2,6,3,6,6,-1,6,6,6,3,2,-.002411518944427371,.5381243228912354,.3664236962795258,0,2,5,11,10,6,-1,5,14,10,3,2,-.0007725320174358785,.5530232191085815,.3541550040245056,0,2,3,10,3,4,-1,4,10,1,4,3,.0002948172914329916,.4132699072360992,.5667243003845215,0,2,13,9,2,2,-1,13,9,1,2,2,-.006233456078916788,.0987872332334518,.5198668837547302,0,2,5,3,6,4,-1,7,3,2,4,3,-.0262747295200825,.0911274924874306,.5028107166290283,0,2,9,7,3,3,-1,10,7,1,3,3,.005321226082742214,.4726648926734924,.6222720742225647,0,2,2,12,2,3,-1,2,13,2,1,3,-.004112905822694302,.2157457023859024,.5137804746627808,0,2,9,8,3,12,-1,9,12,3,4,3,.0032457809429615736,.5410770773887634,.3721776902675629,0,3,3,14,4,6,-1,3,14,2,3,2,5,17,2,3,2,-.0163597092032433,.7787874937057495,.4685291945934296,0,2,16,15,2,2,-1,16,16,2,1,2,.00032166109303943813,.5478987097740173,.4240373969078064,0,2,2,15,2,2,-1,2,16,2,1,2,.000644524407107383,.5330560803413391,.3501324951648712,0,2,8,12,4,3,-1,8,13,4,1,3,-.0078909732401371,.6923521161079407,.4726569056510925,0,2,0,7,20,1,-1,10,7,10,1,2,.048336211591959,.50559002161026,.0757492035627365,0,2,7,6,8,3,-1,7,6,4,3,2,-.000751781277358532,.3783741891384125,.5538573861122131,0,2,5,7,8,2,-1,9,7,4,2,2,-.002495391061529517,.3081651031970978,.5359612107276917,0,2,9,7,3,5,-1,10,7,1,5,3,-.0022385010961443186,.663395881652832,.4649342894554138,0,2,8,7,3,5,-1,9,7,1,5,3,-.0017988430336117744,.6596844792366028,.4347187876701355,0,2,11,1,3,5,-1,12,1,1,5,3,.008786091580986977,.523183286190033,.2315579950809479,0,2,6,2,3,6,-1,7,2,1,6,3,.003671538084745407,.520425021648407,.2977376878261566,0,2,14,14,6,5,-1,14,14,3,5,2,-.0353364497423172,.7238878011703491,.4861505031585693,0,2,9,8,2,2,-1,9,9,2,1,2,-.0006918924045749009,.3105022013187408,.5229824781417847,0,2,10,7,1,3,-1,10,8,1,1,3,-.003394610946998,.3138968050479889,.5210173726081848,0,3,6,6,2,2,-1,6,6,1,1,2,7,7,1,1,2,.0009856928372755647,.4536580145359039,.6585097908973694,0,3,2,11,18,4,-1,11,11,9,2,2,2,13,9,2,2,-.0501631014049053,.1804454028606415,.5198916792869568,0,3,6,6,2,2,-1,6,6,1,1,2,7,7,1,1,2,-.0022367259953171015,.7255702018737793,.4651359021663666,0,2,0,15,20,2,-1,0,16,20,1,2,.0007432628772221506,.4412921071052551,.5898545980453491,0,2,4,14,2,3,-1,4,15,2,1,3,-.0009348518215119839,.3500052988529205,.5366017818450928,0,2,8,14,4,3,-1,8,15,4,1,3,.0174979399889708,.4912194907665253,.8315284848213196,0,2,8,7,2,3,-1,8,8,2,1,3,-.0015200000489130616,.3570275902748108,.537056028842926,0,2,9,10,2,3,-1,9,11,2,1,3,.0007800394087098539,.4353772103786469,.5967335104942322,50.61048126220703,103,0,2,5,4,10,4,-1,5,6,10,2,2,-.00999455526471138,.6162583231925964,.3054533004760742,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.001108522992581129,.5818294882774353,.3155578076839447,0,2,4,7,3,6,-1,4,9,3,2,3,.001036438043229282,.2552052140235901,.5692911744117737,0,3,11,15,4,4,-1,13,15,2,2,2,11,17,2,2,2,.000682113110087812,.3685089945793152,.5934931039810181,0,2,7,8,4,2,-1,7,9,4,1,2,-.0006805734010413289,.2332392036914825,.5474792122840881,0,2,13,1,4,3,-1,13,1,2,3,2,.0002606878988444805,.325745701789856,.5667545795440674,0,3,5,15,4,4,-1,5,15,2,2,2,7,17,2,2,2,.0005160737200640142,.3744716942310333,.5845472812652588,0,2,9,5,4,7,-1,9,5,2,7,2,.0008500752155669034,.3420371115207672,.5522807240486145,0,2,5,6,8,3,-1,9,6,4,3,2,-.0018607829697430134,.2804419994354248,.5375424027442932,0,2,9,9,2,2,-1,9,10,2,1,2,-.001503397012129426,.2579050958156586,.5498952269554138,0,2,7,15,5,3,-1,7,16,5,1,3,.0023478909861296415,.4175156056880951,.6313710808753967,0,2,11,10,4,3,-1,11,10,2,3,2,-.00028880240279249847,.5865169763565063,.4052666127681732,0,2,6,9,8,10,-1,6,14,8,5,2,.008940547704696655,.5211141109466553,.231865406036377,0,2,10,11,6,2,-1,10,11,3,2,2,-.0193277392536402,.2753432989120483,.5241525769233704,0,2,4,11,6,2,-1,7,11,3,2,2,-.0002020206011366099,.5722978711128235,.3677195906639099,0,2,11,3,8,1,-1,11,3,4,1,2,.002117906929925084,.4466108083724976,.5542430877685547,0,2,6,3,3,2,-1,7,3,1,2,3,-.0017743760254234076,.2813253104686737,.5300959944725037,0,2,14,5,6,5,-1,14,5,3,5,2,.004223445896059275,.439970999956131,.5795428156852722,0,2,7,5,2,12,-1,7,11,2,6,2,-.0143752200528979,.2981117963790894,.5292059183120728,0,2,8,11,4,3,-1,8,12,4,1,3,-.0153491804376245,.7705215215682983,.4748171865940094,0,2,4,1,2,3,-1,5,1,1,3,2,15152279956964776e-21,.3718844056129456,.5576897263526917,0,2,18,3,2,6,-1,18,5,2,2,3,-.009129391983151436,.3615196049213409,.5286766886711121,0,2,0,3,2,6,-1,0,5,2,2,3,.0022512159775942564,.5364704728126526,.3486298024654388,0,2,9,12,2,3,-1,9,13,2,1,3,-.0049696918576955795,.6927651762962341,.4676836133003235,0,2,7,13,4,3,-1,7,14,4,1,3,-.0128290103748441,.7712153792381287,.4660735130310059,0,2,18,0,2,6,-1,18,2,2,2,3,-.009366006590425968,.3374983966350555,.5351287722587585,0,2,0,0,2,6,-1,0,2,2,2,3,.0032452319283038378,.5325189828872681,.3289610147476196,0,2,8,14,6,3,-1,8,15,6,1,3,-.0117235602810979,.6837652921676636,.4754300117492676,0,2,7,4,2,4,-1,8,4,1,4,2,2925794069597032e-20,.357208788394928,.5360502004623413,0,2,8,5,4,6,-1,8,7,4,2,3,-22244219508138485e-21,.5541427135467529,.3552064001560211,0,2,6,4,2,2,-1,7,4,1,2,2,.005088150966912508,.5070844292640686,.1256462037563324,0,3,3,14,14,4,-1,10,14,7,2,2,3,16,7,2,2,.0274296794086695,.5269560217857361,.1625818014144898,0,3,6,15,6,2,-1,6,15,3,1,2,9,16,3,1,2,-.00641428679227829,.7145588994026184,.4584197103977203,0,2,14,15,6,2,-1,14,16,6,1,2,.003347995923832059,.5398612022399902,.3494696915149689,0,2,2,12,12,8,-1,2,16,12,4,2,-.0826354920864105,.2439192980527878,.5160226225852966,0,2,7,7,7,2,-1,7,8,7,1,2,.0010261740535497665,.3886891901493073,.5767908096313477,0,2,0,2,18,2,-1,0,3,18,1,2,-.0016307090409100056,.3389458060264587,.5347700715065002,0,2,9,6,2,5,-1,9,6,1,5,2,.0024546680506318808,.4601413905620575,.638724684715271,0,2,7,5,3,8,-1,8,5,1,8,3,-.0009947651997208595,.5769879221916199,.4120396077632904,0,2,9,6,3,4,-1,10,6,1,4,3,.0154091902077198,.4878709018230438,.7089822292327881,0,2,4,13,3,2,-1,4,14,3,1,2,.001178440055809915,.5263553261756897,.2895244956016541,0,2,9,4,6,3,-1,11,4,2,3,3,-.0277019198983908,.149882897734642,.5219606757164001,0,2,5,4,6,3,-1,7,4,2,3,3,-.0295053999871016,.024893319234252,.4999816119670868,0,2,14,11,5,2,-1,14,12,5,1,2,.0004515943001024425,.5464622974395752,.4029662907123566,0,2,1,2,6,9,-1,3,2,2,9,3,.007177263963967562,.4271056950092316,.5866296887397766,0,2,14,6,6,13,-1,14,6,3,13,2,-.0741820484399796,.6874179244041443,.4919027984142304,0,3,3,6,14,8,-1,3,6,7,4,2,10,10,7,4,2,-.0172541607171297,.3370676040649414,.534873902797699,0,2,16,0,4,11,-1,16,0,2,11,2,.0148515598848462,.4626792967319489,.6129904985427856,0,3,3,4,12,12,-1,3,4,6,6,2,9,10,6,6,2,.0100020002573729,.5346122980117798,.3423453867435455,0,2,11,4,5,3,-1,11,5,5,1,3,.0020138120744377375,.4643830060958862,.5824304223060608,0,2,4,11,4,2,-1,4,12,4,1,2,.0015135470312088728,.5196396112442017,.2856149971485138,0,2,10,7,2,2,-1,10,7,1,2,2,.003138143103569746,.4838162958621979,.5958529710769653,0,2,8,7,2,2,-1,9,7,1,2,2,-.005145044066011906,.8920302987098694,.4741412103176117,0,2,9,17,3,2,-1,10,17,1,2,3,-.004473670851439238,.2033942937850952,.5337278842926025,0,2,5,6,3,3,-1,5,7,3,1,3,.001962847076356411,.457163393497467,.6725863218307495,0,2,10,0,3,3,-1,11,0,1,3,3,.005426045041531324,.5271108150482178,.2845670878887177,0,3,5,6,6,2,-1,5,6,3,1,2,8,7,3,1,2,.0004961146041750908,.4138312935829163,.5718597769737244,0,2,12,16,4,3,-1,12,17,4,1,3,.009372878819704056,.5225151181221008,.2804847061634064,0,2,3,12,3,2,-1,3,13,3,1,2,.0006050089723430574,.523676872253418,.3314523994922638,0,2,9,12,3,2,-1,9,13,3,1,2,.0005679255118593574,.4531059861183167,.6276971101760864,0,3,1,11,16,4,-1,1,11,8,2,2,9,13,8,2,2,.0246443394571543,.5130851864814758,.2017143964767456,0,2,12,4,3,3,-1,12,5,3,1,3,-.0102904504165053,.7786595225334167,.4876641035079956,0,2,4,4,5,3,-1,4,5,5,1,3,.002062941901385784,.4288598895072937,.5881264209747314,0,2,12,16,4,3,-1,12,17,4,1,3,-.005051948130130768,.3523977994918823,.5286008715629578,0,2,5,4,3,3,-1,5,5,3,1,3,-.0057692620903253555,.6841086149215698,.4588094055652618,0,2,9,0,2,2,-1,9,1,2,1,2,-.0004578994121402502,.356552004814148,.5485978126525879,0,2,8,9,4,2,-1,8,10,4,1,2,-.0007591883768327534,.336879312992096,.5254197120666504,0,2,8,8,4,3,-1,8,9,4,1,3,-.001773725962266326,.3422161042690277,.5454015135765076,0,2,0,13,6,3,-1,2,13,2,3,3,-.008561046794056892,.6533612012863159,.4485856890678406,0,2,16,14,3,2,-1,16,15,3,1,2,.0017277270089834929,.5307580232620239,.3925352990627289,0,2,1,18,18,2,-1,7,18,6,2,3,-.0281996093690395,.685745894908905,.4588584005832672,0,2,16,14,3,2,-1,16,15,3,1,2,-.001778110978193581,.4037851095199585,.5369856953620911,0,2,1,14,3,2,-1,1,15,3,1,2,.00033177141449414194,.539979875087738,.3705750107765198,0,2,7,14,6,3,-1,7,15,6,1,3,.0026385399978607893,.4665437042713165,.6452730894088745,0,2,5,14,8,3,-1,5,15,8,1,3,-.0021183069329708815,.5914781093597412,.4064677059650421,0,2,10,6,4,14,-1,10,6,2,14,2,-.0147732896730304,.3642038106918335,.5294762849807739,0,2,6,6,4,14,-1,8,6,2,14,2,-.0168154407292604,.2664231956005096,.5144972801208496,0,2,13,5,2,3,-1,13,6,2,1,3,-.006337014026939869,.6779531240463257,.4852097928524017,0,2,7,16,6,1,-1,9,16,2,1,3,-44560048991115764e-21,.5613964796066284,.4153054058551788,0,2,9,12,3,3,-1,9,13,3,1,3,-.0010240620467811823,.5964478254318237,.4566304087638855,0,2,7,0,3,3,-1,8,0,1,3,3,-.00231616897508502,.2976115047931671,.5188159942626953,0,2,4,0,16,18,-1,4,9,16,9,2,.5321757197380066,.5187839269638062,.220263198018074,0,2,1,1,16,14,-1,1,8,16,7,2,-.1664305031299591,.1866022944450378,.5060343146324158,0,2,3,9,15,4,-1,8,9,5,4,3,.112535297870636,.5212125182151794,.1185022965073586,0,2,6,12,7,3,-1,6,13,7,1,3,.009304686449468136,.4589937031269074,.6826149225234985,0,2,14,15,2,3,-1,14,16,2,1,3,-.004625509958714247,.3079940974712372,.5225008726119995,0,3,2,3,16,14,-1,2,3,8,7,2,10,10,8,7,2,-.1111646965146065,.2101044058799744,.5080801844596863,0,3,16,2,4,18,-1,18,2,2,9,2,16,11,2,9,2,-.0108884396031499,.5765355229377747,.4790464043617249,0,2,4,15,2,3,-1,4,16,2,1,3,.005856430158019066,.5065100193023682,.1563598960638046,0,3,16,2,4,18,-1,18,2,2,9,2,16,11,2,9,2,.0548543892800808,.49669149518013,.7230510711669922,0,2,1,1,8,3,-1,1,2,8,1,3,-.0111973397433758,.2194979041814804,.5098798274993896,0,2,8,11,4,3,-1,8,12,4,1,3,.004406907130032778,.4778401851654053,.6770902872085571,0,2,5,11,5,9,-1,5,14,5,3,3,-.0636652931571007,.1936362981796265,.5081024169921875,0,2,16,0,4,11,-1,16,0,2,11,2,-.009808149188756943,.599906325340271,.4810341000556946,0,2,7,0,6,1,-1,9,0,2,1,3,-.0021717099007219076,.3338333964347839,.5235472917556763,0,2,16,3,3,7,-1,17,3,1,7,3,-.0133155202493072,.6617069840431213,.4919213056564331,0,2,1,3,3,7,-1,2,3,1,7,3,.002544207964092493,.4488744139671326,.6082184910774231,0,2,7,8,6,12,-1,7,12,6,4,3,.0120378397405148,.540939211845398,.3292432129383087,0,2,0,0,4,11,-1,2,0,2,11,2,-.0207010507583618,.6819120049476624,.4594995975494385,0,2,14,0,6,20,-1,14,0,3,20,2,.0276082791388035,.4630792140960693,.5767282843589783,0,2,0,3,1,2,-1,0,4,1,1,2,.0012370620388537645,.5165379047393799,.2635016143321991,0,3,5,5,10,8,-1,10,5,5,4,2,5,9,5,4,2,-.037669338285923,.2536393105983734,.5278980135917664,0,3,4,7,12,4,-1,4,7,6,2,2,10,9,6,2,2,-.0018057259730994701,.3985156118869782,.5517500042915344,54.62007141113281,111,0,2,2,1,6,4,-1,5,1,3,4,2,.004429902881383896,.2891018092632294,.633522629737854,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.0023813319858163595,.621178925037384,.3477487862110138,0,2,5,6,2,6,-1,5,9,2,3,2,.0022915711160749197,.2254412025213242,.5582118034362793,0,3,9,16,6,4,-1,12,16,3,2,2,9,18,3,2,2,.0009945794008672237,.3711710870265961,.5930070877075195,0,2,9,4,2,12,-1,9,10,2,6,2,.0007716466789133847,.565172016620636,.334799587726593,0,2,7,1,6,18,-1,9,1,2,18,3,-.001138641033321619,.3069126009941101,.5508630871772766,0,2,4,12,12,2,-1,8,12,4,2,3,-.0001640303962631151,.576282799243927,.3699047863483429,0,2,8,8,6,2,-1,8,9,6,1,2,29793529392918572e-21,.2644244134426117,.5437911152839661,0,2,8,0,3,6,-1,9,0,1,6,3,.008577490225434303,.5051138997077942,.1795724928379059,0,2,11,18,3,2,-1,11,19,3,1,2,-.0002603268949314952,.5826969146728516,.4446826875209808,0,2,1,1,17,4,-1,1,3,17,2,2,-.006140463054180145,.3113852143287659,.5346971750259399,0,2,11,8,4,12,-1,11,8,2,12,2,-.0230869501829147,.32779461145401,.533119797706604,0,2,8,14,4,3,-1,8,15,4,1,3,-.0142436502501369,.7381709814071655,.4588063061237335,0,2,12,3,2,17,-1,12,3,1,17,2,.0194871295243502,.5256630778312683,.2274471968412399,0,2,4,7,6,1,-1,6,7,2,1,3,-.0009668110869824886,.5511230826377869,.3815006911754608,0,2,18,3,2,3,-1,18,4,2,1,3,.003147470997646451,.5425636768341064,.2543726861476898,0,2,8,4,3,4,-1,8,6,3,2,2,-.00018026070029009134,.5380191802978516,.3406304121017456,0,2,4,5,12,10,-1,4,10,12,5,2,-.006026626098901033,.3035801947116852,.54205721616745,0,2,5,18,4,2,-1,7,18,2,2,2,.00044462960795499384,.3990997076034546,.5660110116004944,0,2,17,2,3,6,-1,17,4,3,2,3,.002260976005345583,.5562806725502014,.3940688073635101,0,2,7,7,6,6,-1,9,7,2,6,3,.0511330589652061,.4609653949737549,.7118561863899231,0,2,17,2,3,6,-1,17,4,3,2,3,-.0177863091230392,.2316166013479233,.5322144031524658,0,2,8,0,3,4,-1,9,0,1,4,3,-.004967962857335806,.233077198266983,.5122029185295105,0,2,9,14,2,3,-1,9,15,2,1,3,.002066768938675523,.4657444059848785,.6455488204956055,0,2,0,12,6,3,-1,0,13,6,1,3,.007441376801580191,.5154392123222351,.236163392663002,0,2,8,14,4,3,-1,8,15,4,1,3,-.003627727972343564,.6219773292541504,.4476661086082459,0,2,3,12,2,3,-1,3,13,2,1,3,-.005353075917810202,.1837355047464371,.5102208256721497,0,2,5,6,12,7,-1,9,6,4,7,3,.1453091949224472,.5145987272262573,.1535930931568146,0,2,0,2,3,6,-1,0,4,3,2,3,.0024394490756094456,.5343660116195679,.3624661862850189,0,2,14,6,1,3,-1,14,7,1,1,3,-.003128339070826769,.6215007901191711,.4845592081546783,0,2,2,0,3,14,-1,3,0,1,14,3,.0017940260004252195,.4299261868000031,.5824198126792908,0,2,12,14,5,6,-1,12,16,5,2,3,.0362538211047649,.5260334014892578,.1439467966556549,0,2,4,14,5,6,-1,4,16,5,2,3,-.005174672231078148,.350653886795044,.5287045240402222,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,.0006538329762406647,.4809640944004059,.6122040152549744,0,2,5,0,3,14,-1,6,0,1,14,3,-.0264802295714617,.1139362007379532,.5045586228370667,0,2,10,15,2,3,-1,10,16,2,1,3,-.0030440660193562508,.6352095007896423,.4794734120368958,0,2,0,2,2,3,-1,0,3,2,1,3,.0036993520334362984,.5131118297576904,.2498510926961899,0,2,5,11,12,6,-1,5,14,12,3,2,-.0003676293126773089,.54213947057724,.3709532022476196,0,2,6,11,3,9,-1,6,14,3,3,3,-.041382260620594,.1894959956407547,.5081691741943359,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,-.0010532729793339968,.645436704158783,.4783608913421631,0,2,5,6,1,3,-1,5,7,1,1,3,-.0021648600231856108,.6215031147003174,.449982613325119,0,2,4,9,13,3,-1,4,10,13,1,3,-.0005674774874933064,.3712610900402069,.5419334769248962,0,2,1,7,15,6,-1,6,7,5,6,3,.173758402466774,.5023643970489502,.1215742006897926,0,2,4,5,12,6,-1,8,5,4,6,3,-.0029049699660390615,.3240267932415009,.5381883978843689,0,2,8,10,4,3,-1,8,11,4,1,3,.0012299539521336555,.4165507853031158,.5703486204147339,0,2,15,14,1,3,-1,15,15,1,1,3,-.0005432923790067434,.3854042887687683,.554754912853241,0,2,1,11,5,3,-1,1,12,5,1,3,-.008329725824296474,.2204494029283524,.5097082853317261,0,2,7,1,7,12,-1,7,7,7,6,2,-.00010417630255687982,.560706615447998,.4303036034107208,0,3,0,1,6,10,-1,0,1,3,5,2,3,6,3,5,2,.0312047004699707,.4621657133102417,.6982004046440125,0,2,16,1,4,3,-1,16,2,4,1,3,.007894350215792656,.5269594192504883,.226906806230545,0,2,5,5,2,3,-1,5,6,2,1,3,-.004364531021565199,.6359223127365112,.4537956118583679,0,2,12,2,3,5,-1,13,2,1,5,3,.007679305970668793,.5274767875671387,.274048388004303,0,2,0,3,4,6,-1,0,5,4,2,3,-.0254311393946409,.2038519978523254,.5071732997894287,0,2,8,12,4,2,-1,8,13,4,1,2,.0008200060110539198,.4587455093860626,.6119868159294128,0,2,8,18,3,1,-1,9,18,1,1,3,.002928460016846657,.5071274042129517,.2028204947710037,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,4525647091213614e-20,.4812104105949402,.5430821776390076,0,3,7,10,2,2,-1,7,10,1,1,2,8,11,1,1,2,.0013158309739083052,.4625813961029053,.6779323220252991,0,2,11,11,4,4,-1,11,13,4,2,2,.0015870389761403203,.5386291742324829,.3431465029716492,0,2,8,12,3,8,-1,9,12,1,8,3,-.0215396601706743,.025942500680685,.5003222823143005,0,2,13,0,6,3,-1,13,1,6,1,3,.014334480278194,.5202844738960266,.1590632945299149,0,2,8,8,3,4,-1,9,8,1,4,3,-.008388138376176357,.728248119354248,.4648044109344482,0,3,5,7,10,10,-1,10,7,5,5,2,5,12,5,5,2,.00919068418443203,.556235671043396,.3923191130161285,0,3,3,18,8,2,-1,3,18,4,1,2,7,19,4,1,2,-.005845305975526571,.6803392767906189,.4629127979278565,0,2,10,2,6,8,-1,12,2,2,8,3,-.0547077991068363,.2561671137809753,.5206125974655151,0,2,4,2,6,8,-1,6,2,2,8,3,.009114277549088001,.518962025642395,.3053877055644989,0,2,11,0,3,7,-1,12,0,1,7,3,-.0155750000849366,.1295074969530106,.5169094800949097,0,2,7,11,2,1,-1,8,11,1,1,2,-.0001205060034408234,.5735098123550415,.4230825006961823,0,2,15,14,1,3,-1,15,15,1,1,3,.0012273970060050488,.5289878249168396,.4079791903495789,0,3,7,15,2,2,-1,7,15,1,1,2,8,16,1,1,2,-.0012186600361019373,.6575639843940735,.4574409127235413,0,2,15,14,1,3,-1,15,15,1,1,3,-.0033256649039685726,.3628047108650208,.5195019841194153,0,2,6,0,3,7,-1,7,0,1,7,3,-.0132883097976446,.1284265965223312,.504348874092102,0,2,18,1,2,7,-1,18,1,1,7,2,-.0033839771058410406,.6292240023612976,.475750595331192,0,2,2,0,8,20,-1,2,10,8,10,2,-.2195422053337097,.148773193359375,.5065013766288757,0,2,3,0,15,6,-1,3,2,15,2,3,.004911170806735754,.425610214471817,.5665838718414307,0,2,4,3,12,2,-1,4,4,12,1,2,-.00018744950648397207,.4004144072532654,.5586857199668884,0,2,16,0,4,5,-1,16,0,2,5,2,-.00521786417812109,.6009116172790527,.4812706112861633,0,2,7,0,3,4,-1,8,0,1,4,3,-.0011111519997939467,.3514933884143829,.5287089943885803,0,2,16,0,4,5,-1,16,0,2,5,2,.004403640050441027,.4642275869846344,.5924085974693298,0,2,1,7,6,13,-1,3,7,2,13,3,.1229949966073036,.5025529265403748,.0691524818539619,0,2,16,0,4,5,-1,16,0,2,5,2,-.0123135102912784,.5884591937065125,.4934012889862061,0,2,0,0,4,5,-1,2,0,2,5,2,.004147103987634182,.4372239112854004,.589347779750824,0,2,14,12,3,6,-1,14,14,3,2,3,-.003550264984369278,.4327551126480103,.5396270155906677,0,2,3,12,3,6,-1,3,14,3,2,3,-.0192242693156004,.1913134008646011,.5068330764770508,0,2,16,1,4,3,-1,16,2,4,1,3,.0014395059552043676,.5308178067207336,.424353301525116,0,3,8,7,2,10,-1,8,7,1,5,2,9,12,1,5,2,-.00677519990131259,.6365395784378052,.4540086090564728,0,2,11,11,4,4,-1,11,13,4,2,2,.007011963054537773,.5189834237098694,.302619993686676,0,2,0,1,4,3,-1,0,2,4,1,3,.005401465110480785,.5105062127113342,.2557682991027832,0,2,13,4,1,3,-1,13,5,1,1,3,.0009027498890645802,.4696914851665497,.5861827731132507,0,2,7,15,3,5,-1,8,15,1,5,3,.0114744501188397,.5053645968437195,.152717798948288,0,2,9,7,3,5,-1,10,7,1,5,3,-.006702343001961708,.6508980989456177,.4890604019165039,0,2,8,7,3,5,-1,9,7,1,5,3,-.0020462959073483944,.6241816878318787,.4514600038528442,0,2,10,6,4,14,-1,10,6,2,14,2,-.009995156899094582,.3432781100273132,.5400953888893127,0,2,0,5,5,6,-1,0,7,5,2,3,-.0357007086277008,.1878059059381485,.5074077844619751,0,2,9,5,6,4,-1,9,5,3,4,2,.0004558456130325794,.3805277049541473,.5402569770812988,0,2,0,0,18,10,-1,6,0,6,10,3,-.0542606003582478,.6843714714050293,.4595097005367279,0,2,10,6,4,14,-1,10,6,2,14,2,.0060600461438298225,.5502905249595642,.450052797794342,0,2,6,6,4,14,-1,8,6,2,14,2,-.006479183211922646,.3368858098983765,.5310757160186768,0,2,13,4,1,3,-1,13,5,1,1,3,-.0014939469983801246,.6487640142440796,.4756175875663757,0,2,5,1,2,3,-1,6,1,1,3,2,14610530342906713e-21,.403457909822464,.5451064109802246,0,3,18,1,2,18,-1,19,1,1,9,2,18,10,1,9,2,-.00723219383507967,.6386873722076416,.4824739992618561,0,2,2,1,4,3,-1,2,2,4,1,3,-.004064581822603941,.2986421883106232,.5157335996627808,0,3,18,1,2,18,-1,19,1,1,9,2,18,10,1,9,2,.0304630808532238,.5022199749946594,.7159956097602844,0,3,1,14,4,6,-1,1,14,2,3,2,3,17,2,3,2,-.008054491132497787,.6492452025413513,.4619275033473969,0,2,10,11,7,6,-1,10,13,7,2,3,.0395051389932632,.5150570869445801,.2450613975524902,0,3,0,10,6,10,-1,0,10,3,5,2,3,15,3,5,2,.008453020825982094,.4573669135570526,.6394037008285522,0,2,11,0,3,4,-1,12,0,1,4,3,-.0011688120430335402,.3865512013435364,.548366129398346,0,2,5,10,5,6,-1,5,13,5,3,2,.002807067008689046,.5128579139709473,.2701480090618134,0,2,14,6,1,8,-1,14,10,1,4,2,.000473652093205601,.4051581919193268,.5387461185455322,0,3,1,7,18,6,-1,1,7,9,3,2,10,10,9,3,2,.0117410803213716,.5295950174331665,.3719413876533508,0,2,9,7,2,2,-1,9,7,1,2,2,.0031833238899707794,.4789406955242157,.6895126104354858,0,2,5,9,4,5,-1,7,9,2,5,2,.0007024150108918548,.5384489297866821,.3918080925941467,50.16973114013672,102,0,2,7,6,6,3,-1,9,6,2,3,3,.0170599296689034,.3948527872562408,.7142534852027893,0,2,1,0,18,4,-1,7,0,6,4,3,.0218408405780792,.3370316028594971,.6090016961097717,0,2,7,15,2,4,-1,7,17,2,2,2,.00024520049919374287,.3500576019287109,.5987902283668518,0,2,1,0,19,9,-1,1,3,19,3,3,.008327260613441467,.3267528116703033,.5697240829467773,0,2,3,7,3,6,-1,3,9,3,2,3,.0005714829894714057,.3044599890708923,.5531656742095947,0,3,13,7,4,4,-1,15,7,2,2,2,13,9,2,2,2,.0006737398798577487,.3650012016296387,.567263126373291,0,3,3,7,4,4,-1,3,7,2,2,2,5,9,2,2,2,3468159047770314e-20,.3313541114330292,.5388727188110352,0,2,9,6,10,8,-1,9,10,10,4,2,-.005856339819729328,.2697942852973938,.5498778820037842,0,2,3,8,14,12,-1,3,14,14,6,2,.00851022731512785,.5269358158111572,.2762879133224487,0,3,6,5,10,12,-1,11,5,5,6,2,6,11,5,6,2,-.0698172077536583,.2909603118896484,.5259246826171875,0,2,9,11,2,3,-1,9,12,2,1,3,-.0008611367084085941,.5892577171325684,.4073697924613953,0,2,9,5,6,5,-1,9,5,3,5,2,.0009714924963191152,.3523564040660858,.5415862202644348,0,2,9,4,2,4,-1,9,6,2,2,2,-1472749045206001e-20,.5423017740249634,.3503156006336212,0,2,9,5,6,5,-1,9,5,3,5,2,.0484202913939953,.51939457654953,.3411195874214172,0,2,5,5,6,5,-1,8,5,3,5,2,.0013257140526548028,.315776914358139,.5335376262664795,0,2,11,2,6,1,-1,13,2,2,1,3,1492214960308047e-20,.4451299905776978,.5536553859710693,0,2,3,2,6,1,-1,5,2,2,1,3,-.002717339899390936,.3031741976737976,.5248088836669922,0,2,13,5,2,3,-1,13,6,2,1,3,.0029219500720500946,.4781453013420105,.6606041789054871,0,2,0,10,1,4,-1,0,12,1,2,2,-.0019804988987743855,.3186308145523071,.5287625193595886,0,2,13,5,2,3,-1,13,6,2,1,3,-.004001210909336805,.6413596868515015,.4749928116798401,0,2,8,18,3,2,-1,9,18,1,2,3,-.004349199123680592,.1507498025894165,.5098996758460999,0,2,6,15,9,2,-1,6,16,9,1,2,.0013490889687091112,.4316158890724182,.5881167054176331,0,2,8,14,4,3,-1,8,15,4,1,3,.0185970701277256,.4735553860664368,.9089794158935547,0,2,18,4,2,4,-1,18,6,2,2,2,-.001856237999163568,.3553189039230347,.5577837228775024,0,2,5,5,2,3,-1,5,6,2,1,3,.002294043079018593,.4500094950199127,.6580877900123596,0,2,15,16,3,2,-1,15,17,3,1,2,.00029982850537635386,.5629242062568665,.3975878953933716,0,2,0,0,3,9,-1,0,3,3,3,3,.0035455459728837013,.5381547212600708,.3605485856533051,0,2,9,7,3,3,-1,9,8,3,1,3,.009610472247004509,.5255997180938721,.1796745955944061,0,2,8,7,3,3,-1,8,8,3,1,3,-.0062783220782876015,.227285698056221,.5114030241966248,0,2,9,5,2,6,-1,9,5,1,6,2,.0034598479978740215,.4626308083534241,.6608219146728516,0,2,8,6,3,4,-1,9,6,1,4,3,-.0013112019514665008,.6317539811134338,.4436857998371124,0,3,7,6,8,12,-1,11,6,4,6,2,7,12,4,6,2,.002687617903575301,.5421109795570374,.4054022133350372,0,3,5,6,8,12,-1,5,6,4,6,2,9,12,4,6,2,.003911816980689764,.5358477830886841,.3273454904556274,0,2,12,4,3,3,-1,12,5,3,1,3,-.014206450432539,.7793576717376709,.4975781142711639,0,2,2,16,3,2,-1,2,17,3,1,2,.0007170552853494883,.5297319889068604,.3560903966426849,0,2,12,4,3,3,-1,12,5,3,1,3,.001663501956500113,.467809408903122,.5816481709480286,0,2,2,12,6,6,-1,2,14,6,2,3,.0033686188980937004,.5276734232902527,.3446420133113861,0,2,7,13,6,3,-1,7,14,6,1,3,.0127995302900672,.4834679961204529,.7472159266471863,0,2,6,14,6,3,-1,6,15,6,1,3,.0033901201095432043,.4511859118938446,.6401721239089966,0,2,14,15,5,3,-1,14,16,5,1,3,.004707077983766794,.533565878868103,.355522096157074,0,2,5,4,3,3,-1,5,5,3,1,3,.0014819339849054813,.4250707030296326,.5772724151611328,0,2,14,15,5,3,-1,14,16,5,1,3,-.0069995759986341,.3003320097923279,.5292900204658508,0,2,5,3,6,2,-1,7,3,2,2,3,.0159390103071928,.5067319273948669,.1675581932067871,0,2,8,15,4,3,-1,8,16,4,1,3,.007637734990566969,.4795069992542267,.7085601091384888,0,2,1,15,5,3,-1,1,16,5,1,3,.006733404006808996,.5133113265037537,.2162470072507858,0,3,8,13,4,6,-1,10,13,2,3,2,8,16,2,3,2,-.012858809903264,.1938841938972473,.525137186050415,0,2,7,8,3,3,-1,8,8,1,3,3,-.0006227080011740327,.5686538219451904,.419786810874939,0,2,12,0,5,4,-1,12,2,5,2,2,-.0005265168147161603,.4224168956279755,.5429695844650269,0,3,0,2,20,2,-1,0,2,10,1,2,10,3,10,1,2,.0110750999301672,.5113775134086609,.2514517903327942,0,2,1,0,18,4,-1,7,0,6,4,3,-.0367282517254353,.7194662094116211,.4849618971347809,0,2,4,3,6,1,-1,6,3,2,1,3,-.00028207109426148236,.3840261995792389,.539444625377655,0,2,4,18,13,2,-1,4,19,13,1,2,-.0027489690110087395,.593708872795105,.4569182097911835,0,2,2,10,3,6,-1,2,12,3,2,3,.0100475195795298,.5138576030731201,.2802298069000244,0,3,14,12,6,8,-1,17,12,3,4,2,14,16,3,4,2,-.008149784058332443,.6090037226676941,.4636121094226837,0,3,4,13,10,6,-1,4,13,5,3,2,9,16,5,3,2,-.006883388850837946,.3458611071109772,.5254660248756409,0,2,14,12,1,2,-1,14,13,1,1,2,-140393603942357e-19,.5693104267120361,.4082083106040955,0,2,8,13,4,3,-1,8,14,4,1,3,.001549841952510178,.4350537061691284,.5806517004966736,0,2,14,12,2,2,-1,14,13,2,1,2,-.006784149911254644,.1468873023986816,.5182775259017944,0,2,4,12,2,2,-1,4,13,2,1,2,.00021705629478674382,.5293524265289307,.345617413520813,0,2,8,12,9,2,-1,8,13,9,1,2,.00031198898795992136,.4652450978755951,.5942413806915283,0,2,9,14,2,3,-1,9,15,2,1,3,.005450753029435873,.4653508961200714,.7024846076965332,0,2,11,10,3,6,-1,11,13,3,3,2,-.00025818689027801156,.5497295260429382,.3768967092037201,0,2,5,6,9,12,-1,5,12,9,6,2,-.0174425393342972,.3919087946414948,.5457497835159302,0,2,11,10,3,6,-1,11,13,3,3,2,-.045343529433012,.1631357073783875,.5154908895492554,0,2,6,10,3,6,-1,6,13,3,3,2,.0019190689781680703,.514589786529541,.2791895866394043,0,2,5,4,11,3,-1,5,5,11,1,3,-.006017786916345358,.6517636179924011,.4756332933902741,0,2,7,1,5,10,-1,7,6,5,5,2,-.004072073847055435,.5514652729034424,.4092685878276825,0,2,2,8,18,2,-1,2,9,18,1,2,.00039855059003457427,.316524088382721,.5285550951957703,0,2,7,17,5,3,-1,7,18,5,1,3,-.0065418570302426815,.6853377819061279,.4652808904647827,0,2,5,9,12,1,-1,9,9,4,1,3,.003484508953988552,.5484588146209717,.4502759873867035,0,3,0,14,6,6,-1,0,14,3,3,2,3,17,3,3,2,-.0136967804282904,.6395779848098755,.4572555124759674,0,2,5,9,12,1,-1,9,9,4,1,3,-.017347140237689,.2751072943210602,.5181614756584167,0,2,3,9,12,1,-1,7,9,4,1,3,-.004088542889803648,.3325636088848114,.5194984078407288,0,2,14,10,6,7,-1,14,10,3,7,2,-.009468790143728256,.5942280888557434,.485181987285614,0,2,1,0,16,2,-1,1,1,16,1,2,.0017084840219467878,.4167110919952393,.5519806146621704,0,2,10,9,10,9,-1,10,12,10,3,3,.009480909444391727,.5433894991874695,.4208514988422394,0,2,0,1,10,2,-1,5,1,5,2,2,-.004738965071737766,.6407189965248108,.4560655057430267,0,2,17,3,2,3,-1,17,4,2,1,3,.006576105020940304,.5214555263519287,.2258227020502091,0,2,1,3,2,3,-1,1,4,2,1,3,-.0021690549328923225,.3151527941226959,.5156704783439636,0,2,9,7,3,6,-1,10,7,1,6,3,.014660170301795,.4870837032794952,.668994128704071,0,2,6,5,4,3,-1,8,5,2,3,2,.00017231999663636088,.3569748997688294,.5251078009605408,0,2,7,5,6,6,-1,9,5,2,6,3,-.0218037609010935,.8825920820236206,.496632993221283,0,3,3,4,12,12,-1,3,4,6,6,2,9,10,6,6,2,-.0947361066937447,.1446162015199661,.5061113834381104,0,2,9,2,6,15,-1,11,2,2,15,3,.0055825551971793175,.5396478772163391,.4238066077232361,0,2,2,2,6,17,-1,4,2,2,17,3,.001951709040440619,.4170410931110382,.5497786998748779,0,2,14,10,6,7,-1,14,10,3,7,2,.0121499001979828,.4698367118835449,.5664274096488953,0,2,0,10,6,7,-1,3,10,3,7,2,-.007516962010413408,.6267772912979126,.4463135898113251,0,2,9,2,6,15,-1,11,2,2,15,3,-.0716679096221924,.3097011148929596,.5221003293991089,0,2,5,2,6,15,-1,7,2,2,15,3,-.0882924199104309,.0811238884925842,.5006365180015564,0,2,17,9,3,6,-1,17,11,3,2,3,.0310630798339844,.5155503749847412,.1282255947589874,0,2,6,7,6,6,-1,8,7,2,6,3,.0466218404471874,.4699777960777283,.736396074295044,0,3,1,10,18,6,-1,10,10,9,3,2,1,13,9,3,2,-.0121894897893071,.3920530080795288,.5518996715545654,0,2,0,9,10,9,-1,0,12,10,3,3,.0130161102861166,.5260658264160156,.3685136139392853,0,2,8,15,4,3,-1,8,16,4,1,3,-.003495289944112301,.6339294910430908,.4716280996799469,0,2,5,12,3,4,-1,5,14,3,2,2,-4401503974804655e-20,.5333027243614197,.3776184916496277,0,2,3,3,16,12,-1,3,9,16,6,2,-.1096649020910263,.1765342056751251,.5198346972465515,0,3,1,1,12,12,-1,1,1,6,6,2,7,7,6,6,2,-.0009027955820783973,.5324159860610962,.3838908076286316,0,3,10,4,2,4,-1,11,4,1,2,2,10,6,1,2,2,.0007112664170563221,.4647929966449738,.5755224227905273,0,3,0,9,10,2,-1,0,9,5,1,2,5,10,5,1,2,-.003125027986243367,.323670893907547,.5166770815849304,0,2,9,11,3,3,-1,9,12,3,1,3,.002414467977359891,.4787439107894898,.6459717750549316,0,2,3,12,9,2,-1,3,13,9,1,2,.00044391240226104856,.4409308135509491,.6010255813598633,0,2,9,9,2,2,-1,9,10,2,1,2,-.0002261118934256956,.4038113951683044,.5493255853652954,66.66912078857422,135,0,2,3,4,13,6,-1,3,6,13,2,3,-.0469012893736362,.660017192363739,.3743801116943359,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.001456834957934916,.578399121761322,.3437797129154205,0,2,1,0,6,8,-1,4,0,3,8,2,.005559836979955435,.3622266948223114,.5908216238021851,0,2,9,5,2,12,-1,9,11,2,6,2,.0007317048730328679,.550041913986206,.2873558104038239,0,2,4,4,3,10,-1,4,9,3,5,2,.001331800944171846,.267316997051239,.5431019067764282,0,2,6,17,8,3,-1,6,18,8,1,3,.00024347059661522508,.3855027854442596,.574138879776001,0,2,0,5,10,6,-1,0,7,10,2,3,-.0030512469820678234,.5503209829330444,.3462845087051392,0,2,13,2,3,2,-1,13,3,3,1,2,-.0006865719915367663,.3291221857070923,.5429509282112122,0,2,7,5,4,5,-1,9,5,2,5,2,.001466820016503334,.3588382005691528,.5351811051368713,0,2,12,14,3,6,-1,12,16,3,2,3,.0003202187072020024,.429684191942215,.5700234174728394,0,2,1,11,8,2,-1,1,12,8,1,2,.0007412218837998807,.5282164812088013,.3366870880126953,0,2,7,13,6,3,-1,7,14,6,1,3,.0038330298848450184,.4559567868709564,.6257336139678955,0,2,0,5,3,6,-1,0,7,3,2,3,-.0154564399272203,.2350116968154907,.512945294380188,0,2,13,2,3,2,-1,13,3,3,1,2,.002679677912965417,.5329415202140808,.4155062139034271,0,3,4,14,4,6,-1,4,14,2,3,2,6,17,2,3,2,.0028296569362282753,.4273087978363037,.5804538130760193,0,2,13,2,3,2,-1,13,3,3,1,2,-.0039444249123334885,.2912611961364746,.5202686190605164,0,2,8,2,4,12,-1,8,6,4,4,3,.002717955969274044,.5307688117027283,.3585677146911621,0,3,14,0,6,8,-1,17,0,3,4,2,14,4,3,4,2,.005907762795686722,.470377504825592,.5941585898399353,0,2,7,17,3,2,-1,8,17,1,2,3,-.004224034957587719,.2141567021608353,.5088796019554138,0,2,8,12,4,2,-1,8,13,4,1,2,.0040725888684391975,.4766413867473602,.6841061115264893,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0101495301350951,.5360798835754395,.3748497068881989,0,3,14,0,2,10,-1,15,0,1,5,2,14,5,1,5,2,-.00018864999583456665,.5720130205154419,.3853805065155029,0,3,5,3,8,6,-1,5,3,4,3,2,9,6,4,3,2,-.0048864358104765415,.3693122863769531,.5340958833694458,0,3,14,0,6,10,-1,17,0,3,5,2,14,5,3,5,2,.0261584799736738,.4962374866008759,.6059989929199219,0,2,9,14,1,2,-1,9,15,1,1,2,.0004856075975112617,.4438945949077606,.6012468934059143,0,2,15,10,4,3,-1,15,11,4,1,3,.0112687097862363,.5244250297546387,.1840388029813767,0,2,8,14,2,3,-1,8,15,2,1,3,-.0028114619199186563,.6060283780097961,.4409897029399872,0,3,3,13,14,4,-1,10,13,7,2,2,3,15,7,2,2,-.005611272994428873,.3891170918941498,.5589237213134766,0,2,1,10,4,3,-1,1,11,4,1,3,.008568009361624718,.5069345831871033,.2062619030475617,0,2,9,11,6,1,-1,11,11,2,1,3,-.00038172779022715986,.5882201790809631,.41926109790802,0,2,5,11,6,1,-1,7,11,2,1,3,-.00017680290329735726,.5533605813980103,.400336891412735,0,2,3,5,16,15,-1,3,10,16,5,3,.006511253770440817,.3310146927833557,.5444191098213196,0,2,6,12,4,2,-1,8,12,2,2,2,-6594868318643421e-20,.5433831810951233,.3944905996322632,0,3,4,4,12,10,-1,10,4,6,5,2,4,9,6,5,2,.006993905175477266,.5600358247756958,.4192714095115662,0,2,8,6,3,4,-1,9,6,1,4,3,-.0046744439750909805,.6685466766357422,.4604960978031158,0,3,8,12,4,8,-1,10,12,2,4,2,8,16,2,4,2,.0115898502990603,.5357121229171753,.2926830053329468,0,2,8,14,4,3,-1,8,15,4,1,3,.013007840141654,.4679817855358124,.730746328830719,0,2,12,2,3,2,-1,13,2,1,2,3,-.0011008579749614,.3937501013278961,.5415065288543701,0,2,8,15,3,2,-1,8,16,3,1,2,.0006047264905646443,.4242376089096069,.5604041218757629,0,2,6,0,9,14,-1,9,0,3,14,3,-.0144948400557041,.3631210029125214,.5293182730674744,0,2,9,6,2,3,-1,10,6,1,3,2,-.005305694881826639,.686045229434967,.4621821045875549,0,2,10,8,2,3,-1,10,9,2,1,3,-.00081829127157107,.3944096863269806,.542043924331665,0,2,0,9,4,6,-1,0,11,4,2,3,-.0190775208175182,.1962621957063675,.5037891864776611,0,2,6,0,8,2,-1,6,1,8,1,2,.00035549470339901745,.4086259007453919,.5613973140716553,0,2,6,14,7,3,-1,6,15,7,1,3,.0019679730758070946,.448912113904953,.5926123261451721,0,2,8,10,8,9,-1,8,13,8,3,3,.006918914150446653,.5335925817489624,.3728385865688324,0,2,5,2,3,2,-1,6,2,1,2,3,.002987277926877141,.5111321210861206,.2975643873214722,0,3,14,1,6,8,-1,17,1,3,4,2,14,5,3,4,2,-.006226461846381426,.5541489720344543,.4824537932872772,0,3,0,1,6,8,-1,0,1,3,4,2,3,5,3,4,2,.013353300280869,.4586423933506012,.6414797902107239,0,3,1,2,18,6,-1,10,2,9,3,2,1,5,9,3,2,.0335052385926247,.5392425060272217,.3429994881153107,0,2,9,3,2,1,-1,10,3,1,1,2,-.0025294460356235504,.1703713983297348,.5013315081596375,0,3,13,2,4,6,-1,15,2,2,3,2,13,5,2,3,2,-.001280162949115038,.5305461883544922,.4697405099868774,0,2,5,4,3,3,-1,5,5,3,1,3,.007068738806992769,.4615545868873596,.643650472164154,0,2,13,5,1,3,-1,13,6,1,1,3,.0009688049904070795,.4833599030971527,.6043894290924072,0,2,2,16,5,3,-1,2,17,5,1,3,.003964765928685665,.5187637209892273,.323181688785553,0,3,13,2,4,6,-1,15,2,2,3,2,13,5,2,3,2,-.022057730704546,.4079256951808929,.520098090171814,0,3,3,2,4,6,-1,3,2,2,3,2,5,5,2,3,2,-.0006690631271339953,.533160924911499,.3815600872039795,0,2,13,5,1,2,-1,13,6,1,1,2,-.0006700932863168418,.5655422210693359,.4688901901245117,0,2,5,5,2,2,-1,5,6,2,1,2,.000742845528293401,.4534381031990051,.6287400126457214,0,2,13,9,2,2,-1,13,9,1,2,2,.0022227810695767403,.5350633263587952,.3303655982017517,0,2,5,9,2,2,-1,6,9,1,2,2,-.005413052160292864,.1113687008619309,.500543475151062,0,2,13,17,3,2,-1,13,18,3,1,2,-14520040167553816e-21,.5628737807273865,.4325133860111237,0,3,6,16,4,4,-1,6,16,2,2,2,8,18,2,2,2,.00023369169502984732,.4165835082530975,.5447791218757629,0,2,9,16,2,3,-1,9,17,2,1,3,.004289454780519009,.4860391020774841,.6778649091720581,0,2,0,13,9,6,-1,0,15,9,2,3,.0059103150852024555,.52623051404953,.3612113893032074,0,2,9,14,2,6,-1,9,17,2,3,2,.0129005396738648,.5319377183914185,.32502880692482,0,2,9,15,2,3,-1,9,16,2,1,3,.004698297940194607,.461824506521225,.6665925979614258,0,2,1,10,18,6,-1,1,12,18,2,3,.0104398597031832,.550567090511322,.3883604109287262,0,2,8,11,4,2,-1,8,12,4,1,2,.0030443191062659025,.4697853028774262,.7301844954490662,0,2,7,9,6,2,-1,7,10,6,1,2,-.0006159375188872218,.3830839097499847,.5464984178543091,0,2,8,8,2,3,-1,8,9,2,1,3,-.0034247159492224455,.256630003452301,.5089530944824219,0,2,17,5,3,4,-1,18,5,1,4,3,-.009353856556117535,.6469966173171997,.49407958984375,0,2,1,19,18,1,-1,7,19,6,1,3,.0523389987647533,.4745982885360718,.787877082824707,0,2,9,0,3,2,-1,10,0,1,2,3,.0035765620414167643,.5306664705276489,.2748498022556305,0,2,1,8,1,6,-1,1,10,1,2,3,.0007155531784519553,.541312575340271,.4041908979415894,0,2,12,17,8,3,-1,12,17,4,3,2,-.0105166798457503,.6158512234687805,.4815283119678497,0,2,0,5,3,4,-1,1,5,1,4,3,.007734792772680521,.4695805907249451,.7028980851173401,0,2,9,7,2,3,-1,9,8,2,1,3,-.004322677850723267,.2849566042423248,.5304684042930603,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,-.0025534399319440126,.7056984901428223,.4688892066478729,0,2,11,3,2,5,-1,11,3,1,5,2,.00010268510231981054,.3902932107448578,.5573464035987854,0,2,7,3,2,5,-1,8,3,1,5,2,7139518857002258e-21,.368423193693161,.526398777961731,0,2,15,13,2,3,-1,15,14,2,1,3,-.0016711989883333445,.3849175870418549,.5387271046638489,0,2,5,6,2,3,-1,5,7,2,1,3,.004926044959574938,.4729771912097931,.7447251081466675,0,2,4,19,15,1,-1,9,19,5,1,3,.0043908702209591866,.4809181094169617,.5591921806335449,0,2,1,19,15,1,-1,6,19,5,1,3,-.0177936293184757,.6903678178787231,.4676927030086517,0,2,15,13,2,3,-1,15,14,2,1,3,.002046966925263405,.5370690226554871,.3308162093162537,0,2,5,0,4,15,-1,7,0,2,15,2,.0298914890736341,.5139865279197693,.3309059143066406,0,2,9,6,2,5,-1,9,6,1,5,2,.0015494900289922953,.466023713350296,.6078342795372009,0,2,9,5,2,7,-1,10,5,1,7,2,.001495696953497827,.4404835999011993,.5863919854164124,0,2,16,11,3,3,-1,16,12,3,1,3,.0009588592802174389,.5435971021652222,.4208523035049439,0,2,1,11,3,3,-1,1,12,3,1,3,.0004964370164088905,.5370578169822693,.4000622034072876,0,2,6,6,8,3,-1,6,7,8,1,3,-.00272808107547462,.5659412741661072,.4259642958641052,0,2,0,15,6,2,-1,0,16,6,1,2,.0023026480339467525,.5161657929420471,.3350869119167328,0,2,1,0,18,6,-1,7,0,6,6,3,.2515163123607636,.4869661927223206,.714730978012085,0,2,6,0,3,4,-1,7,0,1,4,3,-.004632802214473486,.27274489402771,.5083789825439453,0,3,14,10,4,10,-1,16,10,2,5,2,14,15,2,5,2,-.0404344908893108,.6851438879966736,.5021767020225525,0,2,3,2,3,2,-1,4,2,1,2,3,14972220014897175e-21,.428446501493454,.5522555112838745,0,2,11,2,2,2,-1,11,3,2,1,2,-.00024050309730228037,.4226118922233582,.5390074849128723,0,3,2,10,4,10,-1,2,10,2,5,2,4,15,2,5,2,.0236578397452831,.4744631946086884,.7504366040229797,0,3,0,13,20,6,-1,10,13,10,3,2,0,16,10,3,2,-.00814491044729948,.424505889415741,.5538362860679626,0,2,0,5,2,15,-1,1,5,1,15,2,-.003699213033542037,.5952357053756714,.4529713094234467,0,3,1,7,18,4,-1,10,7,9,2,2,1,9,9,2,2,-.0067718601785600185,.4137794077396393,.5473399758338928,0,2,0,0,2,17,-1,1,0,1,17,2,.004266953095793724,.4484114944934845,.5797994136810303,0,3,2,6,16,6,-1,10,6,8,3,2,2,9,8,3,2,.0017791989957913756,.5624858736991882,.4432444870471954,0,2,8,14,1,3,-1,8,15,1,1,3,.0016774770338088274,.4637751877307892,.63642418384552,0,2,8,15,4,2,-1,8,16,4,1,2,.0011732629500329494,.4544503092765808,.5914415717124939,0,3,5,2,8,2,-1,5,2,4,1,2,9,3,4,1,2,.000869981711730361,.5334752798080444,.3885917961597443,0,2,6,11,8,6,-1,6,14,8,3,2,.0007637834060005844,.5398585200309753,.374494194984436,0,2,9,13,2,2,-1,9,14,2,1,2,.00015684569370932877,.4317873120307922,.5614616274833679,0,2,18,4,2,6,-1,18,6,2,2,3,-.0215113703161478,.1785925030708313,.5185542702674866,0,2,9,12,2,2,-1,9,13,2,1,2,.00013081369979772717,.4342499077320099,.5682849884033203,0,2,18,4,2,6,-1,18,6,2,2,3,.021992040798068,.5161716938018799,.2379394024610519,0,2,9,13,1,3,-1,9,14,1,1,3,-.0008013650076463819,.598676323890686,.4466426968574524,0,2,18,4,2,6,-1,18,6,2,2,3,-.008273609913885593,.410821795463562,.5251057147979736,0,2,0,4,2,6,-1,0,6,2,2,3,.0036831789184361696,.5173814296722412,.339751809835434,0,2,9,12,3,3,-1,9,13,3,1,3,-.007952568121254444,.6888983249664307,.4845924079418182,0,2,3,13,2,3,-1,3,14,2,1,3,.0015382299898192286,.5178567171096802,.3454113900661469,0,2,13,13,4,3,-1,13,14,4,1,3,-.0140435304492712,.1678421050310135,.518866777420044,0,2,5,4,3,3,-1,5,5,3,1,3,.0014315890148282051,.436825692653656,.5655773878097534,0,2,5,2,10,6,-1,5,4,10,2,3,-.0340142287313938,.7802296280860901,.4959217011928558,0,2,3,13,4,3,-1,3,14,4,1,3,-.0120272999629378,.1585101038217545,.503223180770874,0,2,3,7,15,5,-1,8,7,5,5,3,.1331661939620972,.5163304805755615,.2755128145217896,0,2,3,7,12,2,-1,7,7,4,2,3,-.0015221949433907866,.372831791639328,.5214552283287048,0,2,10,3,3,9,-1,11,3,1,9,3,-.000939292716793716,.5838379263877869,.4511165022850037,0,2,8,6,4,6,-1,10,6,2,6,2,.0277197398245335,.4728286862373352,.7331544756889343,0,2,9,7,4,3,-1,9,8,4,1,3,.003103015013039112,.5302202105522156,.4101563096046448,0,2,0,9,4,9,-1,2,9,2,9,2,.0778612196445465,.4998334050178528,.127296194434166,0,2,9,13,3,5,-1,10,13,1,5,3,-.0158549398183823,.0508333593606949,.5165656208992004,0,2,7,7,6,3,-1,9,7,2,3,3,-.00497253006324172,.6798133850097656,.4684231877326965,0,2,9,7,3,5,-1,10,7,1,5,3,-.0009767650626599789,.6010771989822388,.4788931906223297,0,2,5,7,8,2,-1,9,7,4,2,2,-.0024647710379213095,.3393397927284241,.5220503807067871,0,2,5,9,12,2,-1,9,9,4,2,3,-.006793770007789135,.4365136921405792,.5239663124084473,0,2,5,6,10,3,-1,10,6,5,3,2,.0326080210506916,.505272388458252,.2425214946269989,0,2,10,12,3,1,-1,11,12,1,1,3,-.0005851442110724747,.5733973979949951,.4758574068546295,0,2,0,1,11,15,-1,0,6,11,5,3,-.0296326000243425,.3892289102077484,.5263597965240479,67.69892120361328,137,0,2,1,0,18,6,-1,7,0,6,6,3,.0465508513152599,.3276950120925903,.6240522861480713,0,2,7,7,6,1,-1,9,7,2,1,3,.007953712716698647,.4256485104560852,.6942939162254333,0,3,5,16,6,4,-1,5,16,3,2,2,8,18,3,2,2,.0006822156137786806,.3711487054824829,.59007328748703,0,2,6,5,9,8,-1,6,9,9,4,2,-.00019348249770700932,.2041133940219879,.53005450963974,0,2,5,10,2,6,-1,5,13,2,3,2,-.0002671050897333771,.5416126251220703,.3103179037570953,0,3,7,6,8,10,-1,11,6,4,5,2,7,11,4,5,2,.0027818060480058193,.5277832746505737,.3467069864273071,0,3,5,6,8,10,-1,5,6,4,5,2,9,11,4,5,2,-.000467790785478428,.5308231115341187,.3294492065906525,0,2,9,5,2,2,-1,9,6,2,1,2,-30335160772665404e-21,.577387273311615,.3852097094058991,0,2,5,12,8,2,-1,5,13,8,1,2,.0007803800981491804,.4317438900470734,.6150057911872864,0,2,10,2,8,2,-1,10,3,8,1,2,-.004255385138094425,.2933903932571411,.5324292778968811,0,3,4,0,2,10,-1,4,0,1,5,2,5,5,1,5,2,-.0002473561035003513,.5468844771385193,.3843030035495758,0,2,9,10,2,2,-1,9,11,2,1,2,-.00014724259381182492,.4281542897224426,.5755587220191956,0,2,2,8,15,3,-1,2,9,15,1,3,.0011864770203828812,.374730110168457,.5471466183662415,0,2,8,13,4,3,-1,8,14,4,1,3,.0023936580400913954,.4537783861160278,.6111528873443604,0,2,7,2,3,2,-1,8,2,1,2,3,-.0015390539774671197,.2971341907978058,.518953800201416,0,2,7,13,6,3,-1,7,14,6,1,3,-.007196879014372826,.6699066758155823,.4726476967334747,0,2,9,9,2,2,-1,9,10,2,1,2,-.0004149978922214359,.3384954035282135,.5260317921638489,0,2,17,2,3,6,-1,17,4,3,2,3,.004435983020812273,.539912223815918,.3920140862464905,0,2,1,5,3,4,-1,2,5,1,4,3,.0026606200262904167,.4482578039169312,.6119617819786072,0,2,14,8,4,6,-1,14,10,4,2,3,-.0015287200221791863,.3711237907409668,.5340266227722168,0,2,1,4,3,8,-1,2,4,1,8,3,-.0047397250309586525,.603108823299408,.4455145001411438,0,2,8,13,4,6,-1,8,16,4,3,2,-.0148291299119592,.2838754057884216,.5341861844062805,0,2,3,14,2,2,-1,3,15,2,1,2,.0009227555710822344,.5209547281265259,.3361653983592987,0,2,14,8,4,6,-1,14,10,4,2,3,.0835298076272011,.5119969844818115,.0811644494533539,0,2,2,8,4,6,-1,2,10,4,2,3,-.0007563314866274595,.331712007522583,.5189831256866455,0,2,10,14,1,6,-1,10,17,1,3,2,.009840385988354683,.524759829044342,.233495905995369,0,2,7,5,3,6,-1,8,5,1,6,3,-.0015953830443322659,.5750094056129456,.4295622110366821,0,3,11,2,2,6,-1,12,2,1,3,2,11,5,1,3,2,34766020689858124e-21,.4342445135116577,.5564029216766357,0,2,6,6,6,5,-1,8,6,2,5,3,.0298629105091095,.4579147100448608,.6579188108444214,0,2,17,1,3,6,-1,17,3,3,2,3,.0113255903124809,.5274311900138855,.3673888146877289,0,2,8,7,3,5,-1,9,7,1,5,3,-.008782864548265934,.7100368738174438,.4642167091369629,0,2,9,18,3,2,-1,10,18,1,2,3,.004363995976746082,.5279216170310974,.2705877125263214,0,2,8,18,3,2,-1,9,18,1,2,3,.004180472809821367,.5072525143623352,.2449083030223846,0,2,12,3,5,2,-1,12,4,5,1,2,-.0004566851130221039,.4283105134963989,.5548691153526306,0,2,7,1,5,12,-1,7,7,5,6,2,-.0037140368949621916,.5519387722015381,.4103653132915497,0,2,1,0,18,4,-1,7,0,6,4,3,-.025304289534688,.6867002248764038,.48698890209198,0,2,4,2,2,2,-1,4,3,2,1,2,-.0003445408074185252,.3728874027729034,.528769314289093,0,3,11,14,4,2,-1,13,14,2,1,2,11,15,2,1,2,-.0008393523166887462,.6060152053833008,.4616062045097351,0,2,0,2,3,6,-1,0,4,3,2,3,.0172800496220589,.5049635767936707,.1819823980331421,0,2,9,7,2,3,-1,9,8,2,1,3,-.006359507795423269,.1631239950656891,.5232778787612915,0,2,5,5,1,3,-1,5,6,1,1,3,.0010298109846189618,.446327805519104,.6176549196243286,0,2,10,10,6,1,-1,10,10,3,1,2,.0010117109632119536,.5473384857177734,.4300698935985565,0,2,4,10,6,1,-1,7,10,3,1,2,-.010308800265193,.1166985034942627,.5000867247581482,0,2,9,17,3,3,-1,9,18,3,1,3,.005468201823532581,.4769287109375,.6719213724136353,0,2,4,14,1,3,-1,4,15,1,1,3,-.0009169646073132753,.3471089899539948,.5178164839744568,0,2,12,5,3,3,-1,12,6,3,1,3,.002392282010987401,.4785236120223999,.6216310858726501,0,2,4,5,12,3,-1,4,6,12,1,3,-.007557381875813007,.5814796090126038,.4410085082054138,0,2,9,8,2,3,-1,9,9,2,1,3,-.0007702403236180544,.387800008058548,.546572208404541,0,2,4,9,3,3,-1,5,9,1,3,3,-.00871259905397892,.1660051047801971,.4995836019515991,0,2,6,0,9,17,-1,9,0,3,17,3,-.0103063201531768,.4093391001224518,.5274233818054199,0,2,9,12,1,3,-1,9,13,1,1,3,-.002094097901135683,.6206194758415222,.4572280049324036,0,2,9,5,2,15,-1,9,10,2,5,3,.006809905171394348,.5567759275436401,.4155600070953369,0,2,8,14,2,3,-1,8,15,2,1,3,-.0010746059706434608,.5638927817344666,.4353024959564209,0,2,10,14,1,3,-1,10,15,1,1,3,.0021550289820879698,.4826265871524811,.6749758124351501,0,2,7,1,6,5,-1,9,1,2,5,3,.0317423194646835,.5048379898071289,.188324898481369,0,2,0,0,20,2,-1,0,0,10,2,2,-.0783827230334282,.2369548976421356,.5260158181190491,0,2,2,13,5,3,-1,2,14,5,1,3,.005741511937230825,.5048828721046448,.2776469886302948,0,2,9,11,2,3,-1,9,12,2,1,3,-.0029014600440859795,.6238604784011841,.4693317115306854,0,2,2,5,9,15,-1,2,10,9,5,3,-.0026427931152284145,.3314141929149628,.5169777274131775,0,3,5,0,12,10,-1,11,0,6,5,2,5,5,6,5,2,-.1094966009259224,.2380045056343079,.5183441042900085,0,2,5,1,2,3,-1,6,1,1,3,2,7407591328956187e-20,.406963586807251,.5362150073051453,0,2,10,7,6,1,-1,12,7,2,1,3,-.0005059380200691521,.5506706237792969,.437459409236908,0,3,3,1,2,10,-1,3,1,1,5,2,4,6,1,5,2,-.0008213177789002657,.5525709986686707,.4209375977516174,0,2,13,7,2,1,-1,13,7,1,1,2,-60276539443293586e-21,.5455474853515625,.4748266041278839,0,2,4,13,4,6,-1,4,15,4,2,3,.006806514225900173,.5157995820045471,.3424577116966248,0,2,13,7,2,1,-1,13,7,1,1,2,.0017202789895236492,.5013207793235779,.6331263780593872,0,2,5,7,2,1,-1,6,7,1,1,2,-.0001301692973356694,.5539718270301819,.4226869940757752,0,3,2,12,18,4,-1,11,12,9,2,2,2,14,9,2,2,-.004801638890057802,.4425095021724701,.5430780053138733,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.002539931097999215,.7145782113075256,.4697605073451996,0,2,16,3,4,2,-1,16,4,4,1,2,-.0014278929447755218,.4070445001125336,.539960503578186,0,3,0,2,2,18,-1,0,2,1,9,2,1,11,1,9,2,-.0251425504684448,.7884690761566162,.4747352004051209,0,3,1,2,18,4,-1,10,2,9,2,2,1,4,9,2,2,-.0038899609353393316,.4296191930770874,.5577110052108765,0,2,9,14,1,3,-1,9,15,1,1,3,.004394745919853449,.4693162143230438,.702394425868988,0,3,2,12,18,4,-1,11,12,9,2,2,2,14,9,2,2,.0246784202754498,.5242322087287903,.3812510073184967,0,3,0,12,18,4,-1,0,12,9,2,2,9,14,9,2,2,.0380476787686348,.5011739730834961,.1687828004360199,0,2,11,4,5,3,-1,11,5,5,1,3,.007942486554384232,.4828582108020783,.6369568109512329,0,2,6,4,7,3,-1,6,5,7,1,3,-.0015110049862414598,.5906485915184021,.4487667977809906,0,2,13,17,3,3,-1,13,18,3,1,3,.0064201741479337215,.5241097807884216,.2990570068359375,0,2,8,1,3,4,-1,9,1,1,4,3,-.0029802159406244755,.3041465878486633,.5078489780426025,0,2,11,4,2,4,-1,11,4,1,4,2,-.0007458007894456387,.4128139019012451,.5256826281547546,0,2,0,17,9,3,-1,3,17,3,3,3,-.0104709500446916,.5808395147323608,.4494296014308929,0,3,11,0,2,8,-1,12,0,1,4,2,11,4,1,4,2,.009336920455098152,.524655282497406,.265894889831543,0,3,0,8,6,12,-1,0,8,3,6,2,3,14,3,6,2,.0279369000345469,.4674955010414124,.7087256908416748,0,2,10,7,4,12,-1,10,13,4,6,2,.007427767850458622,.5409486889839172,.3758518099784851,0,2,5,3,8,14,-1,5,10,8,7,2,-.0235845092684031,.3758639991283417,.5238550901412964,0,2,14,10,6,1,-1,14,10,3,1,2,.0011452640173956752,.4329578876495361,.5804247260093689,0,2,0,4,10,4,-1,0,6,10,2,2,-.0004346866044215858,.5280618071556091,.3873069882392883,0,2,10,0,5,8,-1,10,4,5,4,2,.0106485402211547,.4902113080024719,.5681251883506775,0,3,8,1,4,8,-1,8,1,2,4,2,10,5,2,4,2,-.0003941805043723434,.5570880174636841,.4318251013755798,0,2,9,11,6,1,-1,11,11,2,1,3,-.00013270479394122958,.5658439993858337,.4343554973602295,0,2,8,9,3,4,-1,9,9,1,4,3,-.002012551063671708,.6056739091873169,.4537523984909058,0,2,18,4,2,6,-1,18,6,2,2,3,.0024854319635778666,.5390477180480957,.4138010144233704,0,2,8,8,3,4,-1,9,8,1,4,3,.0018237880431115627,.4354828894138336,.5717188715934753,0,2,7,1,13,3,-1,7,2,13,1,3,-.0166566595435143,.3010913133621216,.521612286567688,0,2,7,13,6,1,-1,9,13,2,1,3,.0008034955826587975,.5300151109695435,.3818396925926209,0,2,12,11,3,6,-1,12,13,3,2,3,.003417037893086672,.5328028798103333,.4241400063037872,0,2,5,11,6,1,-1,7,11,2,1,3,-.00036222729249857366,.5491728186607361,.418697714805603,0,3,1,4,18,10,-1,10,4,9,5,2,1,9,9,5,2,-.1163002029061317,.1440722048282623,.522645115852356,0,2,8,6,4,9,-1,8,9,4,3,3,-.0146950101479888,.7747725248336792,.4715717136859894,0,2,8,6,4,3,-1,8,7,4,1,3,.0021972130052745342,.5355433821678162,.3315644860267639,0,2,8,7,3,3,-1,9,7,1,3,3,-.00046965209185145795,.5767235159873962,.4458136856555939,0,2,14,15,4,3,-1,14,16,4,1,3,.006514499895274639,.5215674042701721,.3647888898849487,0,2,5,10,3,10,-1,6,10,1,10,3,.0213000606745481,.4994204938411713,.1567950993776321,0,2,8,15,4,3,-1,8,16,4,1,3,.0031881409231573343,.4742200076580048,.6287270188331604,0,2,0,8,1,6,-1,0,10,1,2,3,.0009001977741718292,.5347954034805298,.394375205039978,0,2,10,15,1,3,-1,10,16,1,1,3,-.005177227780222893,.6727191805839539,.5013138055801392,0,2,2,15,4,3,-1,2,16,4,1,3,-.004376464989036322,.3106675148010254,.5128793120384216,0,3,18,3,2,8,-1,19,3,1,4,2,18,7,1,4,2,.002629996044561267,.488631010055542,.5755215883255005,0,3,0,3,2,8,-1,0,3,1,4,2,1,7,1,4,2,-.002045868895947933,.6025794148445129,.4558076858520508,0,3,3,7,14,10,-1,10,7,7,5,2,3,12,7,5,2,.0694827064871788,.5240747928619385,.2185259014368057,0,2,0,7,19,3,-1,0,8,19,1,3,.0240489393472672,.501186728477478,.2090622037649155,0,2,12,6,3,3,-1,12,7,3,1,3,.003109534038230777,.4866712093353272,.7108548283576965,0,2,0,6,1,3,-1,0,7,1,1,3,-.00125032605137676,.3407891094684601,.5156195163726807,0,2,12,6,3,3,-1,12,7,3,1,3,-.0010281190043315291,.557557225227356,.443943202495575,0,2,5,6,3,3,-1,5,7,3,1,3,-.008889362215995789,.6402000784873962,.4620442092418671,0,2,8,2,4,2,-1,8,3,4,1,2,-.0006109480164013803,.3766441941261292,.5448899865150452,0,2,6,3,4,12,-1,8,3,2,12,2,-.005768635775893927,.3318648934364319,.5133677124977112,0,2,13,6,2,3,-1,13,7,2,1,3,.0018506490159779787,.4903570115566254,.6406934857368469,0,2,0,10,20,4,-1,0,12,20,2,2,-.0997994691133499,.1536051034927368,.5015562176704407,0,2,2,0,17,14,-1,2,7,17,7,2,-.3512834906578064,.0588231310248375,.5174378752708435,0,3,0,0,6,10,-1,0,0,3,5,2,3,5,3,5,2,-.0452445708215237,.6961488723754883,.4677872955799103,0,2,14,6,6,4,-1,14,6,3,4,2,.0714815780520439,.5167986154556274,.1038092970848084,0,2,0,6,6,4,-1,3,6,3,4,2,.0021895780228078365,.4273078143596649,.5532060861587524,0,2,13,2,7,2,-1,13,3,7,1,2,-.0005924265133216977,.46389439702034,.5276389122009277,0,2,0,2,7,2,-1,0,3,7,1,2,.0016788389766588807,.530164897441864,.3932034969329834,0,3,6,11,14,2,-1,13,11,7,1,2,6,12,7,1,2,-.0022163488902151585,.5630694031715393,.4757033884525299,0,3,8,5,2,2,-1,8,5,1,1,2,9,6,1,1,2,.00011568699846975505,.4307535886764526,.5535702705383301,0,2,13,9,2,3,-1,13,9,1,3,2,-.007201728876680136,.144488200545311,.5193064212799072,0,2,1,1,3,12,-1,2,1,1,12,3,.0008908127201721072,.4384432137012482,.5593621134757996,0,2,17,4,1,3,-1,17,5,1,1,3,.00019605009583756328,.5340415835380554,.4705956876277924,0,2,2,4,1,3,-1,2,5,1,1,3,.0005202214233577251,.5213856101036072,.3810079097747803,0,2,14,5,1,3,-1,14,6,1,1,3,.0009458857239224017,.4769414961338043,.6130738854408264,0,2,7,16,2,3,-1,7,17,2,1,3,916984718060121e-19,.4245009124279022,.5429363250732422,0,3,8,13,4,6,-1,10,13,2,3,2,8,16,2,3,2,.002183320000767708,.5457730889320374,.419107586145401,0,2,5,5,1,3,-1,5,6,1,1,3,-.0008603967144154012,.5764588713645935,.4471659958362579,0,2,16,0,4,20,-1,16,0,2,20,2,-.0132362395524979,.6372823119163513,.4695009887218475,0,3,5,1,2,6,-1,5,1,1,3,2,6,4,1,3,2,.0004337670106906444,.5317873954772949,.394582986831665,69.22987365722656,140,0,2,5,4,10,4,-1,5,6,10,2,2,-.024847149848938,.6555516719818115,.3873311877250671,0,2,15,2,4,12,-1,15,2,2,12,2,.006134861148893833,.374807208776474,.5973997712135315,0,2,7,6,4,12,-1,7,12,4,6,2,.006449849810451269,.542549192905426,.2548811137676239,0,2,14,5,1,8,-1,14,9,1,4,2,.0006349121103994548,.2462442070245743,.5387253761291504,0,3,1,4,14,10,-1,1,4,7,5,2,8,9,7,5,2,.0014023890253156424,.5594322085380554,.3528657853603363,0,3,11,6,6,14,-1,14,6,3,7,2,11,13,3,7,2,.0003004400059580803,.3958503901958466,.576593816280365,0,3,3,6,6,14,-1,3,6,3,7,2,6,13,3,7,2,.00010042409849120304,.3698996901512146,.5534998178482056,0,2,4,9,15,2,-1,9,9,5,2,3,-.005084149073809385,.3711090981960297,.5547800064086914,0,2,7,14,6,3,-1,7,15,6,1,3,-.0195372607558966,.7492755055427551,.4579297006130219,0,3,6,3,14,4,-1,13,3,7,2,2,6,5,7,2,2,-7453274065483129e-21,.5649787187576294,.390406996011734,0,2,1,9,15,2,-1,6,9,5,2,3,-.0036079459823668003,.3381088078022003,.5267801284790039,0,2,6,11,8,9,-1,6,14,8,3,3,.002069750102236867,.5519291162490845,.3714388906955719,0,2,7,4,3,8,-1,8,4,1,8,3,-.0004646384040825069,.5608214735984802,.4113566875457764,0,2,14,6,2,6,-1,14,9,2,3,2,.0007549045258201659,.3559206128120422,.532935619354248,0,3,5,7,6,4,-1,5,7,3,2,2,8,9,3,2,2,-.0009832223877310753,.5414795875549316,.3763205111026764,0,2,1,1,18,19,-1,7,1,6,19,3,-.0199406407773495,.634790301322937,.4705299139022827,0,2,1,2,6,5,-1,4,2,3,5,2,.0037680300883948803,.3913489878177643,.5563716292381287,0,2,12,17,6,2,-1,12,18,6,1,2,-.009452850557863712,.2554892897605896,.5215116739273071,0,2,2,17,6,2,-1,2,18,6,1,2,.002956084907054901,.5174679160118103,.3063920140266419,0,2,17,3,3,6,-1,17,5,3,2,3,.009107873775064945,.5388448238372803,.2885963022708893,0,2,8,17,3,3,-1,8,18,3,1,3,.0018219229532405734,.4336043000221252,.58521968126297,0,2,10,13,2,6,-1,10,16,2,3,2,.0146887395530939,.5287361741065979,.2870005965232849,0,2,7,13,6,3,-1,7,14,6,1,3,-.0143879903480411,.701944887638092,.4647370874881744,0,2,17,3,3,6,-1,17,5,3,2,3,-.0189866498112679,.2986552119255066,.5247011780738831,0,2,8,13,2,3,-1,8,14,2,1,3,.0011527639580890536,.4323473870754242,.593166172504425,0,2,9,3,6,2,-1,11,3,2,2,3,.0109336702153087,.5286864042282104,.3130319118499756,0,2,0,3,3,6,-1,0,5,3,2,3,-.0149327302351594,.2658419013023377,.508407711982727,0,2,8,5,4,6,-1,8,7,4,2,3,-.0002997053961735219,.5463526844978333,.374072402715683,0,2,5,5,3,2,-1,5,6,3,1,2,.004167762119323015,.4703496992588043,.7435721755027771,0,2,10,1,3,4,-1,11,1,1,4,3,-.00639053201302886,.2069258987903595,.5280538201332092,0,2,1,2,5,9,-1,1,5,5,3,3,.004502960946410894,.518264889717102,.348354309797287,0,2,13,6,2,3,-1,13,7,2,1,3,-.009204036556184292,.680377721786499,.4932360053062439,0,2,0,6,14,3,-1,7,6,7,3,2,.0813272595405579,.5058398842811584,.2253051996231079,0,2,2,11,18,8,-1,2,15,18,4,2,-.150792807340622,.2963424921035767,.5264679789543152,0,2,5,6,2,3,-1,5,7,2,1,3,.0033179009333252907,.4655495882034302,.7072932124137878,0,3,10,6,4,2,-1,12,6,2,1,2,10,7,2,1,2,.0007740280125290155,.4780347943305969,.5668237805366516,0,3,6,6,4,2,-1,6,6,2,1,2,8,7,2,1,2,.0006819954141974449,.4286996126174927,.5722156763076782,0,2,10,1,3,4,-1,11,1,1,4,3,.0053671570494771,.5299307107925415,.3114621937274933,0,2,7,1,2,7,-1,8,1,1,7,2,9701866656541824e-20,.3674638867378235,.5269461870193481,0,2,4,2,15,14,-1,4,9,15,7,2,-.1253408938646317,.2351492047309876,.5245791077613831,0,2,8,7,3,2,-1,9,7,1,2,3,-.005251626949757338,.7115936875343323,.4693767130374908,0,3,2,3,18,4,-1,11,3,9,2,2,2,5,9,2,2,-.007834210991859436,.4462651014328003,.5409085750579834,0,2,9,7,2,2,-1,10,7,1,2,2,-.001131006982177496,.5945618748664856,.4417662024497986,0,2,13,9,2,3,-1,13,9,1,3,2,.0017601120052859187,.5353249907493591,.3973453044891357,0,2,5,2,6,2,-1,7,2,2,2,3,-.00081581249833107,.3760268092155457,.5264726877212524,0,2,9,5,2,7,-1,9,5,1,7,2,-.003868758911266923,.6309912800788879,.4749819934368134,0,2,5,9,2,3,-1,6,9,1,3,2,.0015207129763439298,.5230181813240051,.3361223936080933,0,2,6,0,14,18,-1,6,9,14,9,2,.545867383480072,.5167139768600464,.1172635033726692,0,2,2,16,6,3,-1,2,17,6,1,3,.0156501904129982,.4979439079761505,.1393294930458069,0,2,9,7,3,6,-1,10,7,1,6,3,-.0117318602278829,.7129650712013245,.4921196103096008,0,2,7,8,4,3,-1,7,9,4,1,3,-.006176512222737074,.2288102954626083,.5049701929092407,0,2,7,12,6,3,-1,7,13,6,1,3,.0022457661107182503,.4632433950901032,.6048725843429565,0,2,9,12,2,3,-1,9,13,2,1,3,-.005191586911678314,.6467421054840088,.4602192938327789,0,2,7,12,6,2,-1,9,12,2,2,3,-.0238278806209564,.1482000946998596,.5226079225540161,0,2,5,11,4,6,-1,5,14,4,3,2,.0010284580057486892,.5135489106178284,.3375957012176514,0,2,11,12,7,2,-1,11,13,7,1,2,-.0100788502022624,.2740561068058014,.5303567051887512,0,3,6,10,8,6,-1,6,10,4,3,2,10,13,4,3,2,.002616893034428358,.533267080783844,.3972454071044922,0,2,11,10,3,4,-1,11,12,3,2,2,.000543853675480932,.5365604162216187,.4063411951065064,0,2,9,16,2,3,-1,9,17,2,1,3,.005351051222532988,.4653759002685547,.6889045834541321,0,2,13,3,1,9,-1,13,6,1,3,3,-.0015274790348485112,.5449501276016235,.3624723851680756,0,2,1,13,14,6,-1,1,15,14,2,3,-.0806244164705276,.1656087040901184,.5000287294387817,0,2,13,6,1,6,-1,13,9,1,3,2,.0221920292824507,.5132731199264526,.2002808004617691,0,2,0,4,3,8,-1,1,4,1,8,3,.007310063112527132,.4617947936058044,.6366536021232605,0,2,18,0,2,18,-1,18,0,1,18,2,-.006406307220458984,.5916250944137573,.4867860972881317,0,2,2,3,6,2,-1,2,4,6,1,2,-.0007641504053026438,.388840913772583,.5315797924995422,0,2,9,0,8,6,-1,9,2,8,2,3,.0007673448999412358,.4159064888954163,.5605279803276062,0,2,6,6,1,6,-1,6,9,1,3,2,.0006147450185380876,.3089022040367127,.5120148062705994,0,2,14,8,6,3,-1,14,9,6,1,3,-.005010527092963457,.3972199857234955,.5207306146621704,0,2,0,0,2,18,-1,1,0,1,18,2,-.008690913207828999,.6257408261299133,.4608575999736786,0,3,1,18,18,2,-1,10,18,9,1,2,1,19,9,1,2,-.016391459852457,.2085209935903549,.5242266058921814,0,2,3,15,2,2,-1,3,16,2,1,2,.00040973909199237823,.5222427248954773,.3780320882797241,0,2,8,14,5,3,-1,8,15,5,1,3,-.002524228999391198,.5803927183151245,.4611890017986298,0,2,8,14,2,3,-1,8,15,2,1,3,.0005094531225040555,.4401271939277649,.5846015810966492,0,2,12,3,3,3,-1,13,3,1,3,3,.001965641975402832,.5322325229644775,.4184590876102448,0,2,7,5,6,2,-1,9,5,2,2,3,.0005629889783449471,.3741844892501831,.5234565734863281,0,2,15,5,5,2,-1,15,6,5,1,2,-.0006794679793529212,.4631041884422302,.5356478095054626,0,2,0,5,5,2,-1,0,6,5,1,2,.007285634987056255,.5044670104980469,.2377564013004303,0,2,17,14,1,6,-1,17,17,1,3,2,-.0174594894051552,.7289121150970459,.5050435066223145,0,2,2,9,9,3,-1,5,9,3,3,3,-.0254217498004436,.6667134761810303,.4678100049495697,0,2,12,3,3,3,-1,13,3,1,3,3,-.0015647639520466328,.4391759037971497,.532362699508667,0,2,0,0,4,18,-1,2,0,2,18,2,.0114443600177765,.4346440136432648,.5680012106895447,0,2,17,6,1,3,-1,17,7,1,1,3,-.0006735255010426044,.44771409034729,.5296812057495117,0,2,2,14,1,6,-1,2,17,1,3,2,.009319420903921127,.4740200042724609,.7462607026100159,0,2,19,8,1,2,-1,19,9,1,1,2,.00013328490604180843,.536506175994873,.475213497877121,0,2,5,3,3,3,-1,6,3,1,3,3,-.007881579920649529,.1752219051122665,.5015255212783813,0,2,9,16,2,3,-1,9,17,2,1,3,-.005798568017780781,.7271236777305603,.4896200895309448,0,2,2,6,1,3,-1,2,7,1,1,3,-.0003892249951604754,.4003908932209015,.5344941020011902,0,3,12,4,8,2,-1,16,4,4,1,2,12,5,4,1,2,-.0019288610201328993,.5605612993240356,.4803955852985382,0,3,0,4,8,2,-1,0,4,4,1,2,4,5,4,1,2,.008421415463089943,.4753246903419495,.7623608708381653,0,2,2,16,18,4,-1,2,18,18,2,2,.008165587671101093,.5393261909484863,.419164389371872,0,2,7,15,2,4,-1,7,17,2,2,2,.00048280550981871784,.4240800142288208,.5399821996688843,0,2,4,0,14,3,-1,4,1,14,1,3,-.002718663075938821,.4244599938392639,.5424923896789551,0,2,0,0,4,20,-1,2,0,2,20,2,-.0125072300434113,.5895841717720032,.4550411105155945,0,3,12,4,4,8,-1,14,4,2,4,2,12,8,2,4,2,-.0242865197360516,.2647134959697723,.518917977809906,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.0029676330741494894,.734768271446228,.4749749898910523,0,2,10,6,2,3,-1,10,7,2,1,3,-.0125289997085929,.2756049931049347,.5177599787712097,0,2,8,7,3,2,-1,8,8,3,1,2,-.0010104000102728605,.3510560989379883,.5144724249839783,0,2,8,2,6,12,-1,8,8,6,6,2,-.0021348530426621437,.5637925863265991,.466731995344162,0,2,4,0,11,12,-1,4,4,11,4,3,.0195642597973347,.4614573121070862,.6137639880180359,0,2,14,9,6,11,-1,16,9,2,11,3,-.0971463471651077,.2998378872871399,.5193555951118469,0,2,0,14,4,3,-1,0,15,4,1,3,.00450145686045289,.5077884793281555,.3045755922794342,0,2,9,10,2,3,-1,9,11,2,1,3,.006370697170495987,.486101895570755,.6887500882148743,0,2,5,11,3,2,-1,5,12,3,1,2,-.009072152897715569,.1673395931720734,.5017563104629517,0,2,9,15,3,3,-1,10,15,1,3,3,-.005353720858693123,.2692756950855255,.524263322353363,0,2,8,8,3,4,-1,9,8,1,4,3,-.0109328404068947,.7183864116668701,.4736028909683228,0,2,9,15,3,3,-1,10,15,1,3,3,.008235607296228409,.5223966836929321,.2389862984418869,0,2,7,7,3,2,-1,8,7,1,2,3,-.0010038160253316164,.5719355940818787,.4433943033218384,0,3,2,10,16,4,-1,10,10,8,2,2,2,12,8,2,2,.004085912834852934,.5472841858863831,.4148836135864258,0,2,2,3,4,17,-1,4,3,2,17,2,.1548541933298111,.4973812103271484,.0610615983605385,0,2,15,13,2,7,-1,15,13,1,7,2,.00020897459762636572,.4709174036979675,.542388916015625,0,2,2,2,6,1,-1,5,2,3,1,2,.0003331699117552489,.4089626967906952,.5300992131233215,0,2,5,2,12,4,-1,9,2,4,4,3,-.0108134001493454,.6104369759559631,.4957334101200104,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0456560105085373,.5069689154624939,.2866660058498383,0,3,13,7,2,2,-1,14,7,1,1,2,13,8,1,1,2,.0012569549726322293,.484691709280014,.631817102432251,0,2,0,12,20,6,-1,0,14,20,2,3,-.120150700211525,.0605261400341988,.4980959892272949,0,2,14,7,2,3,-1,14,7,1,3,2,-.00010533799650147557,.5363109707832336,.4708042144775391,0,2,0,8,9,12,-1,3,8,3,12,3,-.2070319056510925,.059660330414772,.497909814119339,0,2,3,0,16,2,-1,3,0,8,2,2,.00012909180077258497,.4712977111339569,.5377997756004333,0,2,6,15,3,3,-1,6,16,3,1,3,.000388185289921239,.4363538026809692,.5534191131591797,0,2,8,15,6,3,-1,8,16,6,1,3,-.0029243610333651304,.5811185836791992,.4825215935707092,0,2,0,10,1,6,-1,0,12,1,2,3,.0008388233254663646,.5311700105667114,.403813898563385,0,2,10,9,4,3,-1,10,10,4,1,3,-.0019061550265178084,.3770701885223389,.526001513004303,0,2,9,15,2,3,-1,9,16,2,1,3,.00895143486559391,.4766167998313904,.7682183980941772,0,2,5,7,10,1,-1,5,7,5,1,2,.0130834598094225,.5264462828636169,.3062222003936768,0,2,4,0,12,19,-1,10,0,6,19,2,-.2115933001041412,.6737198233604431,.4695810079574585,0,3,0,6,20,6,-1,10,6,10,3,2,0,9,10,3,2,.0031493250280618668,.5644835233688354,.4386953115463257,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,.00039754100725986063,.4526061117649078,.5895630121231079,0,3,15,6,2,2,-1,16,6,1,1,2,15,7,1,1,2,-.0013814480043947697,.6070582270622253,.4942413866519928,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,-.0005812218878418207,.5998213291168213,.4508252143859863,0,2,14,4,1,12,-1,14,10,1,6,2,-.002390532987192273,.420558899641037,.5223848223686218,0,3,2,5,16,10,-1,2,5,8,5,2,10,10,8,5,2,.0272689294070005,.5206447243690491,.3563301861286163,0,2,9,17,3,2,-1,10,17,1,2,3,-.0037658358924090862,.3144704103469849,.5218814015388489,0,2,1,4,2,2,-1,1,5,2,1,2,-.0014903489500284195,.338019609451294,.5124437212944031,0,2,5,0,15,5,-1,10,0,5,5,3,-.0174282304942608,.5829960703849792,.4919725954532623,0,2,0,0,15,5,-1,5,0,5,5,3,-.0152780301868916,.6163144707679749,.4617887139320374,0,2,11,2,2,17,-1,11,2,1,17,2,.0319956094026566,.5166357159614563,.171276405453682,0,2,7,2,2,17,-1,8,2,1,17,2,-.003825671039521694,.3408012092113495,.5131387710571289,0,2,15,11,2,9,-1,15,11,1,9,2,-.00851864367723465,.6105518937110901,.4997941851615906,0,2,3,11,2,9,-1,4,11,1,9,2,.0009064162150025368,.4327270984649658,.5582311153411865,0,2,5,16,14,4,-1,5,16,7,4,2,.0103448498994112,.4855653047561646,.5452420115470886,79.24907684326172,160,0,2,1,4,18,1,-1,7,4,6,1,3,.007898182608187199,.333252489566803,.5946462154388428,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0016170160379260778,.3490641117095947,.5577868819236755,0,2,9,8,2,12,-1,9,12,2,4,3,-.0005544974119402468,.5542566180229187,.3291530013084412,0,2,12,1,6,6,-1,12,3,6,2,3,.001542898011393845,.3612579107284546,.5545979142189026,0,3,5,2,6,6,-1,5,2,3,3,2,8,5,3,3,2,-.0010329450014978647,.3530139029026032,.5576140284538269,0,3,9,16,6,4,-1,12,16,3,2,2,9,18,3,2,2,.0007769815856590867,.3916778862476349,.5645321011543274,0,2,1,2,18,3,-1,7,2,6,3,3,.143203005194664,.4667482078075409,.7023633122444153,0,2,7,4,9,10,-1,7,9,9,5,2,-.007386649027466774,.3073684871196747,.5289257764816284,0,2,5,9,4,4,-1,7,9,2,4,2,-.0006293674232438207,.562211811542511,.4037049114704132,0,2,11,10,3,6,-1,11,13,3,3,2,.0007889352855272591,.5267661213874817,.3557874858379364,0,2,7,11,5,3,-1,7,12,5,1,3,-.0122280502691865,.6668320894241333,.4625549912452698,0,3,7,11,6,6,-1,10,11,3,3,2,7,14,3,3,2,.0035420239437371492,.5521438121795654,.3869673013687134,0,2,0,0,10,9,-1,0,3,10,3,3,-.0010585320414975286,.3628678023815155,.5320926904678345,0,2,13,14,1,6,-1,13,16,1,2,3,14935660146875307e-21,.4632444977760315,.5363323092460632,0,2,0,2,3,6,-1,0,4,3,2,3,.005253770854324102,.5132231712341309,.3265708982944489,0,2,8,14,4,3,-1,8,15,4,1,3,-.008233802393078804,.6693689823150635,.4774140119552612,0,2,6,14,1,6,-1,6,16,1,2,3,2186681012972258e-20,.405386209487915,.5457931160926819,0,2,9,15,2,3,-1,9,16,2,1,3,-.0038150229956954718,.645499587059021,.4793178141117096,0,2,6,4,3,3,-1,7,4,1,3,3,.0011105879675596952,.5270407199859619,.3529678881168366,0,2,9,0,11,3,-1,9,1,11,1,3,-.005770768970251083,.3803547024726868,.5352957844734192,0,2,0,6,20,3,-1,0,7,20,1,3,-.003015833906829357,.533940315246582,.3887133002281189,0,2,10,1,1,2,-1,10,2,1,1,2,-.0008545368909835815,.3564616143703461,.5273603796958923,0,2,9,6,2,6,-1,10,6,1,6,2,.0110505102202296,.4671907126903534,.6849737763404846,0,2,5,8,12,1,-1,9,8,4,1,3,.0426058396697044,.51514732837677,.0702200904488564,0,2,3,8,12,1,-1,7,8,4,1,3,-.0030781750101596117,.3041661083698273,.5152602195739746,0,2,9,7,3,5,-1,10,7,1,5,3,-.005481572821736336,.6430295705795288,.4897229969501495,0,2,3,9,6,2,-1,6,9,3,2,2,.003188186092302203,.5307493209838867,.3826209902763367,0,2,12,9,3,3,-1,12,10,3,1,3,.00035947180003859103,.4650047123432159,.5421904921531677,0,2,7,0,6,1,-1,9,0,2,1,3,-.004070503171533346,.2849679887294769,.5079116225242615,0,2,12,9,3,3,-1,12,10,3,1,3,-.0145941702648997,.2971645891666412,.5128461718559265,0,2,7,10,2,1,-1,8,10,1,1,2,-.00011947689927183092,.563109815120697,.4343082010746002,0,2,6,4,9,13,-1,9,4,3,13,3,-.0006934464909136295,.4403578042984009,.5359959006309509,0,2,6,8,4,2,-1,6,9,4,1,2,14834799912932795e-21,.3421008884906769,.5164697766304016,0,2,16,2,4,6,-1,16,2,2,6,2,.009029698558151722,.4639343023300171,.6114075183868408,0,2,0,17,6,3,-1,0,18,6,1,3,-.008064081892371178,.2820158898830414,.5075494050979614,0,2,10,10,3,10,-1,10,15,3,5,2,.0260621197521687,.5208905935287476,.2688778042793274,0,2,8,7,3,5,-1,9,7,1,5,3,.0173146594315767,.4663713872432709,.6738539934158325,0,2,10,4,4,3,-1,10,4,2,3,2,.0226666405797005,.5209349989891052,.2212723940610886,0,2,8,4,3,8,-1,9,4,1,8,3,-.002196592977270484,.6063101291656494,.4538190066814423,0,2,6,6,9,13,-1,9,6,3,13,3,-.009528247639536858,.4635204970836639,.5247430801391602,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.00809436198323965,.5289440155029297,.3913882076740265,0,2,14,2,6,8,-1,16,2,2,8,3,-.0728773325681686,.7752001881599426,.4990234971046448,0,2,6,0,3,6,-1,7,0,1,6,3,-.006900952197611332,.2428039014339447,.5048090219497681,0,2,14,2,6,8,-1,16,2,2,8,3,-.0113082397729158,.5734364986419678,.4842376112937927,0,2,0,5,6,6,-1,0,8,6,3,2,.0596132017672062,.5029836297035217,.2524977028369904,0,3,9,12,6,2,-1,12,12,3,1,2,9,13,3,1,2,-.0028624620754271746,.6073045134544373,.4898459911346436,0,2,8,17,3,2,-1,9,17,1,2,3,.00447814492508769,.5015289187431335,.2220316976308823,0,3,11,6,2,2,-1,12,6,1,1,2,11,7,1,1,2,-.001751324045471847,.6614428758621216,.4933868944644928,0,2,1,9,18,2,-1,7,9,6,2,3,.0401634201407433,.5180878043174744,.3741044998168945,0,3,11,6,2,2,-1,12,6,1,1,2,11,7,1,1,2,.0003476894926279783,.4720416963100433,.5818032026290894,0,2,3,4,12,8,-1,7,4,4,8,3,.00265516503714025,.3805010914802551,.5221335887908936,0,2,13,11,5,3,-1,13,12,5,1,3,-.008770627900958061,.294416606426239,.5231295228004456,0,2,9,10,2,3,-1,9,11,2,1,3,-.005512209143489599,.7346177101135254,.4722816944122315,0,2,14,7,2,3,-1,14,7,1,3,2,.0006867204210720956,.5452876091003418,.424241304397583,0,2,5,4,1,3,-1,5,5,1,1,3,.0005601966986432672,.439886212348938,.5601285099983215,0,2,13,4,2,3,-1,13,5,2,1,3,.0024143769405782223,.4741686880588532,.6136621832847595,0,2,5,4,2,3,-1,5,5,2,1,3,-.0015680900542065501,.604455292224884,.4516409933567047,0,2,9,8,2,3,-1,9,9,2,1,3,-.0036827491130679846,.2452459037303925,.5294982194900513,0,2,8,9,2,2,-1,8,10,2,1,2,-.000294091907562688,.3732838034629822,.5251451134681702,0,2,15,14,1,4,-1,15,16,1,2,2,.00042847759323194623,.5498809814453125,.4065535068511963,0,2,3,12,2,2,-1,3,13,2,1,2,-.004881707020103931,.2139908969402313,.4999957084655762,0,3,12,15,2,2,-1,13,15,1,1,2,12,16,1,1,2,.00027272020815871656,.465028703212738,.581342875957489,0,2,9,13,2,2,-1,9,14,2,1,2,.00020947199664078653,.4387486875057221,.5572792887687683,0,2,4,11,14,9,-1,4,14,14,3,3,.0485011897981167,.5244972705841064,.3212889134883881,0,2,7,13,4,3,-1,7,14,4,1,3,-.004516641143709421,.605681300163269,.4545882046222687,0,2,15,14,1,4,-1,15,16,1,2,2,-.0122916800901294,.2040929049253464,.5152214169502258,0,2,4,14,1,4,-1,4,16,1,2,2,.0004854967992287129,.5237604975700378,.3739503026008606,0,2,14,0,6,13,-1,16,0,2,13,3,.0305560491979122,.4960533976554871,.5938246250152588,0,3,4,1,2,12,-1,4,1,1,6,2,5,7,1,6,2,-.00015105320198927075,.5351303815841675,.4145204126834869,0,3,11,14,6,6,-1,14,14,3,3,2,11,17,3,3,2,.0024937440175563097,.4693366885185242,.5514941215515137,0,3,3,14,6,6,-1,3,14,3,3,2,6,17,3,3,2,-.012382130138576,.6791396737098694,.4681667983531952,0,2,14,17,3,2,-1,14,18,3,1,2,-.005133346188813448,.3608739078044891,.5229160189628601,0,2,3,17,3,2,-1,3,18,3,1,2,.0005191927775740623,.5300073027610779,.3633613884449005,0,2,14,0,6,13,-1,16,0,2,13,3,.1506042033433914,.515731692314148,.2211782038211823,0,2,0,0,6,13,-1,2,0,2,13,3,.007714414969086647,.4410496950149536,.5776609182357788,0,2,10,10,7,6,-1,10,12,7,2,3,.009444352239370346,.5401855111122131,.375665009021759,0,3,6,15,2,2,-1,6,15,1,1,2,7,16,1,1,2,.00025006249779835343,.4368270933628082,.5607374906539917,0,3,6,11,8,6,-1,10,11,4,3,2,6,14,4,3,2,-.003307715058326721,.4244799017906189,.551823079586029,0,3,7,6,2,2,-1,7,6,1,1,2,8,7,1,1,2,.0007404891075566411,.4496962130069733,.5900576710700989,0,3,2,2,16,6,-1,10,2,8,3,2,2,5,8,3,2,.0440920516848564,.5293493270874023,.3156355023384094,0,2,5,4,3,3,-1,5,5,3,1,3,.0033639909233897924,.4483296871185303,.5848662257194519,0,2,11,7,3,10,-1,11,12,3,5,2,-.003976007923483849,.4559507071971893,.5483639240264893,0,2,6,7,3,10,-1,6,12,3,5,2,.0027716930489987135,.534178614616394,.3792484104633331,0,2,10,7,3,2,-1,11,7,1,2,3,-.00024123019829858094,.5667188763618469,.4576973021030426,0,2,8,12,4,2,-1,8,13,4,1,2,.0004942566738463938,.4421244859695435,.5628787279129028,0,2,10,1,1,3,-1,10,2,1,1,3,-.0003887646889779717,.4288370907306671,.5391063094139099,0,3,1,2,4,18,-1,1,2,2,9,2,3,11,2,9,2,-.0500488989055157,.6899513006210327,.4703742861747742,0,2,12,4,4,12,-1,12,10,4,6,2,-.0366354808211327,.2217779010534287,.5191826224327087,0,2,0,0,1,6,-1,0,2,1,2,3,.0024273579474538565,.5136224031448364,.3497397899627686,0,2,9,11,2,3,-1,9,12,2,1,3,.001955803018063307,.4826192855834961,.640838086605072,0,2,8,7,4,3,-1,8,8,4,1,3,-.0017494610510766506,.3922835886478424,.5272685289382935,0,2,10,7,3,2,-1,11,7,1,2,3,.0139550799503922,.507820188999176,.8416504859924316,0,2,7,7,3,2,-1,8,7,1,2,3,-.00021896739781368524,.5520489811897278,.4314234852790833,0,2,9,4,6,1,-1,11,4,2,1,3,-.0015131309628486633,.3934605121612549,.5382571220397949,0,2,8,7,2,3,-1,9,7,1,3,2,-.004362280014902353,.7370628714561462,.4736475944519043,0,3,12,7,8,6,-1,16,7,4,3,2,12,10,4,3,2,.0651605874300003,.5159279704093933,.328159511089325,0,3,0,7,8,6,-1,0,7,4,3,2,4,10,4,3,2,-.0023567399475723505,.3672826886177063,.5172886252403259,0,3,18,2,2,10,-1,19,2,1,5,2,18,7,1,5,2,.0151466596871614,.5031493902206421,.6687604188919067,0,2,0,2,6,4,-1,3,2,3,4,2,-.0228509604930878,.676751971244812,.4709596931934357,0,2,9,4,6,1,-1,11,4,2,1,3,.004886765033006668,.5257998108863831,.4059878885746002,0,3,7,15,2,2,-1,7,15,1,1,2,8,16,1,1,2,.0017619599821045995,.4696272909641266,.6688278913497925,0,2,11,13,1,6,-1,11,16,1,3,2,-.0012942519970238209,.4320712983608246,.5344281792640686,0,2,8,13,1,6,-1,8,16,1,3,2,.0109299495816231,.4997706115245819,.1637486070394516,0,2,14,3,2,1,-1,14,3,1,1,2,2995848990394734e-20,.4282417893409729,.5633224248886108,0,2,8,15,2,3,-1,8,16,2,1,3,-.0065884361974895,.677212119102478,.4700526893138886,0,2,12,15,7,4,-1,12,17,7,2,2,.0032527779694646597,.531339704990387,.4536148905754089,0,2,4,14,12,3,-1,4,15,12,1,3,-.00404357397928834,.5660061836242676,.4413388967514038,0,2,10,3,3,2,-1,11,3,1,2,3,-.0012523540062829852,.3731913864612579,.5356451869010925,0,2,4,12,2,2,-1,4,13,2,1,2,.00019246719602961093,.5189986228942871,.3738811016082764,0,2,10,11,4,6,-1,10,14,4,3,2,-.038589671254158,.2956373989582062,.51888108253479,0,3,7,13,2,2,-1,7,13,1,1,2,8,14,1,1,2,.0001548987056594342,.4347135126590729,.5509533286094666,0,3,4,11,14,4,-1,11,11,7,2,2,4,13,7,2,2,-.0337638482451439,.3230330049991608,.5195475816726685,0,2,1,18,18,2,-1,7,18,6,2,3,-.008265706710517406,.5975489020347595,.4552114009857178,0,3,11,18,2,2,-1,12,18,1,1,2,11,19,1,1,2,14481440302915871e-21,.4745678007602692,.5497426986694336,0,3,7,18,2,2,-1,7,18,1,1,2,8,19,1,1,2,14951299817766994e-21,.4324473142623901,.5480644106864929,0,2,12,18,8,2,-1,12,19,8,1,2,-.018741799518466,.1580052971839905,.517853319644928,0,2,7,14,6,2,-1,7,15,6,1,2,.0017572239739820361,.4517636895179749,.5773764252662659,0,3,8,12,4,8,-1,10,12,2,4,2,8,16,2,4,2,-.0031391119118779898,.4149647951126099,.5460842251777649,0,2,4,9,3,3,-1,4,10,3,1,3,6665677938144654e-20,.4039090871810913,.5293084979057312,0,2,7,10,6,2,-1,9,10,2,2,3,.006774342153221369,.4767651855945587,.612195611000061,0,2,5,0,4,15,-1,7,0,2,15,2,-.0073868161998689175,.3586258888244629,.5187280774116516,0,2,8,6,12,14,-1,12,6,4,14,3,.0140409301966429,.4712139964103699,.5576155781745911,0,2,5,16,3,3,-1,5,17,3,1,3,-.005525832995772362,.2661027014255524,.5039281249046326,0,2,8,1,12,19,-1,12,1,4,19,3,.3868423998355866,.5144339799880981,.2525899112224579,0,2,3,0,3,2,-1,3,1,3,1,2,.0001145924034062773,.4284994900226593,.5423371195793152,0,2,10,12,4,5,-1,10,12,2,5,2,-.0184675697237253,.3885835111141205,.5213062167167664,0,2,6,12,4,5,-1,8,12,2,5,2,-.0004590701137203723,.541256308555603,.4235909879207611,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,.0012527540093287826,.4899305105209351,.6624091267585754,0,2,0,2,3,6,-1,0,4,3,2,3,.001491060946136713,.5286778211593628,.4040051996707916,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,-.0007543556275777519,.6032990217208862,.4795120060443878,0,2,7,6,4,10,-1,7,11,4,5,2,-.0069478838704526424,.408440113067627,.5373504161834717,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,.0002809292054735124,.4846062958240509,.5759382247924805,0,2,2,13,5,2,-1,2,14,5,1,2,.0009607371757738292,.5164741277694702,.3554979860782623,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,-.0002688392996788025,.5677582025527954,.4731765985488892,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,.0021599370520561934,.4731487035751343,.7070567011833191,0,2,14,13,3,3,-1,14,14,3,1,3,.005623530130833387,.5240243077278137,.2781791985034943,0,2,3,13,3,3,-1,3,14,3,1,3,-.005024399142712355,.2837013900279999,.5062304139137268,0,2,9,14,2,3,-1,9,15,2,1,3,-.009761163964867592,.7400717735290527,.4934569001197815,0,2,8,7,3,3,-1,8,8,3,1,3,.004151510074734688,.5119131207466125,.3407008051872253,0,2,13,5,3,3,-1,13,6,3,1,3,.006246508099138737,.4923788011074066,.6579058766365051,0,2,0,9,5,3,-1,0,10,5,1,3,-.007059747818857431,.2434711009263992,.503284215927124,0,2,13,5,3,3,-1,13,6,3,1,3,-.0020587709732353687,.590031087398529,.469508707523346,0,3,9,12,2,8,-1,9,12,1,4,2,10,16,1,4,2,-.0024146060459315777,.3647317886352539,.5189201831817627,0,3,11,7,2,2,-1,12,7,1,1,2,11,8,1,1,2,-.0014817609917372465,.6034948229789734,.4940128028392792,0,2,0,16,6,4,-1,3,16,3,4,2,-.0063016400672495365,.5818989872932434,.4560427963733673,0,2,10,6,2,3,-1,10,7,2,1,3,.00347634288482368,.5217475891113281,.3483993113040924,0,2,9,5,2,6,-1,9,7,2,2,3,-.0222508702427149,.2360700070858002,.5032082796096802,0,2,12,15,8,4,-1,12,15,4,4,2,-.030612550675869,.6499186754226685,.4914919137954712,0,2,0,14,8,6,-1,4,14,4,6,2,.013057479634881,.4413323104381561,.5683764219284058,0,2,9,0,3,2,-1,10,0,1,2,3,-.0006009574281051755,.4359731078147888,.5333483219146729,0,2,4,15,4,2,-1,6,15,2,2,2,-.0004151425091549754,.550406277179718,.4326060116291046,0,2,12,7,3,13,-1,13,7,1,13,3,-.013776290230453,.4064112901687622,.5201548933982849,0,2,5,7,3,13,-1,6,7,1,13,3,-.0322965085506439,.0473519712686539,.4977194964885712,0,2,9,6,3,9,-1,9,9,3,3,3,.0535569787025452,.4881733059883118,.666693925857544,0,2,4,4,7,12,-1,4,10,7,6,2,.008188954554498196,.5400037169456482,.4240820109844208,0,3,12,12,2,2,-1,13,12,1,1,2,12,13,1,1,2,.00021055320394225419,.4802047908306122,.5563852787017822,0,3,6,12,2,2,-1,6,12,1,1,2,7,13,1,1,2,-.00243827304802835,.7387793064117432,.4773685038089752,0,3,8,9,4,2,-1,10,9,2,1,2,8,10,2,1,2,.003283557016402483,.5288546085357666,.3171291947364807,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,.00237295706756413,.4750812947750092,.7060170769691467,0,2,16,6,3,2,-1,16,7,3,1,2,-.0014541699783876538,.3811730146408081,.533073902130127,87.69602966308594,177,0,2,0,7,19,4,-1,0,9,19,2,2,.0557552389800549,.4019156992435455,.6806036829948425,0,2,10,2,10,1,-1,10,2,5,1,2,.002473024884238839,.3351148962974548,.5965719819068909,0,2,9,4,2,12,-1,9,10,2,6,2,-.00035031698644161224,.5557708144187927,.3482286930084229,0,2,12,18,4,1,-1,12,18,2,1,2,.0005416763015091419,.426085889339447,.5693380832672119,0,3,1,7,6,4,-1,1,7,3,2,2,4,9,3,2,2,.0007719367858953774,.3494240045547485,.5433688759803772,0,2,12,0,6,13,-1,14,0,2,13,3,-.0015999219613149762,.4028499126434326,.5484359264373779,0,2,2,0,6,13,-1,4,0,2,13,3,-.00011832080053864047,.3806901872158051,.5425465106964111,0,2,10,5,8,8,-1,10,9,8,4,2,.0003290903114248067,.262010008096695,.5429521799087524,0,2,8,3,2,5,-1,9,3,1,5,2,.0002951810893137008,.379976898431778,.5399264097213745,0,2,8,4,9,1,-1,11,4,3,1,3,9046671038959175e-20,.4433645009994507,.5440226197242737,0,2,3,4,9,1,-1,6,4,3,1,3,15007190086180344e-21,.3719654977321625,.5409119725227356,0,2,1,0,18,10,-1,7,0,6,10,3,.1393561065196991,.552539587020874,.4479042887687683,0,2,7,17,5,3,-1,7,18,5,1,3,.0016461990308016539,.4264501035213471,.5772169828414917,0,2,7,11,6,1,-1,9,11,2,1,3,.0004998443182557821,.4359526038169861,.5685871243476868,0,2,2,2,3,2,-1,2,3,3,1,2,-.001097128028050065,.3390136957168579,.5205408930778503,0,2,8,12,4,2,-1,8,13,4,1,2,.0006691989256069064,.4557456076145172,.598065972328186,0,2,6,10,3,6,-1,6,13,3,3,2,.0008647104259580374,.5134841203689575,.2944033145904541,0,2,11,4,2,4,-1,11,4,1,4,2,-.0002718259929679334,.3906578123569489,.5377181172370911,0,2,7,4,2,4,-1,8,4,1,4,2,3024949910468422e-20,.3679609894752502,.5225688815116882,0,2,9,6,2,4,-1,9,6,1,4,2,-.008522589690983295,.7293102145195007,.4892365038394928,0,2,6,13,8,3,-1,6,14,8,1,3,.0016705560265108943,.43453249335289,.5696138143539429,0,2,9,15,3,4,-1,10,15,1,4,3,-.0071433838456869125,.2591280043125153,.5225623846054077,0,2,9,2,2,17,-1,10,2,1,17,2,-.0163193698972464,.6922279000282288,.4651575982570648,0,2,7,0,6,1,-1,9,0,2,1,3,.004803426098078489,.5352262854576111,.3286302983760834,0,2,8,15,3,4,-1,9,15,1,4,3,-.0075421929359436035,.2040544003248215,.5034546256065369,0,2,7,13,7,3,-1,7,14,7,1,3,-.0143631100654602,.6804888844490051,.4889059066772461,0,2,8,16,3,3,-1,9,16,1,3,3,.0008906358852982521,.5310695767402649,.3895480930805206,0,2,6,2,8,10,-1,6,7,8,5,2,-.004406019113957882,.5741562843322754,.4372426867485046,0,2,2,5,8,8,-1,2,9,8,4,2,-.0001886254030978307,.2831785976886749,.5098205208778381,0,2,14,16,2,2,-1,14,17,2,1,2,-.0037979281041771173,.3372507989406586,.5246580243110657,0,2,4,16,2,2,-1,4,17,2,1,2,.00014627049677073956,.5306674242019653,.391171008348465,0,2,10,11,4,6,-1,10,14,4,3,2,-49164638767251745e-21,.5462496280670166,.3942720890045166,0,2,6,11,4,6,-1,6,14,4,3,2,-.0335825011134148,.2157824039459229,.5048211812973022,0,2,10,14,1,3,-1,10,15,1,1,3,-.0035339309833943844,.6465312242507935,.4872696995735169,0,2,8,14,4,3,-1,8,15,4,1,3,.005014411173760891,.4617668092250824,.6248074769973755,0,3,10,0,4,6,-1,12,0,2,3,2,10,3,2,3,2,.0188173707574606,.5220689177513123,.2000052034854889,0,2,0,3,20,2,-1,0,4,20,1,2,-.001343433978036046,.4014537930488586,.53016197681427,0,3,12,0,8,2,-1,16,0,4,1,2,12,1,4,1,2,.001755796023644507,.4794039130210877,.5653169751167297,0,2,2,12,10,8,-1,2,16,10,4,2,-.0956374630331993,.2034195065498352,.5006706714630127,0,3,17,7,2,10,-1,18,7,1,5,2,17,12,1,5,2,-.0222412291914225,.7672473192214966,.5046340227127075,0,3,1,7,2,10,-1,1,7,1,5,2,2,12,1,5,2,-.0155758196488023,.7490342259407043,.4755851030349731,0,2,15,10,3,6,-1,15,12,3,2,3,.005359911825507879,.5365303754806519,.4004670977592468,0,2,4,4,6,2,-1,6,4,2,2,3,-.0217634998261929,.0740154981613159,.4964174926280975,0,2,0,5,20,6,-1,0,7,20,2,3,-.165615901350975,.2859103083610535,.5218086242675781,0,3,0,0,8,2,-1,0,0,4,1,2,4,1,4,1,2,.0001646132004680112,.4191615879535675,.5380793213844299,0,2,1,0,18,4,-1,7,0,6,4,3,-.008907750248908997,.6273192763328552,.4877404868602753,0,2,1,13,6,2,-1,1,14,6,1,2,.0008634644909761846,.5159940719604492,.3671025931835175,0,2,10,8,3,4,-1,11,8,1,4,3,-.0013751760125160217,.5884376764297485,.4579083919525147,0,2,6,1,6,1,-1,8,1,2,1,3,-.0014081239933148026,.3560509979724884,.5139945149421692,0,2,8,14,4,3,-1,8,15,4,1,3,-.003934288863092661,.5994288921356201,.466427206993103,0,2,1,6,18,2,-1,10,6,9,2,2,-.0319669283926487,.3345462083816528,.5144183039665222,0,2,15,11,1,2,-1,15,12,1,1,2,-15089280168467667e-21,.5582656264305115,.441405713558197,0,2,6,5,1,2,-1,6,6,1,1,2,.0005199447041377425,.4623680114746094,.6168993711471558,0,2,13,4,1,3,-1,13,5,1,1,3,-.0034220460802316666,.6557074785232544,.4974805116653442,0,2,2,15,1,2,-1,2,16,1,1,2,.00017723299970384687,.5269501805305481,.3901908099651337,0,2,12,4,4,3,-1,12,5,4,1,3,.0015716759953647852,.4633373022079468,.5790457725524902,0,2,0,0,7,3,-1,0,1,7,1,3,-.00890413299202919,.2689608037471771,.5053591132164001,0,2,9,12,6,2,-1,9,12,3,2,2,.00040677518700249493,.5456603169441223,.4329898953437805,0,2,5,4,2,3,-1,5,5,2,1,3,.0067604780197143555,.4648993909358978,.6689761877059937,0,2,18,4,2,3,-1,18,5,2,1,3,.0029100088868290186,.5309703946113586,.3377839922904968,0,2,3,0,8,6,-1,3,2,8,2,3,.0013885459629818797,.4074738919734955,.5349133014678955,0,3,0,2,20,6,-1,10,2,10,3,2,0,5,10,3,2,-.0767642632126808,.1992176026105881,.522824227809906,0,2,4,7,2,4,-1,5,7,1,4,2,-.00022688310127705336,.5438501834869385,.4253072142601013,0,2,3,10,15,2,-1,8,10,5,2,3,-.006309415213763714,.4259178936481476,.5378909707069397,0,2,3,0,12,11,-1,9,0,6,11,2,-.1100727990269661,.6904156804084778,.4721749126911163,0,2,13,0,2,6,-1,13,0,1,6,2,.0002861965913325548,.4524914920330048,.5548306107521057,0,2,0,19,2,1,-1,1,19,1,1,2,2942532955785282e-20,.5370373725891113,.4236463904380798,0,3,16,10,4,10,-1,18,10,2,5,2,16,15,2,5,2,-.0248865708708763,.6423557996749878,.4969303905963898,0,2,4,8,10,3,-1,4,9,10,1,3,.0331488512456417,.4988475143909454,.1613811999559403,0,2,14,12,3,3,-1,14,13,3,1,3,.0007849169196560979,.541602611541748,.4223009049892426,0,3,0,10,4,10,-1,0,10,2,5,2,2,15,2,5,2,.004708718974143267,.4576328992843628,.6027557849884033,0,2,18,3,2,6,-1,18,5,2,2,3,.0024144479539245367,.530897319316864,.4422498941421509,0,2,6,6,1,3,-1,6,7,1,1,3,.0019523180089890957,.4705634117126465,.666332483291626,0,2,7,7,7,2,-1,7,8,7,1,2,.0013031980488449335,.4406126141548157,.5526962280273438,0,2,0,3,2,6,-1,0,5,2,2,3,.004473549779504538,.5129023790359497,.3301498889923096,0,2,11,1,3,1,-1,12,1,1,1,3,-.002665286883711815,.3135471045970917,.5175036191940308,0,2,5,0,2,6,-1,6,0,1,6,2,.0001366677024634555,.4119370877742767,.530687689781189,0,2,1,1,18,14,-1,7,1,6,14,3,-.0171264503151178,.6177806258201599,.4836578965187073,0,2,4,6,8,3,-1,8,6,4,3,2,-.0002660143072716892,.3654330968856812,.5169736742973328,0,2,9,12,6,2,-1,9,12,3,2,2,-.022932380437851,.349091500043869,.5163992047309875,0,2,5,12,6,2,-1,8,12,3,2,2,.0023316550068557262,.5166299939155579,.3709389865398407,0,2,10,7,3,5,-1,11,7,1,5,3,.016925660893321,.501473605632782,.8053988218307495,0,2,7,7,3,5,-1,8,7,1,5,3,-.008985882624983788,.6470788717269897,.465702086687088,0,2,13,0,3,10,-1,14,0,1,10,3,-.0118746999651194,.3246378898620606,.5258755087852478,0,2,4,11,3,2,-1,4,12,3,1,2,.00019350569345988333,.5191941857337952,.3839643895626068,0,2,17,3,3,6,-1,18,3,1,6,3,.005871349014341831,.4918133914470673,.6187043190002441,0,2,1,8,18,10,-1,1,13,18,5,2,-.2483879029750824,.1836802959442139,.4988150000572205,0,2,13,0,3,10,-1,14,0,1,10,3,.0122560001909733,.5227053761482239,.3632029891014099,0,2,9,14,2,3,-1,9,15,2,1,3,.0008399017970077693,.4490250051021576,.5774148106575012,0,2,16,3,3,7,-1,17,3,1,7,3,.002540736924856901,.4804787039756775,.5858299136161804,0,2,4,0,3,10,-1,5,0,1,10,3,-.0148224299773574,.2521049976348877,.5023537278175354,0,2,16,3,3,7,-1,17,3,1,7,3,-.005797395948320627,.5996695756912231,.4853715002536774,0,2,0,9,1,2,-1,0,10,1,1,2,.000726621481589973,.5153716802597046,.3671779930591583,0,2,18,1,2,10,-1,18,1,1,10,2,-.0172325801104307,.6621719002723694,.4994656145572662,0,2,0,1,2,10,-1,1,1,1,10,2,.007862408645451069,.4633395075798035,.6256101727485657,0,2,10,16,3,4,-1,11,16,1,4,3,-.004734362009912729,.3615573048591614,.5281885266304016,0,2,2,8,3,3,-1,3,8,1,3,3,.0008304847870022058,.4442889094352722,.5550957918167114,0,3,11,0,2,6,-1,12,0,1,3,2,11,3,1,3,2,.00766021991148591,.5162935256958008,.2613354921340942,0,3,7,0,2,6,-1,7,0,1,3,2,8,3,1,3,2,-.004104837775230408,.2789632081985474,.5019031763076782,0,2,16,3,3,7,-1,17,3,1,7,3,.004851257894188166,.4968984127044678,.5661668181419373,0,2,1,3,3,7,-1,2,3,1,7,3,.0009989645332098007,.4445607960224152,.5551813244819641,0,2,14,1,6,16,-1,16,1,2,16,3,-.2702363133430481,.0293882098048925,.515131413936615,0,2,0,1,6,16,-1,2,1,2,16,3,-.0130906803533435,.5699399709701538,.4447459876537323,0,3,2,0,16,8,-1,10,0,8,4,2,2,4,8,4,2,-.009434279054403305,.4305466115474701,.5487895011901855,0,2,6,8,5,3,-1,6,9,5,1,3,-.0015482039889320731,.3680317103862763,.512808084487915,0,2,9,7,3,3,-1,10,7,1,3,3,.005374613218009472,.4838916957378388,.6101555824279785,0,2,8,8,4,3,-1,8,9,4,1,3,.0015786769799888134,.5325223207473755,.4118548035621643,0,2,9,6,2,4,-1,9,6,1,4,2,.003685605013743043,.4810948073863983,.6252303123474121,0,2,0,7,15,1,-1,5,7,5,1,3,.009388701990246773,.520022988319397,.3629410862922669,0,2,8,2,7,9,-1,8,5,7,3,3,.0127926301211119,.4961709976196289,.673801600933075,0,3,1,7,16,4,-1,1,7,8,2,2,9,9,8,2,2,-.003366104094311595,.4060279130935669,.5283598899841309,0,2,6,12,8,2,-1,6,13,8,1,2,.00039771420415490866,.4674113988876343,.5900775194168091,0,2,8,11,3,3,-1,8,12,3,1,3,.0014868030557408929,.4519116878509522,.6082053780555725,0,3,4,5,14,10,-1,11,5,7,5,2,4,10,7,5,2,-.0886867493391037,.2807899117469788,.5180991888046265,0,2,4,12,3,2,-1,4,13,3,1,2,-7429611287079751e-20,.5295584201812744,.408762514591217,0,2,9,11,6,1,-1,11,11,2,1,3,-14932939848222304e-21,.5461400151252747,.4538542926311493,0,2,4,9,7,6,-1,4,11,7,2,3,.005916223861277103,.5329161286354065,.4192134141921997,0,2,7,10,6,3,-1,7,11,6,1,3,.001114164013415575,.4512017965316773,.5706217288970947,0,2,9,11,2,2,-1,9,12,2,1,2,8924936264520511e-20,.4577805995941162,.5897638201713562,0,2,0,5,20,6,-1,0,7,20,2,3,.0025319510605186224,.5299603939056396,.3357639014720917,0,2,6,4,6,1,-1,8,4,2,1,3,.0124262003228068,.4959059059619904,.1346601992845535,0,2,9,11,6,1,-1,11,11,2,1,3,.0283357501029968,.5117079019546509,.0006104363710619509,0,2,5,11,6,1,-1,7,11,2,1,3,.006616588216274977,.4736349880695343,.7011628150939941,0,2,10,16,3,4,-1,11,16,1,4,3,.008046876639127731,.5216417908668518,.3282819986343384,0,2,8,7,3,3,-1,9,7,1,3,3,-.001119398046284914,.5809860825538635,.4563739001750946,0,2,2,12,16,8,-1,2,16,16,4,2,.0132775902748108,.5398362278938293,.4103901088237763,0,2,0,15,15,2,-1,0,16,15,1,2,.0004879473999608308,.424928605556488,.5410590767860413,0,2,15,4,5,6,-1,15,6,5,2,3,.0112431701272726,.526996374130249,.3438215851783752,0,2,9,5,2,4,-1,10,5,1,4,2,-.0008989666821435094,.5633075833320618,.4456613063812256,0,2,8,10,9,6,-1,8,12,9,2,3,.006667715962976217,.5312889218330383,.4362679123878479,0,2,2,19,15,1,-1,7,19,5,1,3,.0289472993463278,.4701794981956482,.657579779624939,0,2,10,16,3,4,-1,11,16,1,4,3,-.0234000496566296,0,.5137398838996887,0,2,0,15,20,4,-1,0,17,20,2,2,-.0891170501708984,.0237452797591686,.4942430853843689,0,2,10,16,3,4,-1,11,16,1,4,3,-.0140546001493931,.3127323091030121,.511751115322113,0,2,7,16,3,4,-1,8,16,1,4,3,.008123939856886864,.50090491771698,.2520025968551636,0,2,9,16,3,3,-1,9,17,3,1,3,-.004996465053409338,.6387143731117249,.4927811920642853,0,2,8,11,4,6,-1,8,14,4,3,2,.0031253970228135586,.5136849880218506,.3680452108383179,0,2,9,6,2,12,-1,9,10,2,4,3,.006766964215785265,.5509843826293945,.4363631904125214,0,2,8,17,4,3,-1,8,18,4,1,3,-.002371144015341997,.6162335276603699,.4586946964263916,0,3,9,18,8,2,-1,13,18,4,1,2,9,19,4,1,2,-.005352279171347618,.6185457706451416,.4920490980148315,0,2,1,18,8,2,-1,1,19,8,1,2,-.0159688591957092,.1382617950439453,.4983252882957459,0,2,13,5,6,15,-1,15,5,2,15,3,.004767606034874916,.4688057899475098,.5490046143531799,0,2,9,8,2,2,-1,9,9,2,1,2,-.002471469109877944,.2368514984846115,.5003952980041504,0,2,9,5,2,3,-1,9,5,1,3,2,-.0007103378884494305,.5856394171714783,.4721533060073853,0,2,1,5,6,15,-1,3,5,2,15,3,-.1411755979061127,.0869000628590584,.4961591064929962,0,3,4,1,14,8,-1,11,1,7,4,2,4,5,7,4,2,.1065180972218514,.5138837099075317,.1741005033254623,0,3,2,4,4,16,-1,2,4,2,8,2,4,12,2,8,2,-.0527447499334812,.7353636026382446,.4772881865501404,0,2,12,4,3,12,-1,12,10,3,6,2,-.00474317604675889,.3884406089782715,.5292701721191406,0,3,4,5,10,12,-1,4,5,5,6,2,9,11,5,6,2,.0009967676596716046,.5223492980003357,.4003424048423767,0,2,9,14,2,3,-1,9,15,2,1,3,.00802841316908598,.4959106147289276,.7212964296340942,0,2,5,4,2,3,-1,5,5,2,1,3,.0008602585876360536,.4444884061813355,.55384761095047,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,.0009319150121882558,.539837121963501,.4163244068622589,0,2,6,4,7,3,-1,6,5,7,1,3,-.002508206060156226,.5854265093803406,.456250011920929,0,3,2,0,18,2,-1,11,0,9,1,2,2,1,9,1,2,-.0021378761157393456,.4608069062232971,.5280259251594543,0,3,0,0,18,2,-1,0,0,9,1,2,9,1,9,1,2,-.002154604997485876,.3791126906871796,.5255997180938721,0,3,13,13,4,6,-1,15,13,2,3,2,13,16,2,3,2,-.007621400989592075,.5998609066009521,.4952073991298676,0,3,3,13,4,6,-1,3,13,2,3,2,5,16,2,3,2,.002205536002293229,.4484206140041351,.5588530898094177,0,2,10,12,2,6,-1,10,15,2,3,2,.0012586950324475765,.5450747013092041,.4423840939998627,0,3,5,9,10,10,-1,5,9,5,5,2,10,14,5,5,2,-.005092672072350979,.4118275046348572,.5263035893440247,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,-.0025095739401876926,.5787907838821411,.4998494982719421,0,2,7,12,6,8,-1,10,12,3,8,2,-.0773275569081306,.8397865891456604,.481112003326416,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,-.041485819965601,.240861102938652,.5176993012428284,0,2,8,11,2,1,-1,9,11,1,1,2,.00010355669655837119,.4355360865592957,.5417054295539856,0,2,10,5,1,12,-1,10,9,1,4,3,.0013255809899419546,.5453971028327942,.4894095063209534,0,2,0,11,6,9,-1,3,11,3,9,2,-.00805987324565649,.5771024227142334,.4577918946743012,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,.019058620557189,.5169867873191833,.3400475084781647,0,3,4,2,4,10,-1,4,2,2,5,2,6,7,2,5,2,-.0350578911602497,.2203243970870972,.5000503063201904,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,.005729605909436941,.5043408274650574,.6597570776939392,0,2,0,14,6,3,-1,0,15,6,1,3,-.0116483299061656,.2186284959316254,.4996652901172638,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,.0014544479781761765,.5007681846618652,.5503727793693542,0,2,6,1,3,2,-1,7,1,1,2,3,-.00025030909455381334,.4129841029644013,.524167001247406,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,-.000829072727356106,.541286826133728,.4974496066570282,0,3,5,4,4,2,-1,5,4,2,1,2,7,5,2,1,2,.0010862209601327777,.460552990436554,.5879228711128235,0,3,13,0,2,12,-1,14,0,1,6,2,13,6,1,6,2,.0002000050008064136,.5278854966163635,.4705209136009216,0,2,6,0,3,10,-1,7,0,1,10,3,.0029212920926511288,.5129609704017639,.375553697347641,0,2,3,0,17,8,-1,3,4,17,4,2,.0253874007612467,.4822691977024078,.5790768265724182,0,2,0,4,20,4,-1,0,6,20,2,2,-.00319684692658484,.5248395204544067,.3962840139865875,90.25334930419922,182,0,2,0,3,8,2,-1,4,3,4,2,2,.005803173873573542,.3498983979225159,.596198320388794,0,2,8,11,4,3,-1,8,12,4,1,3,-.009000306949019432,.6816636919975281,.4478552043437958,0,3,5,7,6,4,-1,5,7,3,2,2,8,9,3,2,2,-.00115496595390141,.5585706233978271,.3578251004219055,0,2,8,3,4,9,-1,8,6,4,3,3,-.0011069850297644734,.5365036129951477,.3050428032875061,0,2,8,15,1,4,-1,8,17,1,2,2,.00010308309720130637,.363909512758255,.5344635844230652,0,2,4,5,12,7,-1,8,5,4,7,3,-.005098483990877867,.2859157025814056,.5504264831542969,0,3,4,2,4,10,-1,4,2,2,5,2,6,7,2,5,2,.0008257220033556223,.5236523747444153,.3476041853427887,0,2,3,0,17,2,-1,3,1,17,1,2,.009978332556784153,.4750322103500366,.621964693069458,0,2,2,2,16,15,-1,2,7,16,5,3,-.0374025292694569,.334337592124939,.527806282043457,0,2,15,2,5,2,-1,15,3,5,1,2,.0048548257909715176,.5192180871963501,.3700444102287293,0,2,9,3,2,2,-1,10,3,1,2,2,-.001866447040811181,.2929843962192535,.5091944932937622,0,2,4,5,16,15,-1,4,10,16,5,3,.0168888904154301,.3686845898628235,.5431225895881653,0,2,7,13,5,6,-1,7,16,5,3,2,-.005837262142449617,.3632183969020844,.5221335887908936,0,2,10,7,3,2,-1,11,7,1,2,3,-.00147137395106256,.5870683789253235,.4700650870800018,0,2,8,3,3,1,-1,9,3,1,1,3,-.0011522950371727347,.3195894956588745,.5140954256057739,0,2,9,16,3,3,-1,9,17,3,1,3,-.004256030078977346,.6301859021186829,.4814921021461487,0,2,0,2,5,2,-1,0,3,5,1,2,-.006737829186022282,.1977048069238663,.5025808215141296,0,2,12,5,4,3,-1,12,6,4,1,3,.0113826701417565,.495413213968277,.6867045760154724,0,2,1,7,12,1,-1,5,7,4,1,3,.005179470870643854,.5164427757263184,.3350647985935211,0,2,7,5,6,14,-1,7,12,6,7,2,-.1174378991127014,.2315246015787125,.5234413743019104,0,3,0,0,8,10,-1,0,0,4,5,2,4,5,4,5,2,.0287034492939711,.4664297103881836,.6722521185874939,0,2,9,1,3,2,-1,10,1,1,2,3,.004823103081434965,.5220875144004822,.2723532915115356,0,2,8,1,3,2,-1,9,1,1,2,3,.0026798530016094446,.5079277157783508,.2906948924064636,0,2,12,4,3,3,-1,12,5,3,1,3,.008050408214330673,.4885950982570648,.6395021080970764,0,2,7,4,6,16,-1,7,12,6,8,2,.004805495962500572,.5197256803512573,.365666389465332,0,2,12,4,3,3,-1,12,5,3,1,3,-.0022420159075409174,.6153467893600464,.4763701856136322,0,2,2,3,2,6,-1,2,5,2,2,3,-.0137577103450894,.2637344896793366,.5030903220176697,0,2,14,2,6,9,-1,14,5,6,3,3,-.1033829972147942,.2287521958351135,.5182461142539978,0,2,5,4,3,3,-1,5,5,3,1,3,-.009443208575248718,.6953303813934326,.4694949090480804,0,2,9,17,3,2,-1,10,17,1,2,3,.0008027118165045977,.5450655221939087,.4268783926963806,0,2,5,5,2,3,-1,5,6,2,1,3,-.004194566980004311,.6091387867927551,.4571642875671387,0,2,13,11,3,6,-1,13,13,3,2,3,.0109422104433179,.5241063237190247,.3284547030925751,0,2,3,14,2,6,-1,3,17,2,3,2,-.0005784106906503439,.5387929081916809,.4179368913173676,0,2,14,3,6,2,-1,14,4,6,1,2,-.002088862005621195,.4292691051959992,.5301715731620789,0,2,0,8,16,2,-1,0,9,16,1,2,.0032383969519287348,.379234790802002,.5220744013786316,0,2,14,3,6,2,-1,14,4,6,1,2,.004907502792775631,.5237283110618591,.4126757979393005,0,2,0,0,5,6,-1,0,2,5,2,3,-.0322779417037964,.1947655975818634,.4994502067565918,0,2,12,5,4,3,-1,12,6,4,1,3,-.008971123024821281,.6011285185813904,.4929032027721405,0,2,4,11,3,6,-1,4,13,3,2,3,.0153210898861289,.5009753704071045,.2039822041988373,0,2,12,5,4,3,-1,12,6,4,1,3,.002085556974634528,.4862189888954163,.5721694827079773,0,2,9,5,1,3,-1,9,6,1,1,3,.005061502102762461,.5000218749046326,.1801805943250656,0,2,12,5,4,3,-1,12,6,4,1,3,-.0037174751050770283,.5530117154121399,.4897592961788178,0,2,6,6,8,12,-1,6,12,8,6,2,-.0121705001220107,.4178605973720551,.5383723974227905,0,2,12,5,4,3,-1,12,6,4,1,3,.004624839872121811,.4997169971466065,.5761327147483826,0,2,5,12,9,2,-1,8,12,3,2,3,-.0002104042941937223,.5331807136535645,.4097681045532227,0,2,12,5,4,3,-1,12,6,4,1,3,-.0146417804062366,.5755925178527832,.5051776170730591,0,2,4,5,4,3,-1,4,6,4,1,3,.00331994891166687,.4576976895332336,.6031805872917175,0,2,6,6,9,2,-1,9,6,3,2,3,.003723687957972288,.4380396902561188,.541588306427002,0,2,4,11,1,3,-1,4,12,1,1,3,.0008295116131193936,.5163031816482544,.3702219128608704,0,2,14,12,6,6,-1,14,12,3,6,2,-.0114084901288152,.6072946786880493,.4862565100193024,0,2,7,0,3,7,-1,8,0,1,7,3,-.004532012157142162,.3292475938796997,.5088962912559509,0,2,9,8,3,3,-1,10,8,1,3,3,.00512760179117322,.4829767942428589,.6122708916664124,0,2,8,8,3,3,-1,9,8,1,3,3,.00985831581056118,.4660679996013641,.6556177139282227,0,2,5,10,11,3,-1,5,11,11,1,3,.036985918879509,.5204849243164062,.1690472066402435,0,2,5,7,10,1,-1,10,7,5,1,2,.004649116192013025,.5167322158813477,.3725225031375885,0,2,9,7,3,2,-1,10,7,1,2,3,-.004266470205038786,.6406493186950684,.4987342953681946,0,2,8,7,3,2,-1,9,7,1,2,3,-.0004795659042429179,.5897293090820312,.4464873969554901,0,2,11,9,4,2,-1,11,9,2,2,2,.0036827160511165857,.5441560745239258,.347266286611557,0,2,5,9,4,2,-1,7,9,2,2,2,-.0100598800927401,.2143162935972214,.500482976436615,0,2,14,10,2,4,-1,14,12,2,2,2,-.0003036184061784297,.538642406463623,.4590323865413666,0,2,7,7,3,2,-1,8,7,1,2,3,-.0014545479789376259,.5751184225082397,.4497095048427582,0,2,14,17,6,3,-1,14,18,6,1,3,.0016515209572389722,.5421937704086304,.4238520860671997,0,3,4,5,12,12,-1,4,5,6,6,2,10,11,6,6,2,-.007846863940358162,.4077920913696289,.5258157253265381,0,3,6,9,8,8,-1,10,9,4,4,2,6,13,4,4,2,-.005125985015183687,.422927588224411,.5479453206062317,0,2,0,4,15,4,-1,5,4,5,4,3,-.0368909612298012,.6596375703811646,.4674678146839142,0,2,13,2,4,1,-1,13,2,2,1,2,.0002403563994448632,.4251135885715485,.5573202967643738,0,2,4,12,2,2,-1,4,13,2,1,2,-15150169929256663e-21,.5259246826171875,.4074114859104157,0,2,8,13,4,3,-1,8,14,4,1,3,.0022108471021056175,.4671722948551178,.5886352062225342,0,2,9,13,2,3,-1,9,14,2,1,3,-.0011568620102480054,.5711066126823425,.4487161934375763,0,2,13,11,2,3,-1,13,12,2,1,3,.004999629221856594,.5264198184013367,.2898327112197876,0,3,7,12,4,4,-1,7,12,2,2,2,9,14,2,2,2,-.0014656189596280456,.3891738057136536,.5197871923446655,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,-.0011975039960816503,.5795872807502747,.4927955865859985,0,2,8,17,3,2,-1,9,17,1,2,3,-.0044954330660402775,.2377603054046631,.5012555122375488,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,.00014997160178609192,.4876626133918762,.5617607831954956,0,2,0,17,6,3,-1,0,18,6,1,3,.002639150945469737,.516808807849884,.3765509128570557,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,-.0002936813107226044,.5446649193763733,.4874630868434906,0,3,8,11,2,2,-1,8,11,1,1,2,9,12,1,1,2,.0014211760135367513,.4687897861003876,.669133186340332,0,2,12,5,8,4,-1,12,5,4,4,2,.0794276371598244,.5193443894386292,.273294597864151,0,2,0,5,8,4,-1,4,5,4,4,2,.0799375027418137,.4971731007099152,.1782083958387375,0,2,13,2,4,1,-1,13,2,2,1,2,.0110892597585917,.5165994763374329,.3209475874900818,0,2,3,2,4,1,-1,5,2,2,1,2,.00016560709627810866,.4058471918106079,.5307276248931885,0,3,10,0,4,2,-1,12,0,2,1,2,10,1,2,1,2,-.0053354292176663876,.3445056974887848,.5158129930496216,0,2,7,12,3,1,-1,8,12,1,1,3,.0011287260567769408,.4594863057136536,.6075533032417297,0,3,8,11,4,8,-1,10,11,2,4,2,8,15,2,4,2,-.0219692196696997,.1680400967597961,.5228595733642578,0,2,9,9,2,2,-1,9,10,2,1,2,-.00021775320055894554,.3861596882343292,.5215672850608826,0,2,3,18,15,2,-1,3,19,15,1,2,.00020200149447191507,.5517979264259338,.4363039135932922,0,3,2,6,2,12,-1,2,6,1,6,2,3,12,1,6,2,-.0217331498861313,.7999460101127625,.4789851009845734,0,2,9,8,2,3,-1,9,9,2,1,3,-.0008439993252977729,.4085975885391235,.5374773144721985,0,2,7,10,3,2,-1,8,10,1,2,3,-.00043895249837078154,.5470405220985413,.4366143047809601,0,2,11,11,3,1,-1,12,11,1,1,3,.0015092400135472417,.4988996982574463,.5842149257659912,0,2,6,11,3,1,-1,7,11,1,1,3,-.003554783994331956,.6753690242767334,.4721005856990814,0,3,9,2,4,2,-1,11,2,2,1,2,9,3,2,1,2,.00048191400128416717,.541585385799408,.4357109069824219,0,2,4,12,2,3,-1,4,13,2,1,3,-.00602643983438611,.2258509993553162,.499188095331192,0,2,2,1,18,3,-1,8,1,6,3,3,-.0116681400686502,.625655472278595,.4927498996257782,0,2,5,1,4,14,-1,7,1,2,14,2,-.0028718370012938976,.3947784900665283,.524580180644989,0,2,8,16,12,3,-1,8,16,6,3,2,.0170511696487665,.4752511084079742,.5794224143028259,0,2,1,17,18,3,-1,7,17,6,3,3,-.0133520802482963,.6041104793548584,.4544535875320435,0,2,9,14,2,6,-1,9,17,2,3,2,-.0003930180100724101,.4258275926113129,.5544905066490173,0,2,9,12,1,8,-1,9,16,1,4,2,.0030483349692076445,.5233420133590698,.3780272901058197,0,2,9,14,2,3,-1,9,15,2,1,3,-.00435792887583375,.6371889114379883,.4838674068450928,0,2,9,6,2,12,-1,9,10,2,4,3,.0056661018170416355,.5374705791473389,.4163666069507599,0,2,12,9,3,3,-1,12,10,3,1,3,6067733920644969e-20,.4638795852661133,.5311625003814697,0,2,0,1,4,8,-1,2,1,2,8,2,.0367381609976292,.4688656032085419,.6466524004936218,0,3,9,1,6,2,-1,12,1,3,1,2,9,2,3,1,2,.008652813732624054,.5204318761825562,.2188657969236374,0,2,1,3,12,14,-1,1,10,12,7,2,-.1537135988473892,.1630371958017349,.4958840012550354,0,3,8,12,4,2,-1,10,12,2,1,2,8,13,2,1,2,-.00041560421232134104,.577445924282074,.4696458876132965,0,3,1,9,10,2,-1,1,9,5,1,2,6,10,5,1,2,-.0012640169588848948,.3977175951004028,.5217198133468628,0,2,8,15,4,3,-1,8,16,4,1,3,-.003547334112226963,.6046528220176697,.480831503868103,0,2,6,8,8,3,-1,6,9,8,1,3,3001906952704303e-20,.3996723890304565,.5228201150894165,0,2,9,15,5,3,-1,9,16,5,1,3,.00131130195222795,.4712158143520355,.5765997767448425,0,2,8,7,4,3,-1,8,8,4,1,3,-.0013374709524214268,.4109584987163544,.5253170132637024,0,2,7,7,6,2,-1,7,8,6,1,2,.0208767093718052,.5202993750572205,.1757981926202774,0,3,5,7,8,2,-1,5,7,4,1,2,9,8,4,1,2,-.007549794856458902,.6566609740257263,.4694975018501282,0,2,12,9,3,3,-1,12,10,3,1,3,.0241885501891375,.5128673911094666,.3370220959186554,0,2,4,7,4,2,-1,4,8,4,1,2,-.002935882890596986,.658078670501709,.4694541096687317,0,2,14,2,6,9,-1,14,5,6,3,3,.0575579293072224,.5146445035934448,.2775259912014008,0,2,4,9,3,3,-1,5,9,1,3,3,-.0011343370424583554,.3836601972579956,.5192667245864868,0,2,12,9,3,3,-1,12,10,3,1,3,.0168169997632504,.5085592865943909,.6177260875701904,0,2,0,2,6,9,-1,0,5,6,3,3,.005053517874330282,.5138763189315796,.3684791922569275,0,2,17,3,3,6,-1,18,3,1,6,3,-.004587471019476652,.5989655256271362,.4835202097892761,0,2,0,3,3,6,-1,1,3,1,6,3,.001688246033154428,.4509486854076386,.5723056793212891,0,2,17,14,1,2,-1,17,15,1,1,2,-.0016554000321775675,.3496770858764648,.5243319272994995,0,2,4,9,4,3,-1,6,9,2,3,2,-.0193738006055355,.1120536997914314,.496871292591095,0,2,12,9,3,3,-1,12,10,3,1,3,.0103744501248002,.5148196816444397,.4395213127136231,0,2,5,9,3,3,-1,5,10,3,1,3,.00014973050565458834,.4084999859333038,.526988685131073,0,3,9,5,6,8,-1,12,5,3,4,2,9,9,3,4,2,-.042981930077076,.6394104957580566,.501850426197052,0,3,5,5,6,8,-1,5,5,3,4,2,8,9,3,4,2,.008306593634188175,.470755398273468,.6698353290557861,0,2,16,1,4,6,-1,16,4,4,3,2,-.0041285790503025055,.4541369080543518,.5323647260665894,0,2,1,0,6,20,-1,3,0,2,20,3,.0017399420030415058,.433396190404892,.5439866185188293,0,2,12,11,3,2,-1,13,11,1,2,3,.00011739750334527344,.4579687118530273,.5543426275253296,0,2,5,11,3,2,-1,6,11,1,2,3,.00018585780344437808,.4324643909931183,.5426754951477051,0,2,9,4,6,1,-1,11,4,2,1,3,.005558769218623638,.525722086429596,.3550611138343811,0,2,0,0,8,3,-1,4,0,4,3,2,-.007985156029462814,.6043018102645874,.4630635976791382,0,2,15,0,2,5,-1,15,0,1,5,2,.0006059412262402475,.4598254859447479,.55331951379776,0,2,4,1,3,2,-1,5,1,1,2,3,-.0002298304025316611,.4130752086639404,.5322461128234863,0,2,7,0,6,15,-1,9,0,2,15,3,.0004374021082185209,.4043039977550507,.5409289002418518,0,2,6,11,3,1,-1,7,11,1,1,3,.0002948202018160373,.4494963884353638,.5628852248191833,0,2,12,0,3,4,-1,13,0,1,4,3,.0103126596659422,.5177510976791382,.2704316973686218,0,2,5,4,6,1,-1,7,4,2,1,3,-.007724110968410969,.1988019049167633,.4980553984642029,0,2,12,7,3,2,-1,12,8,3,1,2,-.004679720848798752,.6644750237464905,.5018296241760254,0,2,0,1,4,6,-1,0,4,4,3,2,-.005075545981526375,.3898304998874664,.5185269117355347,0,2,12,7,3,2,-1,12,8,3,1,2,.00224797404371202,.4801808893680573,.5660336017608643,0,2,2,16,3,3,-1,2,17,3,1,3,.0008332700817845762,.5210919976234436,.3957188129425049,0,3,13,8,6,10,-1,16,8,3,5,2,13,13,3,5,2,-.0412793308496475,.6154541969299316,.5007054209709167,0,2,0,9,5,2,-1,0,10,5,1,2,-.0005093018990010023,.3975942134857178,.5228403806686401,0,3,12,11,2,2,-1,13,11,1,1,2,12,12,1,1,2,.0012568780221045017,.4979138076305389,.5939183235168457,0,2,3,15,3,3,-1,3,16,3,1,3,.008004849776625633,.4984497129917145,.1633366048336029,0,2,12,7,3,2,-1,12,8,3,1,2,-.0011879300000146031,.5904964804649353,.4942624866962433,0,2,5,7,3,2,-1,5,8,3,1,2,.0006194895249791443,.4199557900428772,.5328726172447205,0,2,9,5,9,9,-1,9,8,9,3,3,.006682985927909613,.5418602824211121,.490588903427124,0,2,5,0,3,7,-1,6,0,1,7,3,-.0037062340416014194,.3725939095020294,.5138000249862671,0,2,5,2,12,5,-1,9,2,4,5,3,-.0397394113242626,.6478961110115051,.5050346851348877,0,3,6,11,2,2,-1,6,11,1,1,2,7,12,1,1,2,.0014085009461268783,.4682339131832123,.6377884149551392,0,2,15,15,3,2,-1,15,16,3,1,2,.0003932268882635981,.5458530187606812,.415048211812973,0,2,2,15,3,2,-1,2,16,3,1,2,-.0018979819724336267,.3690159916877747,.5149704217910767,0,3,14,12,6,8,-1,17,12,3,4,2,14,16,3,4,2,-.0139704402536154,.6050562858581543,.4811357855796814,0,2,2,8,15,6,-1,7,8,5,6,3,-.1010081991553307,.2017080038785934,.4992361962795258,0,2,2,2,18,17,-1,8,2,6,17,3,-.0173469204455614,.5713148713111877,.4899486005306244,0,2,5,1,4,1,-1,7,1,2,1,2,.000156197595060803,.4215388894081116,.5392642021179199,0,2,5,2,12,5,-1,9,2,4,5,3,.1343892961740494,.5136151909828186,.3767612874507904,0,2,3,2,12,5,-1,7,2,4,5,3,-.0245822407305241,.7027357816696167,.4747906923294067,0,3,4,9,12,4,-1,10,9,6,2,2,4,11,6,2,2,-.0038553720805794,.4317409098148346,.5427716970443726,0,3,5,15,6,2,-1,5,15,3,1,2,8,16,3,1,2,-.002316524973139167,.594269871711731,.4618647992610931,0,2,10,14,2,3,-1,10,15,2,1,3,-.004851812031120062,.6191568970680237,.4884895086288452,0,3,0,13,20,2,-1,0,13,10,1,2,10,14,10,1,2,.002469993894919753,.5256664752960205,.4017199873924255,0,3,4,9,12,8,-1,10,9,6,4,2,4,13,6,4,2,.0454969592392445,.5237867832183838,.2685773968696594,0,2,8,13,3,6,-1,8,16,3,3,2,-.0203195996582508,.213044598698616,.4979738891124725,0,2,10,12,2,2,-1,10,13,2,1,2,.0002699499891605228,.481404185295105,.5543122291564941,0,3,9,12,2,2,-1,9,12,1,1,2,10,13,1,1,2,-.0018232699949294329,.6482579708099365,.4709989130496979,0,3,4,11,14,4,-1,11,11,7,2,2,4,13,7,2,2,-.006301579065620899,.4581927955150604,.5306236147880554,0,2,8,5,4,2,-1,8,6,4,1,2,-.0002413949987385422,.5232086777687073,.4051763117313385,0,2,10,10,6,3,-1,12,10,2,3,3,-.001033036969602108,.5556201934814453,.4789193868637085,0,2,2,14,1,2,-1,2,15,1,1,2,.0001804116036510095,.5229442715644836,.4011810123920441,0,3,13,8,6,12,-1,16,8,3,6,2,13,14,3,6,2,-.0614078603684902,.62986820936203,.5010703206062317,0,3,1,8,6,12,-1,1,8,3,6,2,4,14,3,6,2,-.0695439130067825,.7228280901908875,.4773184061050415,0,2,10,0,6,10,-1,12,0,2,10,3,-.0705426633358002,.2269513010978699,.5182529091835022,0,3,5,11,8,4,-1,5,11,4,2,2,9,13,4,2,2,.0024423799477517605,.5237097144126892,.4098151028156281,0,3,10,16,8,4,-1,14,16,4,2,2,10,18,4,2,2,.0015494349645450711,.4773750901222229,.5468043088912964,0,2,7,7,6,6,-1,9,7,2,6,3,-.0239142198115587,.7146975994110107,.4783824980258942,0,2,10,2,4,10,-1,10,2,2,10,2,-.0124536901712418,.2635296881198883,.5241122841835022,0,2,6,1,4,9,-1,8,1,2,9,2,-.00020760179904755205,.3623757064342499,.5113608837127686,0,2,12,19,2,1,-1,12,19,1,1,2,29781080229440704e-21,.4705932140350342,.5432801842689514,104.74919891357422,211,0,2,1,2,4,9,-1,3,2,2,9,2,.0117727499455214,.3860518932342529,.6421167254447937,0,2,7,5,6,4,-1,9,5,2,4,3,.0270375702530146,.4385654926300049,.675403892993927,0,2,9,4,2,4,-1,9,6,2,2,2,-3641950024757534e-20,.5487101078033447,.34233158826828,0,2,14,5,2,8,-1,14,9,2,4,2,.001999540952965617,.3230532109737396,.5400317907333374,0,2,7,6,5,12,-1,7,12,5,6,2,.0045278300531208515,.5091639757156372,.2935043871402741,0,2,14,6,2,6,-1,14,9,2,3,2,.00047890920541249216,.4178153872489929,.5344064235687256,0,2,4,6,2,6,-1,4,9,2,3,2,.0011720920447260141,.2899182140827179,.5132070779800415,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.0009530570241622627,.428012490272522,.5560845136642456,0,2,6,18,2,2,-1,7,18,1,2,2,15099150004971307e-21,.4044871926307678,.5404760241508484,0,2,11,3,6,2,-1,11,4,6,1,2,-.0006081790197640657,.4271768927574158,.5503466129302979,0,2,2,0,16,6,-1,2,2,16,2,3,.003322452073916793,.3962723910808563,.5369734764099121,0,2,11,3,6,2,-1,11,4,6,1,2,-.0011037490330636501,.4727177917957306,.5237749814987183,0,2,4,11,10,3,-1,4,12,10,1,3,-.0014350269921123981,.5603008270263672,.4223509132862091,0,2,11,3,6,2,-1,11,4,6,1,2,.0020767399109899998,.5225917100906372,.4732725918292999,0,2,3,3,6,2,-1,3,4,6,1,2,-.00016412809782195836,.3999075889587402,.5432739853858948,0,2,16,0,4,7,-1,16,0,2,7,2,.008830243721604347,.4678385853767395,.6027327179908752,0,2,0,14,9,6,-1,0,16,9,2,3,-.0105520701035857,.3493967056274414,.5213974714279175,0,2,9,16,3,3,-1,9,17,3,1,3,-.00227316003292799,.6185818910598755,.4749062955379486,0,2,4,6,6,2,-1,6,6,2,2,3,-.0008478633244521916,.5285341143608093,.3843482136726379,0,2,15,11,1,3,-1,15,12,1,1,3,.0012081359745934606,.536064088344574,.3447335958480835,0,2,5,5,2,3,-1,5,6,2,1,3,.002651273040100932,.4558292031288147,.6193962097167969,0,2,10,9,2,2,-1,10,10,2,1,2,-.0011012479662895203,.368023008108139,.5327628254890442,0,2,3,1,4,3,-1,5,1,2,3,2,.0004956151824444532,.396059513092041,.5274940729141235,0,2,16,0,4,7,-1,16,0,2,7,2,-.0439017713069916,.7020444869995117,.4992839097976685,0,2,0,0,20,1,-1,10,0,10,1,2,.0346903502941132,.5049164295196533,.276660293340683,0,2,15,11,1,3,-1,15,12,1,1,3,-.002744219033047557,.2672632932662964,.5274971127510071,0,2,0,4,3,4,-1,1,4,1,4,3,.003331658896058798,.4579482972621918,.6001101732254028,0,2,16,3,3,6,-1,16,5,3,2,3,-.0200445707887411,.3171594142913818,.523571789264679,0,2,1,3,3,6,-1,1,5,3,2,3,.0013492030557245016,.5265362858772278,.4034324884414673,0,3,6,2,12,6,-1,12,2,6,3,2,6,5,6,3,2,.0029702018946409225,.5332456827163696,.4571984112262726,0,2,8,10,4,3,-1,8,11,4,1,3,.006303998176008463,.4593310952186585,.6034635901451111,0,3,4,2,14,6,-1,11,2,7,3,2,4,5,7,3,2,-.0129365902394056,.4437963962554932,.5372971296310425,0,2,9,11,2,3,-1,9,12,2,1,3,.004014872945845127,.4680323898792267,.6437833905220032,0,2,15,13,2,3,-1,15,14,2,1,3,-.002640167949721217,.3709631860256195,.5314332842826843,0,2,8,12,4,3,-1,8,13,4,1,3,.0139184398576617,.4723555147647858,.713080883026123,0,2,15,11,1,3,-1,15,12,1,1,3,-.00045087869511917233,.4492394030094147,.5370404124259949,0,2,7,13,5,2,-1,7,14,5,1,2,.00025384349282830954,.4406864047050476,.5514402985572815,0,2,7,12,6,3,-1,7,13,6,1,3,.002271000063046813,.4682416915893555,.5967984199523926,0,2,5,11,4,4,-1,5,13,4,2,2,.002412077970802784,.5079392194747925,.3018598854541779,0,2,11,4,3,3,-1,12,4,1,3,3,-3602567085181363e-20,.560103714466095,.4471096992492676,0,2,6,4,3,3,-1,7,4,1,3,3,-.0074905529618263245,.2207535058259964,.4989944100379944,0,2,16,5,3,6,-1,17,5,1,6,3,-.017513120546937,.6531215906143188,.5017648935317993,0,2,3,6,12,7,-1,7,6,4,7,3,.1428163051605225,.4967963099479675,.1482062041759491,0,2,16,5,3,6,-1,17,5,1,6,3,.005534526892006397,.4898946881294251,.5954223871231079,0,2,3,13,2,3,-1,3,14,2,1,3,-.0009632359142415226,.3927116990089417,.519607424736023,0,2,16,5,3,6,-1,17,5,1,6,3,-.0020370010752230883,.5613325238227844,.4884858131408691,0,2,1,5,3,6,-1,2,5,1,6,3,.0016614829655736685,.4472880065441132,.5578880906105042,0,2,1,9,18,1,-1,7,9,6,1,3,-.0031188090797513723,.3840532898902893,.5397477746009827,0,2,0,9,8,7,-1,4,9,4,7,2,-.006400061771273613,.5843983888626099,.4533218145370483,0,2,12,11,8,2,-1,12,12,8,1,2,.0003131960111204535,.5439221858978271,.4234727919101715,0,2,0,11,8,2,-1,0,12,8,1,2,-.0182220991700888,.1288464963436127,.4958404898643494,0,2,9,13,2,3,-1,9,14,2,1,3,.008796924725174904,.49512979388237,.7153480052947998,0,3,4,10,12,4,-1,4,10,6,2,2,10,12,6,2,2,-.004239507019519806,.3946599960327148,.5194936990737915,0,2,9,3,3,7,-1,10,3,1,7,3,.009708627127110958,.4897503852844238,.6064900159835815,0,2,7,2,3,5,-1,8,2,1,5,3,-.003993417136371136,.3245440125465393,.5060828924179077,0,3,9,12,4,6,-1,11,12,2,3,2,9,15,2,3,2,-.0167850591242313,.1581953018903732,.5203778743743896,0,2,8,7,3,6,-1,9,7,1,6,3,.018272090703249,.4680935144424439,.6626979112625122,0,2,15,4,4,2,-1,15,5,4,1,2,.00568728381767869,.5211697816848755,.3512184917926788,0,2,8,7,3,3,-1,9,7,1,3,3,-.0010739039862528443,.5768386125564575,.4529845118522644,0,2,14,2,6,4,-1,14,4,6,2,2,-.00370938703417778,.4507763087749481,.5313581228256226,0,2,7,16,6,1,-1,9,16,2,1,3,-.0002111070934915915,.5460820198059082,.4333376884460449,0,2,15,13,2,3,-1,15,14,2,1,3,.0010670139454305172,.5371856093406677,.4078390896320343,0,2,8,7,3,10,-1,9,7,1,10,3,.0035943021066486835,.4471287131309509,.5643836259841919,0,2,11,10,2,6,-1,11,12,2,2,3,-.005177603103220463,.4499393105506897,.5280330181121826,0,2,6,10,4,1,-1,8,10,2,1,2,-.00025414369883947074,.5516173243522644,.4407708048820496,0,2,10,9,2,2,-1,10,10,2,1,2,.006352256052196026,.5194190144538879,.2465227991342545,0,2,8,9,2,2,-1,8,10,2,1,2,-.00044205080484971404,.3830705881118774,.5139682292938232,0,3,12,7,2,2,-1,13,7,1,1,2,12,8,1,1,2,.0007448872784152627,.4891090989112854,.5974786877632141,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.0035116379149258137,.7413681745529175,.4768764972686768,0,2,13,0,3,14,-1,14,0,1,14,3,-.0125409103929996,.3648819029331207,.5252826809883118,0,2,4,0,3,14,-1,5,0,1,14,3,.009493185207247734,.5100492835044861,.362958699464798,0,2,13,4,3,14,-1,14,4,1,14,3,.0129611501470208,.5232442021369934,.4333561062812805,0,2,9,14,2,3,-1,9,15,2,1,3,.004720944911241531,.4648149013519287,.6331052780151367,0,2,8,14,4,3,-1,8,15,4,1,3,-.0023119079414755106,.5930309891700745,.4531058073043823,0,2,4,2,3,16,-1,5,2,1,16,3,-.002826229901984334,.3870477974414825,.5257101058959961,0,2,7,2,8,10,-1,7,7,8,5,2,-.0014311339473351836,.552250325679779,.4561854898929596,0,2,6,14,7,3,-1,6,15,7,1,3,.0019378310535103083,.4546220898628235,.5736966729164124,0,3,9,2,10,12,-1,14,2,5,6,2,9,8,5,6,2,.00026343559147790074,.5345739126205444,.4571875035762787,0,2,6,7,8,2,-1,6,8,8,1,2,.0007825752254575491,.3967815935611725,.5220187902450562,0,2,8,13,4,6,-1,8,16,4,3,2,-.0195504408329725,.282964289188385,.5243508219718933,0,2,6,6,1,3,-1,6,7,1,1,3,.00043914958951063454,.4590066969394684,.589909017086029,0,2,16,2,4,6,-1,16,4,4,2,3,.0214520003646612,.523141086101532,.2855378985404968,0,3,6,6,4,2,-1,6,6,2,1,2,8,7,2,1,2,.0005897358059883118,.4397256970405579,.550642192363739,0,2,16,2,4,6,-1,16,4,4,2,3,-.0261576101183891,.3135079145431519,.5189175009727478,0,2,0,2,4,6,-1,0,4,4,2,3,-.0139598604291677,.3213272988796234,.5040717720985413,0,2,9,6,2,6,-1,9,6,1,6,2,-.006369901821017265,.6387544870376587,.4849506914615631,0,2,3,4,6,10,-1,3,9,6,5,2,-.008561382070183754,.2759132087230682,.5032019019126892,0,2,9,5,2,6,-1,9,5,1,6,2,.000966229010373354,.4685640931129456,.5834879279136658,0,2,3,13,2,3,-1,3,14,2,1,3,.0007655026856809855,.5175207257270813,.389642208814621,0,2,13,13,3,2,-1,13,14,3,1,2,-.008183334022760391,.2069136947393417,.5208122134208679,0,3,2,16,10,4,-1,2,16,5,2,2,7,18,5,2,2,-.009397693909704685,.6134091019630432,.4641222953796387,0,3,5,6,10,6,-1,10,6,5,3,2,5,9,5,3,2,.004802898038178682,.5454108119010925,.439521998167038,0,2,7,14,1,3,-1,7,15,1,1,3,-.003568056970834732,.6344485282897949,.4681093990802765,0,2,14,16,6,3,-1,14,17,6,1,3,.0040733120404183865,.5292683243751526,.4015620052814484,0,2,5,4,3,3,-1,5,5,3,1,3,.0012568129459396005,.4392988085746765,.5452824831008911,0,2,7,4,10,3,-1,7,5,10,1,3,-.0029065010603517294,.5898832082748413,.4863379895687103,0,2,0,4,5,4,-1,0,6,5,2,2,-.00244093406945467,.4069364964962006,.5247421860694885,0,2,13,11,3,9,-1,13,14,3,3,3,.0248307008296251,.5182725787162781,.3682524859905243,0,2,4,11,3,9,-1,4,14,3,3,3,-.0488540083169937,.1307577937841415,.496128112077713,0,2,9,7,2,1,-1,9,7,1,1,2,-.001611037994734943,.6421005725860596,.4872662127017975,0,2,5,0,6,17,-1,7,0,2,17,3,-.0970094799995422,.0477693490684032,.495098888874054,0,2,10,3,6,3,-1,10,3,3,3,2,.0011209240183234215,.4616267085075378,.5354745984077454,0,2,2,2,15,4,-1,7,2,5,4,3,-.001306409016251564,.626185417175293,.4638805985450745,0,3,8,2,8,2,-1,12,2,4,1,2,8,3,4,1,2,.00045771620352752507,.5384417772293091,.4646640121936798,0,2,8,1,3,6,-1,8,3,3,2,3,-.0006314995116554201,.3804047107696533,.51302570104599,0,2,9,17,2,2,-1,9,18,2,1,2,.0001450597046641633,.4554310142993927,.5664461851119995,0,2,0,0,2,14,-1,1,0,1,14,2,-.0164745505899191,.6596958041191101,.4715859889984131,0,2,12,0,7,3,-1,12,1,7,1,3,.0133695797994733,.519546627998352,.3035964965820313,0,2,1,14,1,2,-1,1,15,1,1,2,.00010271780047332868,.522917628288269,.4107066094875336,0,3,14,12,2,8,-1,15,12,1,4,2,14,16,1,4,2,-.0055311559699475765,.6352887749671936,.4960907101631165,0,2,1,0,7,3,-1,1,1,7,1,3,-.0026187049224972725,.3824546039104462,.5140984058380127,0,3,14,12,2,8,-1,15,12,1,4,2,14,16,1,4,2,.005083426833152771,.4950439929962158,.6220818758010864,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0798181593418121,.4952335953712463,.1322475969791412,0,2,6,1,8,9,-1,6,4,8,3,3,-.0992265865206718,.7542728781700134,.5008416771888733,0,2,5,2,2,2,-1,5,3,2,1,2,-.0006517401780001819,.3699302971363068,.5130121111869812,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,-.018996849656105,.6689178943634033,.4921202957630158,0,3,0,17,20,2,-1,0,17,10,1,2,10,18,10,1,2,.0173468999564648,.4983300864696503,.1859198063611984,0,3,10,3,2,6,-1,11,3,1,3,2,10,6,1,3,2,.0005508210160769522,.4574424028396606,.5522121787071228,0,2,5,12,6,2,-1,8,12,3,2,2,.002005605027079582,.5131744742393494,.3856469988822937,0,2,10,7,6,13,-1,10,7,3,13,2,-.007768819108605385,.4361700117588043,.5434309244155884,0,2,5,15,10,5,-1,10,15,5,5,2,.0508782789111137,.4682720899581909,.6840639710426331,0,2,10,4,4,10,-1,10,4,2,10,2,-.0022901780903339386,.4329245090484619,.5306099057197571,0,2,5,7,2,1,-1,6,7,1,1,2,-.00015715380141045898,.5370057225227356,.4378164112567902,0,2,10,3,6,7,-1,10,3,3,7,2,.1051924005150795,.5137274265289307,.0673614665865898,0,2,4,3,6,7,-1,7,3,3,7,2,.002719891956076026,.4112060964107513,.5255665183067322,0,2,1,7,18,5,-1,7,7,6,5,3,.0483377799391747,.5404623746871948,.4438967108726502,0,2,3,17,4,3,-1,5,17,2,3,2,.0009570376132614911,.4355969130992889,.5399510860443115,0,3,8,14,12,6,-1,14,14,6,3,2,8,17,6,3,2,-.0253712590783834,.5995175242424011,.5031024813652039,0,3,0,13,20,4,-1,0,13,10,2,2,10,15,10,2,2,.0524579510092735,.4950287938117981,.1398351043462753,0,3,4,5,14,2,-1,11,5,7,1,2,4,6,7,1,2,-.0123656298965216,.639729917049408,.496410608291626,0,3,1,2,10,12,-1,1,2,5,6,2,6,8,5,6,2,-.1458971947431564,.1001669988036156,.494632214307785,0,2,6,1,14,3,-1,6,2,14,1,3,-.0159086007624865,.3312329947948456,.5208340883255005,0,2,8,16,2,3,-1,8,17,2,1,3,.00039486068999394774,.4406363964080811,.5426102876663208,0,2,9,17,3,2,-1,10,17,1,2,3,-.0052454001270234585,.2799589931964874,.5189967155456543,0,3,5,15,4,2,-1,5,15,2,1,2,7,16,2,1,2,-.005042179953306913,.6987580060958862,.4752142131328583,0,2,10,15,1,3,-1,10,16,1,1,3,.0029812189750373363,.4983288943767548,.6307479739189148,0,3,8,16,4,4,-1,8,16,2,2,2,10,18,2,2,2,-.007288430817425251,.298233300447464,.5026869773864746,0,2,6,11,8,6,-1,6,14,8,3,2,.0015094350092113018,.5308442115783691,.3832970857620239,0,2,2,13,5,2,-1,2,14,5,1,2,-.009334079921245575,.2037964016199112,.4969817101955414,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,.0286671407520771,.5025696754455566,.6928027272224426,0,2,1,9,18,4,-1,7,9,6,4,3,.1701968014240265,.4960052967071533,.1476442962884903,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,-.003261447884142399,.5603063702583313,.4826056063175201,0,2,0,2,1,6,-1,0,4,1,2,3,.0005576927796937525,.5205562114715576,.4129633009433746,0,2,5,0,15,20,-1,5,10,15,10,2,.3625833988189697,.5221652984619141,.3768612146377564,0,3,1,14,6,6,-1,1,14,3,3,2,4,17,3,3,2,-.0116151301190257,.6022682785987854,.4637489914894104,0,3,8,14,4,6,-1,10,14,2,3,2,8,17,2,3,2,-.004079519771039486,.4070447087287903,.5337479114532471,0,2,7,11,2,1,-1,8,11,1,1,2,.0005720430053770542,.4601835012435913,.5900393128395081,0,2,9,17,3,2,-1,10,17,1,2,3,.000675433489959687,.5398252010345459,.4345428943634033,0,2,8,17,3,2,-1,9,17,1,2,3,.0006329569732770324,.5201563239097595,.4051358997821808,0,3,12,14,4,6,-1,14,14,2,3,2,12,17,2,3,2,.00124353205319494,.4642387926578522,.5547441244125366,0,3,4,14,4,6,-1,4,14,2,3,2,6,17,2,3,2,-.004736385773867369,.6198567152023315,.4672552049160004,0,3,13,14,2,6,-1,14,14,1,3,2,13,17,1,3,2,-.006465846206992865,.6837332844734192,.5019000768661499,0,3,5,14,2,6,-1,5,14,1,3,2,6,17,1,3,2,.000350173213519156,.4344803094863892,.5363622903823853,0,2,7,0,6,12,-1,7,4,6,4,3,.00015754920605104417,.4760079085826874,.5732020735740662,0,2,0,7,12,2,-1,4,7,4,2,3,.009977436624467373,.5090985894203186,.3635039925575256,0,2,10,3,3,13,-1,11,3,1,13,3,-.0004146452993154526,.5570064783096313,.4593802094459534,0,2,7,3,3,13,-1,8,3,1,13,3,-.00035888899583369493,.5356845855712891,.4339134991168976,0,2,10,8,6,3,-1,10,9,6,1,3,.0004046325047966093,.4439803063869476,.5436776876449585,0,2,3,11,3,2,-1,4,11,1,2,3,-.0008218478760682046,.4042294919490814,.5176299214363098,0,3,13,12,6,8,-1,16,12,3,4,2,13,16,3,4,2,.005946741905063391,.4927651882171631,.5633779764175415,0,2,7,6,6,5,-1,9,6,2,5,3,-.0217533893883228,.8006293773651123,.480084091424942,0,2,17,11,2,7,-1,17,11,1,7,2,-.0145403798669577,.3946054875850678,.5182222723960876,0,2,3,13,8,2,-1,7,13,4,2,2,-.0405107699334621,.0213249903172255,.4935792982578278,0,2,6,9,8,3,-1,6,10,8,1,3,-.0005845826817676425,.4012795984745026,.5314025282859802,0,2,4,3,4,3,-1,4,4,4,1,3,.005515180062502623,.4642418920993805,.5896260738372803,0,2,11,3,4,3,-1,11,4,4,1,3,-.006062622182071209,.6502159237861633,.5016477704048157,0,2,1,4,17,12,-1,1,8,17,4,3,.0945358425378799,.5264708995819092,.4126827120780945,0,2,11,3,4,3,-1,11,4,4,1,3,.004731505177915096,.4879199862480164,.5892447829246521,0,2,4,8,6,3,-1,4,9,6,1,3,-.0005257147131487727,.391728013753891,.5189412832260132,0,2,12,3,5,3,-1,12,4,5,1,3,-.002546404954046011,.5837599039077759,.498570591211319,0,2,1,11,2,7,-1,2,11,1,7,2,-.0260756891220808,.1261983960866928,.4955821931362152,0,3,15,12,2,8,-1,16,12,1,4,2,15,16,1,4,2,-.00547797093167901,.5722513794898987,.5010265707969666,0,2,4,8,11,3,-1,4,9,11,1,3,.005133774131536484,.527326226234436,.4226376116275787,0,3,9,13,6,2,-1,12,13,3,1,2,9,14,3,1,2,.000479449809063226,.4450066983699799,.5819587111473083,0,2,6,13,4,3,-1,6,14,4,1,3,-.0021114079281687737,.5757653117179871,.451171487569809,0,2,9,12,3,3,-1,10,12,1,3,3,-.0131799904629588,.1884381026029587,.5160734057426453,0,2,5,3,3,3,-1,5,4,3,1,3,-.004796809982508421,.6589789986610413,.4736118912696838,0,2,9,4,2,3,-1,9,5,2,1,3,.0067483168095350266,.5259429812431335,.3356395065784454,0,2,0,2,16,3,-1,0,3,16,1,3,.0014623369788751006,.5355271100997925,.4264092147350311,0,3,15,12,2,8,-1,16,12,1,4,2,15,16,1,4,2,.004764515906572342,.5034406781196594,.5786827802658081,0,3,3,12,2,8,-1,3,12,1,4,2,4,16,1,4,2,.0068066660314798355,.475660502910614,.6677829027175903,0,2,14,13,3,6,-1,14,15,3,2,3,.0036608621012419462,.5369611978530884,.4311546981334686,0,2,3,13,3,6,-1,3,15,3,2,3,.0214496403932571,.4968641996383667,.1888816058635712,0,3,6,5,10,2,-1,11,5,5,1,2,6,6,5,1,2,.004167890176177025,.4930733144283295,.5815368890762329,0,2,2,14,14,6,-1,2,17,14,3,2,.008646756410598755,.5205205082893372,.4132595062255859,0,2,10,14,1,3,-1,10,15,1,1,3,-.0003611407882999629,.5483555197715759,.4800927937030792,0,3,4,16,2,2,-1,4,16,1,1,2,5,17,1,1,2,.0010808729566633701,.4689902067184448,.6041421294212341,0,2,10,6,2,3,-1,10,7,2,1,3,.005771995987743139,.5171142220497131,.3053277134895325,0,3,0,17,20,2,-1,0,17,10,1,2,10,18,10,1,2,.001572077046148479,.5219978094100952,.4178803861141205,0,2,13,6,1,3,-1,13,7,1,1,3,-.0019307859474793077,.5860369801521301,.4812920093536377,0,2,8,13,3,2,-1,9,13,1,2,3,-.007892627269029617,.1749276965856552,.497173398733139,0,2,12,2,3,3,-1,13,2,1,3,3,-.002222467912361026,.434258908033371,.521284818649292,0,3,3,18,2,2,-1,3,18,1,1,2,4,19,1,1,2,.0019011989934369922,.4765186905860901,.689205527305603,0,2,9,16,3,4,-1,10,16,1,4,3,.0027576119173318148,.5262191295623779,.4337486028671265,0,2,6,6,1,3,-1,6,7,1,1,3,.005178744904696941,.4804069101810455,.7843729257583618,0,2,13,1,5,2,-1,13,2,5,1,2,-.0009027334162965417,.412084698677063,.5353423953056335,0,3,7,14,6,2,-1,7,14,3,1,2,10,15,3,1,2,.005179795902222395,.4740372896194458,.6425960063934326,0,2,11,3,3,4,-1,12,3,1,4,3,-.0101140001788735,.2468792051076889,.5175017714500427,0,2,1,13,12,6,-1,5,13,4,6,3,-.0186170600354671,.5756294131278992,.4628978967666626,0,2,14,11,5,2,-1,14,12,5,1,2,.0059225959703326225,.5169625878334045,.3214271068572998,0,3,2,15,14,4,-1,2,15,7,2,2,9,17,7,2,2,-.006294507998973131,.3872014880180359,.5141636729240417,0,3,3,7,14,2,-1,10,7,7,1,2,3,8,7,1,2,.0065353019163012505,.4853048920631409,.6310489773750305,0,2,1,11,4,2,-1,1,12,4,1,2,.0010878399480134249,.5117315053939819,.3723258972167969,0,2,14,0,6,14,-1,16,0,2,14,3,-.0225422400981188,.5692740082740784,.4887112975120544,0,2,4,11,1,3,-1,4,12,1,1,3,-.003006566083058715,.2556012868881226,.5003992915153503,0,2,14,0,6,14,-1,16,0,2,14,3,.007474127225577831,.4810872972011566,.5675926804542542,0,2,1,10,3,7,-1,2,10,1,7,3,.0261623207479715,.4971194863319397,.1777237057685852,0,2,8,12,9,2,-1,8,13,9,1,2,.0009435273823328316,.4940010905265808,.549125075340271,0,2,0,6,20,1,-1,10,6,10,1,2,.0333632417023182,.5007612109184265,.2790724039077759,0,2,8,4,4,4,-1,8,4,2,4,2,-.0151186501607299,.7059578895568848,.4973031878471375,0,2,0,0,2,2,-1,0,1,2,1,2,.0009864894673228264,.5128620266914368,.3776761889457703,105.76110076904297,213,0,2,5,3,10,9,-1,5,6,10,3,3,-.0951507985591888,.6470757126808167,.4017286896705627,0,2,15,2,4,10,-1,15,2,2,10,2,.006270234007388353,.399982213973999,.574644923210144,0,2,8,2,2,7,-1,9,2,1,7,2,.000300180894555524,.355877012014389,.5538809895515442,0,2,7,4,12,1,-1,11,4,4,1,3,.0011757409665733576,.425653487443924,.5382617712020874,0,2,3,4,9,1,-1,6,4,3,1,3,4423526843311265e-20,.3682908117771149,.5589926838874817,0,2,15,10,1,4,-1,15,12,1,2,2,-29936920327600092e-21,.5452470183372498,.4020367860794067,0,2,4,10,6,4,-1,7,10,3,4,2,.003007319988682866,.5239058136940002,.3317843973636627,0,2,15,9,1,6,-1,15,12,1,3,2,-.0105138896033168,.4320689141750336,.5307983756065369,0,2,7,17,6,3,-1,7,18,6,1,3,.008347682654857635,.4504637122154236,.6453298926353455,0,3,14,3,2,16,-1,15,3,1,8,2,14,11,1,8,2,-.0031492270063608885,.4313425123691559,.5370525121688843,0,2,4,9,1,6,-1,4,12,1,3,2,-1443564997316571e-20,.5326603055000305,.381797194480896,0,2,12,1,5,2,-1,12,2,5,1,2,-.00042855090578086674,.430516391992569,.5382009744644165,0,3,6,18,4,2,-1,6,18,2,1,2,8,19,2,1,2,.00015062429883982986,.4235970973968506,.5544965267181396,0,3,2,4,16,10,-1,10,4,8,5,2,2,9,8,5,2,.0715598315000534,.5303059816360474,.2678802907466888,0,2,6,5,1,10,-1,6,10,1,5,2,.0008409518050029874,.3557108938694,.5205433964729309,0,2,4,8,15,2,-1,9,8,5,2,3,.0629865005612373,.5225362777709961,.2861376106739044,0,2,1,8,15,2,-1,6,8,5,2,3,-.0033798629883676767,.3624185919761658,.5201697945594788,0,2,9,5,3,6,-1,9,7,3,2,3,-.00011810739670181647,.547447681427002,.3959893882274628,0,2,5,7,8,2,-1,9,7,4,2,2,-.0005450560129247606,.3740422129631043,.5215715765953064,0,2,9,11,2,3,-1,9,12,2,1,3,-.0018454910023137927,.5893052220344543,.4584448933601379,0,2,1,0,16,3,-1,1,1,16,1,3,-.0004383237101137638,.4084582030773163,.5385351181030273,0,2,11,2,7,2,-1,11,3,7,1,2,-.002400083001703024,.377745509147644,.5293580293655396,0,2,5,1,10,18,-1,5,7,10,6,3,-.0987957417964935,.2963612079620361,.5070089101791382,0,2,17,4,3,2,-1,18,4,1,2,3,.0031798239797353745,.4877632856369019,.6726443767547607,0,2,8,13,1,3,-1,8,14,1,1,3,.00032406419632025063,.4366911053657532,.5561109781265259,0,2,3,14,14,6,-1,3,16,14,2,3,-.0325472503900528,.31281578540802,.5308616161346436,0,2,0,2,3,4,-1,1,2,1,4,3,-.007756113074719906,.6560224890708923,.4639872014522553,0,2,12,1,5,2,-1,12,2,5,1,2,.0160272493958473,.5172680020332336,.3141897916793823,0,2,3,1,5,2,-1,3,2,5,1,2,710023505234858e-20,.4084446132183075,.5336294770240784,0,2,10,13,2,3,-1,10,14,2,1,3,.007342280820012093,.4966922104358673,.660346508026123,0,2,8,13,2,3,-1,8,14,2,1,3,-.0016970280557870865,.5908237099647522,.4500182867050171,0,2,14,12,2,3,-1,14,13,2,1,3,.0024118260480463505,.5315160751342773,.3599720895290375,0,2,7,2,2,3,-1,7,3,2,1,3,-.005530093796551228,.2334040999412537,.4996814131736755,0,3,5,6,10,4,-1,10,6,5,2,2,5,8,5,2,2,-.0026478730142116547,.5880935788154602,.4684734046459198,0,2,9,13,1,6,-1,9,16,1,3,2,.0112956296652555,.4983777105808258,.1884590983390808,0,3,10,12,2,2,-1,11,12,1,1,2,10,13,1,1,2,-.000669528788421303,.5872138142585754,.4799019992351532,0,2,4,12,2,3,-1,4,13,2,1,3,.0014410680159926414,.5131189227104187,.350101113319397,0,2,14,4,6,6,-1,14,6,6,2,3,.0024637870956212282,.5339372158050537,.4117639064788818,0,2,8,17,2,3,-1,8,18,2,1,3,.0003311451873742044,.4313383102416992,.5398246049880981,0,2,16,4,4,6,-1,16,6,4,2,3,-.0335572697222233,.26753368973732,.5179154872894287,0,2,0,4,4,6,-1,0,6,4,2,3,.0185394193977118,.4973869919776917,.2317177057266235,0,2,14,6,2,3,-1,14,6,1,3,2,-.00029698139405809343,.552970826625824,.4643664062023163,0,2,4,9,8,1,-1,8,9,4,1,2,-.0004557725915219635,.5629584193229675,.4469191133975983,0,2,8,12,4,3,-1,8,13,4,1,3,-.0101589802652597,.6706212759017944,.4925918877124786,0,2,5,12,10,6,-1,5,14,10,2,3,-22413829356082715e-21,.5239421725273132,.3912901878356934,0,2,11,12,1,2,-1,11,13,1,1,2,7203496352303773e-20,.4799438118934631,.5501788854598999,0,2,8,15,4,2,-1,8,16,4,1,2,-.006926720961928368,.6930009722709656,.4698084890842438,0,3,6,9,8,8,-1,10,9,4,4,2,6,13,4,4,2,-.007699783891439438,.409962385892868,.5480883121490479,0,3,7,12,4,6,-1,7,12,2,3,2,9,15,2,3,2,-.007313054986298084,.3283475935459137,.5057886242866516,0,2,10,11,3,1,-1,11,11,1,1,3,.0019650589674711227,.4978047013282776,.6398249864578247,0,3,9,7,2,10,-1,9,7,1,5,2,10,12,1,5,2,.007164760027080774,.4661160111427307,.6222137212753296,0,2,8,0,6,6,-1,10,0,2,6,3,-.0240786392241716,.2334644943475723,.5222162008285522,0,2,3,11,2,6,-1,3,13,2,2,3,-.0210279691964388,.1183653995394707,.4938226044178009,0,2,16,12,1,2,-1,16,13,1,1,2,.00036017020465806127,.5325019955635071,.4116711020469666,0,3,1,14,6,6,-1,1,14,3,3,2,4,17,3,3,2,-.0172197297215462,.6278762221336365,.4664269089698792,0,2,13,1,3,6,-1,14,1,1,6,3,-.007867214269936085,.3403415083885193,.5249736905097961,0,2,8,8,2,2,-1,8,9,2,1,2,-.000447773898486048,.3610411882400513,.5086259245872498,0,2,9,9,3,3,-1,10,9,1,3,3,.005548601038753986,.4884265959262848,.6203498244285583,0,2,8,7,3,3,-1,8,8,3,1,3,-.00694611482322216,.262593001127243,.5011097192764282,0,2,14,0,2,3,-1,14,0,1,3,2,.00013569870498031378,.4340794980525971,.5628312230110168,0,2,1,0,18,9,-1,7,0,6,9,3,-.0458802506327629,.6507998704910278,.4696274995803833,0,2,11,5,4,15,-1,11,5,2,15,2,-.0215825606137514,.3826502859592438,.5287616848945618,0,2,5,5,4,15,-1,7,5,2,15,2,-.0202095396816731,.3233368098735809,.5074477195739746,0,2,14,0,2,3,-1,14,0,1,3,2,.005849671084433794,.5177603960037231,.4489670991897583,0,2,4,0,2,3,-1,5,0,1,3,2,-5747637987951748e-20,.4020850956439972,.5246363878250122,0,3,11,12,2,2,-1,12,12,1,1,2,11,13,1,1,2,-.001151310047134757,.6315072178840637,.490515410900116,0,3,7,12,2,2,-1,7,12,1,1,2,8,13,1,1,2,.0019862831104546785,.4702459871768951,.6497151255607605,0,2,12,0,3,4,-1,13,0,1,4,3,-.005271951202303171,.3650383949279785,.5227652788162231,0,2,4,11,3,3,-1,4,12,3,1,3,.0012662699446082115,.5166100859642029,.387761801481247,0,2,12,7,4,2,-1,12,8,4,1,2,-.006291944067925215,.737589418888092,.5023847818374634,0,2,8,10,3,2,-1,9,10,1,2,3,.000673601112794131,.4423226118087769,.5495585799217224,0,2,9,9,3,2,-1,10,9,1,2,3,-.0010523450328037143,.5976396203041077,.4859583079814911,0,2,8,9,3,2,-1,9,9,1,2,3,-.00044216238893568516,.5955939292907715,.4398930966854096,0,2,12,0,3,4,-1,13,0,1,4,3,.0011747940443456173,.5349888205528259,.4605058133602142,0,2,5,0,3,4,-1,6,0,1,4,3,.005245743785053492,.5049191117286682,.2941577136516571,0,3,4,14,12,4,-1,10,14,6,2,2,4,16,6,2,2,-.0245397202670574,.2550177872180939,.5218586921691895,0,2,8,13,2,3,-1,8,14,2,1,3,.0007379304151982069,.4424861073493958,.5490816235542297,0,2,10,10,3,8,-1,10,14,3,4,2,.0014233799884095788,.5319514274597168,.4081355929374695,0,3,8,10,4,8,-1,8,10,2,4,2,10,14,2,4,2,-.0024149110540747643,.4087659120559692,.5238950252532959,0,2,10,8,3,1,-1,11,8,1,1,3,-.0012165299849584699,.567457914352417,.4908052980899811,0,2,9,12,1,6,-1,9,15,1,3,2,-.0012438809499144554,.4129425883293152,.5256118178367615,0,2,10,8,3,1,-1,11,8,1,1,3,.006194273941218853,.5060194134712219,.7313653230667114,0,2,7,8,3,1,-1,8,8,1,1,3,-.0016607169527560472,.5979632139205933,.4596369862556458,0,2,5,2,15,14,-1,5,9,15,7,2,-.0273162592202425,.4174365103244782,.5308842062950134,0,3,2,1,2,10,-1,2,1,1,5,2,3,6,1,5,2,-.00158455700147897,.56158047914505,.4519486129283905,0,2,14,14,2,3,-1,14,15,2,1,3,-.0015514739789068699,.4076187014579773,.5360785126686096,0,2,2,7,3,3,-1,3,7,1,3,3,.0003844655875582248,.4347293972969055,.5430442094802856,0,2,17,4,3,3,-1,17,5,3,1,3,-.0146722598001361,.1659304946660996,.5146093964576721,0,2,0,4,3,3,-1,0,5,3,1,3,.008160888217389584,.4961819052696228,.1884745955467224,0,3,13,5,6,2,-1,16,5,3,1,2,13,6,3,1,2,.0011121659772470593,.4868263900279999,.6093816161155701,0,2,4,19,12,1,-1,8,19,4,1,3,-.007260377053171396,.6284325122833252,.4690375924110413,0,2,12,12,2,4,-1,12,14,2,2,2,-.00024046430189628154,.5575000047683716,.4046044051647186,0,2,3,15,1,3,-1,3,16,1,1,3,-.00023348190006799996,.4115762114524841,.5252848267555237,0,2,11,16,6,4,-1,11,16,3,4,2,.005573648028075695,.4730072915554047,.5690100789070129,0,2,2,10,3,10,-1,3,10,1,10,3,.0306237693876028,.4971886873245239,.1740095019340515,0,2,12,8,2,4,-1,12,8,1,4,2,.0009207479888573289,.5372117757797241,.4354872107505798,0,2,6,8,2,4,-1,7,8,1,4,2,-4355073906481266e-20,.5366883873939514,.4347316920757294,0,2,10,14,2,3,-1,10,14,1,3,2,-.006645271088927984,.3435518145561218,.516053318977356,0,2,5,1,10,3,-1,10,1,5,3,2,.0432219989597797,.4766792058944702,.7293652892112732,0,2,10,7,3,2,-1,11,7,1,2,3,.0022331769578158855,.5029315948486328,.5633171200752258,0,2,5,6,9,2,-1,8,6,3,2,3,.0031829739455133677,.4016092121601105,.5192136764526367,0,2,9,8,2,2,-1,9,9,2,1,2,-.00018027749320026487,.4088315963745117,.5417919754981995,0,3,2,11,16,6,-1,2,11,8,3,2,10,14,8,3,2,-.0052934689447283745,.407567709684372,.5243561863899231,0,3,12,7,2,2,-1,13,7,1,1,2,12,8,1,1,2,.0012750959722325206,.4913282990455627,.6387010812759399,0,2,9,5,2,3,-1,9,6,2,1,3,.004338532220572233,.5031672120094299,.2947346866130829,0,2,9,7,3,2,-1,10,7,1,2,3,.00852507445961237,.4949789047241211,.6308869123458862,0,2,5,1,8,12,-1,5,7,8,6,2,-.0009426635224372149,.5328366756439209,.4285649955272675,0,2,13,5,2,2,-1,13,6,2,1,2,.0013609660090878606,.4991525113582611,.5941501259803772,0,2,5,5,2,2,-1,5,6,2,1,2,.0004478250921238214,.4573504030704498,.5854480862617493,0,2,12,4,3,3,-1,12,5,3,1,3,.001336005050688982,.4604358971118927,.584905207157135,0,2,4,14,2,3,-1,4,15,2,1,3,-.0006096754805184901,.3969388902187347,.522942304611206,0,2,12,4,3,3,-1,12,5,3,1,3,-.002365678083151579,.5808320045471191,.4898357093334198,0,2,5,4,3,3,-1,5,5,3,1,3,.001073434017598629,.435121089220047,.5470039248466492,0,3,9,14,2,6,-1,10,14,1,3,2,9,17,1,3,2,.0021923359017819166,.535506010055542,.3842903971672058,0,2,8,14,3,2,-1,9,14,1,2,3,.005496861878782511,.5018138885498047,.2827191948890686,0,2,9,5,6,6,-1,11,5,2,6,3,-.0753688216209412,.1225076019763947,.5148826837539673,0,2,5,5,6,6,-1,7,5,2,6,3,.0251344703137875,.4731766879558563,.702544629573822,0,2,13,13,1,2,-1,13,14,1,1,2,-2935859993158374e-20,.5430532097816467,.465608686208725,0,2,0,2,10,2,-1,0,3,10,1,2,-.0005835591000504792,.4031040072441101,.5190119743347168,0,2,13,13,1,2,-1,13,14,1,1,2,-.0026639450807124376,.4308126866817474,.5161771178245544,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.0013804089976474643,.621982991695404,.4695515930652618,0,2,13,5,2,7,-1,13,5,1,7,2,.0012313219485804439,.5379363894462585,.4425831139087677,0,2,6,13,1,2,-1,6,14,1,1,2,-14644179827882908e-21,.5281640291213989,.4222503006458283,0,2,11,0,3,7,-1,12,0,1,7,3,-.0128188095986843,.2582092881202698,.5179932713508606,0,3,0,3,2,16,-1,0,3,1,8,2,1,11,1,8,2,.0228521898388863,.4778693020343781,.7609264254570007,0,2,11,0,3,7,-1,12,0,1,7,3,.0008230597013607621,.5340992212295532,.4671724140644074,0,2,6,0,3,7,-1,7,0,1,7,3,.0127701200544834,.4965761005878449,.1472366005182266,0,2,11,16,8,4,-1,11,16,4,4,2,-.0500515103340149,.641499400138855,.5016592144966125,0,2,1,16,8,4,-1,5,16,4,4,2,.0157752707600594,.4522320032119751,.5685362219810486,0,2,13,5,2,7,-1,13,5,1,7,2,-.0185016207396984,.2764748930931091,.5137959122657776,0,2,5,5,2,7,-1,6,5,1,7,2,.0024626250378787518,.5141941905021667,.3795408010482788,0,2,18,6,2,14,-1,18,13,2,7,2,.0629161670804024,.5060648918151855,.658043384552002,0,2,6,10,3,4,-1,6,12,3,2,2,-21648500478477217e-21,.5195388197898865,.401988685131073,0,2,14,7,1,2,-1,14,8,1,1,2,.0021180990152060986,.4962365031242371,.5954458713531494,0,3,0,1,18,6,-1,0,1,9,3,2,9,4,9,3,2,-.0166348908096552,.3757933080196381,.517544686794281,0,2,14,7,1,2,-1,14,8,1,1,2,-.002889947034418583,.6624013781547546,.5057178735733032,0,2,0,6,2,14,-1,0,13,2,7,2,.076783262193203,.4795796871185303,.8047714829444885,0,2,17,0,3,12,-1,18,0,1,12,3,.003917067777365446,.4937882125377655,.5719941854476929,0,2,0,6,18,3,-1,0,7,18,1,3,-.0726706013083458,.0538945607841015,.4943903982639313,0,2,6,0,14,16,-1,6,8,14,8,2,.5403950214385986,.5129774212837219,.1143338978290558,0,2,0,0,3,12,-1,1,0,1,12,3,.0029510019812732935,.4528343975543976,.5698574185371399,0,2,13,0,3,7,-1,14,0,1,7,3,.0034508369863033295,.5357726812362671,.4218730926513672,0,2,5,7,1,2,-1,5,8,1,1,2,-.0004207793972454965,.5916172862052917,.4637925922870636,0,2,14,4,6,6,-1,14,6,6,2,3,.0033051050268113613,.5273385047912598,.438204288482666,0,2,5,7,7,2,-1,5,8,7,1,2,.0004773506079800427,.4046528041362763,.5181884765625,0,2,8,6,6,9,-1,8,9,6,3,3,-.0259285103529692,.7452235817909241,.5089386105537415,0,2,5,4,6,1,-1,7,4,2,1,3,-.002972979098558426,.3295435905456543,.5058795213699341,0,3,13,0,6,4,-1,16,0,3,2,2,13,2,3,2,2,.005850832909345627,.4857144057750702,.5793024897575378,0,2,1,2,18,12,-1,1,6,18,4,3,-.0459675192832947,.4312731027603149,.5380653142929077,0,2,3,2,17,12,-1,3,6,17,4,3,.1558596044778824,.5196170210838318,.1684713959693909,0,2,5,14,7,3,-1,5,15,7,1,3,.0151648297905922,.4735757112503052,.6735026836395264,0,2,10,14,1,3,-1,10,15,1,1,3,-.0010604249546304345,.5822926759719849,.4775702953338623,0,2,3,14,3,3,-1,3,15,3,1,3,.006647629197686911,.4999198913574219,.231953501701355,0,2,14,4,6,6,-1,14,6,6,2,3,-.0122311301529408,.4750893115997315,.5262982249259949,0,2,0,4,6,6,-1,0,6,6,2,3,.005652888212352991,.5069767832756042,.3561818897724152,0,2,12,5,4,3,-1,12,6,4,1,3,.0012977829901501536,.4875693917274475,.5619062781333923,0,2,4,5,4,3,-1,4,6,4,1,3,.0107815898954868,.4750770032405853,.6782308220863342,0,2,18,0,2,6,-1,18,2,2,2,3,.002865477930754423,.5305461883544922,.4290736019611359,0,2,8,1,4,9,-1,10,1,2,9,2,.0028663428965955973,.4518479108810425,.5539351105690002,0,2,6,6,8,2,-1,6,6,4,2,2,-.005198332015424967,.4149119853973389,.5434188842773438,0,3,6,5,4,2,-1,6,5,2,1,2,8,6,2,1,2,.005373999010771513,.471789687871933,.6507657170295715,0,2,10,5,2,3,-1,10,6,2,1,3,-.0146415298804641,.2172164022922516,.5161777138710022,0,2,9,5,1,3,-1,9,6,1,1,3,-15042580344015732e-21,.533738374710083,.4298836886882782,0,2,9,10,2,2,-1,9,11,2,1,2,-.0001187566012958996,.4604594111442566,.5582447052001953,0,2,0,8,4,3,-1,0,9,4,1,3,.0169955305755138,.4945895075798035,.0738800764083862,0,2,6,0,8,6,-1,6,3,8,3,2,-.0350959412753582,.70055091381073,.4977591037750244,0,3,1,0,6,4,-1,1,0,3,2,2,4,2,3,2,2,.0024217350874096155,.4466265141963959,.5477694272994995,0,2,13,0,3,7,-1,14,0,1,7,3,-.0009634033776819706,.4714098870754242,.5313338041305542,0,2,9,16,2,2,-1,9,17,2,1,2,.00016391130338888615,.4331546127796173,.5342242121696472,0,2,11,4,6,10,-1,11,9,6,5,2,-.0211414601653814,.2644700109958649,.5204498767852783,0,2,0,10,19,2,-1,0,11,19,1,2,.0008777520270086825,.5208349823951721,.4152742922306061,0,2,9,5,8,9,-1,9,8,8,3,3,-.0279439203441143,.6344125270843506,.5018811821937561,0,2,4,0,3,7,-1,5,0,1,7,3,.006729737855494022,.5050438046455383,.3500863909721375,0,3,8,6,4,12,-1,10,6,2,6,2,8,12,2,6,2,.0232810396701097,.4966318011283875,.6968677043914795,0,2,0,2,6,4,-1,0,4,6,2,2,-.0116449799388647,.3300260007381439,.5049629807472229,0,2,8,15,4,3,-1,8,16,4,1,3,.0157643090933561,.4991598129272461,.7321153879165649,0,2,8,0,3,7,-1,9,0,1,7,3,-.001361147966235876,.3911735117435455,.5160670876502991,0,2,9,5,3,4,-1,10,5,1,4,3,-.0008152233785949647,.5628911256790161,.49497190117836,0,2,8,5,3,4,-1,9,5,1,4,3,-.0006006627227179706,.585359513759613,.4550595879554749,0,2,7,6,6,1,-1,9,6,2,1,3,.0004971551825292408,.4271470010280609,.5443599224090576,0,3,7,14,4,4,-1,7,14,2,2,2,9,16,2,2,2,.0023475370835512877,.5143110752105713,.3887656927108765,0,3,13,14,4,6,-1,15,14,2,3,2,13,17,2,3,2,-.008926156908273697,.6044502258300781,.497172087430954,0,2,7,8,1,8,-1,7,12,1,4,2,-.013919910416007,.2583160996437073,.5000367760658264,0,3,16,0,2,8,-1,17,0,1,4,2,16,4,1,4,2,.0010209949687123299,.4857374131679535,.5560358166694641,0,3,2,0,2,8,-1,2,0,1,4,2,3,4,1,4,2,-.0027441629208624363,.5936884880065918,.464577704668045,0,2,6,1,14,3,-1,6,2,14,1,3,-.0162001308053732,.3163014948368073,.5193495154380798,0,2,7,9,3,10,-1,7,14,3,5,2,.004333198070526123,.5061224102973938,.3458878993988037,0,2,9,14,2,2,-1,9,15,2,1,2,.0005849793087691069,.4779017865657806,.5870177745819092,0,2,7,7,6,8,-1,7,11,6,4,2,-.0022466450463980436,.4297851026058197,.5374773144721985,0,2,9,7,3,6,-1,9,10,3,3,2,.0023146099410951138,.5438671708106995,.4640969932079315,0,2,7,13,3,3,-1,7,14,3,1,3,.008767912164330482,.472689300775528,.6771789789199829,0,2,9,9,2,2,-1,9,10,2,1,2,-.00022448020172305405,.4229173064231873,.5428048968315125,0,2,0,1,18,2,-1,6,1,6,2,3,-.007433602120727301,.6098880767822266,.4683673977851868,0,2,7,1,6,14,-1,7,8,6,7,2,-.0023189240600913763,.5689436793327332,.4424242079257965,0,2,1,9,18,1,-1,7,9,6,1,3,-.0021042178850620985,.3762221038341522,.5187087059020996,0,2,9,7,2,2,-1,9,7,1,2,2,.000460348412161693,.4699405133724213,.5771207213401794,0,2,9,3,2,9,-1,10,3,1,9,2,.0010547629790380597,.4465216994285584,.5601701736450195,0,2,18,14,2,3,-1,18,15,2,1,3,.0008714881842024624,.544980525970459,.3914709091186523,0,2,7,11,3,1,-1,8,11,1,1,3,.00033364820410497487,.4564009010791779,.5645738840103149,0,2,10,8,3,4,-1,11,8,1,4,3,-.0014853250468149781,.5747377872467041,.4692778885364533,0,2,7,14,3,6,-1,8,14,1,6,3,.0030251620337367058,.5166196823120117,.3762814104557037,0,2,10,8,3,4,-1,11,8,1,4,3,.005028074141591787,.5002111792564392,.6151527166366577,0,2,7,8,3,4,-1,8,8,1,4,3,-.0005816451157443225,.5394598245620728,.4390751123428345,0,2,7,9,6,9,-1,7,12,6,3,3,.0451415292918682,.5188326835632324,.206303596496582,0,2,0,14,2,3,-1,0,15,2,1,3,-.001079562003724277,.3904685080051422,.5137907266616821,0,2,11,12,1,2,-1,11,13,1,1,2,.00015995999274309725,.4895322918891907,.5427504181861877,0,2,4,3,8,3,-1,8,3,4,3,2,-.0193592701107264,.6975228786468506,.4773507118225098,0,2,0,4,20,6,-1,0,4,10,6,2,.207255095243454,.5233635902404785,.3034991919994354,0,2,9,14,1,3,-1,9,15,1,1,3,-.00041953290929086506,.5419396758079529,.4460186064243317,0,2,8,14,4,3,-1,8,15,4,1,3,.0022582069505006075,.4815764129161835,.6027408838272095,0,2,0,15,14,4,-1,0,17,14,2,2,-.0067811207845807076,.3980278968811035,.5183305740356445,0,2,1,14,18,6,-1,1,17,18,3,2,.0111543098464608,.543123185634613,.4188759922981262,0,3,0,0,10,6,-1,0,0,5,3,2,5,3,5,3,2,.0431624315679073,.4738228023052216,.6522961258888245]);


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGLApi = function WebGLApi(gl) {
	_classCallCheck(this, WebGLApi);

	this._gl = gl;
};

exports.default = WebGLApi;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(333);


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(132);

__webpack_require__(329);

__webpack_require__(330);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(91)))

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(84);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(110);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(113);
__webpack_require__(115);
__webpack_require__(116);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
module.exports = __webpack_require__(21);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(32);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(93);
var wksDefine = __webpack_require__(64);
var enumKeys = __webpack_require__(134);
var isArray = __webpack_require__(52);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(96);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(95) });


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(96).f;
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(97) });


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(150) });


/***/ }),
/* 150 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(68).set });


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(98) });


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(100);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(101);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(11);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(70);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(102);
var repeat = __webpack_require__(71);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(102);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(103) });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(103);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(101);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(100);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(104);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(72);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(73);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(105) });


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(104) });


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(72) });


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(73);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(73);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(74)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(75)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(74)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(77);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(78)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(77);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(78)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(71)
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(77);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(78)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(212);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(215));


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(52) });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(79);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(80);
var getIterFn = __webpack_require__(81);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(80);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(67);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(52);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(107);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(107);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(50)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(108) });

__webpack_require__(30)('copyWithin');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(83) });

__webpack_require__(30)('fill');


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(70);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(53);
var $flags = __webpack_require__(55);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(110);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(55);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(56)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(56)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(56)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(56)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(53);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(85).set;
var microtask = __webpack_require__(86)();
var newPromiseCapabilityModule = __webpack_require__(87);
var perform = __webpack_require__(111);
var promiseResolve = __webpack_require__(112);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(117);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(58)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(59);
var buffer = __webpack_require__(88);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(57);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(59).ABV, {
  DataView: __webpack_require__(88).DataView
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(98);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(76)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(119) });


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(31);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(68);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(50)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(30)('includes');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(120);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(82);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(30)('flatMap');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(120);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(82);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(30)('flatten');


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(74)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(121);
var userAgent = __webpack_require__(89);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(121);
var userAgent = __webpack_require__(89);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(53);
var getFlags = __webpack_require__(55);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(76)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64)('asyncIterator');


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64)('observable');


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(119);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(80);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(122)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(122)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(123)('Map') });


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(123)('Set') });


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(61)('Map');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(61)('Set');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(61)('WeakMap');


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(61)('WeakSet');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(62)('Map');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(62)('Set');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(62)('WeakMap');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(62)('WeakSet');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(125);
var fround = __webpack_require__(105);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(125) });


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(112);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(87);
var perform = __webpack_require__(111);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(115);
var from = __webpack_require__(124);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(86)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(86)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(89);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(85);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(84);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(91)))

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(331);
module.exports = __webpack_require__(21).RegExp.escape;


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(332)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 332 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _camera = __webpack_require__(334);

var _camera2 = _interopRequireDefault(_camera);

var _ui = __webpack_require__(335);

var _ui2 = _interopRequireDefault(_ui);

var _canvas2d = __webpack_require__(90);

var _canvas2d2 = _interopRequireDefault(_canvas2d);

var _canvas3d = __webpack_require__(336);

var _canvas3d2 = _interopRequireDefault(_canvas3d);

var _stream = __webpack_require__(337);

var _stream2 = _interopRequireDefault(_stream);

var _texture = __webpack_require__(338);

var _texture2 = _interopRequireDefault(_texture);

var _shader = __webpack_require__(339);

var _shader2 = _interopRequireDefault(_shader);

var _main = __webpack_require__(340);

var _main2 = _interopRequireDefault(_main);

var _main3 = __webpack_require__(341);

var _main4 = _interopRequireDefault(_main3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(127);
__webpack_require__(128);

var App = function () {
	function App(parent) {
		var _this = this;

		_classCallCheck(this, App);

		this._parent = parent;

		this._time = 0;
		this._tracker = null;
		this._track = null;
		this._facesRects = [];
		this._smEdge = 200;
		this._mdEdge = 1000;

		this._aspectRatio = 1;
		this._width = 0;
		this._height = 0;
		this._mdWidth = 0;
		this._mdHeight = 0;
		this._smWidth = 0;
		this._smHeight = 0;

		this._calcSizes();

		this._ui = new _ui2.default(this._mdWidth, this._mdHeight);
		this._canvas = new _canvas3d2.default(this._mdWidth, this._mdHeight);
		this._buffer = this._createBuffer();
		this._video = this._createVideo();
		this._videoCanvasSm = new _canvas2d2.default(this._smWidth, this._smHeight);
		this._videoCanvasMd = new _canvas2d2.default(this._mdWidth, this._mdHeight);
		this._stream = new _stream2.default(this._video, this._mdWidth, this._mdHeight);

		this._mainTexture = this.createTexture();
		this._uiTexture = this.createTexture();
		this._shader = this.createShader(_main2.default, _main4.default);

		this._canvas.mount(parent);

		this._initTraker();

		window.addEventListener('resize', function () {
			_this.resize();
		});

		this.start();
	}

	_createClass(App, [{
		key: '_initTraker',
		value: function _initTraker() {
			var _this2 = this;

			var invWidth = 1 / this._smWidth;
			var invHeight = 1 / this._smHeight;
			var tracker = new tracking.ObjectTracker('face');

			tracker.setInitialScale(2); // 2 — даёт на 10 fps больше
			tracker.setStepSize(2);
			tracker.setEdgesDensity(0.1);

			var track = tracking.track(this._videoCanvasSm.el, tracker);

			tracker.on('track', function (event) {
				_this2._facesRects = event.data.map(function (rect) {
					rect.x *= invWidth;
					rect.y *= invHeight;
					rect.width *= invWidth;
					rect.height *= invHeight;

					return rect;
				});
			});

			this._tracker = tracker;
			this._track = track;
		}
	}, {
		key: '_createBuffer',
		value: function _createBuffer() {
			var gl = this._canvas.ctx;
			var buffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

			return buffer;
		}
	}, {
		key: '_createVideo',
		value: function _createVideo() {
			var video = document.createElement('video');

			video.setAttribute('preload', true);
			video.setAttribute('autoplay', true);
			video.setAttribute('loop', true);
			video.setAttribute('muted', true);

			return video;
		}
	}, {
		key: '_calcSizes',
		value: function _calcSizes() {
			var smEdge = this._smEdge;
			var mdEdge = this._mdEdge;
			var width = window.innerWidth;
			var height = window.innerHeight;
			var aspectRatio = width / height;

			var mdWidth = aspectRatio >= 1 ? Math.min(width, mdEdge) : Math.min(height, mdEdge) * aspectRatio;
			var mdHeight = aspectRatio <= 1 ? Math.min(height, mdEdge) : Math.min(width, mdEdge) * aspectRatio;
			var smWidth = aspectRatio >= 1 ? Math.min(width, smEdge) : Math.min(height, smEdge) * aspectRatio;
			var smHeight = aspectRatio <= 1 ? Math.min(height, smEdge) : Math.min(width, smEdge) * aspectRatio;

			this._aspectRatio = aspectRatio;
			this._width = width;
			this._height = height;
			this._mdWidth = mdWidth;
			this._mdHeight = mdHeight;
			this._smWidth = smWidth;
			this._smHeight = smHeight;
		}
	}, {
		key: 'resize',
		value: function resize() {
			this._calcSizes();

			this._canvas.resize(this._mdWidth, this._mdHeight);
			this._videoCanvasSm.resize(this._smWidth, this._smHeight);
			this._videoCanvasMd.resize(this._mdWidth, this._mdHeight);
			this._ui.resize(this._mdWidth, this._mdHeight);
		}
	}, {
		key: 'start',
		value: function start() {
			this.tick();
		}
	}, {
		key: 'tick',
		value: function tick() {
			var _this3 = this;

			var time = this._time;
			var video = this._video;

			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				try {
					this._videoCanvasMd.ctx.drawImage(video, 0, 0, this._mdWidth, this._mdWidth);
					this._videoCanvasSm.ctx.drawImage(video, 0, 0, this._smWidth, this._smHeight);
				} catch (e) {}
			}

			this._track.setRunning(false);
			this._track.run();
			this._ui.draw(time);
			this._ui.drawRects(this._facesRects);
			this._ui.drawHistogram(this._stream.byteFrequencyData);

			this.draw(time);

			this._time += 1;

			requestAnimationFrame(function () {
				return _this3.tick();
			});
		}
	}, {
		key: 'draw',
		value: function draw() {
			var gl = this._canvas.ctx;
			var width = this._mdWidth;
			var height = this._mdHeight;
			var shader = this._shader;
			var textureA = this._mainTexture;
			var textureB = this._uiTexture;

			gl.viewport(0, 0, width, height);
			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			shader.bind();

			textureA.setImage(this._videoCanvasMd.el);
			textureB.setImage(this._ui.el);

			gl.uniform1f(shader.getUniformLocation('u_time'), this._time);
			gl.uniform2f(shader.getUniformLocation('u_resolution'), width, height);
			gl.uniform1i(shader.getUniformLocation('u_textureA'), textureA.bind(0));
			gl.uniform1i(shader.getUniformLocation('u_textureB'), textureB.bind(1));

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
			gl.flush();
		}
	}, {
		key: 'createTexture',
		value: function createTexture() {
			return new _texture2.default(this._canvas.ctx);
		}
	}, {
		key: 'createShader',
		value: function createShader(vert, frag) {
			return new _shader2.default(this._canvas.ctx, vert, frag);
		}
	}]);

	return App;
}();

window.DEBUG = true;
window.__app = new App(document.body);

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _canvas2d = __webpack_require__(90);

var _canvas2d2 = _interopRequireDefault(_canvas2d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(127);
__webpack_require__(128);

var Camera = function (_Canvas2D) {
	_inherits(Camera, _Canvas2D);

	function Camera(width, height) {
		_classCallCheck(this, Camera);

		var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, width, height));

		_this._video = _this._createVideo();
		_this._bars = [];
		_this._rects = [];
		_this._initStream();
		return _this;
	}

	_createClass(Camera, [{
		key: '_createVideo',
		value: function _createVideo() {
			var video = document.createElement('video');
			document.body.prepend(video);

			video.style.position = 'fixed';
			video.style.transform = 'translate(-100%, -100%)';
			video.setAttribute('preload', true);
			video.setAttribute('autoplay', true);
			video.setAttribute('loop', true);
			video.setAttribute('muted', true);
			video.setAttribute('width', 320);
			video.setAttribute('height', 240);

			return video;
		}
	}, {
		key: '_initStream',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this2 = this;

				var stream, bars, audioContext, input, analyser, scriptProcessor, processInput, _getAverageVolume, tracker;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return navigator.mediaDevices.getUserMedia({
									audio: true, // need true
									video: true
								});

							case 3:
								stream = _context.sent;


								console.log(stream.getVideoTracks());

								this._video.srcObject = stream;

								// Handle the incoming audio stream
								bars = this._bars; // We'll use this later

								audioContext = new AudioContext();
								input = audioContext.createMediaStreamSource(stream);
								analyser = audioContext.createAnalyser();
								scriptProcessor = audioContext.createScriptProcessor();

								// Some analyser setup

								analyser.smoothingTimeConstant = 0.3;
								analyser.fftSize = 1024;

								input.connect(analyser);
								analyser.connect(scriptProcessor);
								scriptProcessor.connect(audioContext.destination);

								processInput = function processInput(audioProcessingEvent) {
									var tempArray = new Uint8Array(analyser.frequencyBinCount);

									analyser.getByteFrequencyData(tempArray);
									bars.push(_getAverageVolume(tempArray));

									if (bars.length > 50) {
										bars.shift();
									}
								};

								_getAverageVolume = function _getAverageVolume(array) {
									var length = array.length;
									var values = 0;
									var i = 0;

									for (; i < length; i++) {
										values += array[i];
									}

									return values / length;
								};

								scriptProcessor.onaudioprocess = processInput;

								tracker = new tracking.ObjectTracker('face');

								tracker.setInitialScale(4);
								tracker.setStepSize(2);
								tracker.setEdgesDensity(0.1);
								tracking.track(this._video, tracker, { camera: true });

								tracker.on('track', function (event) {
									_this2._rects = event.data;
								});
								_context.next = 32;
								break;

							case 27:
								_context.prev = 27;
								_context.t0 = _context['catch'](0);

								if (error.name === 'ConstraintNotSatisfiedError') {
									console.log('\n\t\t\t\t\tThe resolution \n\t\t\t\t\t' + constraints.video.width.exact + 'x' + constraints.video.width.exact + ' px \n\t\t\t\t\tis not supported by your device.\n\t\t\t\t');
								} else if (error.name === 'PermissionDeniedError') {
									console.log('\n\t\t\t\t\tPermissions have not been granted to use your camera and \n\t\t\t\t\tmicrophone, you need to allow the page access to your devices in \n\t\t\t\t\torder for the demo to work.\n\t\t\t\t');
								}

								console.log('getUserMedia error: ' + error.name);
								console.log(error);

							case 32:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 27]]);
			}));

			function _initStream() {
				return _ref.apply(this, arguments);
			}

			return _initStream;
		}()
	}, {
		key: 'resize',
		value: function resize(width, height) {
			_get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), 'resize', this).call(this, width, height);

			var video = this._video;

			if (video) {
				video.setAttribute('width', width);
				video.setAttribute('height', height);
			}
		}
	}, {
		key: 'draw',
		value: function draw(uictx) {
			var _this3 = this;

			var video = this._video;

			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				try {
					this._ctx.drawImage(video, 0, 0, this._width, this._height);

					var bars = this._bars;
					var ctx = uictx;
					ctx.strokeStyle = '#fff';
					ctx.fillStyle = '#fff';
					ctx.lineWidth = 3;
					ctx.font = '24px monospace';

					ctx.beginPath();
					ctx.moveTo(40, this._height - 40 - bars[0]);

					for (var i = 1; i < bars.length; ++i) {
						ctx.lineTo(40 + i * 10, this._height - 40 - bars[i]);
					}

					ctx.stroke();

					this._rects.forEach(function (rect) {
						var sx = _this3._width / 320;
						var sy = _this3._height / 240;
						ctx.strokeRect(rect.x * sx, rect.y * sy, rect.width * sx, rect.height * sy);
						ctx.fillText('HUMAN DETECTED', rect.x * sx, rect.y * sy - 20);
					});
				} catch (e) {
					console.log(e);
				}
			}
		}
	}, {
		key: 'video',
		get: function get() {
			return this._video;
		}
	}]);

	return Camera;
}(_canvas2d2.default);

exports.default = Camera;

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas2d = __webpack_require__(90);

var _canvas2d2 = _interopRequireDefault(_canvas2d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UI = function (_Canvas2D) {
	_inherits(UI, _Canvas2D);

	function UI(width, height) {
		_classCallCheck(this, UI);

		var _this = _possibleConstructorReturn(this, (UI.__proto__ || Object.getPrototypeOf(UI)).call(this, width, height));

		_this._analysisRows = [];
		return _this;
	}

	_createClass(UI, [{
		key: '_randNumber',
		value: function _randNumber(len) {
			return Math.random().toString().substr(2, len);
		}
	}, {
		key: '_randHash',
		value: function _randHash(len) {
			return Math.random().toString(36).substr(2, len);
		}
	}, {
		key: '_randRow',
		value: function _randRow() {
			return this._randNumber(3) + ' ' + this._randHash(5) + ' ' + this._randNumber(5);
		}
	}, {
		key: '_drawMultilineText',
		value: function _drawMultilineText(x, y, lineHeight, rows) {
			var ctx = this._ctx;

			rows.forEach(function (text, i) {
				ctx.fillText(text, x, y + lineHeight * i);
			});
		}
	}, {
		key: 'draw',
		value: function draw(time) {
			var ctx = this._ctx;

			ctx.clearRect(0, 0, this._width, this._height);
			ctx.fillStyle = '#fff';
			ctx.font = '24px monospace';

			this._drawMultilineText(40, 40, 20, ['ANALYSIS: MATCH:', '****************']);
			this._drawMultilineText(40, 80, 20, this._analysisRows);

			if (time % 10 === 0) {
				this._analysisRows.unshift(this._randRow());

				if (this._analysisRows.length > 15) {
					this._analysisRows.pop();
				}
			}

			ctx.textAlign = 'end';
			ctx.fillText('KILL ALL HUMANS', this._width - 20, 40);
			ctx.textAlign = 'start';
		}
	}, {
		key: 'drawRects',
		value: function drawRects(rects) {
			var ctx = this._ctx;
			var width = this._width;
			var height = this._height;

			ctx.save();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 3;

			rects.forEach(function (rect) {
				var x = rect.x * width;
				var y = rect.y * height;
				var w = rect.width * width;
				var h = rect.height * height;

				ctx.strokeRect(x, y, w, h);
				ctx.fillText('HUMAN DETECTED', x, y - 20);
			});

			ctx.restore();
		}
	}, {
		key: 'drawHistogram',
		value: function drawHistogram(arr) {
			if (!arr || arr.lenght == 0) {
				return;
			}

			var ctx = this._ctx;
			var width = this._width;
			var height = this._height;

			ctx.save();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(40, height - 40 - arr[0]);

			arr.forEach(function (n, i) {
				ctx.lineTo(40 + i * 10, height - 40 - n);
			});

			ctx.stroke();
			ctx.restore();
		}
	}]);

	return UI;
}(_canvas2d2.default);

exports.default = UI;

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(126);

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas3D = function (_Canvas) {
	_inherits(Canvas3D, _Canvas);

	function Canvas3D(width, height) {
		_classCallCheck(this, Canvas3D);

		var _this = _possibleConstructorReturn(this, (Canvas3D.__proto__ || Object.getPrototypeOf(Canvas3D)).call(this, width, height));

		_this._ctx = _this._el.getContext('webgl') || _this._el.getContext('experimental-webgl');
		return _this;
	}

	_createClass(Canvas3D, [{
		key: 'ctx',
		get: function get() {
			return this._ctx;
		}
	}]);

	return Canvas3D;
}(_canvas2.default);

exports.default = Canvas3D;

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!navigator.getUserMedia) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

var Stream = function () {
	function Stream(video, width, height) {
		_classCallCheck(this, Stream);

		this._video = video;
		this._width = width;
		this._height = height;
		this._data = null;
		this._stream = null;
		this._audioContext = null;
		this._mediaStreamSource = null;
		this._analyser = null;
		this._scriptProcessor = null;
		this._byteFrequencyData = null;

		this._init();
	}

	_createClass(Stream, [{
		key: '_init',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this = this;

				var stream, audioContext, mediaStreamSource, analyser, scriptProcessor;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return navigator.mediaDevices.getUserMedia({
									audio: true,
									video: {
										width: this._width,
										height: this._height
									}
								});

							case 3:
								stream = _context.sent;
								audioContext = new AudioContext();
								mediaStreamSource = audioContext.createMediaStreamSource(stream);
								analyser = audioContext.createAnalyser();
								scriptProcessor = audioContext.createScriptProcessor();


								analyser.smoothingTimeConstant = 0.7;
								analyser.fftSize = 128;

								mediaStreamSource.connect(analyser);
								analyser.connect(scriptProcessor);
								scriptProcessor.connect(audioContext.destination);

								this._stream = stream;
								this._audioContext = audioContext;
								this._mediaStreamSource = mediaStreamSource;
								this._analyser = analyser;
								this._scriptProcessor = scriptProcessor;
								this._byteFrequencyData = new Uint8Array(analyser.frequencyBinCount);

								scriptProcessor.onaudioprocess = function (d) {
									return _this._processInput(d);
								};

								this._video.srcObject = stream;
								_context.next = 28;
								break;

							case 23:
								_context.prev = 23;
								_context.t0 = _context['catch'](0);

								if (error.name === 'ConstraintNotSatisfiedError') {
									console.log('\n\t\t\t\t\tThe resolution \n\t\t\t\t\t' + constraints.video.width.exact + 'x' + constraints.video.width.exact + ' px \n\t\t\t\t\tis not supported by your device.\n\t\t\t\t');
								} else if (error.name === 'PermissionDeniedError') {
									console.log('\n\t\t\t\t\tPermissions have not been granted to use your camera and \n\t\t\t\t\tmicrophone, you need to allow the page access to your devices in \n\t\t\t\t\torder for the demo to work.\n\t\t\t\t');
								}

								console.log('getUserMedia error: ' + error.name);
								console.log(error);

							case 28:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 23]]);
			}));

			function _init() {
				return _ref.apply(this, arguments);
			}

			return _init;
		}()
	}, {
		key: '_processInput',
		value: function _processInput(audioProcessingEvent) {
			this._analyser.getByteFrequencyData(this._byteFrequencyData);
		}
	}, {
		key: 'stream',
		get: function get() {
			return this._stream;
		}
	}, {
		key: 'audioContext',
		get: function get() {
			return this._audioContext;
		}
	}, {
		key: 'byteFrequencyData',
		get: function get() {
			return this._byteFrequencyData;
		}
	}]);

	return Stream;
}();

exports.default = Stream;

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webglApi = __webpack_require__(129);

var _webglApi2 = _interopRequireDefault(_webglApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Texture = function (_WebGLApi) {
	_inherits(Texture, _WebGLApi);

	function Texture(gl) {
		_classCallCheck(this, Texture);

		var _this = _possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, gl));

		_this._data = null;

		_this._init();
		return _this;
	}

	_createClass(Texture, [{
		key: '_init',
		value: function _init() {
			var gl = this._gl;

			var texture = gl.createTexture();

			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			this._data = texture;
		}
	}, {
		key: 'bind',
		value: function bind() {
			var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var gl = this._gl;

			if (unit !== null) {
				gl.activeTexture(gl.TEXTURE0 + unit);
			}

			gl.bindTexture(gl.TEXTURE_2D, this._data);

			return unit;
		}
	}, {
		key: 'setImage',
		value: function setImage(value) {
			var gl = this._gl;

			gl.bindTexture(gl.TEXTURE_2D, this._data);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
		}
	}, {
		key: 'data',
		get: function get() {
			return this._data;
		}
	}]);

	return Texture;
}(_webglApi2.default);

exports.default = Texture;

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webglApi = __webpack_require__(129);

var _webglApi2 = _interopRequireDefault(_webglApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shader = function (_WebGLApi) {
	_inherits(Shader, _WebGLApi);

	function Shader(gl, vert, frag) {
		_classCallCheck(this, Shader);

		var _this = _possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, gl));

		_this._vertSrc = vert;
		_this._fragSrc = frag;

		_this._data = null;
		_this._uniforms = {};

		_this._init();
		return _this;
	}

	_createClass(Shader, [{
		key: '_init',
		value: function _init() {
			var gl = this._gl;
			var vertex = gl.createShader(gl.VERTEX_SHADER);

			gl.shaderSource(vertex, this._vertSrc);
			gl.compileShader(vertex);

			if (window.DEBUG && !gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
				throw gl.getShaderInfoLog(vertex);
			}

			var fragment = gl.createShader(gl.FRAGMENT_SHADER);

			gl.shaderSource(fragment, this._fragSrc);
			gl.compileShader(fragment);

			if (window.DEBUG && !gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
				throw gl.getShaderInfoLog(fragment);
			}

			var program = gl.createProgram();

			gl.attachShader(program, vertex);
			gl.attachShader(program, fragment);
			gl.linkProgram(program);

			if (window.DEBUG && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
				throw gl.getProgramInfoLog(program);
			}

			gl.useProgram(program);

			var p = gl.getAttribLocation(program, 'a_position');

			gl.enableVertexAttribArray(p);
			gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);

			this._data = program;
		}
	}, {
		key: 'bind',
		value: function bind() {
			this._gl.useProgram(this._data);
		}
	}, {
		key: 'getUniformLocation',
		value: function getUniformLocation(name) {
			var uniforms = this._uniforms;

			if (!uniforms[name]) {
				uniforms[name] = this._gl.getUniformLocation(this._data, name);
			}

			return uniforms[name];
		}
	}, {
		key: 'data',
		get: function get() {
			return this._data;
		}
	}]);

	return Shader;
}(_webglApi2.default);

exports.default = Shader;

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = "\n\tattribute vec2 a_position;\n\tvarying vec2 v_uv;\n\n\tvoid main() {\n\t\tgl_Position = vec4(a_position.x, -a_position.y, 0.0, 1.0);\n\t\tv_uv = (a_position + 1.0) * 0.5;\n\t}\n";

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = "\n\tprecision highp float;\n\tuniform sampler2D u_textureA;\n\tuniform sampler2D u_textureB;\n\tuniform float u_time;\n\tuniform vec2 u_resolution;\n\tvarying vec2 v_uv;\n\n\t#define M_PI 3.1415926535897932384626433832795\n\n\tvec4 getMainColor (sampler2D texture, vec2 uv) {\n\t\t// \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0446\u0432\u0435\u0442\u0430\n\t\tvec4 color = texture2D(texture, uv);\n\n\t\t// \u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u043E\u0441\n\t\tcolor.rgb += sin(uv.y * u_resolution.y) * 0.05;\n\n\t\t// \u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043A\u0440\u0430\u0441\u0441\u043D\u043E\u0433\u043E \u0446\u0432\u0435\u0442\u0430\n\t\tfloat red = clamp(color.r * 2.0 - 0.5, 0.0, 1.0);\n\t\tcolor.rgba = vec4(red, 0.2, 0.3, 1.0);\n\n\t\treturn color;\n\t}\n\n\tvec4 getUIColor (sampler2D texture, vec2 uv) {\n\t\t// \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0446\u0432\u0435\u0442\u0430\n\t\tvec4 color = texture2D(texture, uv);\n\n\t\t// \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0437\u0435\u043B\u0451\u043D\u043E\u0433\u043E \u043A\u0430\u043D\u0430\u043B\u0430\n\t\tcolor.g = texture2D(texture, uv + vec2((sin(u_time) * 3.0 / u_resolution.x), 0.0)).g;\n\n\t\t// \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u0438\u043D\u0435\u0433\u043E \u043A\u0430\u043D\u0430\u043B\u0430\n\t\tcolor.b = texture2D(texture, uv + vec2(0.0, (sin(u_time) * 3.0 / u_resolution.y))).b;\n\n\t\treturn color;\n\t}\n\n\t// \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u0442\u043A\u0430 \u043E\u0442 \u0434\u0435\u043B\u0435\u043D\u0438\u044F\n\tfloat fraction (float a, float b) {\n\t\treturn ((a / b) - floor(a / b)) * b;\n\t}\n\n\t// \u0424\u0443\u043D\u043A\u0446\u0438\u044F \u0442\u0430\u0439\u043C\u0435\u0440\u0430\n\tfloat timer (float delay, float duration) {\n\t\treturn min(fraction(u_time, delay + duration), duration);\n\t}\n\n\t// \u0424\u0443\u043D\u043A\u0446\u0438\u044F \u0434\u043B\u044F \u0441\u0434\u0432\u0438\u0433\u0430 uv \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442 \u0434\u043B\u044F \u043F\u0438\u043A\u0441\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u0438\n\n\t#define PIXELATE_DELAY 400.0\n\t#define PIXELATE_DURATION 30.0\n\n\tvec2 pixelate (vec2 uv) {\n\t\tfloat time = timer(PIXELATE_DELAY, PIXELATE_DURATION) / PIXELATE_DURATION;\n\t\ttime = 1.0 - abs(sin(time * M_PI));\n\t\tvec2 size = u_resolution * time;\n\n\t\treturn floor(uv * size) / size;\n\t}\n\n\t// \u0424\u0443\u043D\u043A\u0446\u0438\u044F \u0434\u043B\u044F \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u044F uv \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0448\u0443\u043C\u0430\n\n\t#define NOISE_DELAY 200.0\n\t#define NOISE_DURATION 80.0\n\n\tvec2 noise (vec2 uv) {\n\t\tfloat time = NOISE_DURATION - timer(NOISE_DELAY, NOISE_DURATION);\n\t\tvec2 offset = uv * u_resolution;\n\n\t\toffset.x += floor(sin(offset.y / 5.0 * time + time * time)) * 0.5 * time;\n\n\t\treturn offset / u_resolution;\n\t}\n\n\tvoid main () {\n\n\t\tvec2 uv = v_uv;\n\n\t\tuv = noise(uv);\n\t\tuv = pixelate(uv);\n\n\t\tvec4 colorA = getMainColor(u_textureA, uv);\n\t\tvec4 colorB = getUIColor(u_textureB, uv);\n\n\t\tvec4 color = mix(colorA, colorB, 0.5);\n\n\t\t// \u0412\u044B\u0445\u043E\u0434\n\t\tgl_FragColor = color;\n\t}\n";

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map