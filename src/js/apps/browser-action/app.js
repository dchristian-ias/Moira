var $ = require('jquery'),
    Backbone = require('backbone'),
    Materialize = require('materialize-js'),
    Marionette = require('backbone.marionette'),
    BrowserActionApp = new Marionette.Application();
  
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",
    regions: {
      header: "#header-region",
      main: "#main-region",
      dialog: "#dialog-region"
    }
  });
    
  BrowserActionApp.regions = new RegionContainer();

  module.exports = BrowserActionApp;