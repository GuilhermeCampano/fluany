class LocalKeys {

	constructor() {
		this.localKeys = {};
	}

	/*
	* Get my keys
	*/
	getMyLocalKeys(){
		return new Promise( (resolve, reject) => {

			chrome.storage.sync.get('localKeys', (obj) => {
				if(obj.localKeys){
					this.localKeys = obj.localKeys;
					resolve(obj.localKeys);
				}else{
					reject(new Error('Nao possui nenhuma key'));
				}
			});

		});
	}
}

export default LocalKeys;