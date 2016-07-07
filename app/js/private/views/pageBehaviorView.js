define([
	'jquery',
	'backbone',
	'js/lib/utils.js'
], function ($, Backbone, Utils) {
	'use strict';

	var pageBehaviorView = Backbone.View.extend({
		el:'body',
		events: {
		},
		initialize: function() {

			var t = this;

			var PageBehaviorModel = Backbone.Model.extend({
				defaults:{
					scrollStarted: false
				}
			});

			t.utils = new Utils;

			if( !this.model ) this.model = new PageBehaviorModel();

			this.model.on('change:scrollStarted', function(model){
				if(model.get('scrollStarted') && App.playlistView && App.playlistView.playerView){
					App.playlistView.playerView.model.set('videoMode', 'small');
					App.playlistView.model.set('mode', 'closed');
				}
			});
			this.$el = $(this.el);

			if(t.utils.is_touch_device()){
				this.$el.addClass('touchDevice');
			}

			this.initScrollFunction();
			this.initClickToScroll();
			
		},
		initScrollFunction: function(){

			var t = this;

			t.previousScroll = 0;

			t.scrollTimeout = null;
			t.scrollendDelay = 400; // ms

			$(window).on('scroll', function(e) {



				t.scrollWatcher();

				if( ! t.model.get('scrollStarted') ){
					t.model.set({
						scrollStarted: true
					});
				}

				if ( t.scrollTimeout !== null ) {
					clearTimeout( t.scrollTimeout );
				}

				t.scrollTimeout = setTimeout( function(){
					t.model.set({
						scrollStarted: false
					});
				}, t.scrollendDelay );


				t.currentScroll = $(this).scrollTop();

				if (t.currentScroll > 60) {
					if (t.currentScroll > t.previousScroll) {
						t.$el.addClass('hideNavs');
					} else {
						t.$el.removeClass('hideNavs');
					}
				} else {
					t.$el.removeClass('hideNavs');
				}

				t.previousScroll = t.currentScroll;
			});

		},
		initClickToScroll: function(){
			var t = this;
			$(this.el).on('click', 'a[href^="#/home/"]', function(e){
				e.preventDefault();
				var selector = $(this).attr('href').replace('/home/', '');
				t.utils.goToByScroll(selector);
			});

		},
		scrollWatcher: function(){

			var t = this;

			var pageTopY = window.pageYOffset + 60;
			var pageBottomY = pageTopY + window.innerHeight - 60;
			
			if(!this.$navItems){
				this.$navItems = $('#navigation .sectionlist-item');
			}

			this.$navItems.each(function(){
				var $element = $('section#'+this.href.split('#/home/')[1]);

				if ($element.length){ // security

					var elementTopY = Math.round($element.offset().top),
						elementBottomY = $element.height() + elementTopY;

					if(elementTopY <= pageTopY && elementTopY < pageBottomY && elementBottomY > pageTopY){
						t.changeActiveSectionItem($(this));
						return false;
					}

				}

			});

		},
		changeActiveSectionItem: function($t){
			
			var t = this;
			
			t.$navItems.removeClass('active')
			$t.addClass('active');


			var _sectionName = $t[0].href.split('#')[1].split('/')[2];
			
			switch(_sectionName){
				case "events" :
					$('#navigation .block-actions, .footer_action').addClass('active');
					break;
				default:
					$('#navigation .block-actions, .footer_action').removeClass('active');
					break;
			}

		}
	});

	return pageBehaviorView;
});
