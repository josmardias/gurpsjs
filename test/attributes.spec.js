'use strict';

const Attributes = require('../src/attributes');

describe('Attributes module creation', () => {
  it('without arguments', () => {
    const mod = new Attributes();
    expect(mod).to.be.an('object');
  });

  it('with empty objects as arguments', () => {
    const mod = new Attributes({}, {});
    expect(mod).to.be.an('object');
  });

  it('with undefined as arguments', () => {
    const mod = new Attributes(undefined, undefined);
    expect(mod).to.be.an('object');
  });

  it('with null as arguments', () => {
    const mod = new Attributes(null, null);
    expect(mod).to.be.an('object');
  });
});

describe('Get attribute without errors', () => {
  it('when there is no attribute', () => {
    const mod = new Attributes();
    mod.get('attr');
  });

  it('when requested attribute is not present', () => {
    const mod = new Attributes({
      attr2: 11,
    });
    mod.get('attr');
  });

  it('when attribute is undefined', () => {
    const mod = new Attributes({
      attr: undefined,
    });
    mod.get('attr');
  });

  it('when attribute is null', () => {
    const mod = new Attributes({
      attr: null,
    });
    mod.get('attr');
  });

  it('when attribute is a number', () => {
    const mod = new Attributes({
      attr: 11,
    });
    mod.get('attr');
  });

  it('when attribute is a string', () => {
    const mod = new Attributes({
      attr: 'test',
    });
    mod.get('attr');
  });

  it('when attribute is an object', () => {
    const mod = new Attributes({
      attr: {},
    });
    mod.get('attr');
  });

  it('when attribute is an array', () => {
    const mod = new Attributes({
      attr: [],
    });
    mod.get('attr');
  });

  it('when bonus is null', () => {
    const mod = new Attributes({
      attr: 10,
    }, {
      attr: null,
    });
    mod.get('attr');
  });

  it('when there is no bonus for the requested attribute', () => {
    const mod = new Attributes({
      attr: 10,
    }, {
      attr2: 1,
    });
    mod.get('attr');
  });
});

