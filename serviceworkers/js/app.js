/*global require*/
'use strict';

define([
	'jquery',
	'backbone',
	'router',
], function ($, Backbone, Router) {
	(function(){

		/* Add feature check for Service Workers here */
		if('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/serviceworkers/service-worker.js')
				.then(
					function() {
						console.log('Service Worker Registered');
					},
					function(){
						console.log('Error Service workers');
					});
		}

		window.App = new Router();
		Backbone.history.start();

	})();
});

