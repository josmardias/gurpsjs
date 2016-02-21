"use strict";

var Character = require("../src/character");

describe("Create character module successfully", function () {

  it("without arguments", function () {
    var mod = new Character();
    expect(mod).to.be.an("object");
  });

  it("with empty object", function () {
    var mod = new Character({});
    expect(mod).to.be.an("object");
  });

  it("with undefined as argument", function () {
    var mod = new Character(undefined);
    expect(mod).to.be.an("object");
  });

  it("with null as argument", function () {
    var mod = new Character(null);
    expect(mod).to.be.an("object");
  });

  it("should have defaults", function () {
    var mod, defaults, attr;
    defaults = {
      "ST": 10,
      "DX": 10,
      "IQ": 10,
      "HT": 10,
      "HP": 10,
      "FP": 10,
      "will": 10,
      "basicSpeed": 5,
      "basicMove": 5,
      "dodge": 8,
      "perception": 10,
      "vision": 10,
      "hearing": 10,
      "tasteSmell": 10,
      "touch": 10
    };
    mod = new Character();

    for (attr in defaults) {
      if (!defaults.hasOwnProperty(attr)) {
        continue;
      }
      expect(mod.getAttribute(attr)).to.equal(defaults[attr]);
    }
  });

});

describe("Character module getAttribute", function () {

  it("when passing attributes must match expected values", function () {
    var mod, results, attr;

    mod = new Character({
      ST: 9,
      DX: 11,
      IQ: 13,
      HT: 15,
      perception: 20
    });
    results = {
      "ST": 9,
      "DX": 11,
      "IQ": 13,
      "HT": 15,
      "HP": 9,
      "FP": 15,
      "will": 13,
      "basicSpeed": 6.5,
      "basicMove": 6,
      "dodge": 9,
      "perception": 20,
      "vision": 20,
      "hearing": 20,
      "tasteSmell": 20,
      "touch": 20
    };

    for (attr in results) {
      if (!results.hasOwnProperty(attr)) {
        continue;
      }
      expect(mod.getAttribute(attr)).to.equal(results[attr]);
    }
  });

});

describe("Character module setAttribute", function () {

  it("should ignore prototype properties", function () {
    var mod, value, CustomObject;

    CustomObject = function () {};
    CustomObject.prototype.ST = 12;

    mod = new Character(new CustomObject());
    value = mod.getAttribute("ST");

    expect(value).to.equal(10);
  });

  it("should change attribute value for primary attribute", function () {
    var mod, value1, value2;

    mod = new Character({
      "ST": 13
    });
    value1 = mod.getAttribute("ST");
    mod.setAttribute({
      ST: 17
    });
    value2 = mod.getAttribute("ST");

    expect(value1).to.be.a("number");
    expect(value1).to.equal(13);
    expect(value2).to.be.a("number");
    expect(value2).to.equal(17);
  });

  it("should change attribute value for secondary attribute", function () {
    var mod, value1, value2;

    mod = new Character({
      "HP": 17
    });
    value1 = mod.getAttribute("HP");
    mod.setAttribute({
      HP: 23
    });
    value2 = mod.getAttribute("HP");

    expect(value1).to.be.a("number");
    expect(value1).to.equal(17);
    expect(value2).to.be.a("number");
    expect(value2).to.equal(23);
  });

});
