/** 
 * @module App
 */
 
var Marionette = require('backbone.marionette');
var messageBus = require ('../controllers/messageBus');
var Ad = require('./Ad');
var AppLayout = require('../views/AppLayout');

var App = Marionette.Application.extend({
	_ads: {},

	createAd: function(data, source) {
		if (!this._ads[data.asid]) {
			this._ads[data.asid] = new Ad({'data': data, 'postSource': source});
			messageBus.vent.trigger('ad:added', this._ads[data.asid]);
		}
	},

	initialize: function() {
		var applayout = new AppLayout({});
		applayout.render();
	}
});

module.exports = App;