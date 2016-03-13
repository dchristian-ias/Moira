var BrowserActionApp = require('../../../app'),
    Show = require('./show_view'),
    
    /**
     * Define the API interface for the Header's Show Controller
     */
    Controller = {
      showHeader: function() {
        var headerView = new Show.Header();
          BrowserActionApp.regions.header.show(headerView);
      }
    };

module.exports = Controller;