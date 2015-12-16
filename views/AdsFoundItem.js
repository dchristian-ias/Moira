/** 
 * @module AdsFoundItem
 */

var Marionette = require('backbone.marionette');
var templates = require('../views/templates');

var AdsFoundItem = Marionette.ItemView.extend({
	template: templates.adCount,

	tagName: 'h1',

	modelEvents: {
		'change': 'render'
	},

	onRender: function() {
		this.$el.attr('id', 'ad-count-notification-header');
	}
});

module.exports = AdsFoundItem;
