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
    this.packages = [];
    this.namePackageSelected = '';
		this.phrases = new Phrases();
	}

	_getRandomCard(){
	  this.indexCardBeingUsed = getRandomInt(0, R.dec(this.cards.length));
    console.log('indexBeingUsed: ', this.indexCardBeingUsed);
		return this.cards[this.indexCardBeingUsed];
	}

	loadQuestion(){
      this.phrases.getAll((packages, namePackageSelected) => {
          console.log('allPackages: ', packages);
          console.log('namePackageSelected: ', namePackageSelected);
          this.cards = packages[namePackageSelected].cardsInProgress;
          this.packages = packages;
          this.namePackageSelected = namePackageSelected;
          if(R.isEmpty(this.cards)){
              this.showFinishCard();
          }else{
              let card = this._getRandomCard();
              this.showCard(card.front, card.back);
          }
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
                         this.packages = R.assocPath([this.namePackageSelected, 'cardsInProgress'],
                                                     this.packages[this.namePackageSelected].cards, this.packages);
                         putStorage('packages', JSON.stringify(this.packages));
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
                  this.packages = R.assocPath([this.namePackageSelected, 'cardsInProgress'],
                                                this.cards, this.packages);

                  console.log('this.cards: ', this.cards);
                  console.log('this.packages: ', this.packages);
                  putStorage('packages', JSON.stringify(this.packages));
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
