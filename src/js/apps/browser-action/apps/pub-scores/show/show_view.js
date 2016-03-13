var Show = {},
    $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    PubScoreTmplt = require('./templates/pub_score.hbs');

  Show.PubScore = Marionette.ItemView.extend({
    template: PubScoreTmplt,
    /**
     * Initialize Materialize Css's tabs once this
     * view has ben inserted into the DOM
     */
    onShow: function() {
      $('ul.tabs').tabs();
    }
  });

  module.exports = Show;

  