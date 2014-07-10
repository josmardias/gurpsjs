"use strict";

var Attributes = GURPS.Attributes;

describe("Attributes module creation", function () {

  it("without arguments", function () {
    var mod = new Attributes();
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with empty objects as arguments", function () {
    var mod = new Attributes({}, {});
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with undefined as arguments", function () {
    var mod = new Attributes(undefined, undefined);
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with null as arguments", function () {
    var mod = new Attributes(null, null);
    expect(mod).toEqual(jasmine.any(Object));
  });

});

describe("Get attribute without errors", function () {

  it("when there is no attribute", function () {
    var mod, value;
    mod = new Attributes();
    value = mod.get("attr");
  });

  it("when requested attribute is not present", function () {
    var mod, value;
    mod = new Attributes({
      "attr2": 11
    });
    value = mod.get("attr");
  });

  it("when attribute is undefined", function () {
    var mod, value;
    mod = new Attributes({
      "attr": undefined
    });
    value = mod.get("attr");
  });

  it("when attribute is null", function () {
    var mod, value;
    mod = new Attributes({
      "attr": null
    });
    value = mod.get("attr");
  });

  it("when attribute is a number", function () {
    var mod, value;
    mod = new Attributes({
      "attr": 11
    });
    value = mod.get("attr");
  });

  it("when attribute is a string", function () {
    var mod, value;
    mod = new Attributes({
      "attr": "test"
    });
    value = mod.get("attr");
  });

  it("when attribute is an object", function () {
    var mod, value;
    mod = new Attributes({
      "attr": {}
    });
    value = mod.get("attr");
  });

  it("when attribute is an array", function () {
    var mod, value;
    mod = new Attributes({
      "attr": []
    });
    value = mod.get("attr");
  });

  it("when bonus is null", function () {
    var mod, value;
    mod = new Attributes({
      "attr": 10
    }, {
      "attr": null
    });
    value = mod.get("attr");
  });

  it("when there is no bonus for the requested attribute", function () {
    var mod, value;
    mod = new Attributes({
      "attr": 10
    }, {
      "attr2": 1
    });
    value = mod.get("attr");
  });

});

