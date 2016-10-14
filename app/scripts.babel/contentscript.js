const BASE_API = 'https://capylang.herokuapp.com'; //api

/*
* NEED to be JSON IN FILE EXTERNAL --> _locales
* for language : [
*	"learn_language"
* ]
*/
const SUPPORTED_LANGUAGES = {
	"portuguese": ["english"]
};

const MESSAGES_VIEW_RIGHT = {
	"portuguese": "Aê, acertou!",
	"english"   : "Uow, right!"
};

const MESSAGES_VIEW_TRANSLATEHERE = {
	"portuguese": "Traduza aqui em português",
	"english"   : "Translate to portuguese here"
};

const MESSAGE_VIEW_BUTTONS = {
	"portuguese": ["Enviar", "Não sei"],
	"english"   : ["Submit", "I don't know"]
};

//Storage in chrome
let putStorage = function(key, value){
	let obj = {
		[key]: value
	}
	chrome.storage.sync.set(obj, function() {
		console.log(`${key} saved`);
	});
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {        
    if (msg.message && (msg.message == "DIMENSION")) {                          
        sendResponse(dimension);       
    }
	return true;
});



//Start application with args (category, interval)
let capylangStart = (category = 0, minutesInterval = 1, lang = "english_portuguese") => {
	//verify
	let phrases = {};
	chrome.storage.sync.get('phrases', (obj) => {
		if(obj.phrases){
			phrases = obj.phrases;
			// console.log("phrase recebeu obj: ", phrases);
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

	//capylang alert with question
	function seeQuestion(phrase, response){
		let userLang = lang.split('_')[1];
		view.input({
			
			type: 'text',
			placeholder: `${MESSAGES_VIEW_TRANSLATEHERE[userLang]}`,
			prefilledValue: ''

		},phrase, `${MESSAGE_VIEW_BUTTONS[userLang][0]}`, //submit
							`${MESSAGE_VIEW_BUTTONS[userLang][1]} =(`, //I don't know
			function(valueEntered) {
				if(checkResponse(response, valueEntered)){

					/*
					* Get message in lang of the user -> eng_pt (::lang learn_your lang)
					*/
					view.alert(1, `${MESSAGES_VIEW_RIGHT[userLang]} 👊 (• ͜ʖ•)`, 2);

				} else {

					view.alert(3, '<b>' + response + '</b> =(', 2);

				}
	    },  function(valueEntered) {

				view.alert(3, '<b>' + response + '</b>', 2);

			});
	}

	//remove dot in final str
	String.prototype.removeDot = function() {
		return  this[this.length-1] === '.'  ? 
				this.slice(0, this.indexOf(this[this.length-1])) : 
				/* ;^;  */ this
	};

	//init interval
	let checkVal = window.setInterval(function(){
		getRandomQuestion();
	}, minutesInterval * 60 * 1000);
	
}