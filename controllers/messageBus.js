/** 
 * @module messageBus
 */
 
var Wreqr = require('backbone.wreqr');

// Future iterations can export other Wreqr objects.
module.exports.vent = new Wreqr.EventAggregator();
