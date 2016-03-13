/**
* @module NetworkCalls
*/

var Backbone = require('backbone');
var NetworkCall = Backbone.Model.extend({});
var NetworkCalls = Backbone.Collection.extend({
	model:NetworkCall
});
module.exports = NetworkCalls;
