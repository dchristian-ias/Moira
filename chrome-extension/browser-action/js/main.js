// var port = chrome.runtime.connect({name: 'settings'});

// var initialSetting;

// chrome.runtime.onConnect.addListener(function(port) {
//     port.onMessage.addListener(function(message) {
//         initialSetting = message.useProxy + '';
//     });
// });

// var proxySettingsController = {
//     getUseProxySetting: function() {
//         return document.getElementById('useProxy').checked + '';
//     },
//     setUseProxySetting: function(value) {
//         document.getElementById('useProxy').checked = value ? true : false;
//     }
// };

// document.addEventListener("DOMContentLoaded", function () {
//     var button = document.getElementById('update');
//     proxySettingsController.setUseProxySetting((initialSetting === 'true' || initialSetting === true));
//     button.addEventListener('click', function(e) {
//         var useProxy = proxySettingsController.getUseProxySetting();
//         port.postMessage({useProxy: useProxy});
//         window.close();
//     });
// });