// ==UserScript==
// @name         IAS Diagnostic
// @version      0.0.1
// @description  A tool for exploring IAS JavaScript Tagged ads.
// @author       Daniel A. Deychakiwsky
// @grant        none
// ==/UserScript==

/** bootstrapper - this will load the Diagnostic add-on. */

(function(){

    var missedMessages = [];

    var capture = function(evt) {
        var i, forwardedEvt;

        if(evt.data === 'DOGDIAGNOSTICREADY') {
            window.removeEventListener('message', capture);
            for(i = 0; i < missedMessages.length; i++) {
                try {
                    window.postMessage(missedMessages[i].data, '*');
                } catch (e) { }
            }
        } else {
            forwardedEvt = evt.data;
            //TODO: Find a way to id the original source here in casenecesaary for highlighting relevant frame.SSSS
            // forwardedEvt.fromSource = evt.source;
            // forwardedEvt.isForwarded = true;
            missedMessages.push(evt);
        }
    };

    window.addEventListener('message', capture);

})();
