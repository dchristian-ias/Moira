var $ = require('jquery'),
    BrowserActionApp = require('./app');

require('./entities/pub_score.js');
require('./apps/header/header_app');
require('./apps/pub-scores/pub_score_app');

BrowserActionApp.start();
