/**
* @module AdCount
*/

var Backbone = require('backbone');
var messageBus = require ('../controllers/messageBus');

/** This is a Backbone Model that will store ad count data. */
var AdCount = Backbone.Model.extend({
	defaults : {
		'adCount' : 0
	},

	incrementAndSetAdCount: function(ad) {
		this.set('adCount', this.attributes.adCount + 1);
	},

	initialize: function() {
		messageBus.vent.on('ad:added', this.incrementAndSetAdCount, this);
	}
});

module.exports = AdCount;
