/**
* @module AdCollection
*/

var Backbone = require('backbone');
var AdModel = require('../models/Ad');

/** This is a Backbone Collection that will store meta admodels. */
var AdCollection = Backbone.Collection.extend({
	model:AdModel
});

module.exports = AdCollection;
