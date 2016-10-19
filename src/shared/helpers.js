//insert in storage chrome extension
export let putStorage = (key, value) => {
	let obj = {
		[key]: value
	}
	chrome.storage.sync.set(obj, function() {
		console.log(`${key} saved`);
	});
}

//clean level
export let cleanLevels = () => {
	chrome.storage.sync.remove('levelStep', () => {
		console.log('clean')
	});
}
