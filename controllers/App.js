/** 
 * @module App
 */
 
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var AppLayout = require('../views/AppLayout');
var AdListCollectionView = require('../views/AdListCollection');
var AdCollection = require('../collections/AdCollection');

var App = Marionette.Application.extend({
	ads:new AdCollection(),
	createAd: function(data, source) {
		//todo use backbones collection lookup of ids, instead of replicating
		if (!this.ads.findWhere({id:data.asid})) {
			this.ads.add({
				'id': data.asid,
				'data': data,
				'postSource': source
			});
		}

		this.applayout.render();
		if(this.ads.length === 1) {
			this.applayout.adList.show(new AdListCollectionView({
				collection:this.ads
			}));
		}
	},

	initialize: function() {
		this.applayout = new AppLayout({});
	},
	onStart: function(){
		$(window).on('message', function(evt) {
			var data;

			try {
				data = JSON.parse(evt.originalEvent.data);
			} catch (e) {}

			if (data && data.asid) {
				this.createAd(data, evt.originalEvent.source);
			}
		}.bind(this));
		// Trigger the bootstrapper to re-postMessage the missed postMessages.
		window.postMessage('DOGDIAGNOSTICREADY', '*');
	}
});

module.exports = App;