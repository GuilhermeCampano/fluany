//insert in storage chrome extension
export let putStorage = (key, value) => {
	let obj = {
		[key]: value
	};
	chrome.storage.sync.set(obj, () => {
		console.log(`${key} saved`);
	});
};

export let getChromeStorage = name => {
  return new Promise( (resolve, reject) => {
		chrome.storage.sync.get(name, obj => {
			if(obj[name]){
				resolve(obj[name]);
			}else
				reject(`${name} was not found`);
		});
	});
};

export let cleanLevels = () => {
	chrome.storage.sync.remove('levelStep', () => {
		console.log('cleaned levels');
	});
};

export let cleanPackages = () => {
	  chrome.storage.sync.remove('packages', () => {
		    console.log('cleaned packages');
	  });
};

export let getAllKeysInStorage = () => {
	return new Promise( (resolve, reject) => {
		chrome.storage.sync.get(null, function(items) {
			var allKeys = Object.keys(items);
			resolve(allKeys);
		});
	});
}

/* ex: getProperty(myObj,'aze.xyz',0) // return myObj.aze.xyz safely
 * accepts array for property names:
 *     getProperty(myObj,['aze','xyz'],{value: null})
 */
export function getProperty(obj, props, defaultValue) {
  var res, isvoid = (x) => typeof x === "undefined" || x === null;
  if(!isvoid(obj)){
    if(isvoid(props)) props = [];
    if(typeof props  === "string") props = props.trim().split(".");
    if(props.constructor === Array){
      res = props.length>1 ? getProperty(obj[props.shift()],props,defaultValue) : obj[props[0]];
    }
  }
  return typeof res === "undefined" ? defaultValue: res;
};
