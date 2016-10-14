'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BASE_API = 'https://capylang.herokuapp.com'; //api

//Storage in chrome

var putStorage = function putStorage(key, value) {
	var obj = _defineProperty({}, key, value);
	chrome.storage.sync.set(obj, function () {
		console.log(key + ' saved');
	});
};

//Start application with args (category, interval)
var capylangStart = function capylangStart() {
	var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var minutesInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	//verify
	var phrases = {};
	console.log("deu certo");
	chrome.storage.sync.get('phrases', function (obj) {
		if (obj.phrases) {
			phrases = obj.phrases;
			console.log("phrase recebeu obj: ", phrases);
		} else {
			(function () {
				var request = new XMLHttpRequest();
				var _args = {};
				request.open('GET', BASE_API + '/api/eng/readphrases/?id=' + category, true); ///get options in gulp
				request.onload = function () {
					if (request.status >= 200 && request.status < 400) {
						_args = JSON.parse(request.responseText);
						phrases = _args.phrases;
						minutesInterval = _args.minutesInterval;
						putStorage('phrases', phrases);
						console.log("inseriiu: ", phrases);
					} else {
						// We reached our target server, but it returned an error
						console.log("error in server");
					}
				};
				request.onerror = function () {
					// There was a connection error of some sort
				};
				request.send();
			})();
		}
	});

	function getRandomQuestion() {
		var randOddNumber = 1,
		    randQuestion = void 0,
		    responseQuestion = void 0;

		var rand = Math.floor(Math.random() * phrases.length);

		if (rand != 0) randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd 
		randQuestion = phrases[randOddNumber].toLowerCase().removeDot();

		responseQuestion = phrases[randOddNumber - 1].toLowerCase().removeDot();

		//get multiple response
		responseQuestion = responseQuestion.split('/').map(function (n) {
			return n.trim();
		});
		// console.log('-->',responseQuestion);
		seeQuestion(randQuestion, responseQuestion);
	}

	//check response with value entered, with multiple response
	function checkResponse(response, valueEntered) {
		return response.some(function (n) {
			return n.toLowerCase() === valueEntered.toLowerCase();
		});
	}

	//if checked is true, capylang alert!
	function seeQuestion(phrase, response) {
		view.input({
			type: 'text',
			placeholder: 'Translate to portuguese here',
			prefilledValue: ''
		}, phrase, 'Submit', 'I don\'t know =(', function (valueEntered) {
			if (checkResponse(response, valueEntered)) {
				view.alert(1, 'Right! 👊 (• ͜ʖ•)', 2);
			} else {
				view.alert(3, '<b>' + response + '</b> =(', 2);
			}
		}, function (valueEntered) {
			view.alert(3, '<b>' + response + '</b>', 2);
		});
	}

	// Check Data

	// let isStarted = ls2.load('capylangInterval');	
	var checkVal = window.setInterval(function () {
		getRandomQuestion();
	}, minutesInterval * 60 * 1000);

	//remove dot in final str
	String.prototype.removeDot = function () {
		return this[this.length - 1] === '.' ? this.slice(0, this.indexOf(this[this.length - 1])) //final text
		: /* ;^;  */this;
	};
};

capylangStart(0, 1);