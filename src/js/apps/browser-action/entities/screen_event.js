var Entities = {},
    Backbone = require('backbone'),
    BrowserActionApp = require('../app'),

    /**
     * Temporary Method, assuming we will be able to pull this
     * directly from ScreenEvent in future
     */
    getAdCoordinates = function(options) {
      var screenEventDetailsVals,
          adCoordinateVals, screenEvents = {},
          seKey, seValue, screenEventVals, adCoordinates,
          screenEventDetails = options.data && options.data.details;

      if (screenEventDetails) {

        screenEventDetailsVals = _.compact(screenEventDetails.split(','));

        _.each(screenEventDetailsVals, function(val) {
          screenEventVals = val.split(':');
          seKey = screenEventVals[0];
          seValue = screenEventVals[1];
          screenEvents[seKey] = seValue;
        });
        
        adCoordinates = screenEvents.ac;
        adCoordinateVals = adCoordinates.split('.');
       
        return {
          x: adCoordinateVals[0],
          y: adCoordinateVals[1],
          width: adCoordinateVals[2],
          height: adCoordinateVals[3]
        };
      }
    };

    Entities.ScreenEvent = Backbone.Model.extend({
      initialize: function(options) {
        /**
         * Retrieve the Ad Coordinates from the screen event's
         * 'detail' property. It's a string that needs to be serialized,
         * this is a temporary method, assuming we can send this data
         * directly on the event object in the future.. 
         */
        this.set('adCoordinates', getAdCoordinates(options));
      }
    });

    Entities.ScreenEventCollection = Backbone.Collection.extend({
      model: Entities.ScreenEvent
    });
  
  module.exports = Entities;
