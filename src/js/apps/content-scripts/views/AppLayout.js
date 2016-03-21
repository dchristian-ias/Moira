/** 
 * @module AppLayout
 */
var Marionette = require('backbone.marionette'),
    mainContainerTmplt = require('./templates/main_container.hbs');

var AppLayout = Marionette.LayoutView.extend({
	tagName: 'div',
	id:'dog-diagnostic-controller',
	className: 'main-container',
	template: mainContainerTmplt,
	regions:{adList:'#ads-found-container'},
	onRender: function() {
		this.$el.appendTo(document.body);
		this.$el.drags();
	}
});

module.exports = AppLayout;
