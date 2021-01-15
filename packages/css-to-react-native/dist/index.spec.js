"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("misc", function () {
  it("returns empty object when input is empty", function () {
    expect((0, _index["default"])("")).toEqual({});
  });
  it("transforms flex", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 1;\n      }\n    ")).toEqual({
      test: {
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1
      }
    });
  });
  it("transforms numbers", function () {
    expect((0, _index["default"])("\n      .test {\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n      }\n    ")).toEqual({
      test: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });
  });
  it("ignores unsupported at-rules", function () {
    expect((0, _index["default"])("@charset \"utf-8\";")).toEqual({});
    expect((0, _index["default"])("\n      @supports (display: grid) {\n        div {\n          display: grid;\n        }\n      }\n    ")).toEqual({});
  });
  it("allows pixels in unspecialized transform", function () {
    expect((0, _index["default"])("\n      .test {\n        top: 0px;\n      }\n    ")).toEqual({
      test: {
        top: "scalePx2dp(0)"
      }
    });
  });
  it("allows percent in unspecialized transform", function () {
    expect((0, _index["default"])("\n      .test {\n        top: 0%;\n      }\n    ")).toEqual({
      test: {
        top: "0%"
      }
    });
  });
  it("allows decimal values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin-top: 0.5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(0.5)"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin-top: 100.5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(100.5)"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin-top: -0.5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(-0.5)"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin-top: -100.5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(-100.5)"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin-top: .5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(0.5)"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin-top: -.5px;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(-0.5)"
      }
    });
  });
  it("allows PX or PX values", function () {
    expect((0, _index["default"])("\n      .test {\n        top: 1Px;\n        margin: 10Px 30px;\n      }\n    ")).toEqual({
      test: {
        marginBottom: 10,
        marginLeft: "scalePx2dp(30)",
        marginRight: "scalePx2dp(30)",
        marginTop: 10,
        top: 1
      }
    });
  });
  it("allows PX or PX values scalePx2dp", function () {
    expect((0, _index["default"])("\n      .test {\n        top: 10Px;\n        left:10px;\n        margin: 10Px 30px;\n      }\n    ")).toEqual({
      test: {
        left: "scalePx2dp(10)",
        marginBottom: 10,
        marginLeft: "scalePx2dp(30)",
        marginRight: "scalePx2dp(30)",
        marginTop: 10,
        top: 10
      }
    });
  });
  it("allows decimal values in transformed values", function () {
    expect((0, _index["default"])("\n      .test {\n        border-radius: 1.5px;\n      }\n    ")).toEqual({
      test: {
        borderRadius: "scalePx2dp(1.5)"
      }
    });
  });
  it("allows negative values in transformed values", function () {
    expect((0, _index["default"])("\n      .test {\n        border-radius: -1.5px;\n      }\n    ")).toEqual({
      test: {
        borderRadius: "scalePx2dp(-1.5)"
      }
    });
  });
  it("allows percent values in transformed values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10%;\n      }\n    ")).toEqual({
      test: {
        marginTop: "10%",
        marginRight: "10%",
        marginBottom: "10%",
        marginLeft: "10%"
      }
    });
  });
  it("allows color values in transformed border-color values", function () {
    expect((0, _index["default"])("\n      .test {\n        border-color: red\n      }\n    ")).toEqual({
      test: {
        borderColor: "red"
      }
    });
  });
  it("allows omitting units for 0", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px 0;\n      }\n    ")).toEqual({
      test: {
        marginTop: "scalePx2dp(10)",
        marginRight: 0,
        marginBottom: "scalePx2dp(10)",
        marginLeft: 0
      }
    });
  });
  it("converts to camel-case", function () {
    expect((0, _index["default"])("\n      .test {\n        background-color: red;\n      }\n    ")).toEqual({
      test: {
        backgroundColor: "red"
      }
    });
  });
  it("transforms shadow offsets", function () {
    expect((0, _index["default"])("\n      .test {\n        shadow-offset: 10px 5px;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          height: "scalePx2dp(5)",
          width: "scalePx2dp(10)"
        }
      }
    });
  });
  it("transforms text shadow offsets", function () {
    expect((0, _index["default"])("\n      .test {\n        text-shadow-offset: 10px 5px;\n      }\n    ")).toEqual({
      test: {
        textShadowOffset: {
          height: "scalePx2dp(5)",
          width: "scalePx2dp(10)"
        }
      }
    });
  });
  it("transforms a block of css", function () {
    expect((0, _index["default"])("\n    .description {\n      margin-bottom: 20px;\n      font-size: 18px;\n      text-align: center;\n      color: #656656;\n      box-shadow: 10px 20px 30px #fff;\n    }\n\n    .container {\n      padding: 30px;\n      margin-top: 65px;\n      align-items: center;\n      border: 2px dashed #f00;\n    }\n  ")).toEqual({
      description: {
        fontSize: "scalePx2dp(18)",
        marginBottom: "scalePx2dp(20)",
        textAlign: "center",
        color: "#656656",
        shadowColor: "#fff",
        shadowOffset: {
          height: "scalePx2dp(20)",
          width: "scalePx2dp(10)"
        },
        shadowRadius: "scalePx2dp(30)",
        shadowOpacity: 1
      },
      container: {
        paddingBottom: "scalePx2dp(30)",
        paddingLeft: "scalePx2dp(30)",
        paddingRight: "scalePx2dp(30)",
        paddingTop: "scalePx2dp(30)",
        marginTop: "scalePx2dp(65)",
        alignItems: "center",
        borderColor: "#f00",
        borderStyle: "dashed",
        borderWidth: "scalePx2dp(2)"
      }
    });
  });
  it("throws useful errors", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        margin: 10;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "margin: 10"');
  });
  it("when there are selectors with the same name, merges the common props", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px;\n        background-color: #f00;\n      }\n      .test {\n        padding: 10px;\n        font-size: 20px;\n        margin: 5px;\n      }\n    ")).toEqual({
      test: {
        backgroundColor: "#f00",
        fontSize: "scalePx2dp(20)",
        marginBottom: "scalePx2dp(5)",
        marginLeft: "scalePx2dp(5)",
        marginRight: "scalePx2dp(5)",
        marginTop: "scalePx2dp(5)",
        paddingBottom: "scalePx2dp(10)",
        paddingLeft: "scalePx2dp(10)",
        paddingRight: "scalePx2dp(10)",
        paddingTop: "scalePx2dp(10)"
      }
    });
  });
  it("supports group of selectors", function () {
    expect((0, _index["default"])("\n      .test1, .test2 {\n        color: red;\n      }\n    ")).toEqual({
      test1: {
        color: "red"
      },
      test2: {
        color: "red"
      }
    });
  });
});
describe("selectors", function () {
  it("supports dash in class names", function () {
    expect((0, _index["default"])("\n      .test-1-2 {\n        color: red;\n      }\n    ")).toEqual({
      "test-1-2": {
        color: "red"
      }
    });
  });
  it("supports underscore in class names", function () {
    expect((0, _index["default"])("\n      .test_1 {\n        color: red;\n      }\n    ")).toEqual({
      test_1: {
        color: "red"
      }
    });
  });
  it("supports grouping selectors", function () {
    expect((0, _index["default"])("\n      .test, .test2, .test3 {\n        color: red;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      },
      test2: {
        color: "red"
      },
      test3: {
        color: "red"
      }
    });
  });
  it("ignores grouping of ID selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      #test1, #test2, #test3 {\n        color: red;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores grouping of element selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      p, h1, input {\n        color: red;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores ID selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      #foo {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores type selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      input[type=text] {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      [class^=\"test\"] {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .foo[class^=\"test\"] {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores universal selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      * {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores descendant selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .foo .bar {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores direct child selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .foo > .bar {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores adjancent sibling selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .foo + .bar {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores general sibling selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .foo ~ .bar {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores qualified selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      p.bar {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores element selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      p {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("ignores pseudo selectors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n      .test1:hover {\n        color: blue;\n      }\n      .test2::before {\n        color: blue;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
});
describe("colors", function () {
  it("transforms named colors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: red;\n      }\n    ")).toEqual({
      test: {
        color: "red"
      }
    });
  });
  it("transforms hex colors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: #f00;\n      }\n    ")).toEqual({
      test: {
        color: "#f00"
      }
    });
  });
  it("transforms rgb colors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: rgb(255, 0, 0);\n      }\n    ")).toEqual({
      test: {
        color: "rgb(255, 0, 0)"
      }
    });
  });
  it("transforms rgba colors", function () {
    expect((0, _index["default"])("\n      .test {\n        color: rgba(255, 0, 0, 0);\n      }\n    ")).toEqual({
      test: {
        color: "rgba(255, 0, 0, 0)"
      }
    });
  });
});
describe("transform", function () {
  it("transforms a single transform value with number", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: scaleX(5);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          scaleX: 5
        }]
      }
    });
  });
  it("transforms a single transform value with string", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: rotate(5deg);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          rotate: "5deg"
        }]
      }
    });
  });
  it("transforms multiple transform values", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: scaleX(5) skewX(1deg);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          skewX: "1deg"
        }, {
          scaleX: 5
        }]
      }
    });
  });
  it("transforms scale(number, number) to scaleX and scaleY", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: scale(2, 3);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          scaleY: 3
        }, {
          scaleX: 2
        }]
      }
    });
  });
  it("transforms translate(length, length) to translateX and translateY", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: translate(2px, 3px);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          translateY: 3
        }, {
          translateX: 2
        }]
      }
    });
  });
  it("transforms translate(length) to translateX and translateY", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: translate(5px);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          translateY: 0
        }, {
          translateX: 5
        }]
      }
    });
  });
  it("transforms skew(angle, angle) to skewX and skewY", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: skew(2deg, 3deg);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          skewY: "3deg"
        }, {
          skewX: "2deg"
        }]
      }
    });
  });
  it("transforms skew(angle) to skewX and skewY", function () {
    expect((0, _index["default"])("\n      .test {\n        transform: skew(5deg);\n      }\n    ")).toEqual({
      test: {
        transform: [{
          skewY: "0deg"
        }, {
          skewX: "5deg"
        }]
      }
    });
  });
});
describe("border", function () {
  it("transforms border shorthand", function () {
    expect((0, _index["default"])("\n      .test {\n        border: 2px dashed #f00;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 2,
        borderColor: "#f00",
        borderStyle: "dashed"
      }
    });
  });
  it("transforms border shorthand in other order", function () {
    expect((0, _index["default"])("\n      .test {\n        border: #f00 2px dashed;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 2,
        borderColor: "#f00",
        borderStyle: "dashed"
      }
    });
  });
  it("transforms border shorthand missing color", function () {
    expect((0, _index["default"])("\n      .test {\n        border: 2px dashed;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "dashed"
      }
    });
  });
  it("transforms border shorthand missing style", function () {
    expect((0, _index["default"])("\n      .test {\n        border: 2px #f00;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 2,
        borderColor: "#f00",
        borderStyle: "solid"
      }
    });
  });
  it("transforms border shorthand missing width", function () {
    expect((0, _index["default"])("\n      .test {\n        border: #f00 dashed;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 1,
        borderColor: "#f00",
        borderStyle: "dashed"
      }
    });
  });
  it("transforms border shorthand missing color & width", function () {
    expect((0, _index["default"])("\n      .test {\n        border: dashed;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "dashed"
      }
    });
  });
  it("transforms border shorthand missing style & width", function () {
    expect((0, _index["default"])("\n      .test {\n        border: #f00;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 1,
        borderColor: "#f00",
        borderStyle: "solid"
      }
    });
  });
  it("transforms border shorthand missing color & style", function () {
    expect((0, _index["default"])("\n      .test {\n        border: 2px;\n      }\n    ")).toEqual({
      test: {
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "solid"
      }
    });
  });
  describe("shorthand border properties related to Image elements", function () {
    it("transforms border-radius", function () {
      expect((0, _index["default"])("\n        .test {\n          border-radius: 6px;\n        }\n      ")).toEqual({
        test: {
          borderRadius: 6
        }
      });
    });
    it("transforms border-radius with multiple values", function () {
      expect((0, _index["default"])("\n        .test {\n          border-radius: 10px 5%;\n        }\n      ")).toEqual({
        test: {
          borderBottomLeftRadius: "5%",
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: "5%"
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-radius: 2px 4px 2px;\n        }\n      ")).toEqual({
        test: {
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 2,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 4
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-radius: 1px 0 3px 4px;\n        }\n      ")).toEqual({
        test: {
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 3,
          borderTopLeftRadius: 1,
          borderTopRightRadius: 0
        }
      });
    });
    it("transforms border-color", function () {
      expect((0, _index["default"])("\n        .test {\n          border-color: #fff;\n        }\n      ")).toEqual({
        test: {
          borderColor: "#fff"
        }
      });
    });
    it("transforms border-color with multiple values", function () {
      expect((0, _index["default"])("\n        .test {\n          border-color: red #f015ca;\n        }\n      ")).toEqual({
        test: {
          borderTopColor: "red",
          borderRightColor: "#f015ca",
          borderBottomColor: "red",
          borderLeftColor: "#f015ca"
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-color: red yellow green;\n        }\n      ")).toEqual({
        test: {
          borderTopColor: "red",
          borderRightColor: "yellow",
          borderBottomColor: "green",
          borderLeftColor: "yellow"
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-color: red yellow green blue;\n        }\n      ")).toEqual({
        test: {
          borderTopColor: "red",
          borderRightColor: "yellow",
          borderBottomColor: "green",
          borderLeftColor: "blue"
        }
      });
    });
    it("transforms border-width", function () {
      expect((0, _index["default"])("\n        .test {\n          border-width: 4px;\n        }\n      ")).toEqual({
        test: {
          borderWidth: 4
        }
      });
    });
    it("transforms border-width with multiple values", function () {
      expect((0, _index["default"])("\n        .test {\n          border-width: 2px 1.5rem;\n        }\n      ")).toEqual({
        test: {
          borderTopWidth: 2,
          borderRightWidth: 24,
          borderBottomWidth: 2,
          borderLeftWidth: 24
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-width: 1px 2rem 1.5rem;\n        }\n      ")).toEqual({
        test: {
          borderTopWidth: 1,
          borderRightWidth: 32,
          borderBottomWidth: 24,
          borderLeftWidth: 32
        }
      });
      expect((0, _index["default"])("\n        .test {\n          border-width: 1px 2rem 0 4rem;\n        }\n      ")).toEqual({
        test: {
          borderTopWidth: 1,
          borderRightWidth: 32,
          borderBottomWidth: 0,
          borderLeftWidth: 64
        }
      });
    });
    it("transforms border-style", function () {
      expect((0, _index["default"])("\n        .test {\n          border-style: solid;\n        }\n      ")).toEqual({
        test: {
          borderStyle: "solid"
        }
      });
    });
  });
});
describe("font", function () {
  it("transforms font weights as strings", function () {
    expect((0, _index["default"])("\n      .test {\n        font-weight: 400\n      }\n    ")).toEqual({
      test: {
        fontWeight: "400"
      }
    });
  });
  it("transforms font variant as an array", function () {
    expect((0, _index["default"])("\n      .test {\n        font-variant: tabular-nums;\n      }\n    ")).toEqual({
      test: {
        fontVariant: ["tabular-nums"]
      }
    });
  });
});
describe("background", function () {
  it("transforms background to backgroundColor", function () {
    expect((0, _index["default"])("\n      .test {\n        background: #f00;\n      }\n    ")).toEqual({
      test: {
        backgroundColor: "#f00"
      }
    });
  });
  it("transforms background to backgroundColor with rgb", function () {
    expect((0, _index["default"])("\n      .test {\n        background: rgb(255, 0, 0);\n      }\n    ")).toEqual({
      test: {
        backgroundColor: "rgb(255, 0, 0)"
      }
    });
  });
  it("transforms background to backgroundColor with named colour", function () {
    expect((0, _index["default"])("\n      .test {\n        background: red;\n      }\n    ")).toEqual({
      test: {
        backgroundColor: "red"
      }
    });
  });
});
describe("line-height", function () {
  it("transforms line-height with value and unit", function () {
    expect((0, _index["default"])("\n      .test {\n        line-height: 1.5px;\n      }\n    ")).toEqual({
      test: {
        lineHeight: 1.5
      }
    });
  });
  it("transforms line-height with rem unit", function () {
    expect((0, _index["default"])("\n      .test {\n        line-height: 2rem;\n      }\n    ")).toEqual({
      test: {
        lineHeight: 32
      }
    });
  });
  it("transforms line-height with %", function () {
    expect((0, _index["default"])("\n      .test {\n        line-height: 150%;\n      }\n    ")).toEqual({
      test: {
        lineHeight: "150%"
      }
    });
  });
  it("transforms line-height with pt unit", function () {
    expect((0, _index["default"])("\n      .test {\n        line-height: 2pt;\n      }\n    ")).toEqual({
      test: {
        lineHeight: "2pt"
      }
    });
  });
  it("transforms line-height with viewport unit", function () {
    expect((0, _index["default"])("\n      .test {\n        line-height: 2vh;\n      }\n    ")).toEqual({
      __viewportUnits: true,
      test: {
        lineHeight: "2vh"
      }
    });
  });
  it("throws for line-height with multiplier", function () {
    expect(function () {
      return (0, _index["default"])("\n      .test {\n        line-height: 1.5;\n      }\n    ");
    }).toThrow('Failed to parse declaration "line-height: 1.5"');
  });
});
describe("margin", function () {
  it("transforms margin shorthands using 4 values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px 20px 30px 40px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 40
      }
    });
  });
  it("transforms margin shorthands using 3 values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px 20px 30px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 20
      }
    });
  });
  it("transforms margin shorthands using 2 values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px 20px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        marginLeft: 20
      }
    });
  });
  it("transforms margin shorthands using 1 value", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: 10px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10
      }
    });
  });
  it("shorthand with 1 value should override previous values", function () {
    expect((0, _index["default"])("\n      .test {\n        margin-top: 2px;\n        margin: 1px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 1,
        marginRight: 1,
        marginBottom: 1,
        marginLeft: 1
      }
    });
  });
  it("transforms margin shorthand with auto", function () {
    expect((0, _index["default"])("\n      .test {\n        margin: auto;\n      }\n    ")).toEqual({
      test: {
        marginTop: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        marginLeft: "auto"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin: 0 auto;\n      }\n    ")).toEqual({
      test: {
        marginTop: 0,
        marginRight: "auto",
        marginBottom: 0,
        marginLeft: "auto"
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin: auto 0;\n      }\n    ")).toEqual({
      test: {
        marginTop: "auto",
        marginRight: 0,
        marginBottom: "auto",
        marginLeft: 0
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin: 2px 3px auto;\n      }\n    ")).toEqual({
      test: {
        marginTop: 2,
        marginRight: 3,
        marginBottom: "auto",
        marginLeft: 3
      }
    });
    expect((0, _index["default"])("\n      .test {\n        margin: 10px auto 4px;\n      }\n    ")).toEqual({
      test: {
        marginTop: 10,
        marginRight: "auto",
        marginBottom: 4,
        marginLeft: "auto"
      }
    });
  });
});
describe("text-decoration", function () {
  it("transforms text-decoration into text-decoration- properties", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: underline dotted red;\n      }\n    ")).toEqual({
      test: {
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "red"
      }
    });
  });
  it("transforms text-decoration without color", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: underline dotted;\n      }\n    ")).toEqual({
      test: {
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "black"
      }
    });
  });
  it("transforms text-decoration without style", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: underline red;\n      }\n    ")).toEqual({
      test: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "red"
      }
    });
  });
  it("transforms text-decoration without style and color", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: underline;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "black"
      }
    });
  });
  it("transforms text-decoration with two line properties", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: underline line-through dashed red;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline line-through",
        textDecorationStyle: "dashed",
        textDecorationColor: "red"
      }
    });
  });
  it("transforms text-decoration in different order", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: dashed red underline line-through;\n      }\n    ")).toEqual({
      test: {
        textDecorationLine: "underline line-through",
        textDecorationStyle: "dashed",
        textDecorationColor: "red"
      }
    });
  });
  it("transforms text-decoration with ine in different order", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: line-through underline;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "black"
      }
    });
  });
  it("transforms text-decoration with none", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: none;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "black"
      }
    });
  });
  it("transforms text-decoration with none as part of multiple terms", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: yellow none;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "yellow"
      }
    });
  });
  it("transforms text-decoration with none in capitals", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: yellow NONE;\n      }\n    ")).toEqual({
      test: {
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "yellow"
      }
    });
  });
  it("transforms text-decoration with style in capitals", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration: yellow UNDERLINE LINE-THROUGH;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "yellow"
      }
    });
  });
  it("does not transform text-decoration if multiple colors are used", function () {
    expect(function () {
      return (0, _index["default"])("\n      .test {\n        text-decoration: underline red yellow;\n      }\n      ");
    }).toThrow('Failed to parse declaration "textDecoration: underline red yellow"');
  });
});
describe("text-decoration-line", function () {
  it("transforms text-decoration-line with underline line-through", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration-line: underline line-through;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline line-through"
      }
    });
  });
  it("transforms text-decoration-line with line-through underline", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration-line: line-through underline;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "underline line-through"
      }
    });
  });
  it("transforms text-decoration-line with none", function () {
    expect((0, _index["default"])("\n      .test {\n        text-decoration-line: none;\n      }\n      ")).toEqual({
      test: {
        textDecorationLine: "none"
      }
    });
  });
});
describe("flex-box", function () {
  it("transforms flex shorthand with 3 values", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 1 2 3px;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: 3
      }
    });
  });
  it("transforms flex shorthand with 3 values in reverse order", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 3px 1 2;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: 3
      }
    });
  });
  it("transforms flex shorthand with 2 values of flex-grow and flex-shrink", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 1 2;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: 0
      }
    });
  });
  it("transforms flex shorthand with 2 values of flex-grow and flex-basis", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 2 2px;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 2,
        flexShrink: 1,
        flexBasis: 2
      }
    });
  });
  it("transforms flex shorthand with 2 values of flex-grow and flex-basis (reversed)", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 2px 2;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 2,
        flexShrink: 1,
        flexBasis: 2
      }
    });
  });
  it("transforms flex shorthand with 1 value of flex-grow", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 2;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 2,
        flexShrink: 1,
        flexBasis: 0
      }
    });
  });
  it("transforms flex shorthand with 1 value of flex-basis", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 10px;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 10
      }
    });
  });
  /*
    A unitless zero that is not already preceded by two flex factors must be interpreted as a flex
    factor. To avoid misinterpretation or invalid declarations, authors must specify a zero
    <‘flex-basis’> component with a unit or precede it by two flex factors.
  */

  it("transforms flex shorthand with flex-grow/shrink taking priority over basis", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 0 1 0;\n      }\n    ")).toEqual({
      test: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 0
      }
    });
  });
  it("transforms flex shorthand with flex-basis set to auto", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: 0 1 auto;\n      }\n    ")).toEqual({
      test: {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 1
      }
    });
  });
  it("transforms flex shorthand with flex-basis set to auto appearing first", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: auto 0 1;\n      }\n    ")).toEqual({
      test: {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 1
      }
    });
  });
  it("transforms flex auto keyword", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: auto;\n      }\n    ")).toEqual({
      test: {
        flexBasis: "auto",
        flexGrow: 1,
        flexShrink: 1
      }
    });
  });
  it("transforms flex none keyword", function () {
    expect((0, _index["default"])("\n      .test {\n        flex: none;\n      }\n    ")).toEqual({
      test: {
        flexBasis: "auto",
        flexGrow: 0,
        flexShrink: 0
      }
    });
  });
  it("transforms flexFlow shorthand with two values", function () {
    expect((0, _index["default"])("\n      .test {\n        flex-flow: column wrap;\n      }\n    ")).toEqual({
      test: {
        flexDirection: "column",
        flexWrap: "wrap"
      }
    });
  });
  it("transforms flexFlow shorthand missing flexDirection", function () {
    expect((0, _index["default"])("\n      .test {\n        flex-flow: wrap;\n      }\n    ")).toEqual({
      test: {
        flexDirection: "row",
        flexWrap: "wrap"
      }
    });
  });
  it("transforms flexFlow shorthand missing flexWrap", function () {
    expect((0, _index["default"])("\n      .test {\n        flex-flow: column;\n      }\n    ")).toEqual({
      test: {
        flexDirection: "column",
        flexWrap: "nowrap"
      }
    });
  });
  it("does not transform invalid flex'", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        flex: 1 2px 3;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "flex: 1 2px 3"');
  });
});
describe("font", function () {
  it("transforms font", function () {
    expect((0, _index["default"])("\n      .test {\n        font: bold italic small-caps 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        fontVariant: ["small-caps"],
        lineHeight: 18
      }
    });
  });
  it("transforms font missing font-variant", function () {
    expect((0, _index["default"])("\n      .test {\n        font: bold italic 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        fontVariant: [],
        lineHeight: 18
      }
    });
  });
  it("transforms font missing font-style", function () {
    expect((0, _index["default"])("\n      .test {\n        font: bold small-caps 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        fontVariant: ["small-caps"],
        lineHeight: 18
      }
    });
  });
  it("transforms font missing font-weight", function () {
    expect((0, _index["default"])("\n      .test {\n        font: italic small-caps 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "italic",
        fontVariant: ["small-caps"],
        lineHeight: 18
      }
    });
  });
  it("transforms font with font-weight normal", function () {
    expect((0, _index["default"])("\n      .test {\n        font: normal 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontVariant: [],
        lineHeight: 18
      }
    });
  });
  it("transforms font with font-weight and font-style normal", function () {
    expect((0, _index["default"])("\n      .test {\n        font: normal normal 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontVariant: [],
        lineHeight: 18
      }
    });
  });
  it("transforms font with no font-weight, font-style, and font-variant", function () {
    expect((0, _index["default"])("\n      .test {\n        font: 16px/18px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontVariant: [],
        lineHeight: 18
      }
    });
  });
  it("omits line height if not specified", function () {
    expect((0, _index["default"])("\n      .test {\n        font: 16px \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontVariant: []
      }
    });
  });
  it("allows line height as multiple", function () {
    expect((0, _index["default"])("\n      .test {\n        font: 16px/1.5 \"Helvetica\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontVariant: [],
        lineHeight: 24
      }
    });
  });
  it("transforms font without quotes", function () {
    expect((0, _index["default"])("\n      .test {\n        font: bold italic small-caps 16px/18px Helvetica Neue;\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica Neue",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        fontVariant: ["small-caps"],
        lineHeight: 18
      }
    });
  });
  it("transforms font-family with double quotes", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: \"Helvetica Neue\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica Neue"
      }
    });
  });
  it("transforms font-family with single quotes", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: 'Helvetica Neue';\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica Neue"
      }
    });
  });
  it("transforms font-family without quotes", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: Helvetica Neue;\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Helvetica Neue"
      }
    });
  });
  it("transforms font-family with quotes with otherwise invalid values", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: \"Goudy Bookletter 1911\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "Goudy Bookletter 1911"
      }
    });
  });
  it("transforms font-family with quotes with escaped values", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: \"test\\A test\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: "test\ntest"
      }
    });
  });
  it("transforms font-family with quotes with escaped quote", function () {
    expect((0, _index["default"])("\n      .test {\n        font-family: \"test\\\"test\";\n      }\n    ")).toEqual({
      test: {
        fontFamily: 'test"test'
      }
    });
  });
  it("does not transform invalid unquoted font-family", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        font-family: Goudy Bookletter 1911;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "fontFamily: Goudy Bookletter 1911"');
  });
});
describe("box-shadow", function () {
  it("transforms box-shadow into shadow- properties", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px red;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "red",
        shadowOpacity: 1
      }
    });
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px #f00;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "#f00",
        shadowOpacity: 1
      }
    });
  });
  it("supports rgb values", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px rgb(100, 100, 100);\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "rgb(100, 100, 100)",
        shadowOpacity: 1
      }
    });
  });
  it("supports rgba values", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px rgba(100, 100, 100, 0.5);\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "rgba(100, 100, 100, 0.5)",
        shadowOpacity: 1
      }
    });
  });
  it("supports box-shadow with hsl color", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px hsl(120, 100%, 50%);\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "hsl(120, 100%, 50%)",
        shadowOpacity: 1
      }
    });
  });
  it("supports box-shadow with hsla color", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px hsla(120, 100%, 50%, 0.7);\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "hsla(120, 100%, 50%, 0.7)",
        shadowOpacity: 1
      }
    });
  });
  it("trims values", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px   20px   30px   #f00 ;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "#f00",
        shadowOpacity: 1
      }
    });
  });
  it("transforms box-shadow with 0 values", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 0 0 1px red;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 1,
        shadowColor: "red",
        shadowOpacity: 1
      }
    });
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 0 0 0 red;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 0,
        shadowColor: "red",
        shadowOpacity: 1
      }
    });
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 1px 1px 0 #00f;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowRadius: 0,
        shadowColor: "#00f",
        shadowOpacity: 1
      }
    });
  });
  it("transforms box-shadow without blur-radius", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px red;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 0,
        shadowColor: "red",
        shadowOpacity: 1
      }
    });
  });
  it("transforms box-shadow without color", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px 30px;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 30,
        shadowColor: "black",
        shadowOpacity: 1
      }
    });
  });
  it("transforms box-shadow without blur-radius, color", function () {
    expect((0, _index["default"])("\n      .test {\n        box-shadow: 10px 20px;\n      }\n    ")).toEqual({
      test: {
        shadowOffset: {
          width: 10,
          height: 20
        },
        shadowRadius: 0,
        shadowColor: "black",
        shadowOpacity: 1
      }
    });
  });
  it("transforms box-shadow enforces offset to be present", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: red;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: red"');
  });
  it("transforms box-shadow and throws if multiple colors are used", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: 0 0 0 red yellow green blue;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: 0 0 0 red yellow green blue"');
  });
  it("transforms box-shadow and enforces offset-y if offset-x present", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: 10px;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: 10px"');
  });
  it("transforms box-shadow and enforces units for non 0 values", function () {
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: 10 20px 30px #f00;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: 10 20px 30px #f00"');
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: 10px 20;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: 10px 20"');
    expect(function () {
      (0, _index["default"])("\n      .test {\n        box-shadow: 20;\n      }\n    ");
    }).toThrowError('Failed to parse declaration "boxShadow: 20"');
  });
});
describe("text-shadow", function () {
  it("textShadow with all values", function () {
    expect((0, _index["default"])("\n      .test {\n        text-shadow: 10px 20px 30px red;\n      }\n    ")).toEqual({
      test: {
        textShadowOffset: {
          width: 10,
          height: 20
        },
        textShadowRadius: 30,
        textShadowColor: "red"
      }
    });
  });
  it("textShadow omitting blur", function () {
    expect((0, _index["default"])("\n      .test {\n        text-shadow: 10px 20px red;\n      }\n    ")).toEqual({
      test: {
        textShadowOffset: {
          width: 10,
          height: 20
        },
        textShadowRadius: 0,
        textShadowColor: "red"
      }
    });
  });
  it("textShadow omitting color", function () {
    expect((0, _index["default"])("\n      .test {\n        text-shadow: 10px 20px;\n      }\n    ")).toEqual({
      test: {
        textShadowOffset: {
          width: 10,
          height: 20
        },
        textShadowRadius: 0,
        textShadowColor: "black"
      }
    });
  });
  it("textShadow enforces offset-x and offset-y", function () {
    expect(function () {
      return (0, _index["default"])("\n      .test {\n        text-shadow: red;\n      }\n      ");
    }).toThrow('Failed to parse declaration "textShadow: red"');
    expect(function () {
      return (0, _index["default"])("\n      .test {\n        text-shadow: 10px red;\n      }\n      ");
    }).toThrow('Failed to parse declaration "textShadow: 10px red"');
  });
});
describe("rem unit", function () {
  it("should transform a single rem value", function () {
    expect((0, _index["default"])("\n      .test1 {\n        padding: 2rem;\n      }\n      .test2 {\n        font-size: 1rem;\n      }\n    ")).toEqual({
      test1: {
        paddingBottom: 32,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32
      },
      test2: {
        fontSize: 16
      }
    });
  });
  it("should transform multiple rem values", function () {
    expect((0, _index["default"])("\n      .test1 {\n        transform: translate(1rem, 2rem);\n      }\n      .test2 {\n        box-shadow: 1rem 2rem 3rem #fff;\n      }\n    ")).toEqual({
      test1: {
        transform: [{
          translateY: 32
        }, {
          translateX: 16
        }]
      },
      test2: {
        shadowColor: "#fff",
        shadowOffset: {
          height: 32,
          width: 16
        },
        shadowRadius: 48,
        shadowOpacity: 1
      }
    });
  });
  it("should support decimal values", function () {
    expect((0, _index["default"])("\n      .test1 {\n        transform: translate(0.9375rem, 1.625rem);\n      }\n      .test2 {\n        border-radius: 0.5625rem;\n      }\n    ")).toEqual({
      test1: {
        transform: [{
          translateY: 26
        }, {
          translateX: 15
        }]
      },
      test2: {
        borderRadius: 9
      }
    });
    expect((0, _index["default"])("\n      .test1 {\n        transform: translate(.9375rem, 1.625rem);\n      }\n      .test2 {\n        border-radius: .5625rem;\n      }\n    ")).toEqual({
      test1: {
        transform: [{
          translateY: 26
        }, {
          translateX: 15
        }]
      },
      test2: {
        borderRadius: 9
      }
    });
  });
});
describe("viewport units", function () {
  it("should transform viewport units", function () {
    expect((0, _index["default"])("\n      .test {\n        font-size: 1vw;\n        line-height: 2vh;\n        padding: 1vmax;\n        margin: 1vmin;\n      }\n    ")).toEqual({
      __viewportUnits: true,
      test: {
        fontSize: "1vw",
        lineHeight: "2vh",
        marginBottom: "1vmin",
        marginLeft: "1vmin",
        marginRight: "1vmin",
        marginTop: "1vmin",
        paddingBottom: "1vmax",
        paddingLeft: "1vmax",
        paddingRight: "1vmax",
        paddingTop: "1vmax"
      }
    });
  });
});
describe("media queries", function () {
  it("transforms media queries", function () {
    expect((0, _index["default"])("\n        .container {\n          background-color: #f00;\n        }\n\n        @media (orientation: landscape) {\n          .container {\n            background-color: #00f;\n          }\n        }\n        ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "all"
        }]
      },
      container: {
        backgroundColor: "#f00"
      },
      "@media (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      }
    });
  });
  it("merges media queries", function () {
    expect((0, _index["default"])("\n        .container {\n          background-color: #f00;\n        }\n        .box {\n          background-color: #f00;\n        }\n\n        @media (orientation: landscape) {\n          .container {\n            background-color: #00f;\n          }\n        }\n        @media (orientation: landscape) {\n          .box {\n            background-color: #00f;\n          }\n        }\n        ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "all"
        }]
      },
      container: {
        backgroundColor: "#f00"
      },
      box: {
        backgroundColor: "#f00"
      },
      "@media (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        },
        box: {
          backgroundColor: "#00f"
        }
      }
    });
  });
  it("does not transform media queries without option enabled", function () {
    expect((0, _index["default"])("\n      .container {\n        background-color: #f00;\n      }\n\n      @media (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n  ")).toEqual({
      container: {
        backgroundColor: "#f00"
      }
    });
    expect((0, _index["default"])("\n        .container {\n          background-color: #f00;\n        }\n\n        @media (orientation: landscape) {\n          .container {\n            background-color: #00f;\n          }\n        }\n        ", {
      parseMediaQueries: false
    })).toEqual({
      container: {
        backgroundColor: "#f00"
      }
    });
  });
  it("should support screen type", function () {
    expect((0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media screen and (min-height: 50px) and (max-height: 150px) {\n          .foo {\n            color: red;\n          }\n        }\n        @media screen and (min-height: 150px) and (max-height: 200px) {\n          .foo {\n            color: green;\n          }\n        }\n      ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media screen and (min-height: 50px) and (max-height: 150px)": [{
          expressions: [{
            feature: "height",
            modifier: "min",
            value: "50px"
          }, {
            feature: "height",
            modifier: "max",
            value: "150px"
          }],
          inverse: false,
          type: "screen"
        }],
        "@media screen and (min-height: 150px) and (max-height: 200px)": [{
          expressions: [{
            feature: "height",
            modifier: "min",
            value: "150px"
          }, {
            feature: "height",
            modifier: "max",
            value: "200px"
          }],
          inverse: false,
          type: "screen"
        }]
      },
      foo: {
        color: "blue"
      },
      "@media screen and (min-height: 50px) and (max-height: 150px)": {
        foo: {
          color: "red"
        }
      },
      "@media screen and (min-height: 150px) and (max-height: 200px)": {
        foo: {
          color: "green"
        }
      }
    });
  });
  it("should support all type", function () {
    expect((0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n      @media all and (min-height: 50px) and (max-height: 150px) {\n        .foo {\n          color: red;\n        }\n      }\n      @media all and (min-height: 150px) and (max-height: 200px) {\n        .foo {\n          color: green;\n        }\n      }\n    ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media all and (min-height: 50px) and (max-height: 150px)": [{
          expressions: [{
            feature: "height",
            modifier: "min",
            value: "50px"
          }, {
            feature: "height",
            modifier: "max",
            value: "150px"
          }],
          inverse: false,
          type: "all"
        }],
        "@media all and (min-height: 150px) and (max-height: 200px)": [{
          expressions: [{
            feature: "height",
            modifier: "min",
            value: "150px"
          }, {
            feature: "height",
            modifier: "max",
            value: "200px"
          }],
          inverse: false,
          type: "all"
        }]
      },
      foo: {
        color: "blue"
      },
      "@media all and (min-height: 50px) and (max-height: 150px)": {
        foo: {
          color: "red"
        }
      },
      "@media all and (min-height: 150px) and (max-height: 200px)": {
        foo: {
          color: "green"
        }
      }
    });
  });
  it("should support platform types", function () {
    expect((0, _index["default"])("\n      @media web and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      @media ios and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      @media android and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      @media windows and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      @media macos and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      @media dom and (orientation: landscape) {\n        .container {\n          background-color: #00f;\n        }\n      }\n      ", {
      parseMediaQueries: true
    })).toEqual({
      "@media android and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      "@media dom and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      "@media ios and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      "@media macos and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      "@media web and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      "@media windows and (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      },
      __mediaQueries: {
        "@media android and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "android"
        }],
        "@media dom and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "dom"
        }],
        "@media ios and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "ios"
        }],
        "@media macos and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "macos"
        }],
        "@media web and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "web"
        }],
        "@media windows and (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "windows"
        }]
      }
    });
  });
  it("should support NOT operator", function () {
    expect((0, _index["default"])("\n        .container {\n          background-color: #f00;\n        }\n\n        @media not screen and (device-width: 768px)  {\n          .container {\n            background-color: #00f;\n          }\n        }\n        ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media not screen and (device-width: 768px)": [{
          expressions: [{
            feature: "device-width",
            modifier: undefined,
            value: "768px"
          }],
          inverse: true,
          type: "screen"
        }]
      },
      container: {
        backgroundColor: "#f00"
      },
      "@media not screen and (device-width: 768px)": {
        container: {
          backgroundColor: "#00f"
        }
      }
    });
  });
  it("should support OR queries", function () {
    expect((0, _index["default"])("\n        .container {\n          background-color: #f00;\n        }\n\n        @media (orientation: portrait), (orientation: landscape)  {\n          .container {\n            background-color: #00f;\n          }\n        }\n        ", {
      parseMediaQueries: true
    })).toEqual({
      __mediaQueries: {
        "@media (orientation: portrait), (orientation: landscape)": [{
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "portrait"
          }],
          inverse: false,
          type: "all"
        }, {
          expressions: [{
            feature: "orientation",
            modifier: undefined,
            value: "landscape"
          }],
          inverse: false,
          type: "all"
        }]
      },
      container: {
        backgroundColor: "#f00"
      },
      "@media (orientation: portrait), (orientation: landscape)": {
        container: {
          backgroundColor: "#00f"
        }
      }
    });
  });
  it("should throw for invalid types", function () {
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n\n        @media screens {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query type "screens"');
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media sdfgsdfg {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query type "sdfgsdfg"');
    expect(function () {
      return (0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n      @media linux and (orientation: landscape) {\n        .foo {\n          color: red;\n        }\n      }\n    ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query type "linux"');
  });
  it("should throw for invalid features", function () {
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media (min-heigh: 50px) and (max-height: 150px) {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query feature "min-heigh"');
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media (orientations: landscape) {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query feature "orientations"');
  });
  it("should throw for values without units", function () {
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media (min-height: 50) and (max-height: 150px) {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query expression "(min-height: 50)"');
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media (min-height: 50px) and (max-height: 150) {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query expression "(max-height: 150)"');
    expect(function () {
      return (0, _index["default"])("\n        .foo {\n          color: blue;\n        }\n        @media (min-width) {\n          .foo {\n            color: red;\n          }\n        }\n      ", {
        parseMediaQueries: true
      });
    }).toThrow('Failed to parse media query expression "(min-width)"');
  });
});
describe("ICSS :export pseudo-selector", function () {
  // https://github.com/css-modules/icss#export
  it("should parse ICSS :export pseudo-selectors", function () {
    expect((0, _index["default"])("\n      :export {\n        whitecolor: #fcf5ed;\n        test: 1px;\n      }\n    ")).toEqual({
      whitecolor: "#fcf5ed",
      test: "1px"
    });
  });
  it("if there is more than :export one in a file, the keys and values are combined and exported together", function () {
    expect((0, _index["default"])("\n\n      :export {\n        blackColor: #000;\n      }\n\n      .bar {\n        color: blue;\n      }\n\n      :export {\n        whitecolor: #fcf5ed;\n        test: 1px;\n      }\n    ")).toEqual({
      bar: {
        color: "blue"
      },
      blackColor: "#000",
      whitecolor: "#fcf5ed",
      test: "1px"
    });
  });
  it("should support exportedKey value with spaces", function () {
    expect((0, _index["default"])("\n      :export {\n        blackColor: something is something;\n      }\n\n      .bar {\n        color: blue;\n      }\n    ")).toEqual({
      bar: {
        color: "blue"
      },
      blackColor: "something is something"
    });
  });
  it("an exportedValue does not need to be quoted, it is already treated as a literal string", function () {
    expect((0, _index["default"])("\n      :export {\n        foo: something;\n        boo: 0;\n      }\n\n      .bar {\n        color: blue;\n      }\n    ")).toEqual({
      bar: {
        color: "blue"
      },
      foo: "something",
      boo: "0"
    });
  });
  it("should parse :export and support the same exportedKey with different case", function () {
    expect((0, _index["default"])("\n      :export {\n        whitecolor: #fcf5ed;\n        WhiteColor: #fff;\n      }\n    ")).toEqual({
      whitecolor: "#fcf5ed",
      WhiteColor: "#fff"
    });
  });
  it("should parse a selector and :export", function () {
    expect((0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        whitecolor: #fcf5ed;\n        b: 0;\n        test: 1px;\n      }\n    ")).toEqual({
      foo: {
        color: "blue"
      },
      whitecolor: "#fcf5ed",
      b: "0",
      test: "1px"
    });
  });
  it("should do nothing with an empty :export block", function () {
    expect((0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n\n      :export {\n      }\n    ")).toEqual({
      foo: {
        color: "blue"
      }
    });
  });
  it("if a particular exportedKey is duplicated, the last (in source order) takes precedence.", function () {
    expect((0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        bar: 1;\n        bar: 2;\n      }\n    ")).toEqual({
      foo: {
        color: "blue"
      },
      bar: "2"
    });
    expect((0, _index["default"])("\n      :export {\n        bar: 3;\n      }\n\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        bar: 1;\n        bar: 2;\n      }\n    ")).toEqual({
      foo: {
        color: "blue"
      },
      bar: "2"
    });
    expect((0, _index["default"])("\n      :export {\n        baz: 1;\n        bar: 3;\n      }\n\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        bar: 1;\n        bar: 2;\n      }\n    ")).toEqual({
      foo: {
        color: "blue"
      },
      baz: "1",
      bar: "2"
    });
  });
  it("should throw an error if exportedKey has the same name as a class and is defined twice", function () {
    expect(function () {
      return (0, _index["default"])("\n      :export {\n        bar: 1;\n        bar: 2;\n      }\n\n      .bar {\n        color: blue;\n      }\n    ");
    }).toThrow('Failed to parse :export block because a CSS class in the same file is already using the name "bar"');
  });
  it("should throw an error if exportedKey has the same name as a class", function () {
    expect(function () {
      return (0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        foo: 1;\n      }\n    ");
    }).toThrow('Failed to parse :export block because a CSS class in the same file is already using the name "foo"');
    expect(function () {
      return (0, _index["default"])("\n      :export {\n        foo: 1;\n      }\n\n      .foo {\n        color: red;\n      }\n    ");
    }).toThrow('Failed to parse :export block because a CSS class in the same file is already using the name "foo"');
    expect(function () {
      return (0, _index["default"])("\n      .foo {\n        color: blue;\n      }\n\n      :export {\n        foo: 1;\n      }\n\n      .foo {\n        color: red;\n      }\n    ");
    }).toThrow('Failed to parse :export block because a CSS class in the same file is already using the name "foo"');
  });
  it("should throw for :export that is not top level", function () {
    expect(function () {
      return (0, _index["default"])("\n      .foo {\n        color: red;\n        :export {\n          bar: 1;\n        }\n      }\n    ");
    }).toThrow();
  });
});