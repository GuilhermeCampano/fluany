'use strict';

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');

console.log("ssss: ", start);

start.addEventListener('click', function(){
	chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "DIMENSION" }, function(response){
            if (response !== null) console.log('Response:', response);
            else console.log('Response is null');
        });
    }); 
});

stop.addEventListener('click', function(){
	console.log('clicked stop');
	// chrome.tabs.executeScript({
	// 	code: 'window.clearInterval(checkVal)'
	// });
});