'use strict';

let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let alarm = new Alarm('remindme', 1);
let playing = false;
let svg = document.querySelector('svg.buttonPlay');

start.addEventListener('click', function(){

	//checking that is already started ::toggle
	chrome.storage.sync.get('playing', (obj) => {
		if(obj.playing){
			chrome.storage.sync.set({playing: false}, function() {
				console.log('PLAY');
				iconPlay();
				
				alarm.cancel(); //STOP
			});
		}else{
			chrome.storage.sync.set({playing: true}, function() {
				console.log('STOP');
				iconStop();
				
				alarm.create(); //PLAY
			});
		}
	});
});

/*
* Range
**/

var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('#valueMinute');
  target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);

/*
* Btn play/stop
**/

chrome.storage.sync.get('playing', (obj) => {
	if(obj.playing){	
		iconStop();
	}else{
		iconPlay();
	}
});

//icons toggle
function iconStop(){
	let animate = document.querySelector('#animate_to_stop');
	let title = document.querySelector('#playTitle');
	animate.beginElement();
	title.innerHTML = 'click to stop';
}

function iconPlay(){
	let animate = document.querySelector('#animate_to_play');
	let title = document.querySelector('#playTitle');
	animate.beginElement();
	title.innerHTML = 'click to play';
}