define([
    'jquery',
    'backbone',
    'json!labels',
], function ($, Backbone, Labels) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            '#': 'home',
            'content/:postId': 'content',
        }, 
        Labels: Labels,
        initialize: function(){
            var t = this;
            
            t.$html= $('html');

            t.$loginOutContainer = $('header .loginoutContainer');

            require(['private/views/pageBehaviorView'], function( pageBehaviorView ){
                t.pageBehavior = new pageBehaviorView;
            });
        },
        home: function(){

            this.$html.attr('data-template', 'home');

            var t = this;
            require(['private/views/homePageView'], function( homeView ){

                t.homeView = new homeView;

            }, function(error){});

        },
        content: function(postId){

            this.$html.attr('data-template', 'sidebar');

            var t = this;
            require(['private/views/contentPageView'], function( contentView ){

                t.contentView = new contentView({postId:postId});

            }, function(error){});

        }
    });

    return Router;
});