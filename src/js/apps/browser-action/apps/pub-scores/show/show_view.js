var Show = {},
    $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    pubScoreLayout = require('./templates/pub_scores.hbs'),
    overviewTmplt = require('./templates/overview.hbs'),
    adFraudTmplt = require('./templates/ad_fraud.hbs'),
    brandSafetyTmplt = require('./templates/brand_safety.hbs'),
    viewabilityTmplt = require('./templates/viewability.hbs');

    Show.PubScore = Marionette.LayoutView.extend({
      
      template: pubScoreLayout,
      
      regions: {
        overview: "#overview",
        brandSafety: "#brand-safety",
        adFraud: "#ad-fraud",
        viewability: "#viewability"
      },
      /**
       * Initialize Materialize Css's tabs once this
       * view has ben inserted into the DOM
       */
      onShow: function() {
        $('ul.tabs').tabs();
      }
    });

    Show.PubScore.Overview = Marionette.ItemView.extend({
      template: overviewTmplt
    });

    Show.PubScore.AdFraud = Marionette.ItemView.extend({
      template: adFraudTmplt
    });

    Show.PubScore.BrandSafety = Marionette.ItemView.extend({
      template: brandSafetyTmplt
    });

    Show.PubScore.Viewability = Marionette.ItemView.extend({
      template: viewabilityTmplt
    });

   module.exports = Show;
