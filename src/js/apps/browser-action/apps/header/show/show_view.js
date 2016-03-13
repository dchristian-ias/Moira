var Show = {},
    Marionette = require('backbone.marionette'),
    HeaderTmplt = require('./templates/header.hbs');

  Show.Header = Marionette.ItemView.extend({
    template: HeaderTmplt
  });

  module.exports = Show;

  