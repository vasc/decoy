var _ = require('lodash');

function decoyModule(){
	return this;
}


module.exports = {
	callback: function(){
		var callbackArguments = arguments;

		return function(){
			var cb = _.find(arguments, _.isFunction);

			if(!cb) throw new Error('No callback function passed');
			cb.apply(null, callbackArguments);
		}
	},

	function: function(returnValue){
		return function(){
			return returnValue;
		}
	}
}