"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BASE_API = 'https://capylang.herokuapp.com'; //api

/*
* NEED to be JSON IN FILE EXTERNAL --> _locales
* for language : [
*	"learn_language"
* ]
*/
var SUPPORTED_LANGUAGES = {
	"portuguese": ["english"]
};

var MESSAGES_VIEW_RIGHT = {
	"portuguese": "Aê, acertou!",
	"english": "Uow, right!"
};

var MESSAGES_VIEW_TRANSLATEHERE = {
	"portuguese": "Traduza aqui em português",
	"english": "Translate to portuguese here"
};

var MESSAGE_VIEW_BUTTONS = {
	"portuguese": ["Enviar", "Não sei"],
	"english": ["Submit", "I don't know"]
};

//Storage in chrome
var putStorage = function putStorage(key, value) {
	var obj = _defineProperty({}, key, value);
	chrome.storage.sync.set(obj, function () {
		console.log(key + " saved");
	});
};

//Start application with args (category, interval)
var capylangStart = function capylangStart() {
	var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var minutesInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "english_portuguese";

	//verify
	var phrasesFull = {};
	var phrasesStep = {}; //each step needs to save in local storage, to hit all
	var level = 1; //global
	/**
 * GET phrases in API and save in local storage or GET local storage
 */
	chrome.storage.sync.get('phrases', function (obj) {
		if (obj.phrases) {
			console.log("JA TINHA SALVO");
			phrasesFull = obj.phrases;
		} else {
			(function () {

				var request = new XMLHttpRequest();
				var _args = {};
				request.open('GET', BASE_API + "/api/eng/readphrases/?id=" + category, true); ///get options in gulp
				request.onload = function () {
					if (request.status >= 200 && request.status < 400) {
						_args = JSON.parse(request.responseText);
						phrasesFull = _args.phrases;
						minutesInterval = _args.minutesInterval;
						putStorage('phrases', phrasesFull);
						console.log("inseriiu: ", phrasesFull);
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

	/**
 * Clean Levels
 */
	function cleanLevels() {
		chrome.storage.sync.remove('levelStep', function () {
			console.log('clean');
		});
	}

	/**
 * GET Local storage the phrases of the level
 */
	function getRandomQuestion() {
		console.log("UUUH");
		chrome.storage.sync.get('levelStep', function (obj) {

			if (obj.levelStep['phraseStep']) {
				//has object
				console.log(obj.levelStep);
				console.log("Já está em algum nível: ", obj.levelStep['phraseStep']);
				phrasesStep = obj.levelStep['phraseStep'];
				level = obj.levelStep['level'];
				console.log('levelStep: ', phrasesStep);
				console.log('LEVEL: ', level);
			} else {

				if (obj.levelStep['level'] === 'next') obj.levelStep['level'] = level++; //next leveland and save local

				phrasesStep = phrasesFull.slice(level === 1 ? 0 : level * 10 - 10, level * 10);
				console.log("phraseStep:", phrasesStep);
				putStorage('levelStep', { level: 1, phraseStep: phrasesStep });
				console.log("saved phraseStep:", phrasesStep);
			}

			// cleanLevels();

			var randOddNumber = 1,
			    randQuestion = void 0,
			    responseQuestion = void 0;

			var rand = Math.floor(Math.random() * phrasesStep.length);

			if (rand != 0) randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd 
			randQuestion = phrasesStep[randOddNumber].toLowerCase().removeDot();

			responseQuestion = phrasesStep[randOddNumber - 1].toLowerCase().removeDot();

			//get multiple response
			responseQuestion = responseQuestion.split('/').map(function (n) {
				return n.trim();
			});
			// console.log('-->',responseQuestion);
			seeQuestion(randQuestion, responseQuestion);
		});
	}

	//check response with value entered, with multiple response
	function checkResponse(response, valueEntered) {
		return response.some(function (n) {
			return n.toLowerCase() === valueEntered.toLowerCase();
		});
	}

	//capylang alert with question
	function seeQuestion(phrase, response) {
		var userLang = lang.split('_')[1];

		//stop alarm: 
		chrome.runtime.sendMessage({ message: "killAlarm" }, function (response) {});

		view.input({

			type: 'text',
			placeholder: "" + MESSAGES_VIEW_TRANSLATEHERE[userLang],
			prefilledValue: ''

		}, phrase, "" + MESSAGE_VIEW_BUTTONS[userLang][0], //submit
		MESSAGE_VIEW_BUTTONS[userLang][1] + " =(", //I don't know
		function (valueEntered) {
			if (checkResponse(response, valueEntered)) {
				//you're right
				chrome.storage.sync.get('levelStep', function (obj) {
					/*
     * Get message in lang of the user -> eng_pt (::lang learn_your lang)
     */
					view.alert(1, MESSAGES_VIEW_RIGHT[userLang] + " \uD83D\uDC4A (\u2022 \u035C\u0296\u2022)", 2);
					//remove in array phrase :: Array Level [phrases]
					phrasesStep = phrasesStep.filter(function (item) {
						return item.toLowerCase().removeDot().trim() !== valueEntered;
						//remove phrase
					}).filter(function (item) {
						return item.toLowerCase().removeDot().trim() !== phrase;
					});
					//::update local storage
					if (phrasesStep.length > 0) {
						putStorage('levelStep', { level: level, phraseStep: phrasesStep });
					} else {
						putStorage('levelStep', { level: 'next' });
					}
					console.log("nova frase: ", phrasesStep);
				});
			} else {

				view.alert(3, '<b>' + response + '</b> =(', 2);
			}
			//Create again :: Was a break from the application to receive the answer
			chrome.runtime.sendMessage({ message: "createAlarm" }, function (response) {});
		}, function (valueEntered) {
			view.alert(3, '<b>' + response + '</b>', 2);

			//Create again :: Was a break from the application to receive the answer
			chrome.runtime.sendMessage({ message: "createAlarm" }, function (response) {});
		});
	}

	//remove dot in final str
	String.prototype.removeDot = function () {
		return this[this.length - 1] === '.' ? this.slice(0, this.indexOf(this[this.length - 1])) :
		/* ;^;  */this;
	};

	/************************************************************************/

	//Messages Passing
	chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
		if (msg.message && msg.message == "GET_QUESTION") {
			getRandomQuestion(1);
		}
		return true;
	});

	chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
		if (msg.message && msg.message == "DIMENSION") {
			getRandomQuestion();
		}
		return true;
	});
	getRandomQuestion();
};

capylangStart(0, 1, "english_portuguese");