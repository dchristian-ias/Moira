/** 
 * @module DataDisplayLayout
 */

var Marionette = require('backbone.marionette');
var messageBus = require ('../controllers/messageBus');
var AdModelItem = require('../views/AdModelItem');
var templates = require('../views/templates');

var DataDisplayLayout = Marionette.LayoutView.extend({
	template: templates.dataSelection,

	ui: {
		'screenEvents': '#screen-events',
		'cumulativeStates': '#cumulative-states',
		'networkCalls': '#network-calls',
		'detectionResults': '#detection-results'
	},

	_currentDataSelection: 'screenEvents',

	className: 'data-display-wrap',

	regions: {
		'dataDisplay': '#data-display'
	},

	initialize: function() {
		messageBus.vent.on('ad:selected', this.metaAdModelSelected, this);
	},

	metaAdModelSelected: function(metaAdModel) {
		this._metaAdModel = metaAdModel;
		this.ui[this._currentDataSelection].trigger('click');
	},

	// `onAttach` would have been a better method to use
	// but we can't use it as this region is not shown
	// because it is embedded.
	onShow: function() {
		var self = this,
			selectors = this.ui;

		$.each(selectors, function(selectorKey, $selector) {		
			$selector.on('click', function() {

				self._currentDataSelection = selectorKey;

				if (self._metaAdModel) {
					self.dataDisplay.show(new AdModelItem({'model': self._metaAdModel.attributes.ad.models[selectorKey]}));
				}
				
				$.each(selectors, function(_selectorKey, _$selector) {
					if (_$selector !== $selector) {
						_$selector.removeClass('data-model-selected');
					}
				});

				$(this).addClass('data-model-selected');
			});
		});
	}
});

module.exports = DataDisplayLayout;
