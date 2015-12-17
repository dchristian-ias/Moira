var configMap = {
    useProxy: {
        mode: "pac_script",
        pacScript: {
            data: "function FindProxyForURL(url, host) {\n" +
            "  if (host === 'pixel.adsafeprotected.com' || host === 'fw.adsafeprotected.com')\n" +
            "    return 'PROXY vendo-122-130.test-adsafeprotected.com';\n" +
            "  return 'DIRECT';\n" +
            "}"
        }
    },
    noProxy: {
        mode: "direct"
    }
};

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        var config;
        if (message.useProxy === true) {
            config = configMap.useProxy;
            chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            });
        } else if (message.useProxy === false) {
            config = configMap.noProxy;
            chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            });
        }
    });
});


