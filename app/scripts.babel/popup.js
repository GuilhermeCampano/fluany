'use strict';

var start = document.querySelector('#start');
console.log("ssss: ", start);
start.addEventListener('click', function(){
	console.log('clicked');
	chrome.alarms.create('starting', {
		when: Date.now() + 5000,
		periodInMinutes: 1
	});
})