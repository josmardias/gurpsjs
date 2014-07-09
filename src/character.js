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

  Character.prototype.reset = function () {
    this.st = this.dx = this.iq = this.ht = 10;
  };

  Character.prototype.dependencies = {
    will: "iq",
    frightCheck: {
      avg: ["st", "iq"]
    },
    basicSpeed: {
      avg: ["dx", "ht", 0, 0]
    },
    basicMove: {
      floor: "basicSpeed"
    },
    dodge: {
      sum: ["basicMove", 3]
    },
    perception: "iq",
    vision: "perception",
    hearing: "perception",
    tasteSmell: "perception",
    touch: "perception",
    hp: "st",
    fp: "ht"
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

      this.attribute[attrName] = attributes[attrName];
    }
  };

  return Character;
})();
