'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Capy'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
});