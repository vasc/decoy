var chai = require("chai"),
	when = require("when");

chai.should();

describe('decoy', function(){
	var decoy = require('../lib/decoy');

	describe('#module', function(){
		var mock = decoy.module('randomMethod');

		it('when requested for an undefined variable it should return a mock function', function(){
			mock.randomMethod.should.be.a('function');
		})
	});
});
