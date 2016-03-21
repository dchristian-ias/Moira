var Entities = {},
    Backbone = require('backbone'),
    BrowserActionApp = require('../app'),
    ScreenEventCollection = require('./screen_event').ScreenEventCollection,
    NetworkCallCollection = require('./network_call').NetworkCallCollection;

/**
 *  Respresents a unique IAS Tag
 */
  Entities.IasTag = Backbone.Model.extend({
    
    defaults: {
      isHighlighted: false
    },

    initialize: function(options) {
      var data,
          self = this,
          screenEvent,
          networkCall;
      
      this.set({
        asid: options.asid,
        models: {
          networkCallCollection: new NetworkCallCollection(options.calls.networkCalls),
          screenEventCollection: new ScreenEventCollection(options.calls.screenEvents)
        }
      });
      /**
       * Set the lastest Screen Event's model properties
       * directly onto the IAS Tag
       */
      if (this.get('models') && this.get('models').screenEventCollection) {
        screenEvent = this.get('models').screenEventCollection.last();
        if (screenEvent) {
          this.set({
            width: screenEvent.get('data').width,
            height: screenEvent.get('data').height,
            reason: screenEvent.get('data').reason,
            tabHidden: screenEvent.get('data').tabHidden,
            obstructed: screenEvent.get('data').obstructed,
            adCoordinates: screenEvent.get('adCoordinates'),
            percentInView: screenEvent.get('data').percentInView
          });
        }
      }

      /**
       * Set the lastest Network Call's model properties
       * directly onto the IAS Tag
       */
      if (this.get('models') && this.get('models').networkCallCollection) {
        networkCall = this.get('models').networkCallCollection.last();
        console.log('networkCall');
        console.log(networkCall);
        if (networkCall.get('data').callType === 'p') {
          this.set({
            timInView: networkCall.get('data').pingTime,
          });
        }
      }

      console.log(this);

      // /**
      //  * Set the lastest Network Call's model properties
      //  * directly onto the IAS Tag
      //  */
      // if (this.get('models') && this.get('models').screenEventCollection) {
      //   screenEvent = this.get('models').screenEventCollection.last();
      //   screenEventAttrs = Object.keys(screenEvent);
      //   screenEventAttrs.forEach(function(key) {
      //     self.set(screenEvent, screenEvent[key]);
      //   });
      // }
    }

  });
  /**
   *  Respresents an IAS Tag collection
   */
  Entities.IasTagCollection = Backbone.Collection.extend({
    model: Entities.IasTag
  });
  /**
   * Set API interface for handling app request events
   */
  var API = {
   getIasTagEntities: function() {
    var iasTagCollection,
        iasTagModels = [],
        defer = $.Deferred();
      
      chrome.runtime.getBackgroundPage(function(BackgroundPageWindow) {
        var iasTags = BackgroundPageWindow.IasTags,
            iasTagNames = Object.keys(iasTags); 

        iasTagNames.forEach(function(asid) {
          var tag = iasTags[asid];
          iasTagModels.push(new Entities.IasTag({
            asid: asid,
            calls: tag
          }));
        });
        
        iasTagCollection = new Entities.IasTagCollection(iasTagModels);        
        defer.resolve(iasTagCollection);
      });
      return defer.promise();
    },
    getIasTagEntity: function() {
      var iasTag = new Entities.IasTag();
      return iasTag;
    }
  };
  /**
   * Set event handler for pubScore:entity request
   */
  BrowserActionApp.reqres.setHandler("iasTag:entities", function() {
    return API.getIasTagEntities();
  });
  BrowserActionApp.reqres.setHandler("iasTag:entity", function() {
    return API.getIasTagEntity();
  });

  module.exports = Entities;
