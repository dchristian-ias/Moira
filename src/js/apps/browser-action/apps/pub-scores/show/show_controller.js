var BrowserActionApp = require('../../../app'),
    Show = require('./show_view'),
    
    /**
     * Define the API interface for the PubScore's Show Controller
     */
    Controller = {
      showPubScore: function(pubUrl) {
        var pubScoreLayout, adFraudView, overviewView, 
        fetchingPubScore, viewabilityView, brandSafetyView;

        fetchingPubScore = BrowserActionApp.request('pubScore:entity', pubUrl);

        $.when(fetchingPubScore).done(function(pubScore) {

          if(pubScore !== undefined) {
            /**
             * If pubScore model is successfully retrieved, then 
             * instantiate the Pub Score Layout and all of its subviews
             */
            pubScoreLayout = new Show.PubScore({ model: pubScore });
            adFraudView = new Show.PubScore.AdFraud({ model: pubScore });
            overviewView = new Show.PubScore.Overview({ model: pubScore });
            viewabilityView = new Show.PubScore.Viewability({ model: pubScore });
            brandSafetyView = new Show.PubScore.BrandSafety({ model: pubScore });

            /**
             * Display the the Pub Score Layout in the main
             * region of the Browser Action App. Then, display 
             * all of the subviews in the Pub Score Layout,
             * these sub views contain content for each tabs displayed
             */  
            BrowserActionApp.regions.main.show(pubScoreLayout);
            pubScoreLayout.overview.show(overviewView);
            pubScoreLayout.brandSafety.show(brandSafetyView);
            pubScoreLayout.adFraud.show(adFraudView);
            pubScoreLayout.viewability.show(viewabilityView);

          } 
        });
      }
    };

module.exports = Controller;