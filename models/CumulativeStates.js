/**
 * @module CumulativeStates
 */
 
var Backbone = require('backbone');

/** This is a Backbone Model that will store cumulative-state data. */
var CumulativeStates = Backbone.Model.extend({
    defaults: {
        'fi': '',
        'fn': '',
        'fo': '',
        'gi': '',
        'gn': '',
        'go': '',
        'gpm': '',
        'gpp': '',
        'i': '',
        'n': '',
        'o': '',
        'pm': '',
        'pp': '',
        'viewId': 'C'
    }
});

module.exports = CumulativeStates;
