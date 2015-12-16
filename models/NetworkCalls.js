/**
* @module NetworkCalls
*/

var Backbone = require('backbone');

/** This is a Backbone Model that will store network data. */
var NetworkCalls = Backbone.Model.extend({
	defaults : {
		'adv_entity_id': '',
		'pub_entity_id': '',
		'anid': '',
		'impression': '',
		'pingTime': '',
		'scriptUrl': '',
		'mode': '',
		'viewId': 'N'
	},

	initialize : function() {
		// When we recieve a change event on the impression prop.
		// we also know that mode and scriptUrl props have probably been populated.
		this.once('change:impression', function() {
			var mode = this.attributes.mode,
				scriptUrl = this.attributes.scriptUrl;
			if (mode && scriptUrl) {
				var parseResult = this.parseIntegralId(mode, scriptUrl);
				if (parseResult) {
					if (parseResult instanceof Array) {
						this.attributes.adv_entity_id = parseResult[0];
						this.attributes.pub_entity_id = parseResult[1];
						this.attributes.anid = 'na';
					} else {
						this.attributes.anid = parseResult;
						this.attributes.adv_entity_id = 'na';
						this.attributes.pub_entity_id = 'na';
					}
				} else {
					this.attributes.anid = 'unknown';
					this.attributes.adv_entity_id = 'unknown';
					this.attributes.pub_entity_id = 'unknown';
				}
			} else {
				throw new Error('Mode and scriptUrl are undefined.');
			}
		});
	},

	parseIntegralId : function(mode, url) {
	    // Result will be undefined for unknown modes
	    var parser = document.createElement('a'),
	        result;

	    parser.href = url.toLowerCase();

	    var modeMap = {
	        jss: getAdvPub,
	        jsi: getAdvPub,
	        fwjsvid: getAdvPub,
	        jload: getAnid,
	        bapi: getAnid,
	        jsapi: getAnid,
	        jsvid: getAnid,
	        jspix: getAnid
	    };

	    function getAnid() {
	        // Use slice to remove the '?' character form query string.
	        var params = parser.search.slice(1, parser.search.length)
	            .split('&'),
	            i;
	        
	        for (i = 0; i < params.length; i++) {
	            var param = params[i].split('=');
	            if (/anid/i.test(param[0])) {
	                return param[1];
	            } 
	        }
	        throw new Error('anId parsing error.');
	    };

	    function getAdvPub() {
	        var advEntityPubEntity = parser.pathname.split('/')
	            .slice(3, 5);
	        var match = /[0-9]+/;
	        if (advEntityPubEntity instanceof Array && match.test(advEntityPubEntity[0]) && match.test(advEntityPubEntity[1])) {
	        	return advEntityPubEntity;
	        } else {
	        	throw new Error('advEntityPubEntity parsing error.');
	        }
	    };

	    if (modeMap[mode]) { result = modeMap[mode](); };

	    return result;
	}
});

module.exports = NetworkCalls;
