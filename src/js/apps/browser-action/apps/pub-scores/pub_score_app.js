var ShowController = require('./show/show_controller');

    /**
     * When we render the extension's browser action (pop up html),
     * call the showPubScore method and pass it the current URL
     */
    chrome.tabs.getSelected(null, function(tab) {
      ShowController.showPubScore(tab.url);
    });
