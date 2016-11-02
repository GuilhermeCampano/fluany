class Points {

	constructor(){
		this.point = 0;
	}

	/*
	* Get my point in localStorage
	*/
	getMyPoint(){
		return new Promise( (resolve, reject) => {

			chrome.storage.sync.get('point', (obj) => {
				if(obj.point){
					this.point = obj.point;
					resolve(obj.point);
				}else{
					reject(new Error('Nao possui nenhum ponto salvo'));
				}
			});

		});
	}
}

export default Points;