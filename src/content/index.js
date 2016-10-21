import {BASE_API} from 'shared/constants/constants';

import * as message from 'shared/constants/internacionalization';

import Alarm from 'shared/Alarms';

import {putStorage, cleanLevels, getProperty} from 'shared/helpers';

import {view} from 'shared/view';
import 'shared/view_css';

//Start application with args (category, interval)
let load = (category = 0, minutesInterval = 1, lang = "english") => {

	//verify
	let phrasesFull = {};
	let phrasesStep = {}; //each step needs to save in local storage, to hit all
	let level = 1; //global

	/**
	* GET phrases in API and save in local storage or GET local storage
	*/
	chrome.storage.sync.get('phrases', (obj) => {
		if(obj.phrases){
			console.log("I had been saved");
			phrasesFull = obj.phrases;

		} else {

			let request = new XMLHttpRequest();
			let _args = {};
			request.open('GET', `${BASE_API}/api/eng/readphrases/?id=${category}`, true); ///get options in gulp
			request.onload = function() {

				if (request.status >= 200 && request.status < 400) {
					_args = JSON.parse(request.responseText);
					phrasesFull = _args.phrases;
					minutesInterval = _args.minutesInterval;
					putStorage('phrases', phrasesFull);
					console.log("entered: ", phrasesFull);
				} else {
					// We reached our target server, but it returned an error
					console.log("error in server");
				}

			};

			// There was a connection error of some sort
			request.onerror = function() {
				console.log('error request');
			};
			request.send();
		}
	});


	/**
	* GET Local storage the phrases of the level
	*/
	function getRandomQuestion(){

		let newObjectLocal = {};
		chrome.storage.sync.get('levelStep', (obj) => {

			if(getProperty(obj, "levelStep.phraseStep")){ //has object

				console.log("continuing level");

				phrasesStep = obj.levelStep['phraseStep'];
				level       = obj.levelStep['level'];

				console.log('level: ', level);
			} else {
				// after emptying the array, enter here ::update level variable
				if(getProperty(obj, "levelStep.level")){
					level = obj.levelStep['level']; //update :: save after
					console.log('AVANCOU DE NIVEL PARA: ', level);
				}

				//takes a piece to train
				phrasesStep = phrasesFull.slice(level === 1 ? 0: (level*10) - 10, level * 10);
				console.log("phraseStep:", phrasesStep);

				//inserting again, beacause ::phrases
				newObjectLocal['level'] = level;

				newObjectLocal['phraseStep'] = phrasesStep;
				putStorage('levelStep', newObjectLocal); //Savng objectlocal in Storage

			}

			// cleanLevels(); debug or new feature

			let randOddNumber = 1,
				randQuestion,
				responseQuestion;

			let rand = Math.floor(Math.random() * phrasesStep.length);

			//Get a random question
			if( rand != 0 )
				randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd

				randQuestion = phrasesStep[randOddNumber]
					.toLowerCase()
					.removeDot();

				responseQuestion = phrasesStep[randOddNumber - 1]
					.toLowerCase()
					.removeDot();

			//get multiple response
			responseQuestion = responseQuestion
				.split('/')
				.map(n => n.trim());
			// console.log('-->',responseQuestion);
			seeQuestion(randQuestion, responseQuestion);
		});
	}

	//check response with value entered, with multiple response
	function checkResponse(response, valueEntered){
		return response.some((n) => n.toLowerCase() === valueEntered.toLowerCase());
	}

	//capylang alert with question
	function seeQuestion(phrase, response){

		//stop alarm: ::waiting user with a answer
		chrome.runtime.sendMessage({message: "killAlarm"}, function(response) {	});


		view.input({

			type: 'text',
			placeholder: `${message.TRANSLATEHERE}`,
			prefilledValue: ''

		}, phrase
		 ,`${message.BUTTONS[0]}` //submit
		 ,`${message.BUTTONS[1]} =(` //I don't know
		 ,function(valueEntered) {

				if(checkResponse(response, valueEntered)){
					//you're right
					chrome.storage.sync.get('levelStep', obj => {

						/*
						* Get message in lang of the user -> eng_pt (::lang learn_your lang)
						*/
						view.alert(1, `${message.RIGHT} 👊 (• ͜ʖ•)`, 2);

						//remove in array phrase :: Array Level [phrases]
						phrasesStep = phrasesStep
							.filter(item => (item.toLowerCase().removeDot() !== valueEntered))
							.filter(item => (item.toLowerCase().removeDot() !== phrase));

						//::update local storage
						if(phrasesStep.length > 0){
							putStorage('levelStep', {level: level, phraseStep: phrasesStep});
						}else{
							putStorage('levelStep', {level: ++level});
						}
						console.log("new phrases: ", phrasesStep);
					});
				} else {

					view.alert(3, '<b>' + response + '</b> =(', 2);

				}
				//Create again :: Was a break from the application to receive the answer
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
	    }
	   ,function(valueEntered) {

				view.alert(3, '<b>' + response + '</b>', 2);
	    	//Create again :: Was a break from the application to receive the answer
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
			}
		);
	}

	// Internal helper functions
  // #################


	//remove dot in final str
	String.prototype.removeDot = function() {
		return  this[this.length-1] === '.'  ?
				this.slice(0, this.indexOf(this[this.length-1])) :
			/* ;^;  */ this;
	};

	// Message passing
  // #################

	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	    if (msg.message && (msg.message == "GET_QUESTION")) {
	    	getRandomQuestion();
	    }
		return true;
	});

	chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	    if (msg.message && (msg.message == "LOAD")) {
	    	getRandomQuestion();
	    }
		return true;
	});

	//DEBUG:
	// getRandomQuestion();
}

load(0, 1, "english_portuguese");
