/** 
 * @module AdModelItem
 */
 
var Marionette = require('backbone.marionette');
var templates = require('../views/templates');

var TemplateMap = {
	'S': templates.screenEvents,
	'C': templates.cumulativeStates,
	'D': templates.detectionResults,
	'N': templates.networkCalls
};

var AdModelItem = Marionette.ItemView.extend({
	tagName: 'ul',

	// Serve the correct view for selected model.
	template: function(attributes) {
		var viewKey = attributes.viewId;
		if (TemplateMap[viewKey]) { 
			return TemplateMap[viewKey]({attributes: attributes}); 
		} else {
			throw new Error('viewKey - Does Not Exist.');
		}
	},

	modelEvents: {
		'change': 'render'
	}
});

module.exports = AdModelItem;
