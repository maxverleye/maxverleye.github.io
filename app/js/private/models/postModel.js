define([
	'jquery',
	'backbone',
	'js/lib/utils.js'
], function ($, Backbone, Utils) {
	'use strict';

	var Utils = new Utils();

	var userModel = Backbone.Model.extend({
		url: Utils.baseUrl + 'content'
	});

	return userModel;
});
