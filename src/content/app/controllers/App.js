import {BASE_API} from 'shared/constants/constants';
import {putStorage,  getChromeStorage, getRandomInt, stopAlarm, cleanChromeStorage} from 'shared/helpers';
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
		this.indexBeingUsed = getRandomInt(0, R.dec(this.cards.length));
		return this.cards[this.indexBeingUsed];
	}

	loadQuestion(){
		this.phrases.getAll(cards => {
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
						this.showCard(card.front, card.back);
					}else{
						this.showFinishCard();
					}
				});
		});
	}

	showFinishCard(){
		stopAlarm();
		getChromeStorage('packageSelected')
			.then(packageIsBeingUsed => {
				view.confirm(`Congratulations! You have completed all the cards of ${packageIsBeingUsed.label} 👊 (• ͜ʖ•)
											Do you wanna restart the ${packageIsBeingUsed.label} ?`,
										 "Yes",
										 "No",
										 () => {
											 cleanChromeStorage('cardStep');
											 chrome.runtime.sendMessage({message: "createAlarm"}, ()=>{});
										 },
										 () => {
											 chrome.storage.sync.set({playing: false}, () => {});
										 });
		});
	}

  showCard(front, back){
		console.log('cards: ', this.cards);
		//stop alarm: ::waiting user with a answer
		stopAlarm();

		view.input({type: 'text', placeholder: `${message.TRANSLATEHERE}`, prefilledValue: ''},
							 front
							,`${message.BUTTONS[0]}` //submit
							,`${message.BUTTONS[1]} =(` //I don't know
							, valueEntered => {
								if(back === valueEntered){
									view.alert(1, `${message.RIGHT} 👊 (• ͜ʖ•)`, 2);
									this.cards = R.remove(this.indexCardBeingUsed, 1, this.cards);
                  console.log('new point: ', this.cards.length);
									putStorage('cardStep', JSON.stringify(this.cards));
									}else
										view.alert(3, `<b> ${back} </b> =(`, 2);
									chrome.runtime.sendMessage({message: "createAlarm"}, ()=>{});
								}
							, valueEntered => {
									view.alert(3, '<b>' + back + '</b>', 2);
									//Create again :: Was a break from the application to receive the answer
									chrome.runtime.sendMessage({message: "createAlarm"}, ()=>{});
								}
		);
	}
}

export default App;
