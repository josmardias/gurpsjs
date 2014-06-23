'use strict';

var Attributes = GURPS.Attributes;

describe('This test', function () {
  it('will always fail', function () {
    throw Error('forced failure');
  });
});

describe('Attributes module creation', function () {

  it('without arguments', function () {
    var mod = new Attributes();
    expect(mod).toEqual(jasmine.any(Object));
  });

  it('with empty object', function () {
    var mod = new Attributes({});
    expect(mod).toEqual(jasmine.any(Object));
  });

  it('with undefined as argument', function () {
    var mod = new Attributes(undefined);
    expect(mod).toEqual(jasmine.any(Object));
  });

  it('with null as argument', function () {
    var mod = new Attributes(null);
    expect(mod).toEqual(jasmine.any(Object));
  });

});

describe('Get attribute without errors', function () {

  it('when there is no attribute', function () {
    var mod, value;
    mod = new Attributes();
    value = mod.get('attr');
  });

  it('when requested attribute is not present', function () {
    var mod, value;
    mod = new Attributes({
      'attr2': 11
    });
    value = mod.get('attr');
  });

  it('when attribute is undefined', function () {
    var mod, value;
    mod = new Attributes({
      'attr': undefined
    });
    value = mod.get('attr');
  });

  it('when attribute is null', function () {
    var mod, value;
    mod = new Attributes({
      'attr': null
    });
    value = mod.get('attr');
  });

  it('when attribute is a number', function () {
    var mod, value;
    mod = new Attributes({
      'attr': 11
    });
    value = mod.get('attr');
  });

  it('when attribute is a string', function () {
    var mod, value;
    mod = new Attributes({
      'attr': 'test'
    });
    value = mod.get('attr');
  });

  it('when attribute is an object', function () {
    var mod, value;
    mod = new Attributes({
      'attr': {}
    });
    value = mod.get('attr');
  });

  it('when attribute is an array', function () {
    var mod, value;
    mod = new Attributes({
      'attr': []
    });
    value = mod.get('attr');
  });
});

describe('Attributes module get', function () {

  it('undefined attribute should be zero', function () {
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
      value = mod.get('attr');

      expect(value).toEqual(jasmine.any(Number));
      expect(value).toEqual(0);
    }

    mod = new Attributes();
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it('simple attribute should be it\'s value', function () {
    var mod, value;
    mod = new Attributes({
      attr: 11
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it('string attribute should be the zero if referenced attribute\'s is undefined', function () {
    var mod, value;
    mod = new Attributes({
      attr: 'referenced'
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(0);
  });

  it('string attribute should be the referenced attribute\'s value', function () {
    var mod, value;
    mod = new Attributes({
      referenced: 11,
      attr: 'referenced'
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11);
  });

  it('array of keys should be the sum of it\'s values', function () {
    var mod, value;
    mod = new Attributes({
      key1: 11,
      key2: 22,
      key3: 33,
      attr: ['key1', 'key2', 'key3']
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  it('array of formulas should be the sum of it\'s values', function () {
    var mod, value;
    mod = new Attributes({
      key1: 1.6,
      key2: 2.7,
      key3: 3.8,
      attr: [{
        avg: ['key1', 'key2', 'key3']
      }, {
        sum: ['key1', 'key2', 'key3']
      }, {
        floor: 'key1'
      }, {
        round: 'key2'
      }, {}, 'key3']
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(2.7 + (1.6 + 2.7 + 3.8) + 1 + 3 + 0 + 3.8);
  });

});

describe('Attributes module get object with single key as', function () {

  it('sum should be the total sum the given array of numbers', function () {
    var mod, value;
    mod = new Attributes({
      attr: {
        sum: [11, 22, 33]
      }
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual(11 + 22 + 33);
  });

  it('avg should be the avg of the given array of numbers', function () {
    var mod, value;
    mod = new Attributes({
      attr: {
        avg: [11, 22, 33]
      }
    });
    value = mod.get('attr');

    expect(value).toEqual(jasmine.any(Number));
    expect(value).toEqual((11 + 22 + 33) / 3);
  });

  it('floor should be the floor of the given number', function () {
    var mod, value1, value2;
    mod = new Attributes({
      attr1: {
        floor: 11.2
      },
      attr2: {
        floor: 11.9
      }
    });
    value1 = mod.get('attr1');
    value2 = mod.get('attr2');

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(11);
  });

  it('round should be the round of the given number', function () {
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
    value1 = mod.get('attr1');
    value2 = mod.get('attr2');
    value3 = mod.get('attr3');

    expect(value1).toEqual(jasmine.any(Number));
    expect(value2).toEqual(jasmine.any(Number));
    expect(value3).toEqual(jasmine.any(Number));
    expect(value1).toEqual(11);
    expect(value2).toEqual(12);
    expect(value3).toEqual(12);
  });

});
