var _ = require('lodash');

function decoyModule(){
	return this;
}


module.exports = {
	module: function(){
		 var mock = new decoyModule();

		_.each(arguments, function(arg){
			mock[arg] = function(){};
		});

		return mock;
	}
}