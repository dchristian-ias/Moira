/**
 * @module ScreenEvents
 */

var Backbone = require('backbone');

/** This is a Backbone Model that will store screen-event data. */
var ScreenEvents = Backbone.Model.extend({
    defaults : {
        'adCompCount': '',
        'details': '',
        'sl': '',
        'fsl': '',
        'gsl': '',
        't': '',
        'winDimensions': '',
        'breakdowns': '',
        'containerDimensions': '',
        'viewState': '',
        'percentInView': '',
        'reason': '',
        'obstructed': '',
        'tabHidden': '',
        'posViewState': '',
        'gState': '',
        'fState': '',
        'method': '',
        'viewId': 'S'
    }
});

module.exports = ScreenEvents;
