/**
 * @module modelListener
 */
 
var $ = require('jquery');

var modelListener = {
	listenOnChannelsForChanges : function(modelsFromApp, asidFromAd) {
		$(window).on('message', function(evt) {
			// jQuery preprocessing - must use originalEvent to fetch data.
			var data, asid, channel;
	
			try {
				data = JSON.parse(evt.originalEvent.data);
				asid = data.asid;
				channel = data.channel;
			} catch (e) { };

			if(asid === asidFromAd && channel) {
				modelsFromApp[channel].set(data.data);
				console.log("APP: " + asid);
				console.log(asidFromAd);
			}
		}); 
	}
};

module.exports = modelListener;
