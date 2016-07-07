define([
	'jquery',
	'backbone',
	'private/models/watcherModel',
	'js/lib/utils.js'
], function ($, Backbone, watcherModel, Utils) {
	'use strict';

	var Utils = new Utils();

	var DetailView = Backbone.View.extend({
		el:".content_detail",
		events:{

		},
		initialize:function(o){

			var t = this;
			t.$el = $(t.el).html('').addClass('loading');

			t.contentId = o.contentId;

			// post detail
			var DetailModel = Backbone.Model.extend({
				url: Utils.baseUrl + 'content.json?id=' + o.contentId
			});
			
			if(!t.detailModel) t.detailModel = new DetailModel;
			
			t.detailModel.fetch({
				success: function(){
					t.render();
				}
			});

		},
		render:function(){
			// render posts
			var t = this;

			require(['text!private/templates/contentPageDetailTemplate.html'], function(template){

				if(!t.template) t.template = _.template( template );
				
				setTimeout(function(){
					t.$el.removeClass('loading');
				},10);

				t.$el.html(
					t.template({
						voc:App.Labels.voc,
						item:t.detailModel.toJSON(),
						contentId: t.contentId
					})
				);

			});
		}
	});


	var RelatedListView = Backbone.View.extend({
		el:".related_content_container",
		events:{

		},
		initialize:function(o){

			var t = this;
			t.$el = $(t.el).html('').addClass('loading');

			// post detail
			var DetailModel = Backbone.Model.extend({
				url: Utils.baseUrl + 'contents_related.json?id=' + o.contentId
			});
			
			if(!t.detailModel) t.detailModel = new DetailModel;
			
			t.detailModel.fetch({
				success: function(){
					t.render();
				}
			});

		},
		render:function(){
			// render posts
			var t = this;

			require(['text!private/templates/contentPageRelatedListTemplate.html'], function(template){

				if(!t.template) t.template = _.template( template );

				t.$el.html(
					t.template({
						voc:App.Labels.voc,
						posts:t.detailModel.toJSON()
					})
				);

				setTimeout(function(){
					t.$el.removeClass('loading');
				},10);

			});
		}
	});

	var ContentPageView = Backbone.View.extend({
		el:'#page',
		events: {},
		initialize: function(o) {

			var t = this;
			
			t.$el = $(t.el);

			t.contentId = o.postId

			t.watch();

			if( !t.detailView ){
				t.render();
			}else{
				t.watcher.set('renderDone', true);
			}

		},
		render: function(o) {
			var t = this;
			// render Homepage structure
			require(['text!private/templates/contentPageTemplate.html'], function(template){
				
				if(!t.template) t.template = _.template( template );

				t.$el.html(
					t.template({
						desktop: !Utils.is_touch_device(),
						voc:App.Labels.voc
					})
				);

				t.watcher.set('renderDone', true);

				setTimeout(function(){
					t.$el.removeClass('loading');
				}, 10);	
			});
		},
		initDetailAndRelatedListView: function(){
			
			var t = this;
			
			t.detailView = new DetailView({
				contentId: t.contentId
			});

			t.relatedListView = new RelatedListView({
				contentId: t.contentId
			});

		},
		watch: function(cb){
			
			var t = this;

			if(!t.watcher) t.watcher = new watcherModel;

			t.watcher.onChange('renderDone', function(renderDone){
				if(renderDone) t.initDetailAndRelatedListView();
			});

		}
	});

	return ContentPageView;
});
