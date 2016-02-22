'use strict';

/* key => value
 * value can be:
 *  - string (another key)
 *  - number
 *  - array of keys (they will be summed, same as {sum: [array]})
 *  - object: {operator: argument}
 *      - operator:
 *          - avg(array)
 *          - sum(array)
 *          - floor(value)
 *          - round(value)
 *      - argument: value or array of value
 */

/**
 * dependencyTree: an object describing the dependency tree and default values
 * bonuses: a hash map of integers describing attributes bonuses
 */

class Attributes {
  constructor(dependencyTree, bonuses) {
    this.tree = dependencyTree || {}; // attributes tree hash map
    this.bonuses = bonuses || {}; // attributes bonuses hash map
  }

  set(key, value) {
    const actual = this.get(key);
    const bonus = this.getBonus(key);
    const actualWithoutBonus = actual - bonus;
    this.bonuses[key] = value - actualWithoutBonus;
    return this;
  }

  get(key) {
    const value = this.tree[key];
    return this.resolve(value) + this.getBonus(key);
  }

  getBonus(key) {
    return this.bonuses[key] || 0;
  }

  resolve(value) {
    if (Number.isNaN(value)) {
      throw new Error('attribute does not support NaN');
    }

    if (!value) {
      return 0;
    }

    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      return this.get(value);
    }

    if (value.constructor === Array) {
      return this.sum(value);
    }

    if (value.constructor === Object) {
      return this.resolveObj(value);
    }

    const rawValue = JSON.stringify(value);
    throw new Error(`unexpected value: ${rawValue} with constructor: ${value.constructor}`);
  }

  resolveObj(obj) {
    const keys = Object.keys(obj);
    const length = keys.length;

    if (length > 1) {
      throw new Error('Formulas must be single key');
    }

    if (length === 0) {
      return 0;
    }

    // length === 1
    const key = keys[0];
    const val = obj[key];
    switch (key) {
    case 'avg':
      return this.avg(val);
    case 'sum':
      return this.sum(val);
    case 'floor':
      return this.floor(val);
    case 'round':
      return this.round(val);
    default:
    }

    throw new Error(`unexpected key: ${key}`);
  }

  avg(arr) {
    const length = arr.length;

    if (!arr || arr.constructor !== Array) {
      throw new Error('Formula avg only supports array');
    }

    if (length === 0) {
      return 0;
    }

    return this.sum(arr) / length;
  }

  sum(arr) {
    const self = this;

    if (!arr || arr.constructor !== Array) {
      throw new Error('Formula sum only supports array');
    }

    return arr.reduce((total, value) => total + self.resolve(value), 0);
  }

  floor(value) {
    return Math.floor(this.resolve(value));
  }

  round(value) {
    return Math.round(this.resolve(value));
  }

}

module.exports = Attributes;
