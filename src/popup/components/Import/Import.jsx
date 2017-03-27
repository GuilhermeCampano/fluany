import React, {Component} from 'react';
import R from 'ramda';
import {putStorage, cleanPackages, getChromeStorage} from 'shared/helpers';
import PubSub from 'pubsub-js';

class Import extends Component{

    constructor(props){
        super(props)
    }

    handleOnChange = (e) => {
        var reader = new FileReader();
        reader.onload = this.onReaderLoad;
        reader.readAsText(e.target.files[0]);
    }

    onReaderLoad = event => {
        var pckg = JSON.parse(event.target.result);
        getChromeStorage('packages')
            .then(JSON.parse)
            .then(R.assoc(pckg.name, {cards: pckg.cards, cardsInProgress: pckg.cards}))
            .then(JSON.stringify)
            .then(newpackage => putStorage('packages', newpackage))
            .catch( () => {
                let newpackage = {};
                newpackage = R.assoc(pckg.name, {cards: pckg.cards, cardsInProgress: pckg.cards} , newpackage);
                putStorage('packages', JSON.stringify(newpackage));

            })
            .then( () => {
                PubSub.publish('addingPackage', false);
                PubSub.publish('EVENT_MESSAGE_INFO', {message: 'Your package has been imported =)', className: 'success'});
            });
    }

    render(){
        return(
            <div className="import__container">
                <label htmlFor="importfile" className="import__btn">
                    <svg>
                        <use xlinkHref="#icon-export"></use>
                    </svg>
                    Import</label>
                <input type="file" id="importfile" onChange={this.handleOnChange}></input>
            </div>
        )
    }
}

export default Import;
