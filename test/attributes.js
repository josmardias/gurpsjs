'use strict';

var Attributes = GURPS.Attributes;

describe('Attributes module creation', function () {

  it('without arguments', function () {
    var module = new Attributes();
    expect(module).toEqual(jasmine.any(Object));
  });

  it('with empty object', function () {
    var module = new Attributes({});
    expect(module).toEqual(jasmine.any(Object));
  });

});

describe('Attributes module get', function () {

  it('undefined attribute should be zero', function () {
    var module, value;
    module = new Attributes({});
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it('simple attribute should be it\'s value', function () {
    var module, value;
    module = new Attributes({
      attr: 11
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it('string attribute should be the zero if referenced attribute\'s is undefined', function () {
    var module, value;
    module = new Attributes({
      attr: 'referenced'
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it('string attribute should be the referenced attribute\'s value', function () {
    var module, value;
    module = new Attributes({
      referenced: 11,
      attr: 'referenced'
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it('array of keys should be the sum of it\'s values', function () {
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
  /*it('array of formulas should be the sum of it\'s values', function () {
    var mod, value;
    mod = new Attributes({
        key1: 11,
        key2: 22,
        key3: 33,
        attr: [{floor: 11,2}, {}, 'key3']
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });
    */

});

describe('Attributes module get object with single key as', function () {

  it('sum should be the total sum the given array of numbers', function () {
    var module, value;
    module = new Attributes({
      attr: {
        sum: [11, 22, 33]
      }
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  it('avg should be the avg of the given array of numbers', function () {
    var module, value;
    module = new Attributes({
      attr: {
        avg: [11, 22, 33]
      }
    });
    value = module.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual((11 + 22 + 33) / 3);
  });

  it('floor should be the floor of the given number', function () {
    var module, value1, value2;
    module = new Attributes({
      attr1: {
        floor: 11.2
      },
      attr2: {
        floor: 11.9
      }
    });
    value1 = module.get('attr1');
    value2 = module.get('attr2');

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(11);
  });

  it('round should be the round of the given number', function () {
    var module, value1, value2, value3;
    module = new Attributes({
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
    value1 = module.get('attr1');
    value2 = module.get('attr2');
    value3 = module.get('attr3');

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value3).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(12);
    expect(value3).toEqual(12);
  });

});
