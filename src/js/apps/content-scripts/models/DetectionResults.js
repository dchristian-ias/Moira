/**
 * @module DetectionResults
 */

var Backbone = require('backbone');

/** This is a Backbone Model that will store detection result data. */
var DetectionResults = Backbone.Model.extend({
	defaults : {
		'documentation': 'https://util01.303net.net/confluence/display/fvis/Visibility+Ladder',
		'detectionMethods' : '',
		'visibileUrl': '',
		'viewId': 'D'
	}
});

module.exports = DetectionResults;
