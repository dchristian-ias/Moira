/**
 * @module AdsDisplayCollection
 */

var Marionette = require('backbone.marionette');
var messageBus = require ('../controllers/messageBus');
var MetaAdModelItem = require('../views/MetaAdModelItem');

var AdsDisplayCollection = Marionette.CollectionView.extend({
    initialize: function() {
        messageBus.vent.on('inViewBeaconUpdate', this.inViewBeaconUpdate, this);
    },

    el: '<ol/>',

    childView: MetaAdModelItem,

    childEvents: {
        'selected': 'selected'
    },

    inViewBeaconMap: {
        inView: 'https://st.adsafecontrol.com/utilities/DogDiagnostic/assets/green_square.png',
        notInView: 'https://st.adsafecontrol.com/utilities/DogDiagnostic/assets/red_square.png'
    },

    inViewBeaconUpdate: function(asid, viewState) {
        if (viewState === 'inView') {
            this.$el.find('#' + asid).css('list-style-image', 'url("' + this.inViewBeaconMap.inView + '")');
        } else {
            this.$el.find('#' + asid).css('list-style-image', 'url("' + this.inViewBeaconMap.notInView + '")');
        }
    },

    // Adding this method as a bug fix.
    // It seems that the collection creates a phantom model.
    // TODO: research this more and resolve it.
    addChild: function(child, ChildView, index){
        if (child.attributes.id) {
            Backbone.Marionette.CollectionView.prototype.addChild.apply(this, arguments);
        }
    },

    onBeforeAddChild: function(childView){
        childView.$el.html('<span>' + childView.el.id + '</span>');
    },

    selected: function(view) {
        $.each(this.children._views, function(childViewName, childView) {
            if (view.$el !== childView.$el) {
                $(childView.$el.children()[0]).css('color','');
            }
        });
        $(view.$el.children()[0]).css('color','white');
        messageBus.vent.trigger('ad:selected', view.model);
    }
});

module.exports = AdsDisplayCollection;

