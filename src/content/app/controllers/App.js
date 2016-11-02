import {BASE_API} from 'shared/constants/constants';
import {putStorage, cleanLevels, getProperty} from 'shared/helpers';


class App {

	constructor(category = 0) {
		console.log('CONTRUCTOR!');
		this.phrasesFull = [];
		this.phrasesStep = [];
		this.level = 1;
		this.point = 0;
		this.category = category;
	}
}

export default App;