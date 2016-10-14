const BASE_API = 'https://capylang.herokuapp.com'; //api

//Storage in chrome

let putStorage = function(key, value){
	let obj = {
		[key]: value
	}
	chrome.storage.sync.set(obj, function() {
		console.log(`${key} saved`);
	});
}

//Start application with args (category, interval)
let capylangStart = (category = 0, minutesInterval = 1) => {
		//verify
	let phrases = {};
	console.log("deu certo");
	chrome.storage.sync.get('phrases', (obj) => {
		if(obj.phrases){
			phrases = obj.phrases;
			console.log("phrase recebeu obj: ", phrases);
		} else {
			let request = new XMLHttpRequest();				
			let _args = {};
			request.open('GET', `${BASE_API}/api/eng/readphrases/?id=${category}`, true); ///get options in gulp
			request.onload = function() {
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
			request.onerror = function() {
			// There was a connection error of some sort
			};
			request.send();
		}
	});

	function getRandomQuestion(){
		let randOddNumber = 1,
		  randQuestion,
		  responseQuestion;

		let rand = Math.floor(Math.random() * phrases.length);

		if( rand != 0 )
			randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd 
			randQuestion = phrases[randOddNumber]
				.toLowerCase()
				.removeDot();

			responseQuestion = phrases[randOddNumber - 1]
				.toLowerCase()
				.removeDot();

		//get multiple response
		responseQuestion = responseQuestion
			.split('/')
			.map(n => n.trim());
		// console.log('-->',responseQuestion);
		seeQuestion(randQuestion, responseQuestion)
	}		

	//check response with value entered, with multiple response
	function checkResponse(response, valueEntered){
		return response.some((n) => n.toLowerCase() === valueEntered.toLowerCase());
	}

	//if checked is true, capylang alert!
	function seeQuestion(phrase, response){
		view.input({
			type: 'text',
			placeholder: 'Translate to portuguese here',
			prefilledValue: ''
		}, phrase, 'Submit', 'I don\'t know =(', function(valueEntered) {
				if(checkResponse(response, valueEntered)){
					view.alert(1, 'Right! 👊 (• ͜ʖ•)', 2);
				} else{
					view.alert(3, '<b>' + response + '</b> =(', 2);
				}
	    }, function(valueEntered) {
				view.alert(3, '<b>' + response + '</b>', 2);
		});
	}

	// Check Data

	// let isStarted = ls2.load('capylangInterval');	
	let checkVal  = window.setInterval(function(){
		getRandomQuestion();
	}, minutesInterval * 60 * 1000);
	
	//remove dot in final str
	String.prototype.removeDot = function() {
		return this[this.length-1] === '.' 
		? this.slice(0, this.indexOf(this[this.length-1])) //final text
		: /* ;^;  */ this
	};
}

capylangStart(0, 1);