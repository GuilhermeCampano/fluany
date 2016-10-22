import Alarm from 'shared/Alarms';
// Setting popup icon

// When we defined browser_action
if(chrome.browserAction) {
  chrome.browserAction.setIcon({
    path: require("icons/icon-16.png")
  })

// When we defined page_action
} else if(chrome.pageAction) {

  const showPageAction = function(tabId) {
    chrome.pageAction.show(tabId);

    chrome.pageAction.setIcon({
      path: require("icons/icon-48.png"),
      tabId: tabId
    })
  }

  // Show page action on each page update
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    showPageAction(tabId)
  });
}


chrome.alarms.onAlarm.addListener(function( alarm ) {
  chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "LOAD" }, function(response){
      console.log("response:  ", response);
        if (response !== null) 
          console.log('Response:', response);
        else 
          console.log('Response is null');
    });
  });
});

chrome.runtime.onMessage.addListener(function( msg, sender, sendResponse){
  
  let alarm = new Alarm('remindme',1); //default

  //component start : putStorage > get
  chrome.storage.sync.get('rangeInterval', (obj) => { 
    //get value in localStorage created by component [ButtonStart]
    alarm = new Alarm('remindme', obj.rangeInterval);

    // alarm = new Alarm('reamindme', inter);
    if(typeof(msg.message) !== 'undefined' && msg.message === 'createAlarm'){
      alarm.create(); //returning after answer
      alarm.check(); //returning after answer
    }else if (typeof(msg.message) !== 'undefined' && msg.message === 'killAlarm'){
      alarm.cancel(); //waiting for response
    }
  })
});