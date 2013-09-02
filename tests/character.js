module("Character", {
	setup: function () {
		window.Character = GURPS.Character;
	},
	teardown: function () {}
});

test("creating without attributes", function () {
	var c = new Character();

	equal(c.st, 10);
	equal(c.dx, 10);
	equal(c.iq, 10);
	equal(c.ht, 10);
});

test("creating with attributes null will not initialize", function () {
	var CharacterMock = function () {},
		spy = sinon.spy(),
		c;

	CharacterMock.prototype = Character;
	CharacterMock.reset = spy;
	c = new CharacterMock(null);

	ok(!spy.called);
});


test("creating with attributes empty object", function () {
	var c = new Character({});

	equal(c.st, 10);
	equal(c.dx, 10);
	equal(c.iq, 10);
	equal(c.ht, 10);
});

test("creating with attributes", function () {
	var c = new Character({
		st: 11,
		dx: 12
	});

	equal(c.getAttribute('st'), 11, 'get st');
	equal(c.getAttribute('dx'), 12, 'get dx');
	equal(c.st, 11, 'st');
	equal(c.dx, 12, 'dx');
});

test("reseting character", function () {
	var c = new Character(null);

	c.st = 11;
	c.dx = 12;
	c.iq = 13;
	c.ht = 14;

	c.reset();

	equal(c.st, 10);
	equal(c.dx, 10);
	equal(c.iq, 10);
	equal(c.ht, 10);
});

test("getAttribute on primary attribute", function () {
	var c = new Character(null);

	c.st = 12;
	equal(c.getAttribute('st'), 12, 'get st');
});

test("getAttribute on secondary higher than primary", function () {
	var c = new Character(null);

	c.st = 11;
	c.hp = 2;

	equal(c.getAttribute('hp'), 13, 'get hp');
});

test("getAttribute on secondary lower than base", function () {
	var c = new Character(null);

	c.st = 11;
	c.hp = -2;

	equal(c.getAttribute('hp'), 9, 'get hp');
});

test("getAttribute on secondary depending on other secondary", function () {
	var c = new Character(null);

	c.iq = 12;
	c.perception = 3;
	c.vision = -4;

	equal(c.getAttribute('vision'), 11, 'get vision');
});

test("getAttribute on secondary changes when primary change", function () {
	var c = new Character(null),
		iqBase = 10,
		change = 3;

	c.iq = iqBase;
	c.perception = 2;
	equal(c.getAttribute('perception'), 12, 'get perception');

	c.iq = iqBase + change;
	equal(c.getAttribute('perception'), 12 + change, 'get raised perception');

	c.iq = iqBase - change;
	equal(c.getAttribute('perception'), 12 - change, 'get lowered perception');
});

test("setAttribute on primary of empty character", function () {
	var c = new Character(null);

	c.setAttribute({
		iq: 13
	});

	equal(c.iq, 13, 'iq');
});

test("setAttribute on secondary of empty character", function () {
	var c = new Character(null);

	c.setAttribute({
		perception: 13
	});

	equal(c.perception, 13, 'bonus perception');
});

test("setAttribute on primary atribute", function () {
	var c = new Character(null);

	c.iq = 10;
	c.setAttribute({
		iq: 13
	});

	equal(c.iq, 13, 'iq');
});

test("setAttribute on secondary atribute", function () {
	var c = new Character(null);

	c.iq = 10;
	c.perception = 2;
	c.setAttribute({
		perception: 13
	});

	equal(c.perception, 3, 'bonus perception');
});
