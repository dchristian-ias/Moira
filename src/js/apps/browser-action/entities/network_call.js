var Entities = {},
    Backbone = require('backbone'),
    BrowserActionApp = require('../app');

  Entities.NetworkCall = Backbone.Model.extend({});

  Entities.NetworkCallCollection = Backbone.Collection.extend({
    model: Entities.NetworkCall
  });
 
module.exports = Entities;
