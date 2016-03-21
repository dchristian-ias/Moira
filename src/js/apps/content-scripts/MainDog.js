/**
 * @module MainDog
 */

require('./Bootstrapper');
//hopefully this makes the plugin avaialable
var draggable = require('./extplugins/jquery-draggable');

var App = require('./controllers/App');
var isTop = false;
try {
    isTop = window === window.top;
} catch (e) {}
if(isTop) {
    new App().start();
}




