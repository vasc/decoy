var chai = require("chai"),
	when = require("when");

chai.should();

describe('decoy', function(){
	var decoy = require('../lib/decoy');

	describe('#callback', function(){
		var mockCallbackFunction = decoy.callback('argument');

		it('should execute a callback sent as a last argument', function(testCb){
			mockCallbackFunction('smth', function(){
				testCb();
			});
		});

		it('should execute a callback with the given argument', function(testCb){
			mockCallbackFunction(function(arg){
				arg.should.equal('argument');
				testCb();
			});
		});

		it('should throw an error if no callback is given', function(){
			mockCallbackFunction.should.throw('No callback function passed');
		});
	});

	describe('#function', function(){
		var func = decoy.function('argument');

		it('should return "argument" when called', function(){
			func().should.be.eql('argument');
		});
	});

	describe('#control', function(){
		var func = decoy.function('argument')

		it('should return the right argument when called', function(){
			func().should.be.eql('argument');
		});

		it('should return the right argument after for the right behavior', function(){
			decoy.control(func).given(['arg1'], 'result');
			func('arg1').should.be.eql('result');
		});
	});
});