describe('Attributes module get', () => {
  it('undefined attribute should be zero', () => {
    const args = [{}, {
      attr: undefined,
    }, {
      attr: null,
    }, {
      attr2: 11,
    }];

    for (const i in args) {
      if (!args.hasOwnProperty(i)) {
        continue;
      }
      const mod = new Attributes(args[i]);
      const value = mod.get('attr');

      expect(value).to.be.a('number');
      expect(value).to.equal(0);
    }

    const mod = new Attributes();
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(0);
  });

  it('simple attribute should be it"s value', () => {
    const mod = new Attributes({
      attr: 11,
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(11);
  });

  it('string attribute should be the zero if referenced attribute"s is undefined', () => {
    const mod = new Attributes({
      attr: 'referenced',
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(0);
  });

  it('string attribute should be the referenced attribute"s value', () => {
    const mod = new Attributes({
      referenced: 11,
      attr: 'referenced',
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(11);
  });

  it('array of keys should be the sum of it"s values', () => {
    const mod = new Attributes({
      key1: 11,
      key2: 22,
      key3: 33,
      attr: ['key1', 'key2', 'key3'],
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(11 + 22 + 33);
  });

  it('array of formulas should be the sum of it"s values', () => {
    const mod = new Attributes({
      key1: 1.6,
      key2: 2.7,
      key3: 3.8,
      attr: [{
        avg: ['key1', 'key2', 'key3'],
      }, {
        sum: ['key1', 'key2', 'key3'],
      }, {
        floor: 'key1',
      }, {
        round: 'key2',
      }, {
      },
      'key3'],
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(2.7 + (1.6 + 2.7 + 3.8) + 1 + 3 + 0 + 3.8);
  });

  it('formula with multiple keys should throw error', () => {
    const mod = new Attributes({
      attr: {
        avg: [6, 7, 8],
        sum: [1, 2],
      },
    });
    const func = () => {
      mod.get('attr');
    };

    expect(func).to.throw();
  });
});

describe('Attributes module get object with single key as', () => {
  it('sum should be the total sum the given array of numbers', () => {
    const mod = new Attributes({
      attr: {
        sum: [11, 22, 33],
      },
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(11 + 22 + 33);
  });

  describe('avg should', () => {
    it('be the average of the given array of numbers', () => {
      const mod = new Attributes({
        attr: {
          avg: [11, 22, 33],
        },
      });
      const value = mod.get('attr');

      expect(value).to.be.a('number');
      expect(value).to.equal((11 + 22 + 33) / 3);
    });

    it('be the average of the given array of attributes', () => {
      const mod = new Attributes({
        attr: {
          avg: ['attr2', 'attr3'],
        },
        attr2: 11,
        attr3: 22,
      });
      const value = mod.get('attr');

      expect(value).to.be.a('number');
      expect(value).to.equal((11 + 22) / 2);
    });

    it('throw error when providing number, undefined, null, object, string or NaN', () => {
      const mod = new Attributes({
        attr1: {
          avg: 11,
        },
        attr2: {
          avg: undefined,
        },
        attr3: {
          avg: null,
        },
        attr4: {
          avg: {},
        },
        attr5: {
          avg: NaN,
        },
      });

      const func1 = () => {
        mod.get('attr1');
      };
      const func2 = () => {
        mod.get('attr2');
      };
      const func3 = () => {
        mod.get('attr3');
      };
      const func4 = () => {
        mod.get('attr4');
      };
      const func5 = () => {
        mod.get('attr5');
      };

      expect(func1).to.throw();
      expect(func2).to.throw();
      expect(func3).to.throw();
      expect(func4).to.throw();
      expect(func5).to.throw();
    });

    it('be zero for empty arrays', () => {
      const mod = new Attributes({
        attr: {
          avg: [],
        },
      });
      const value = mod.get('attr');

      expect(value).to.be.a('number');
      expect(value).to.equal(0);
    });
  });

  it('floor should be the floor of the given number', () => {
    const mod = new Attributes({
      attr1: {
        floor: 11.2,
      },
      attr2: {
        floor: 11.9,
      },
    });
    const value1 = mod.get('attr1');
    const value2 = mod.get('attr2');

    expect(value1).to.be.a('number');
    expect(value2).to.be.a('number');
    expect(value1).to.equal(11);
    expect(value2).to.equal(11);
  });

  it('round should be the round of the given number', () => {
    const mod = new Attributes({
      attr1: {
        round: 11.49,
      },
      attr2: {
        round: 11.5,
      },
      attr3: {
        round: 11.9,
      },
    });
    const value1 = mod.get('attr1');
    const value2 = mod.get('attr2');
    const value3 = mod.get('attr3');

    expect(value1).to.be.a('number');
    expect(value2).to.be.a('number');
    expect(value3).to.be.a('number');
    expect(value1).to.equal(11);
    expect(value2).to.equal(12);
    expect(value3).to.equal(12);
  });
});

describe('Attributes module get with bonus', () => {
  it('should sum the provided bonus', () => {
    const mod = new Attributes({
      attr: 12,
    }, {
      attr: 2,
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(14);
  });

  it('should sum bonus of dependency', () => {
    const mod = new Attributes({
      attr: 'attr2',
      attr2: 12,
    }, {
      attr2: 2,
    });
    const value = mod.get('attr');

    expect(value).to.be.a('number');
    expect(value).to.equal(14);
  });

  it('should sum bonus of other key dependency', () => {
    const mod = new Attributes({
      attr1: 'attr2',
      attr2: 12,
    }, {
      attr1: 1,
      attr2: 2,
    });
    const value1 = mod.get('attr1');
    const value2 = mod.get('attr2');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(15);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(14);
  });

  it('should sum bonus of elements of array', () => {
    const mod = new Attributes({
      attr1: ['attr2', 'attr3', 5],
      attr2: 12,
      attr3: 13,
    }, {
      attr1: 1,
      attr2: 2,
      attr3: 3,
    });
    const value1 = mod.get('attr1');
    const value2 = mod.get('attr2');
    const value3 = mod.get('attr3');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(36);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(14);
    expect(value3).to.be.a('number');
    expect(value3).to.equal(16);
  });

  it('should sum bonus of keys when using formulas', () => {
    const mod = new Attributes({
      attr1: ['avg', 'sum', 'round', 'floor'],
      attr2: 12.6,
      attr3: 15.3,
      attr4: 11.1,
      avg: {
        avg: ['attr2', 'attr3', 'attr4'],
      },
      sum: {
        sum: ['attr2', 'attr3', 'attr4'],
      },
      round: {
        round: 'attr3',
      },
      floor: {
        floor: 'attr2',
      },
    }, {
      attr1: 1,
      attr2: 2,
      attr3: 3,
      attr4: 4,
    });
    const value = mod.get('attr1');
    const avg = mod.get('avg');
    const sum = mod.get('sum');
    const round = mod.get('round');
    const floor = mod.get('floor');

    const attrValue2 = 12.6 + 2;
    const attrValue3 = 15.3 + 3;
    const attrValue4 = 11.1 + 4;

    expect(avg).to.equal((attrValue2 + attrValue3 + attrValue4) / 3);
    expect(sum).to.equal(attrValue2 + attrValue3 + attrValue4);
    expect(round).to.equal(15 + 3);
    expect(floor).to.equal(12 + 2);
    expect(value).to.be.a('number');
    expect(value).to.equal(avg + sum + round + floor + 1);
  });
});

describe('Attributes module should throw error', () => {
  it('when the attribute is NaN', () => {
    const mod = new Attributes({
      attr: NaN,
    });

    const f = () => {
      mod.get('attr');
    };

    expect(f).to.throw();
  });

  it('when using an unknown formula', () => {
    const mod = new Attributes({
      attr: {
        unknownFormula: 'attr2',
      },
      attr2: 13,
    });

    const func = () => {
      mod.get('attr');
    };

    expect(func).to.throw();
  });

  it('when using custom Object formula', () => {
    function CustomObject() {
      this.sum = [1, 2];
    }

    const mod = new Attributes({
      attr: new CustomObject(),
    });

    const func = () => {
      mod.get('attr');
    };

    expect(func).to.throw();
  });

  it('when passing a non array to sum formula', () => {
    const mod = new Attributes({
      attr: 13,
      attr1: {
        sum: 'attr', // string
      },
      attr2: {
        sum: { // object
          sum: [1, 2],
        },
      },
    });

    const func1 = () => {
      mod.get('attr1');
    };
    const func2 = () => {
      mod.get('attr2');
    };

    expect(func1).to.throw();
    expect(func2).to.throw();
  });
});

describe('Instances of Attributes module should be isolated', () => {
  it('by dependency tree', () => {
    const mod1 = new Attributes({
      attr: 2,
    });
    const mod2 = new Attributes({
      attr: 1,
    });

    const value = mod1.get('attr');
    const value2 = mod2.get('attr');

    expect(value).to.equal(2);
    expect(value2).to.equal(1);
  });

  it('by bonuses', () => {
    const mod1 = new Attributes({
      attr: 2,
    }, {
      attr: 2,
    });
    const mod2 = new Attributes({
      attr: 2,
    }, {
      attr: 1,
    });

    const value = mod1.get('attr');
    const value2 = mod2.get('attr');

    expect(value).to.equal(4);
    expect(value2).to.equal(3);
  });
});

describe('Attributes module set', () => {
  it('should change the attribute value to the given value', () => {
    const mod = new Attributes({
      attr: 13,
    });
    const value1 = mod.get('attr');
    mod.set('attr', 17);
    const value2 = mod.get('attr');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(13);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(17);
  });

  it('should work when there is a previous bonus', () => {
    const mod = new Attributes({
      attr: 13,
    }, {
      attr: 2,
    });
    const value1 = mod.get('attr');
    mod.set('attr', 17);
    const value2 = mod.get('attr');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(15);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(17);
  });

  it('should change a secondary attribute value to the given value', () => {
    const mod = new Attributes({
      attr: 13,
      attr1: 'attr',
    });
    const value1 = mod.get('attr1');
    mod.set('attr', 17);
    const value2 = mod.get('attr1');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(13);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(17);
  });

  it('should work on secondary attributes when there is a previous bonus', () => {
    const mod = new Attributes({
      attr: 13,
      attr1: 'attr',
    }, {
      attr: 2,
      attr1: 1,
    });
    const value1 = mod.get('attr1');
    mod.set('attr1', 17);
    const value2 = mod.get('attr1');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(16);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(17);
  });
});
