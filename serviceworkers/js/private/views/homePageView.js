define([
	'jquery',
	'backbone',
	'text!private/templates/homePageTemplate.html',
	'private/models/watcherModel',
	'js/lib/utils.js'
], function ($, Backbone, homePageTemplate, watcherModel, Utils) {
	'use strict';

	var Utils = new Utils();

	var HomePageView = Backbone.View.extend({
		el:'#page',
		events: {
			"click #navigation .openPlaylist": "openPlaylist"
		},
		initialize: function() {

			var t = this;
			
			t.$el = $(t.el);
			
			t.watch();

			t.render();

		},
		render: function() {
			// render Homepage structure

			if(!this.template) this.template = _.template( homePageTemplate );

			this.$el.html(
				this.template({
					desktop: !Utils.is_touch_device(),
					voc:App.Labels.voc
				})
			);
			
			var t = this;

			t.watcher.set('renderDone', true);

			setTimeout(function(){
				t.$el.removeClass('loading');
			}, 10);
		
		},
		renderPosts: function(){
			// render posts
			var t = this;

			require(['text!private/templates/homePageListTemplate.html'], function(homePageListTemplate){

				if(!t.homePageListTemplate) t.homePageListTemplate = _.template( homePageListTemplate );
				
				t.$postsEl.removeClass('loading');

				t.$postsEl.html(
					t.homePageListTemplate({
						voc:App.Labels.voc,
						posts:t.posts.toJSON()
					})
				);

				t.watcher.set('postsRendered', true);

			});

		},
		initPostsSection: function(){
			
			var t = this;
			
			t.$postsEl = t.$el.find('.postsContent');
			t.$postsEl.addClass('loading');

			var postsModel = Backbone.Model.extend({
				url: Utils.baseUrl + 'contents.json'
			});

			if(!t.posts) t.posts = new postsModel;
			t.posts.fetch({
				success: function(){
					t.renderPosts();
				}
			});

		},
		watch: function(cb){
			
			var t = this;

			if(!t.watcher) t.watcher = new watcherModel;

			t.watcher.onChange('renderDone', function(renderDone){
				if(renderDone) t.initPostsSection();
			});

		}
	});

	return HomePageView;
});
