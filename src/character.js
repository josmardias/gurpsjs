/* global GURPS */
GURPS.Character = (function () {
  "use strict";

  var _dependencies = {
    "ST": 10,
    "DX": 10,
    "IQ": 10,
    "HT": 10,
    "HP": "ST",
    "FP": "HT",
    "will": "IQ",
    "basicSpeed": {
      "avg": ["DX", "HT", 0, 0]
    },
    "basicMove": {
      "floor": "basicSpeed"
    },
    "dodge": {
      "sum": ["basicMove", 3]
    },
    "perception": "IQ",
    "vision": "perception",
    "hearing": "perception",
    "tasteSmell": "perception",
    "touch": "perception"
  };

  /**
   * attributes: initial attributes
   */
  var Character = function (attributes) {
    this.attributes = new GURPS.Attributes(_dependencies);
    this.setAttribute(attributes);
  };

  Character.prototype.getAttribute = function (attrName) {
    return this.attributes.get(attrName);
  };

  /**
   * attributes: an object with attribute name => value
   */
  Character.prototype.setAttribute = function (attributes) {
    var attrName;

    for (attrName in attributes) {
      if (!attributes.hasOwnProperty(attrName)) {
        continue;
      }

      this.attributes.set(attrName, attributes[attrName]);
    }

    return this;
  };

  return Character;
})();
