/*global require*/
'use strict';

define([
	'jquery',
	'backbone',
	'router',
], function ($, Backbone, Router) {
	(function(){

		window.App = new Router();
		Backbone.history.start();

	})();
});

