// Require.js allows us to configure shortcut alias
require.config({
	// urlArgs: 'bust=' + (new Date()).getTime(),
	urlArgs: 'v=111',
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		'jquery': 'lib/jquery',
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',
		'froogaloop': 'lib/froogaloop.min',
		'countdown': 'lib/jquery.countdown',
		'knob': 'lib/jquery.knob.min',
		'swiper': 'lib/swiper.jquery.min',
		
		'text': 'lib/requirejs-plugin-text',
		'tpl': 'lib/requirejs-plugin-tpl',
		'json': 'lib/requirejs-plugin-json',
		'async': 'lib/requirejs-plugin-async',

		'router': 'private/router',
		'labels': 'private/labels.json',
		'publicLabels': 'public_labels.json'
	}
});