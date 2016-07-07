define([
	'jquery',
	'backbone',
	'private/models/watcherModel',
	'js/lib/utils.js'
], function ($, Backbone, watcherModel, Utils) {
	'use strict';

	var Utils = new Utils();

	var HomePageView = Backbone.View.extend({
		el:'#page',
		events: {
			
		},
		initialize: function(o) {

			var t = this;
			
			t.$el = $(t.el);
			t.$el.html('').addClass('loading');
			
			t.watch();

			// post detail
			var contentModel = Backbone.Model.extend({
				url: Utils.baseUrl + 'content/' + o.postId
			});

			t.content = new contentModel;
			
			t.content.fetch({
				success: function(){
					t.watcher.set('contentLoaded', true);
				}
			});

		},
		render: function(o) {
			var t = this;

			// default values
			var o = o || {};
			var _o = {
				data: o.data || t.content.toJSON(),
				template: o.template || 'text!private/templates/postViewTemplate.html',
				el: o.el || t.$el
			}

			// render Homepage structure
			require([_o.template], function(template){
				
				if(!t.template) t.template = _.template( template );

				console.log(_o.el);

				_o.el.html(
					t.template({
						desktop: !App.Utils.is_touch_device(),
						voc:App.Labels.voc,
						user:User.toJSON(),
						item: _o.data
					})
				);

				t.watcher.set('renderDone', true);

				setTimeout(function(){
					_o.el.removeClass('loading');
				}, 10);	
			});
		},
		watch: function(cb){
			
			var t = this;

			if(!t.watcher) t.watcher = new watcherModel;

			t.watcher.onChange('contentLoaded', function(contentLoaded){
				// do something once post has been loaded
				if(contentLoaded){
					t.render();
				}
			});

			t.watcher.onChange('relatedContentLoaded', function(relatedContentLoaded){
				// do something once post has been loaded
				if(relatedContentLoaded){
					t.render({
						data: t.content.toJSON(),
						template: 'text!private/templates/postViewTemplate.html',
						el: $('.related_content_container')
					});
				}
			});

		}
	});

	return HomePageView;
});
