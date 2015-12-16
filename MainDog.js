/**
 * @module MainDog
 */

var $ = require('jquery');
var App = require('./controllers/App');

// Add the widget container to the DOM.
var $container = $('<iframe/>', {
    id: 'dog-widget-container',
    scrolling: 'no',
    frameBorder: 0
});

// In order to throw the `!important` CSS specificity, add styling to the 
// DOM node itself, not the jQuery object. 
$container[0].style.cssText = 'position:absolute !important;height:200px !important;width:600px !important;opacity:0.9 !important;border:3px solid black !important;border-radius:25px !important;cursor:move !important;background-color:rgb(32,194,255) !important;z-index:1000000000 !important;top:0; left:0';

$container.on('load', function() {

    $(this).contents().find('head').append("<link rel='stylesheet' href='https://st.adsafecontrol.com/utilities/DogDiagnostic/views/style/style.css' type='text/css'/>");

    // Marionette.Application that stores unique Ad instances.
    var app = new App();

    $(window).on('message', function(evt) {
        var data;

        try {
            data = JSON.parse(evt.originalEvent.data);
        } catch (e) {};

        if (data && data.asid) {
            app.createAd(data, evt.originalEvent.source);
        }
    });
    // Trigger the bootstrapper to re-postMessage the missed postMessages. 
    window.postMessage('DOGDIAGNOSTICREADY', '*');
});

$('body').prepend($container);
