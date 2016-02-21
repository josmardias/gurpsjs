'use strict';

const Attributes = require('./attributes');

const _dependencies = {
  ST: 10,
  DX: 10,
  IQ: 10,
  HT: 10,
  HP: 'ST',
  FP: 'HT',
  will: 'IQ',
  basicSpeed: {
    avg: ['DX', 'HT', 0, 0],
  },
  basicMove: {
    floor: 'basicSpeed',
  },
  dodge: {
    sum: ['basicMove', 3],
  },
  perception: 'IQ',
  vision: 'perception',
  hearing: 'perception',
  tasteSmell: 'perception',
  touch: 'perception',
};

class Character {
  constructor(attributes) {
    this.attributes = new Attributes(_dependencies);
    this.setAttribute(attributes);
  }

  getAttribute(attrName) {
    return this.attributes.get(attrName);
  }

  setAttribute(attributes) {
    for (const attrName in attributes) {
      if (!attributes.hasOwnProperty(attrName)) {
        continue;
      }

      this.attributes.set(attrName, attributes[attrName]);
    }

    return this;
  }

}

module.exports = Character;
