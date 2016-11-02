class PhrasesStep{

	constructor(){
		this.phrases = [];
	}

	getPhrasesStep(){
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get('phraseStep', (obj) => {
				if(obj.phrasesStep){
					this.phrases = obj.phraseStep;
					resolve(obj.phraseStep)
				}else
					reject(new Error('Não possui nenhuma frases de pontos salvo'));
			});
		});
	}
}
export default PhrasesStep;