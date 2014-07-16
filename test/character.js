"use strict";

var Character = GURPS.Character;

describe("GURPS object", function () {
  it("must have Character attribute", function () {
    expect(GURPS).toEqual(jasmine.any(Object));
  });
});

describe("Create character module successfully", function () {

  it("without arguments", function () {
    var mod = new Character();
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with empty object", function () {
    var mod = new Character({});
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with undefined as argument", function () {
    var mod = new Character(undefined);
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("with null as argument", function () {
    var mod = new Character(null);
    expect(mod).toEqual(jasmine.any(Object));
  });

  it("should have defaults", function () {
    var mod, defaults, attr;
    defaults = {
      "ST": 10,
      "DX": 10,
      "IQ": 10,
      "HT": 10,
      "hp": 10,
      "fp": 10,
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
      expect(mod.getAttribute(attr)).toEqual(defaults[attr]);
    }
  });

});

describe("Character module getAttribute", function () {

  it("when creating with attributes", function () {
    var mod, results, attr;
    debugger;
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
      "hp": 9,
      "fp": 15,
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
      expect(mod.getAttribute(attr)).toEqual(results[attr]);
    }
  });

});

/*



test("creating without attributes", function () {
    var c = new Character();

    equal(c.st, 10);
    equal(c.dx, 10);
    equal(c.iq, 10);
    equal(c.ht, 10);
});

test("creating with attributes null will not initialize", function () {
    var CharacterMock = function () {},
        spy = sinon.spy(),
        c;

    CharacterMock.prototype = Character;
    CharacterMock.reset = spy;
    c = new CharacterMock(null);

    ok(!spy.called);
});

test("creating with attributes empty object", function () {
    var c = new Character({});

    equal(c.st, 10);
    equal(c.dx, 10);
    equal(c.iq, 10);
    equal(c.ht, 10);
});

test("creating with attributes", function () {
    var c = new Character({
        st: 11,
        dx: 12
    });

    equal(c.getAttribute('st'), 11, 'get st');
    equal(c.getAttribute('dx'), 12, 'get dx');
    equal(c.st, 11, 'st');
    equal(c.dx, 12, 'dx');
});

test("reseting character", function () {
    var c = new Character(null);

    c.st = 11;
    c.dx = 12;
    c.iq = 13;
    c.ht = 14;

    c.reset();

    equal(c.st, 10);
    equal(c.dx, 10);
    equal(c.iq, 10);
    equal(c.ht, 10);
});

test("_resolveFormula", function () {
    var c = new Character(null);
    c.at1 = 3;

    equal(c._resolveFormula(0), 0, '0');
    equal(c._resolveFormula(null), 0, 'null');
    equal(c._resolveFormula(), 0, 'undefined');
    equal(c._resolveFormula(1), 1, 'number');
    equal(c._resolveFormula('at1'), 3, 'attribute');
    equal(c._resolveFormula({
        avg: 3
    }), 3, 'avg of one number');
    equal(c._resolveFormula({
        avg: [1, 2]
    }), 1.5, 'avg of numbers');
    equal(c._resolveFormula({
        avg: [-1, 1, 2, 3]
    }), 1.25, 'avg of many numbers');
    equal(c._resolveFormula({
        sum: 3
    }), 3, 'sum of one number');
    equal(c._resolveFormula({
        sum: [3, 5]
    }), 8, 'sum of numbers');
    equal(c._resolveFormula({
        round: 3.2
    }), 3, 'round of a number');
    equal(c._resolveFormula({
        round: [1.1, 2.4]
    }), 4, 'round of numbers');
    equal(c._resolveFormula([1, 2, 3]), 6, 'array of numbers must sum');
    equal(c._resolveFormula({
        round: {
            avg: [-4, -2, -1]
        }
    }), -2, 'round of avg of negative numbers');
});

test("_resolveDependency", function () {
    var c = new Character(null);

    c.dependencies = {
        at2: 'at1'
    };
    c.at1 = 3;

    equal(c._resolveDependency('at1'), 0, 'without dependency');
    equal(c._resolveDependency('at2'), 3, 'depends on other');
});

test("getAttribute on primary attribute", function () {
    var c = new Character(null);

    c.st = 12;
    equal(c.getAttribute('st'), 12, 'get st');
});

test("getAttribute on secondary higher than primary", function () {
    var c = new Character(null);

    c.st = 11;
    c.hp = 2;

    equal(c.getAttribute('hp'), 13, 'get hp');
});

test("getAttribute on secondary lower than base", function () {
    var c = new Character(null);

    c.st = 11;
    c.hp = -2;

    equal(c.getAttribute('hp'), 9, 'get hp');
});

test("getAttribute on secondary depending on other secondary", function () {
    var c = new Character(null);

    c.iq = 12;
    c.perception = 3;
    c.vision = -4;

    equal(c.getAttribute('vision'), 11, 'get vision');
});

test("getAttribute on secondary changes when primary change", function () {
    var c = new Character(null),
        iqBase = 10,
        change = 3;

    c.iq = iqBase;
    c.perception = 2;
    equal(c.getAttribute('perception'), 12, 'get perception');

    c.iq = iqBase + change;
    equal(c.getAttribute('perception'), 12 + change, 'get raised perception');

    c.iq = iqBase - change;
    equal(c.getAttribute('perception'), 12 - change, 'get lowered perception');
});

test("setAttribute on primary of empty character", function () {
    var c = new Character(null);

    c.setAttribute({
        iq: 13
    });

    equal(c.iq, 13, 'iq');
});

test("setAttribute on secondary of empty character", function () {
    var c = new Character(null);

    c.setAttribute({
        perception: 13
    });

    equal(c.perception, 13, 'bonus perception');
});

test("setAttribute on primary atribute", function () {
    var c = new Character(null);

    c.iq = 10;
    c.setAttribute({
        iq: 13
    });

    equal(c.iq, 13, 'iq');
});

test("setAttribute on secondary atribute", function () {
    var c = new Character(null);

    c.iq = 10;
    c.perception = 2;
    c.setAttribute({
        perception: 13
    });

    equal(c.perception, 3, 'bonus perception');
});

test("get basic speed, basic move and dodge", function () {
    var c = new Character(null);

    c.dx = 12;
    c.ht = 15;
    c.basicSpeed = 5;
    c.basicMove = -15;
    c.dodge = 5;

    equal(c.getAttribute('basicSpeed'), 11.75, 'get basicSpeed');
    equal(c.getAttribute('basicMove'), -4, 'get basicMove');
    equal(c.getAttribute('dodge'), 4, 'get dodge');
});
*/
