var Show = {},
    $ = require('jquery'),
    Marionette = require('backbone.marionette'),
    dtCallsTmplt = require('./templates/dt_calls.hbs'),
    iasTagTmplt = require('./templates/ias_tag.hbs'),
    iasTagsLayoutTmplt = require('./templates/ias_tags_layout.hbs');

    Show.DtCalls = Marionette.ItemView.extend({
      template: dtCallsTmplt,
      className: 'dt-call-container z-depth-1',
    });

    Show.IasTagsLayout = Marionette.LayoutView.extend({
      template: iasTagsLayoutTmplt,
      regions: {
        tagsContainer: "#tags-container"
      }
    });

    Show.IasTag = Marionette.LayoutView.extend({
      
      template: iasTagTmplt,
      
      className: 'ias-tag-container',

      regions: {
        dtCalls: '#dt-calls-container'
      },

      events: {
        "click .ias-ad-outline": "setHighlighting",
        "mouseover .ias-ad-outline": "showDtCalls",
        "mouseout .ias-ad-outline": "hideDtCalls"
      },

      onRender: function() {
        var dtCalls = new Show.DtCalls({ model: this.model });
        this.dtCalls.show(dtCalls);
      },
      
      setHighlighting: function() {
        var self = this,
            isHighlighted = self.model.get('isHighlighted'),
            toggleHiglight = {
              channel: 'FirewallJSAction',
              asid: self.model.get('asid'),
              data: { action: 'highlightContainer', enable: !isHighlighted } 
            };

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, toggleHiglight);
          chrome.tabs.sendMessage(tabs[0].id, {action: 'scroll', yCoordinates: self.model.get('adCoordinates').y});
          self.$('.ias-ad-outline').toggleClass('highlight');
          self.model.set('isHighlighted', !isHighlighted);
        });

      },

      showDtCalls: function() {
        this.$('.dt-call-container').show();
        console.log("showDtCalls");
      },

      hideDtCalls: function() {
        this.$('.dt-call-container').hide();
        console.log("hideDtCalls");
      }

    });

    Show.IasTagsContainer = Marionette.CollectionView.extend({
      childView: Show.IasTag
    });

   module.exports = Show;
