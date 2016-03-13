(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var configMap = {
    useProxy: {
        mode: "pac_script",
        pacScript: {
            data: "function FindProxyForURL(url, host) {\n" +
            "  if (host === 'pixel.adsafeprotected.com' || host === 'fw.adsafeprotected.com')\n" +
            "    return 'PROXY vendo-123-176.test-adsafeprotected.com';\n" +
            "  return 'DIRECT';\n" +
            "}"
        }
    },
    noProxy: {
        mode: "direct"
    }
};

var getPersistentSetting = function() {
    return window.localStorage.useProxy === 'true';
};

var setPersistentSetting = function(value) {
    window.localStorage.useProxy = value + '';
};

var port = chrome.runtime.connect({name: 'settings'});
var initialSetting = getPersistentSetting();
port.postMessage({useProxy: initialSetting});


chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        var config;
        if (message.useProxy === 'true') {
            config = configMap.useProxy;
            chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            });
        } else if (message.useProxy === 'false'){
            config = configMap.noProxy;
            chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            });
        }
        setPersistentSetting(message.useProxy);
    });
});

},{}]},{},[1]);
