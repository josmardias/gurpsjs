module("Character", {
	setup: function () {
		window.Character = GURPS.Character;
	},
	teardown: function () {

	}
});

test("instantiate without attributes", function () {
	var testDefaults = function (obj) {
		equal(obj.st, 10);
		equal(obj.dx, 10);
		equal(obj.iq, 10);
		equal(obj.ht, 10);
	}

	testDefaults(new Character());
	testDefaults(new Character(null));
	testDefaults(new Character({}));
});

test("instantiate with attributes", function () {
	var c = new Character({
		st: 11,
		dx: 12,
		iq: 13,
		ht: 14
	});

	equal(c.st, 11, 'st');
	equal(c.dx, 12, 'dx');
	equal(c.iq, 13, 'iq');
	equal(c.ht, 14, 'ht');
});

test("reseted character must", function () {
	var c = new Character({
		st: 11,
		dx: 12,
		iq: 13,
		ht: 14
	});

	c.reset();

	equal(c.st, 10);
	equal(c.dx, 10);
	equal(c.iq, 10);
	equal(c.ht, 10);
});

test("secondarie attributes", function () {
	var c = new Character({
		st: 11,
		hp: 13
	});

	equal(c.getAttr('st'), 11, 'get st');
	equal(c.getAttr('hp'), 13, 'get hp');
	equal(c.st, 11, 'st');
	equal(c.hp, 2, 'hp');
});
