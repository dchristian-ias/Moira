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
    },

    initialize: function() {
        this.on('change:viewState', this.broadcastViewBeaconChange);
    },

    broadcastViewBeaconChange: function() {
        messageBus.vent.trigger('inViewBeaconUpdate', this.id, this.attributes.viewState || '');
    }
});

module.exports = ScreenEvents;
