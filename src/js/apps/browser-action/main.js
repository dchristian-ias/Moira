/**
 * App Init
 * Main entry point for Browserify
 */
var BrowserActionApp = require('./app');

require('./entities/ias_tag.js');
require('./entities/pub_score.js');
require('./entities/network_call.js');
require('./entities/screen_event.js');

require('./apps/ias-tags/ias_tags_app');
require('./apps/pub-scores/pub_scores_app');


BrowserActionApp.start();
