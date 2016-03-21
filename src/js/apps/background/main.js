var ContentScript,
    IasTags = window.IasTags = {};

// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
//   console.log('Tab Change??');
//   console.log(changeInfo.status === "loading"); && changeInfo.url === undefined
//   if(changeInfo.status === "loading") {
//     console.log('Update??');
//     window.IasTags = {};
//   }
// });

chrome.runtime.onConnect.addListener(function(port) {
 /**
  * Check that a connection with the content script has been made
  */
  if (port.name === 'ContentScript') {
    ContentScript = port;
  }
 /**
  * If a connection with the Content Script has been made,
  * listen to incoming messages, set tag data on background 
  * page window..
  */
  ContentScript.onMessage.addListener(function(msg) {
    var channel = msg.iasTagCall.channel,
        asid = msg.iasTagCall.asid;
    
    if(!IasTags[asid]) { IasTags[asid] = {}; }
    if(!IasTags[asid][channel]) { IasTags[asid][channel] = []; }      
    
    IasTags[asid][channel].push(msg.iasTagCall);
  });
});

