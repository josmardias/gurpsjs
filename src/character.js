GURPS.Character = (function () {
    'use strict';

    var Character = function (attributes) {
        if (attributes === null)
            return;
        this.reset();
        this.setAttribute(attributes);
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
        perception: 'iq',
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
    Character.prototype._resolveDependency = function (attrName) {
        var dep = this.dependencies[attrName];

        if (!dep)
            return 0;

        //hp: 'st',
        if (typeof dep === 'string')
            return this.getAttribute(dep);

        //basicSpeed: ['dx', 'dx', 'ht', 'ht'],
        if (typeof dep === 'object') {
            var self = this;
            return dep.reduce(function (acumulator, attr) {
                return acumulator + this.getAttribute(attr);
            }, 0) / dep.length;
        };

        //basicMove: function () {...}
        if (typeof dep === 'function')
            return dep.call(this);
    };

    //returns final attribute value
    Character.prototype.getAttribute = function (attrName) {
        var value = this[attrName] || 0;
        return value + this._resolveDependency(attrName);
    };

    Character.prototype.setAttribute = function (attributes) {
        var attrName, newVal;

        for (attrName in attributes) {
            if (!attributes.hasOwnProperty(attrName))
                continue;

            this[attrName] = (this[attrName] || 0) + (attributes[attrName] - this.getAttribute(attrName));
        }
    };

    return Character;
})();