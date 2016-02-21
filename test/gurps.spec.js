"use strict";

var GURPS = require("../src/gurps");

describe("GURPS object", function () {
  it("must have Character attribute", function () {
    expect(GURPS.Character).to.be.ok;
  });
});
