'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    chrome.tabs.query({ active: true, highlighted: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "DIMENSION" }, function (response) {
            if (response !== null) console.log('Response:', response);else console.log('Response is null');
        });
    });
});