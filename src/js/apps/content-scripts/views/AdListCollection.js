var Marionette = require('backbone.marionette'),
    NetworkCallComposite = require('../views/NetworkCallComposite'),
    smallAdViewTmplt = require('./templates/small_ad_view.hbs');

var SmallAdView = Marionette.LayoutView.extend({
    tagName:'li',
    className:'na',
    template: smallAdViewTmplt,
    modelEvents:{
        'change:viewState':'updateDisplay',
        'change:highlighted':'setHighlighting',
        'change:tagIdType':'setIds'
    },
    regions:{
        dtDisplay:'.dt-calls'
    },
    onRender: function(){
      this.dtDisplay.show(new NetworkCallComposite({
          collection: this.model.models.networkCalls
      }));
    },
    setIds:function(){
        this.$('.idType').text(this.model.get('tagIdType'));
        this.$('.tagId').text(this.model.get('tagId'));
    },
    events:{
        click:'toggleHighlightingOnModel'
    },
    updateDisplay:function(){
      this.el.className = this.model.get('viewState');
    },
    toggleHighlightingOnModel:function(){
        this.model.set('highlighted', !this.model.get('highlighted'));
    },
    setHighlighting:function(){
        var model = this.model;
        if(model.postSource) {
            model.postSource.postMessage(JSON.stringify({
                channel: 'FirewallJSAction',
                asid: model.id,
                data: {
                    action: 'highlightContainer',
                    enable: model.get('highlighted')
                }
            }), '*');
        }
    }
});

var AdListCollection = Marionette.CollectionView.extend({
    tagName:'ol',
    className:'small-ad-display',
    childView:SmallAdView
});

module.exports = AdListCollection;