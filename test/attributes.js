'use strict';

var Attributes = GURPS.Attributes;

describe('Attributes module creation', function () {
  it('without arguments', function () {
    var module = new Attributes();
    expect(module).toEqual(jasmine.any(Object));
  });

  it("with empty object", function () {
    var module = new Attributes({});
    expect(module).toEqual(jasmine.any(Object));
  });
});

describe('Attributes module get', function () {
  it("undefined attribute should be zero", function () {
    var module, value;
    module = new Attributes({});
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it("simple attribute should be it's value", function () {
    var module, value;
    module = new Attributes({
      attr: 11
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it("string attribute should be the zero if referenced attribute's is undefined", function () {
    var module, value;
    module = new Attributes({
      attr: 'referenced'
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it("string attribute should be the referenced attribute's value", function () {
    var module, value;
    module = new Attributes({
      referenced: 11,
      attr: 'referenced'
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it("array of keys should be the sum of it's values", function () {
    var module, value;
    module = new Attributes({
      key1: 11,
      key2: 22,
      key3: 33,
      attr: ['key1', 'key2', 'key3']
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  //TODO
  /*it("array of formulas should be the sum of it's values", function () {
    var module, value;
    module = new Attributes({
        key1: 11,
        key2: 22,
        key3: 33,
        attr: [{floor: 11,2}, {}, 'key3']
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });
    */

});
