define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	'use strict';

	var watcherModel = Backbone.Model.extend({
		initialize: function(){

		},
		onChange: function( param, callback ) {
			var t = this;
			this.on('change:'+param, function(){
				callback(t.get(param));
			});
		}
	});

	return watcherModel;
});
