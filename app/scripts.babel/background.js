'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
	chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "DIMENSION" }, function(response){
    	console.log("response:  ", response);
        if (response !== null) 
        	console.log('Response:', response);
        else 
        	console.log('Response is null');
    });
  });
});

chrome.runtime.onMessage.addListener(function( msg, sender, sendResponse){
  	let alarm = new Alarm('remindme', 1);
  	if (typeof(msg.message) !== 'undefined' && msg.message === 'killAlarm'){
  		alarm.cancel(); //waiting for response
  	}else
  		if(typeof(msg.message) !== 'undefined' && msg.message === 'createAlarm'){
  			alarm.create(); //returning after answer
  			alarm.check(); //returning after answer
  		}
});