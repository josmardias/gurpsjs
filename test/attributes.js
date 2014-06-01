'use strict';

var Attributes = GURPS.Attributes;

describe('Attributes module creation', function () {
  it('without arguments', function () {
    var obj = new Attributes();
    expect(obj).toEqual(jasmine.any(Object));
  });

  it("with empty object", function () {
    var obj = new Attributes({});
    expect(obj).toEqual(jasmine.any(Object));
  });
});
