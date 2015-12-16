/**
* @module AdCollection
*/

var Backbone = require('backbone');
var messageBus = require ('../controllers/messageBus');
var MetaAdModel = require('../models/MetaAdModel');

/** This is a Backbone Collection that will store meta admodels. */
var AdCollection = Backbone.Collection.extend({
	model: MetaAdModel,

	initialize: function() {
		messageBus.vent.on('ad:added', this.addModelToSelf, this);
	},

	addModelToSelf: function(Ad) {
		this.add(new MetaAdModel({'ad':Ad, 'id': Ad.data.asid, 'active': false}));
	}
});

module.exports = AdCollection;
