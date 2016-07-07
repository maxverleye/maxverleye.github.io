/*global require*/
'use strict';

define([
	'config'
], function (Config) {

	// avoid error on console log on ie
    if (!window.console || !window.console.log) {
        window.console = {
            log: function () {}
        };
    }

    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    // look for the script containing the data-module attribute and load page module
    eachReverse(scripts(), function (script) {
        var dataModule = script.getAttribute('data-module');
        if (dataModule) {
            require([dataModule]);
            return true;
        }
    });


	


});