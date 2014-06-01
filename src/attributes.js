/* global GURPS */
GURPS.Attributes = (function () {
  'use strict';

  var Attributes; // returned object
  var _map = null; // private map

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

  _map = null;

  Attributes = function (hashMap) {
    _map = hashMap;
  };

  Attributes.prototype.get = function (key) {
    var val = _map[key];

    if (val === undefined) {
      return 0;
    }

    if (typeof val === 'number') {
      return val;
    }

    if (typeof val === 'string') {
      return this.get(val);
    }

    if (val.constructor === Array) {
      return this.sum(val);
    }

    if (val.constructor === Object) {
      return this.resolve(val);
    }

    throw 'unexpected value: ' + JSON.stringify(val);
  };

  Attributes.prototype.resolve = function (obj) {
    var keys = Object.keys(obj);
    var length = keys.length;

    if (length > 1) {
      return this.sum(keys);
    }

    if (length === 0) {
      return 0;
    }

    //length === 1
    var key = keys[0];
    var val = obj[key];
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

    throw 'unexpected key: ' + key;
  };

  Attributes.prototype.avg = function (arr) {
    var length = arr.length;
    return this.sum(arr) / (length || 1);
  };

  Attributes.prototype.sum = function (arr) {
    var self = this;

    return arr.reduce(function (total, value) {
      return total + self.get(value);
    }, 0);
  };

  Attributes.prototype.floor = function (value) {
    return Math.floor(this.get(value));
  };

  Attributes.prototype.round = function (value) {
    return Math.round(this.get(value));
  };

  return Attributes;
}());
