import {BASE_API} from 'shared/constants/constants';
import {putStorage,  getChromeStorage, getRandomInt} from 'shared/helpers';
import Alarm from 'shared/Alarms';
import Phrases from './Phrases.js';
import {view} from 'shared/view';
import R from 'ramda';
import 'shared/view_css';
import * as message from 'shared/constants/internacionalization';

class App {

	constructor(category = 0) {
		this.cards = [];
		this.level = 1;
		this.points = 0;
		this.category = category;
		this.phrases = new Phrases();
	}

	_getRandomCard(){
		console.log('this.cards', this.cards);
		this.indexBeingUsed = getRandomInt(0, this.cards.length - 1);
		console.log('indexcard:', this.indexBeingUsed);
		return this.cards[this.indexBeingUsed];
	}

	loadQuestion(){
		this.phrases.getAll((cards) => {
			getChromeStorage('cardStep')
			  .then(JSON.parse)
				.then(newcard => {
					this.cards = newcard;
				})//first time
				.catch(()=> {
					this.cards = cards;
				})//finally
				.then(() => {
					if(!R.isEmpty(this.cards)){
						let card = this._getRandomCard();
						console.log('finally:: ', card);
						this.showCard(card.front, card.back);
					}else
						console.log('acabou!!!!');
				});
		});
	}

  showCard(front, back){
		console.log('cards: ', this.cards);

		//stop alarm: ::waiting user with a answer
		chrome.runtime.sendMessage({message: "killAlarm"}, function(response) {	});

		view.input({
			type: 'text',
			placeholder: `${message.TRANSLATEHERE}`,
			prefilledValue: ''
		},front
		 ,`${message.BUTTONS[0]}` //submit
		 ,`${message.BUTTONS[1]} =(` //I don't know
		 , valueEntered => {
			 if(back === valueEntered){
				 console.log('acertou!!!');
				 view.alert(1, `${message.RIGHT} 👊 (• ͜ʖ•)`, 2);
				 this.cards = R.remove(this.indexCardBeingUsed, 1, this.cards);

				 console.log('new cards: ', this.cards);

				 putStorage('cardStep', JSON.stringify(this.cards));
				}else{
					console.log('ererrrrrou!')
					view.alert(3, '<b>' + back + '</b> =(', 2);
				}
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
	    }
	   , valueEntered => {
				view.alert(3, '<b>' + back + '</b>', 2);
	    	//Create again :: Was a break from the application to receive the answer
				chrome.runtime.sendMessage({message: "createAlarm"}, function(response){});
			}
		);
	}
}

export default App;
