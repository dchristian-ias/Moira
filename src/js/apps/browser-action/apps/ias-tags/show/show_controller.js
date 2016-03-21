var Show = require('./show_view'),
    BrowserActionApp = require('../../../app'),
    
    /**
     * Define the API interface for the IAS Tag's Show Controller
     */
    Controller = {
      showIasTags: function() {
        var iasTagsLayout,
            fetchingIasTags = BrowserActionApp.request('iasTag:entities');

        $.when(fetchingIasTags)
        .done(function(iasTags) {
          iasTagsLayout = new Show.IasTagsLayout();
          iasTagsContainer = new Show.IasTagsContainer({collection: iasTags});
          BrowserActionApp.regions.iasTags.show(iasTagsLayout);
          iasTagsLayout.tagsContainer.show(iasTagsContainer);
        });
      }
    };

module.exports = Controller;