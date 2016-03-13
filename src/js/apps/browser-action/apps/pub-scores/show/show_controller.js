var BrowserActionApp = require('../../../app'),
    Show = require('./show_view'),
    
    /**
     * Define the API interface for the PubScore's Show Controller
     */
    Controller = {
      showPubScore: function(pubUrl) {
        var pubScoreView,
            fetchingPubScore = BrowserActionApp.request('pubScore:entity', pubUrl);

        $.when(fetchingPubScore).done(function(pubScore) {

          if(pubScore !== undefined) {
            pubScoreView = new Show.PubScore({ model: pubScore });
          } else {
            pubScoreView = new Show.MissingPubScore();
          }
          BrowserActionApp.regions.main.show(pubScoreView);
        });
      }
    };

module.exports = Controller;