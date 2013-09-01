GURPS.Character = (function () {
	'use strict';

	var Character = function (attributes) {
		this.reset();
		this.setAttr(attributes);
		//this.calculatePoints();
	};

	/*
	 * Map of secondaries attributes, an it's dependencies
	 * value can be attribute name, or an array of attributes to calculate the average
	 */
	Character.prototype.dependencies = {
		will: 'iq',
		frightCheck: ['st', 'iq'],
		basicSpeed: ['dx', 'dx', 'ht', 'ht'],
		basicMove: function () {
			return Math.round(this.getAttr('basicSpeed'));
		},
		perception: 'will',
		vision: 'perception',
		hearing: 'perception',
		tasteSmell: 'perception',
		touch: 'perception',
		hp: 'st',
		fp: 'ht'
	}

	Character.prototype.reset = function () {
		this.st = this.dx = this.iq = this.ht = 10;
	};

	//get partial attribute value, considering only dependencies
	Character.prototype._computeDependencie = function (attrName) {
		var depAttr = this.dependencies[attrName],
			value = 0;

		if (typeof depAttr === "string") {
			value = this[depAttr] || 0;
		} else if (typeof depAttr === 'object') {
			value = depAttr.reduce(function (attr1, attr2) {
				return (this[attr1] || 0) + (this[attr2] || 0);
			}) / depAttr.length;
		} else if (typeof depAttr === 'function') {
			value = depAttr.call(this);
		}

		return value;
	};

	//returns final attribute value
	Character.prototype.getAttr = function (attrName) {
		var attrValue = this[attrName];
		if(this.dependencies[attrName] !== undefined)
			attrValue += this._computeDependencie(attrName);
		return  attrValue;
	};

	Character.prototype.setAttr = function (attributes) {
		var i, newVal;

		for (i in attributes) {
			if (!attributes.hasOwnProperty(i))
				continue;

			newVal = attributes[i];
			if (this.dependencies[i] !== undefined)
				newVal = attributes[i] - this._computeDependencie(i);

			this[i] = newVal;
		}
	};

	return Character;
})();