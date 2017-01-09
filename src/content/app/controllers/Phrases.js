import {BASE_API} from 'shared/constants/constants';
import {putStorage} from 'shared/helpers';

/*
* Class for connection with phrases in API and saved in localStorage extension.
* @param {Number} category -  The category of phrases
*/
class Phrases {

	constructor(category = 0){
		this.phrasesFull = [];
		//I need to boot catching API
		this.category = category;

	}

/**
 * Callback to catch all phrases
 * @callback gsetAllCallback
 */
	getAll(callback){
		this._loadPhrases()
		.then((phrases) => {
			callback(phrases, null);
		})
		.catch((error) => {
			callback(null, error);
		});
	}

	_getPhrasesInLocal(){
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get('phrases', (obj) => {
				if(obj.phrases)
					  resolve(obj.phrases);
				else
					reject(Error('I was not saved'));
			});
		});
	}
	/**
	* GET phrases in API and save in local storage or GET local storage
	*/
	_loadPhrases(){
		return new Promise ((resolve, reject) => {
			this._getPhrasesInLocal().then((phrases) => {

				console.log("I had been saved::LocalStorage");
				resolve(phrases);

			}).catch((error) => {
				//error: I was not saved
				this._getPhrasesInAPI()
				.then( (phrases) => {
					console.log('Saved! He took API');
					resolve(phrases);
				})
				.catch((error) => {
					console.log('oh no error API', error);
					reject(new Error('Error catch phrases in api'));
				});

			});
		});
	}

	_getPhrasesInAPI(){
		return new Promise((resolve, reject) => {
				let request = new XMLHttpRequest();
				let _args = {};
				request.open('GET', `${BASE_API}/api/eng/readphrases/?id=${this.category}`, true); ///get options in gulp
				request.onload = function() {

					if (request.status >= 200 && request.status < 400) {

						_args = JSON.parse(request.responseText);
						this.phrasesFull = _args.phrases;
						putStorage('phrases', this.phrasesFull);

						resolve(_args.phrases);
					} else {
						// We reached our target server, but it returned an error
						reject(Error('Error fetching data.'));
						console.log("error in server");
					}

				};
				request.send();
			});
	}
}

export default Phrases;
