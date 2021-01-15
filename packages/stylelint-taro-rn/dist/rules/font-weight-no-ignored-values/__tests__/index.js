"use strict";

var _ = require("..");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var acceptedWeights = ["400", "700", "normal", "bold"];
var rejectedWeights = ["100", "200", "300", "500", "600", "800", "900"];

testRule(_2.default, {
  ruleName: _.ruleName,
  config: [true],

  accept: acceptedWeights.map(function(w) {
    return {
      code: "\n      .foo {\n        font-weight: " + w + ";\n      }\n      ",
      description: "font-weight: " + w
    };
  }),

  reject: rejectedWeights.map(function(w) {
    return {
      code: "\n      .foo {\n        font-weight: " + w + ";\n      }\n      ",
      description: "font-weight: " + w,
      message: _.messages.rejected(w),
      line: 3,
      column: 22
    };
  })
});
