'use strict';

const GURPS = require('../src/gurps');

describe('GURPS object', () => {
  it('must have Character attribute', () => {
    expect(GURPS.Character).to.be.ok;
  });
});
