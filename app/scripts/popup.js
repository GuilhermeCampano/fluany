'use strict';

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');
var alarm = new Alarm('remindme', 1);
var playing = false;
var svg = document.querySelector('svg.buttonPlay');

start.addEventListener('click', function () {

	//checking that is already started ::toggle
	chrome.storage.sync.get('playing', function (obj) {
		if (obj.playing) {
			chrome.storage.sync.set({ playing: false }, function () {
				console.log('PLAY');
				iconPlay();

				alarm.cancel(); //STOP
			});
		} else {
			chrome.storage.sync.set({ playing: true }, function () {
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

var rangeValue = function rangeValue() {
	var newValue = elem.value;
	var target = document.querySelector('#valueMinute');
	target.innerHTML = newValue;
};

elem.addEventListener("input", rangeValue);

/*
* Btn play/stop
**/

chrome.storage.sync.get('playing', function (obj) {
	if (obj.playing) {
		iconStop();
	} else {
		iconPlay();
	}
});

//icons toggle
function iconStop() {
	var animate = document.querySelector('#animate_to_stop');
	var title = document.querySelector('#playTitle');
	animate.beginElement();
	title.innerHTML = 'click to stop';
}

function iconPlay() {
	var animate = document.querySelector('#animate_to_play');
	var title = document.querySelector('#playTitle');
	animate.beginElement();
	title.innerHTML = 'click to play';
}

//Request Categories
/* What's missing is the API ::get LANGUAGES
let selectElement = document.querySelector('#slct'),
	request = new XMLHttpRequest(),
	content = '',
	opt;
const BASE_API = 'https://capylang.herokuapp.com'; //api
request.open('GET', BASE_API+'/api/languages', true);
request.onload = function() {
	if ( request.status >= 200 && request.status < 400 ) {
		content = JSON.parse(request.responseText).categories;
		content = content.map( n  => {
			return n
			.slice(0, n.indexOf('.txt'))
			.slice(0, n.indexOf('-pt'))
			.slice(0, n.indexOf('-eng'))
			.replace(/-/g, ' ');
		})
		//print
		console.log(`CATEGORIES: `);
		content.map((n, i) => {
			opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = n;
			selectElement.appendChild(opt); 
		});
	}else{
		console.log('is not working...')
	}
};
request.send(); */