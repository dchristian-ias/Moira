/**
 * @module Ad
 */

var Marionette = require('backbone.marionette');
var NetworkCalls = require('../models/NetworkCalls');
var ScreenEvents = require('../models/ScreenEvents');
var CumulativeStates = require('../models/CumulativeStates');
var DetectionResults = require('../models/DetectionResults');
var modelListener = require('./modellistener');

/**
 *  Respresents a unique IAS tag.
 *  @param {object} options - Contains initial Ad data and postMessage source.
 *  @returns {constructor} - Marionette Object Constructor.
 */
var Ad = Marionette.Object.extend({
    initialize: function(options) {
        this.data = options.data;
        this.postSource = options.postSource;

        this.models = {
            detectionResults: new DetectionResults({}),
            networkCalls: new NetworkCalls({}),
            // Passing in the `asid` because this model will trigger events
            // on which Ad has changed `viewState`. This provides support 
            // for the beacon in-view markers.
            screenEvents: new ScreenEvents({'id':this.data.asid}),
            cumulativeStates: new CumulativeStates({})
        };

        this.initModelListener();
        this.setModels();
    },

    // Initialize listener for future channel updates as soon as possible.
    initModelListener: function() {
        modelListener.listenOnChannelsForChanges(this.models, this.data.asid);
    },

    // On instantiation we will set whatever models we can.
    setModels: function() {
        for (modelName in this.models) {
            if (this.models.hasOwnProperty(modelName)) {
                if (this.data.channel === modelName) {
                    this.models[modelName].set(this.data.data);
                }
            }
        }
    }
});

module.exports = Ad;