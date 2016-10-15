'use strict';

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');
var alarm = new Alarm('remindme');

start.addEventListener('click', function () {
	alarm.create();
	alarm.check();
});

stop.addEventListener('click', function () {
	alarm.cancel();
});