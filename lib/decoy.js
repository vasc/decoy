/*jslint node: true */
'use strict';

var _ = require('lodash');

var controllers = {};

function Controller(){
	var results = [];

	var getResult = function(args){
		return _.find(results, function(r){
			return _.isEqual(r.args, args);
		});
	};

	this.given = function(args, result){
		results.push({args: args, result: result});
	};

	this.function = function(returnValue){
		return function(){
			var result = getResult(_.toArray(arguments));
			if(result) return result.result;
			else return returnValue;
		};
	};

	this.callback = function(){
		var defaultCallbackArguments = _.toArray(arguments);

		return function(){
			var cb = _.find(arguments, _.isFunction);

			if(!cb) throw new Error('No callback function passed');
			var result = getResult(arguments[-1]);
			if(result) cb.apply(null, result.result);
			else cb.apply(null, defaultCallbackArguments);
		};

	};
}

module.exports = {
	callback: function(){
		var ctrl = new Controller();
		var callback = ctrl.callback.apply(ctrl, arguments)
		
		controllers[callback] = ctrl;
		return callback;
	},

	function: function(returnValue){
		var ctrl = new Controller();
		var func = ctrl.function(returnValue);

		controllers[func] = ctrl;
		return func;
	},

	control: function(object){
		return controllers[object];
	}
};
