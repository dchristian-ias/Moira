var configMap = {
    useProxy: {
        mode: "pac_script",
        pacScript: {
            data: "function FindProxyForURL(url, host) {\n" +
            "  if (host === 'pixel.adsafeprotected.com' || host === 'fw.adsafeprotected.com')\n" +
            "    return 'PROXY vendo-122-99.test-adsafeprotected.com';\n" +
            "  return 'DIRECT';\n" +
            "}"
        }
    },
    noProxy: {
        mode: "direct"
    }
};

var getPersistentSetting = function() {
    return window.localStorage['useProxy'] === 'true';
};

var setPersistentSetting = function(value) {
    window.localStorage['useProxy'] = value + '';
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


