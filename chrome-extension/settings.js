var port = chrome.runtime.connect({name: 'settings'});

var proxySettingsController = {
    getUseProxySetting: function() {
        return document.getElementById('useProxy').checked;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById('update');
    var useProxy = proxySettingsController.getUseProxySetting();
    port.postMessage({useProxy: useProxy});
    button.addEventListener('click', function(e) {
        var useProxy = proxySettingsController.getUseProxySetting();
        port.postMessage({useProxy: useProxy});
    });
});