import {BASE_API} from 'shared/constants/constants';
import {putStorage, cleanLevels, getProperty} from 'shared/helpers';
import Alarm from 'shared/Alarms';
import Points from './Points.js';
import Phrases from './Phrases.js';
import {view} from 'shared/view';
import 'shared/view_css';
import * as message from 'shared/constants/internacionalization';

/**
  Algoritmo:

  verifica se ja tem salvo a LocalKeys
  se nao tem, salva com dados default -> construuctor ja pega da api, entao joga do constr..
  se ja tem vamos a verificacoes:

  verifica se tem pontos salo na key, se nao tem, joga na variavel localKeys um default
  se ja tem, joga na variavel localKeys o que tava salvo

  verifica se ja tem alguma phrasesStep, se nao tem, é porque ainda ta na primeira vez, ou seja
  recortar 10 frases dali do phrasesFULL, e entao verifica se ja tem algum level salvo no
  localKeys pois no level dois ele cai nessa condicao, porém com level 2 (meno palavrases)
  e ja salva no objeto localKeys o level..
  E assim prosseguindo para o phraseStep, ele recebe novo array de acordo com o level
  e salva no objeto localKeys
  e por final, salvar na memoria o objetor localKeys.
*/

class App {

	constructor(category = 0) {
		this.phrasesFull = [];
		this.phrasesStep = [];
		this.level = 1;
		this.points = 0;
		this.category = category;
		this.localKeys = {};
		this.phrases = new Phrases();
	}

	_getRandomQuestion(){

		String.prototype.removeDot = function() {
			return this[this.length-1] === '.'  ?
						 this.slice(0, this.indexOf(this[this.length-1])) :
			/* ;^;  */ this;
		};

		let randOddNumber = 1,
				randQuestion,
				responseQuestion,
				rand = Math.floor(Math.random() * this.phrasesStep.length);

		//Get a random question
		if( rand != 0 )
			randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd


		randQuestion = this.phrasesStep[randOddNumber]
			.toLowerCase()
			.removeDot();

		responseQuestion = this.phrasesStep[randOddNumber - 1]
			.toLowerCase()
			.removeDot()
			.split('/')
			.map(n => n.trim());

		this.seeQuestion(randQuestion, responseQuestion);
	}

	/**
	* @description if you have in the locakeys properties, save on object.
	*/
	loadQuestion(){
		this.phrases.getAll((phrases) => {
			console.log('phrases: ', phrases);
			this.phrasesFull = phrases;
			chrome.storage.sync.get('localKeys', (obj) => {
				console.log('localKeys: ', obj);
				//points
				if(getProperty(obj, "localKeys.points")){
					this.points = obj.localKeys['points'];
				}else{
					this.localKeys['points'] = this.points;
				}

				//phrases
				if(getProperty(obj, "localKeys.phrasesStep")){ //has object
					this.phrasesStep = obj.localKeys['phrasesStep'];
					this.level       = obj.localKeys['level'];
				}else{

					if(getProperty(obj, "localKeys.level")){
						this.level = obj.localKeys['level']; //update :: save after
						console.log('Level: ', this.level);
					}

					// takes a piece to train
					this.phrasesStep = this.phrasesFull.slice(this.level === 1 ? 0: (this.level*10) - 10, this.level * 10);
					console.log('take: ', this.phrasesStep);
					// console.log('phrasesStep: ', this.phrasesStep);
					//inserting again, beacause ::phrases
					this.localKeys['level'] = this.level;

					this.localKeys['phrasesStep'] = this.phrasesStep;
	        console.log('LocalKeys: ', this.localKeys);
					putStorage('localKeys', this.localKeys); //Saving objectlocal in Storage
				}
					this._getRandomQuestion();
			});
		});
	}

	// check response with value entered, with multiple response
	_checkResponse(response, valueEntered){
		return response.some((n) => n.toLowerCase() === valueEntered.toLowerCase());
	}

	//show questions in view
  seeQuestion(phrase, response){

		//stop alarm: ::waiting user with a answer
		chrome.runtime.sendMessage({message: "killAlarm"}, function(response) {	});

		view.input({

			type: 'text',
			placeholder: `${message.TRANSLATEHERE}`,
			prefilledValue: ''

		}, phrase
		 ,`${message.BUTTONS[0]}` //submit
		 ,`${message.BUTTONS[1]} =(` //I don't know
		 , (valueEntered) => {

				if(this._checkResponse(response, valueEntered)){
					//you're right
					chrome.storage.sync.get('localKeys', obj => {

						/*
						* Get message in lang of the user -> eng_pt (::lang learn_your lang)
						*/
						view.alert(1, `${message.RIGHT} 👊 (• ͜ʖ•)`, 2);

						//remove in array phrase :: Array Level [phrases]
						console.log('antes de remover ValueEntered: ', valueEntered);
						this.phrasesStep = this.phrasesStep
							.filter(item => (item.toLowerCase().removeDot() !== valueEntered))
							.filter(item => (item.toLowerCase().removeDot() !== phrase));

						//::update local storage
						if(this.phrasesStep.length > 0){
							putStorage('localKeys', {level: this.level, phrasesStep: this.phrasesStep, points: this.points+= 200});
							console.log('GANHOU PONTO OBJ: ', {level: this.level, phrasesStep: this.phrasesStep, points: this.points});
						}else{
              this.points = 0; //restart point
							putStorage('localKeys', {level: ++this.level, points: this.points});
						}
						console.log("new phrases: ", this.phrasesStep);
					});
				} else {

					view.alert(3, '<b>' + response + '</b> =(', 2);

				}
				//Create again :: Was a break from the application to receive the answer
				console.log('level: ', this.level);
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
	    }
	   ,function(valueEntered) {

				view.alert(3, '<b>' + response + '</b>', 2);
	    	//Create again :: Was a break from the application to receive the answer
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
			}
		);
	}
}

export default App;
