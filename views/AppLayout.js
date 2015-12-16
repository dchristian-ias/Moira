/** 
 * @module AppLayout
 */

var Marionette = require('backbone.marionette');
var AdsFoundItem = require('./AdsFoundItem');
var AdCount = require('../models/AdCount');
var AdCollection = require('../collections/AdCollection');
var AdsDisplayCollection = require('./AdsDisplayCollection');
var DataDisplayLayout = require('./DataDisplayLayout');
var templates = require('../views/templates');
var addons = require('../etc/addons');

var AppLayout = Marionette.LayoutView.extend({
	el: function () {
		return $('#dog-widget-container').contents().find('body').get(0)
	},

	template: templates.mainContainer,

	regions: {
		'adCountTracker': '#ads-found-container',
		'adVisualDisplay': '#ads-listing-container',
		'selectedAdData': '#data-display-container'
	},

	onRender: function() {
		$('#dog-widget-container').drags();
		
		this.adCountTracker.show(new AdsFoundItem({model: new AdCount({})}));
		this.adVisualDisplay.show(new AdsDisplayCollection({collection: new AdCollection({})}));
		this.selectedAdData.show(new DataDisplayLayout({}));
	}
});

module.exports = AppLayout;
