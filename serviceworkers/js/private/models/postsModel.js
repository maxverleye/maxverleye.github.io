define([
	'jquery',
	'backbone',
	'js/lib/utils.js'
], function ($, Backbone, Utils) {
	'use strict';

	var Utils = new Utils();

	var postsModel = Backbone.Model.extend({
		url: Utils.baseUrl + 'content',
		render: function(){
			alert('hop');
		}
	});

	return postsModel;
});
