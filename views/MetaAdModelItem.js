/** 
 * @module MetaAdModelItem
 */

var Marionette = require('backbone.marionette');
var MetaAdModel = require('../models/MetaAdModel');

var MetaAdModelItem = Marionette.ItemView.extend({
	model: MetaAdModel,

	template: false,

	tagName: 'li',

	className: 'ad-listing',

	events: {
		'click': 'selected'
	},

	attributes : function() {
		return {
			'id': this.model.id,
		}
	},

	selected: function() {
		this.trigger('selected');
	}
});

module.exports = MetaAdModelItem;
