define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var utils = Backbone.View.extend({
        baseUrl: "/api/",
        goToByScroll: function(selector, speed){

            var _speed = speed || 250
            // Scroll
            $('html,body').animate({
                scrollTop: $(selector).offset().top - ($('#navigation').height() - 2)
            }, _speed);

        },
        isValidEmailAddress: function(emailAddress){
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
        },
        formatEventDate: function(Date, Labels){
            var dateString = Labels.voc.month[Date.getMonth()] + ". " + Date.getDate() + " " + Date.getFullYear();
            return dateString;
        },
        clearHash: function(){
            App.navigate('', {trigger:true, replace:true});
        },
        parseMustachesString: function(str){

            // ex:
            // "Hello {{firstName}} {{lastName}}"
            //  => ['firstName', 'lastName'];

            var array = [];
            var re = /[\{]{2}(.*?)[\}]{2}/g; 
            var m;
            while ((m = re.exec(str)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                array.push(m[1]);
            }

            return array;
        },
        parseMustacheString: function (str, obj){

            var infos = this.parseMustachesString(str);

            for (var i = infos.length - 1; i >= 0; i--) {
                str = str.replace('{{'+infos[i]+'}}', obj[infos[i]]);
            }

            return str;
        },
        FormatDate: function(date){
            
            var _d = new Date(date);
            
            var D = _d.getDate();
            var M = (_d.getMonth()+1);

            if(D <= 9) D = "0"+D;
            if(M <= 9) M = "0"+M;

            return  D + "/" + M;
        },
        FormatFullDate: function(date){
                
            var _d = new Date(date);
            
            var D = _d.getDate();
            var M = (_d.getMonth()+1);
            var Y = _d.getFullYear();

            if(D <= 9) D = "0"+D;
            if(M <= 9) M = "0"+M;

            return  D + "/" + M + "/" + Y;
        },
        is_touch_device: function(){
            
            // console.log("!!!! WARNING !!!! TOUCH DEVICE ENABLED - line 83");
            //return true;

            return 'ontouchstart' in window || navigator.maxTouchPoints;
        },
        transitionEnd: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        cookie:{
            set: function(cname, cvalue, exdays){
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },
            get: function(cname){
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i <ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length,c.length);
                    }
                }
                return "";
            },
            delete: function ( name, path, domain ) {
              if( this.get( name ) ) {
                document.cookie = name + "=" +
                  ((path) ? ";path="+path:"")+
                  ((domain)?";domain="+domain:"") +
                  ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
              }
            }
        }
    });

    return utils;
});