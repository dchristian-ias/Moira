/** 
 * @module AppLayout
 */

var Marionette = require('backbone.marionette');

var AppLayout = Marionette.LayoutView.extend({
	tagName: 'div',
	className:'dog-diagnostic-controller',
	template: require('../views/templates').mainContainer,
	regions:{adList:'#ads-found-container'},
	onRender: function() {
		this.$el.appendTo(document.body);
		this.$el.drags();
	}
});

module.exports = AppLayout;
