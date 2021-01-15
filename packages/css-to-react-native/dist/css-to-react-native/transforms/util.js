"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseShadow = exports.shadowOffsetFactory = exports.anyOrderFactory = exports.directionFactory = void 0;

var _tokenTypes = require("../tokenTypes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LENGTH = _tokenTypes.tokens.LENGTH,
    UNSUPPORTED_LENGTH_UNIT = _tokenTypes.tokens.UNSUPPORTED_LENGTH_UNIT,
    PERCENT = _tokenTypes.tokens.PERCENT,
    COLOR = _tokenTypes.tokens.COLOR,
    SPACE = _tokenTypes.tokens.SPACE,
    NONE = _tokenTypes.tokens.NONE;

var directionFactory = function directionFactory(_ref) {
  var _ref$types = _ref.types,
      types = _ref$types === void 0 ? [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT] : _ref$types,
      _ref$directions = _ref.directions,
      directions = _ref$directions === void 0 ? ["Top", "Right", "Bottom", "Left"] : _ref$directions,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? "" : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? "" : _ref$suffix;
  return function (tokenStream) {
    var _output;

    var values = []; // borderWidth doesn't currently allow a percent value, but may do in the future

    values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));

    while (values.length < 4 && tokenStream.hasTokens()) {
      tokenStream.expect(SPACE);
      values.push(tokenStream.expect.apply(tokenStream, _toConsumableArray(types)));
    }

    tokenStream.expectEmpty();
    var top = values[0],
        _values$ = values[1],
        right = _values$ === void 0 ? top : _values$,
        _values$2 = values[2],
        bottom = _values$2 === void 0 ? top : _values$2,
        _values$3 = values[3],
        left = _values$3 === void 0 ? right : _values$3;

    var keyFor = function keyFor(n) {
      return "".concat(prefix).concat(directions[n]).concat(suffix);
    };

    var output = (_output = {}, _defineProperty(_output, keyFor(0), top), _defineProperty(_output, keyFor(1), right), _defineProperty(_output, keyFor(2), bottom), _defineProperty(_output, keyFor(3), left), _output);
    return {
      $merge: output
    };
  };
};

exports.directionFactory = directionFactory;

var anyOrderFactory = function anyOrderFactory(properties) {
  var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SPACE;
  return function (tokenStream) {
    var propertyNames = Object.keys(properties);
    var values = propertyNames.reduce(function (accum, propertyName) {
      accum[propertyName] === undefined; // eslint-disable-line

      return accum;
    }, {});
    var numParsed = 0;

    while (numParsed < propertyNames.length && tokenStream.hasTokens()) {
      if (numParsed) tokenStream.expect(delim);
      var matchedPropertyName = propertyNames.find(function (propertyName) {
        return values[propertyName] === undefined && properties[propertyName].tokens.some(function (token) {
          return tokenStream.matches(token);
        });
      });

      if (!matchedPropertyName) {
        tokenStream["throw"]();
      } else {
        values[matchedPropertyName] = tokenStream.lastValue;
      }

      numParsed += 1;
    }

    tokenStream.expectEmpty();
    propertyNames.forEach(function (propertyName) {
      if (values[propertyName] === undefined) values[propertyName] = properties[propertyName]["default"];
    });
    return {
      $merge: values
    };
  };
};

exports.anyOrderFactory = anyOrderFactory;

var shadowOffsetFactory = function shadowOffsetFactory() {
  return function (tokenStream) {
    var width = tokenStream.expect(LENGTH);
    var height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width;
    tokenStream.expectEmpty();
    return {
      width: width,
      height: height
    };
  };
};

exports.shadowOffsetFactory = shadowOffsetFactory;

var parseShadow = function parseShadow(tokenStream) {
  var offsetX;
  var offsetY;
  var radius;
  var color;

  if (tokenStream.matches(NONE)) {
    tokenStream.expectEmpty();
    return {
      offset: {
        width: 0,
        height: 0
      },
      radius: 0,
      color: "black"
    };
  }

  var didParseFirst = false;

  while (tokenStream.hasTokens()) {
    if (didParseFirst) tokenStream.expect(SPACE);

    if (offsetX === undefined && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
      offsetX = tokenStream.lastValue;
      tokenStream.expect(SPACE);
      offsetY = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT);
      tokenStream.saveRewindPoint();

      if (tokenStream.matches(SPACE) && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
        radius = tokenStream.lastValue;
      } else {
        tokenStream.rewind();
      }
    } else if (color === undefined && tokenStream.matches(COLOR)) {
      color = tokenStream.lastValue;
    } else {
      tokenStream["throw"]();
    }

    didParseFirst = true;
  }

  if (offsetX === undefined) tokenStream["throw"]();
  return {
    offset: {
      width: offsetX,
      height: offsetY
    },
    radius: radius !== undefined ? radius : 0,
    color: color !== undefined ? color : "black"
  };
};

exports.parseShadow = parseShadow;