'use strict';

var Attributes = GURPS.Attributes;

describe('create an Attributes object', function () {
  it('without arguments', function () {
    var obj = new Attributes();
    expect(obj).toEqual(jasmine.any(Object));
  });
});
