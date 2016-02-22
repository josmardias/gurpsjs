'use strict';

const Character = require('../src/character');

describe('Create character module successfully', () => {
  it('without arguments', () => {
    const mod = new Character();
    expect(mod).to.be.an('object');
  });

  it('with empty object', () => {
    const mod = new Character({});
    expect(mod).to.be.an('object');
  });

  it('with undefined as argument', () => {
    const mod = new Character(undefined);
    expect(mod).to.be.an('object');
  });

  it('with null as argument', () => {
    const mod = new Character(null);
    expect(mod).to.be.an('object');
  });

  it('should have defaults', () => {
    const defaults = {
      ST: 10,
      DX: 10,
      IQ: 10,
      HT: 10,
      HP: 10,
      FP: 10,
      will: 10,
      basicSpeed: 5,
      basicMove: 5,
      dodge: 8,
      perception: 10,
      vision: 10,
      hearing: 10,
      tasteSmell: 10,
      touch: 10,
    };
    const mod = new Character();

    for (const attr in defaults) {
      if (!defaults.hasOwnProperty(attr)) {
        continue;
      }
      expect(mod.getAttribute(attr)).to.equal(defaults[attr]);
    }
  });
});

describe('Character module getAttribute', () => {
  it('when passing attributes must match expected values', () => {
    const mod = new Character({
      ST: 9,
      DX: 11,
      IQ: 13,
      HT: 15,
      perception: 20,
    });
    const results = {
      ST: 9,
      DX: 11,
      IQ: 13,
      HT: 15,
      HP: 9,
      FP: 15,
      will: 13,
      basicSpeed: 6.5,
      basicMove: 6,
      dodge: 9,
      perception: 20,
      vision: 20,
      hearing: 20,
      tasteSmell: 20,
      touch: 20,
    };

    for (const attr in results) {
      if (!results.hasOwnProperty(attr)) {
        continue;
      }
      expect(mod.getAttribute(attr)).to.equal(results[attr]);
    }
  });
});

describe('Character module setAttribute', () => {
  it('should ignore prototype properties', () => {
    function CustomObject() {}
    CustomObject.prototype.ST = 12;

    const mod = new Character(new CustomObject());
    const value = mod.getAttribute('ST');

    expect(value).to.equal(10);
  });

  it('should change attribute value for primary attribute', () => {
    const mod = new Character({
      ST: 13,
    });
    const value1 = mod.getAttribute('ST');
    mod.setAttribute({
      ST: 17,
    });
    const value2 = mod.getAttribute('ST');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(13);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(17);
  });

  it('should change attribute value for secondary attribute', () => {
    const mod = new Character({
      HP: 17,
    });
    const value1 = mod.getAttribute('HP');
    mod.setAttribute({
      HP: 23,
    });
    const value2 = mod.getAttribute('HP');

    expect(value1).to.be.a('number');
    expect(value1).to.equal(17);
    expect(value2).to.be.a('number');
    expect(value2).to.equal(23);
  });
});
