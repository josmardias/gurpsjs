/* global GURPS */
GURPS.Character = (function () {
  "use strict";

  var Character = function (attributes) {
    if (attributes === null) {
      return;
    }

    this.reset();
    this.setAttribute(attributes);
    //this.calculatePoints();
  };

  /*
   * formula can be:
   *  - attribute name
   *  - number
   *  - array of formula (they will be summed, same as {sum: [array]})
   *  - object: {operator: formula}
   *      - operator: avg, sum, round, floor
   */
  Character.prototype.dependencies = {
    will: 'iq',
    frightCheck: {
      avg: ['st', 'iq']
    },
    basicSpeed: {
      avg: ['dx', 'ht', 0, 0]
    },
    basicMove: {
      floor: 'basicSpeed'
    },
    dodge: {
      sum: ['basicMove', 3]
    },
    perception: 'iq',
    vision: 'perception',
    hearing: 'perception',
    tasteSmell: 'perception',
    touch: 'perception',
    hp: 'st',
    fp: 'ht'
  };

  Character.prototype.reset = function () {
    this.st = this.dx = this.iq = this.ht = 10;
  };

  Character.prototype._resolveFormula = function (formula) {
    var i, acumulator;

    //hp: 'st',
    if (typeof formula === 'string') {
      return this.getAttribute(formula);
    }

    //basicSpeed: {avg: ['dx', 'ht', 0, 0]},
    if (typeof formula === 'object') {
      acumulator = 0;
      for (i in formula) {
        if (!formula.hasOwnProperty(i)) {
          throw typeof i + ' ' + JSON.stringify(i) + ' is not a valid entry';
        }
        switch (i) {
        case 'avg':
          acumulator += (this._resolveFormula(formula[i])) / (formula[i].length || 1);
          break;
        case 'round':
          acumulator += Math.round(this._resolveFormula(formula[i]));
          break;
        case 'floor':
          acumulator += Math.floor(this._resolveFormula(formula[i]));
          break;
        case 'sum':
          /*falls through*/
        default:
          acumulator += this._resolveFormula(formula[i]);
        }
      }
      return acumulator;
    }

    //sum: ['basicMove', 3]
    if (typeof formula === 'number') {
      return formula;
    }

    if (formula === undefined) {
      return 0;
    }

    throw 'unknown formula: ' + JSON.stringify(formula);
  };

  //get partial attribute value, considering only dependencies
  Character.prototype._resolveDependency = function (attrName) {
    var dep = this.dependencies[attrName];

    if (dep === undefined) {
      return 0;
    }

    return this._resolveFormula(dep);
  };

  //returns final attribute value
  Character.prototype.getAttribute = function (attrName) {
    return (this[attrName] || 0) + this._resolveDependency(attrName);
  };

  Character.prototype.setAttribute = function (attributes) {
    var attrName;

    for (attrName in attributes) {
      if (!attributes.hasOwnProperty(attrName)) {
        continue;
      }

      this[attrName] = (this[attrName] || 0) + (attributes[attrName] - this.getAttribute(attrName));
    }
  };

  return Character;
}());