describe("Attributes module get", function () {

  it("undefined attribute should be zero", function () {
    var args, mod, value, i;
    args = [{}, {
      attr: undefined
    }, {
      attr: null
    }, {
      attr2: 11
    }];

    for (i in args) {
      mod = new Attributes(args[i]);
      value = mod.get("attr");

      expect(value).toEqual(jasmine.any(Number));
      expect(value).toEqual(0);
    }

    mod = new Attributes();
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it("simple attribute should be it\"s value", function () {
    var mod, value;
    mod = new Attributes({
      attr: 11
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it("string attribute should be the zero if referenced attribute\"s is undefined", function () {
    var mod, value;
    mod = new Attributes({
      attr: "referenced"
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it("string attribute should be the referenced attribute\"s value", function () {
    var mod, value;
    mod = new Attributes({
      referenced: 11,
      attr: "referenced"
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it("array of keys should be the sum of it\"s values", function () {
    var mod, value;
    mod = new Attributes({
      key1: 11,
      key2: 22,
      key3: 33,
      attr: ["key1", "key2", "key3"]
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  it("array of formulas should be the sum of it\"s values", function () {
    var mod, value;
    mod = new Attributes({
      key1: 1.6,
      key2: 2.7,
      key3: 3.8,
      attr: [{
        avg: ["key1", "key2", "key3"]
      }, {
        sum: ["key1", "key2", "key3"]
      }, {
        floor: "key1"
      }, {
        round: "key2"
      }, {}, "key3"]
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(2.7 + (1.6 + 2.7 + 3.8) + 1 + 3 + 0 + 3.8);
  });

  it("formula with multiple keys should throw error", function () {
    var mod, func;
    mod = new Attributes({
      attr: {
        avg: [6, 7, 8],
        sum: [1, 2]
      }
    });
    func = function () {
      mod.get("attr");
    };

    expect(func).toThrow();
  });

});

describe("Attributes module get object with single key as", function () {

  it("sum should be the total sum the given array of numbers", function () {
    var mod, value;
    mod = new Attributes({
      attr: {
        sum: [11, 22, 33]
      }
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  describe("avg should", function () {

    it("be the average of the given array of numbers", function () {
      var mod, value;
      mod = new Attributes({
        attr: {
          avg: [11, 22, 33]
        }
      });
      value = mod.get("attr");

      expect(value).toEqual(jasmine.any(Number));
      expect(value).toEqual((11 + 22 + 33) / 3);
    });

    it("be the average of the given array of attributes", function () {
      var mod, value;
      mod = new Attributes({
        attr: {
          avg: ["attr2", "attr3"]
        },
        attr2: 11,
        attr3: 22
      });
      value = mod.get("attr");

      expect(value).toEqual(jasmine.any(Number));
      expect(value).toEqual((11 + 22) / 2);
    });

    it("throw error when providing number, undefined, null, object, string or NaN", function () {
      var mod, func1, func2, func3, func4, func5;
      mod = new Attributes({
        attr1: {
          avg: 11
        },
        attr2: {
          avg: undefined
        },
        attr3: {
          avg: null
        },
        attr4: {
          avg: {}
        },
        attr5: {
          avg: NaN
        }
      });
      func1 = function () {
        mod.get("attr1");
      };
      func2 = function () {
        mod.get("attr2");
      };
      func3 = function () {
        mod.get("attr3");
      };
      func4 = function () {
        mod.get("attr4");
      };
      func5 = function () {
        mod.get("attr5");
      };

      expect(func1).toThrow();
      expect(func2).toThrow();
      expect(func3).toThrow();
      expect(func4).toThrow();
      expect(func5).toThrow();
    });

  });

  it("floor should be the floor of the given number", function () {
    var mod, value1, value2;
    mod = new Attributes({
      attr1: {
        floor: 11.2
      },
      attr2: {
        floor: 11.9
      }
    });
    value1 = mod.get("attr1");
    value2 = mod.get("attr2");

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(11);
  });

  it("round should be the round of the given number", function () {
    var mod, value1, value2, value3;
    mod = new Attributes({
      attr1: {
        round: 11.49
      },
      attr2: {
        round: 11.5
      },
      attr3: {
        round: 11.9
      }
    });
    value1 = mod.get("attr1");
    value2 = mod.get("attr2");
    value3 = mod.get("attr3");

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value3).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(12);
    expect(value3).toEqual(12);
  });

});

describe("Attributes module get with bonus", function () {

  it("should sum the provided bonus", function () {
    var mod, value;
    mod = new Attributes({
      "attr": 12
    }, {
      "attr": 2
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(14);
  });

  it("should sum bonus of dependency", function () {
    var mod, value;
    mod = new Attributes({
      "attr": "attr2",
      "attr2": 12
    }, {
      "attr2": 2
    });
    value = mod.get("attr");

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(14);
  });

  it("should sum bonus of other key dependency", function () {
    var mod, value1, value2;
    mod = new Attributes({
      "attr1": "attr2",
      "attr2": 12
    }, {
      "attr1": 1,
      "attr2": 2
    });
    value1 = mod.get("attr1");
    value2 = mod.get("attr2");

    expect(value1).toEqual(jasmine.any(Number));
    expect(value1).toEqual(15);
    expect(value2).toEqual(jasmine.any(Number));
    expect(value2).toEqual(14);
  });

  it("should sum bonus of elements of array", function () {
    var mod, value1, value2, value3;
    mod = new Attributes({
      "attr1": ["attr2", "attr3", 5],
      "attr2": 12,
      "attr3": 13
    }, {
      "attr1": 1,
      "attr2": 2,
      "attr3": 3,
    });
    value1 = mod.get("attr1");
    value2 = mod.get("attr2");
    value3 = mod.get("attr3");

    expect(value1).toEqual(jasmine.any(Number));
    expect(value1).toEqual(36);
    expect(value2).toEqual(jasmine.any(Number));
    expect(value2).toEqual(14);
    expect(value3).toEqual(jasmine.any(Number));
    expect(value3).toEqual(16);
  });

  it("should sum bonus of keys when using formulas", function () {
    var mod, value, avg, sum, round, floor;
    mod = new Attributes({
      "attr1": ["avg", "sum", "round", "floor"],
      "attr2": 12.6,
      "attr3": 15.3,
      "attr4": 11.1,
      "avg": {
        avg: ["attr2", "attr3", "attr4"]
      },
      "sum": {
        sum: ["attr2", "attr3", "attr4"]
      },
      "round": {
        round: "attr3"
      },
      "floor": {
        floor: "attr2"
      }
    }, {
      "attr1": 1,
      "attr2": 2,
      "attr3": 3,
      "attr4": 4
    });
    value = mod.get("attr1");
    avg = mod.get("avg");
    sum = mod.get("sum");
    round = mod.get("round");
    floor = mod.get("floor");

    expect(avg).toEqual(((12.6 + 2) + (15.3 + 3) + (11.1 + 4)) / 3);
    expect(sum).toEqual((12.6 + 2) + (15.3 + 3) + (11.1 + 4));
    expect(round).toEqual(15 + 3);
    expect(floor).toEqual(12 + 2);
    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(avg + sum + round + floor + 1);
  });

});

describe("Attributes module should throw error", function () {

  it("when the attribute is NaN", function () {
    var mod, value, f;
    mod = new Attributes({
      "attr": NaN
    });

    f = function () {
      value = mod.get("attr");
    };

    expect(f).toThrow();
  });

  it("when using an unknown formula", function () {
    var mod, value, func;
    mod = new Attributes({
      "attr": {
        unknownFormula: "attr2"
      },
      "attr2": 13
    });

    func = function () {
      value = mod.get("attr");
    };

    expect(func).toThrow();
  });

});
