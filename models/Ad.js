/**
 * @module Ad
 */

var Marionette = require('backbone.marionette');
var NetworkCalls = require('./NetworkCalls');
var ScreenEvents = require('./ScreenEvents');
var Bootstrapper = require('./Bootstrapper');
var CumulativeStates = require('./CumulativeStates');
var DetectionResults = require('./DetectionResults');

/**
 *  Respresents a unique IAS tag.
 *  @param {object} options - Contains initial Ad data and postMessage source.
 *  @returns {constructor} - Marionette Object Constructor.
 */
var Ad = Backbone.Model.extend({
    defaults:{
        viewState:'na',
        highlighted:false,
        tagIdType:'',
        tagId:''
    },
    initialize: function(options) {
        this.data = options.data;
        this.postSource = options.postSource;

        this.models = {
            detectionResults: new DetectionResults({}),
            networkCalls: new NetworkCalls(),
            // Passing in the `asid` because this model will trigger events
            // on which Ad has changed `viewState`. This provides support 
            // for the beacon in-view markers.
            screenEvents: new ScreenEvents({'id':this.data.asid}),
            cumulativeStates: new CumulativeStates({}),
            bootstrapper:new Bootstrapper({})
        };

        this.initModelListener();
        this.models.bootstrapper.on('change:reqquery', function(model,val){
            var parts;
            if(val && val.length) {
                parts = val.toLowerCase().split('anid=');
                if(parts.length > 1) {
                    this.set({
                        tagIdType:'anid',
                        tagId:parts[1].split('&')[0]
                    });
                }
            }
        }.bind(this));

        this.models.bootstrapper.on('change:adsafeSrc', function(model,val){
            var parts,rfwPos;
            if(val && val.length) {
                parts = val.toLowerCase().split('/');
                rfwPos = parts.indexOf('rfw');
                if(rfwPos !== -1) {
                    this.set({
                        tagIdType:'pub/adv',
                        tagId:parts[rfwPos+2] + '/' + parts[rfwPos+3]
                    });
                }
            }
        }.bind(this));


        this.models.screenEvents.on('change:viewState', function(){
           this.set('viewState', this.models.screenEvents.get('viewState'));
        }.bind(this));
        this.setModels();
    },

    // Initialize listener for future channel updates as soon as possible.
    initModelListener: function() {
        $(window).on('message', function(evt) {
            // jQuery preprocessing - must use originalEvent to fetch data.
            var data, channel;

            try {
                data = JSON.parse(evt.originalEvent.data);
                channel = data.channel;
                if(data && data.asid === this.id && data.channel) {
                    if(data.channel === 'networkCalls') {
                        this.models.networkCalls.add(data.data);
                    } else {
                        this.models[channel].set(data.data);
                    }

                }
            } catch (e) { }

        }.bind(this));
    },

    // On instantiation we will set whatever models we can.
    setModels: function() {
        for (var modelName in this.models) {
            if (this.models.hasOwnProperty(modelName)) {
                if(this.data.channel === 'networkCalls') {
                    this.models.networkCalls.add(this.data.data);
                } else if (this.data.channel === modelName) {
                    this.models[modelName].set(this.data.data);
                }
            }
        }
    }
});

module.exports = Ad;