'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// chrome.browserAction.setBadgeText({text: '\'Capy'});
// getPageDimension = function (){
//   chrome.tabs.query({active: true, highlighted: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { message: "DIMENSION" }, function(response){
//           if (response !== null) console.log('Response:', response);
//           else console.log('Response is null');
//       });
//   }); 
// };
// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
//  //    console.log('sendeR: ', sender);
//  //    if (request.greeting == "hello"){

// 	// 		chrome.tabs.query({
// 	// 			active: true,
// 	// 			currentWindow: true
// 	// 		}, function(tabs) {
// 	// 					var tabURL = tabs[0].url;
// 	// 					console.log('----> ',tabURL);
// 	// 				}
// 	// 		);

//  //      sendResponse({farewell: "goodbye"});
//  //    }
// 	// }

//   }
// );

// capylangStart(0, 1, "english_portuguese")