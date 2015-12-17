var config = {
    mode: "pac_script",
    pacScript: {
        data: "function FindProxyForURL(url, host) {\n" +
        "  if (host === 'pixel.adsafeprotected.com' || host === 'fw.adsafeprotected.com')\n" +
        "    return 'PROXY vendo-122-130.test-adsafeprotected.com';\n" +
        "  return 'DIRECT';\n" +
        "}"
    }
};

chrome.proxy.settings.set(
    {value: config, scope: 'regular'},
    function() {});