var Entities = {},
    Backbone = require('backbone'),
    BrowserActionApp = require('../app');

  /**
   * Set custom sync method since we will be getting the data to
   * populate this model from a non standard endpoint
   */
  Entities.PubScore = Backbone.Model.extend({
    sync: function(method, model, options) {
      var config;
      if(method === "read") {
        config = {
          method: "GET",
          url: "http://api.adsafeprotected.com/db/client/1/all.json?adsafe_url=" + this.get("pubUrl")
        };
      }
      options = _.extend(options, config);
      return Backbone.Model.prototype.sync.call(this, method, model, options);
    }
  });
  /**
   * Set API interface for handling app request events
   */
  var API = {
    getPubScoreEntity: function(pubUrl) {
      var pubScore = new Entities.PubScore({pubUrl: pubUrl}),
          defer = $.Deferred();

      pubScore.fetch({
        success: function(data) {
          defer.resolve(data);
        },
        error: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };
  /**
   * Set event handler for pubScore:entity request
   */
  BrowserActionApp.reqres.setHandler("pubScore:entity", function(pubUrl) {
    return API.getPubScoreEntity(pubUrl);
  });
