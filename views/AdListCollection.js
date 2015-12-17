var Marionette = require('backbone.marionette');
var SmallAdView = Marionette.ItemView.extend({
    tagName:'li',
    template:require('../views/templates').smallAdView
});

var AdListCollection = Marionette.CollectionView.extend({
    tagName:'ol',
    className:'small-ad-display',
    childView:SmallAdView
});

module.exports = AdListCollection;