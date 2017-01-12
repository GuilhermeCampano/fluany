import {BASE_API} from 'shared/constants/constants';
import Alarm from 'shared/Alarms';
import {putStorage, cleanLevels, getProperty} from 'shared/helpers';
import {view} from 'shared/view';


//Controllers
import App from './app/controllers/App';

//main
let app = new App();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.message && (msg.message == "LOAD")) {
        app.loadQuestion();
    }
    return true;
});
