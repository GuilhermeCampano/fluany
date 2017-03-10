import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import PubSub from 'pubsub-js';
import {getChromeStorage, putStorage, cleanPackages, cleanChromeStorage} from '../../../shared/helpers';

class SelectLanguageOptions extends Component{

    constructor(){
        super();
        this.state = {
            options: [],
            packageSelected: {value: 'default', label: 'Default by Fluany'}
        }
        this.updatingSelectField = this.updatingSelectField.bind(this);
        this._onSelect           = this._onSelect.bind(this);
        this.updatingSelectField();
    }

    componentDidMount(){

        //when you create a package and updating view of the select
        PubSub.subscribe('addingPackage', (topic, value) => {
            if(!value){
                this.updatingSelectField();
            }
        });

        getChromeStorage('packageSelected')
            .then( packageSelected => {
                this.setState({
                    packageSelected
                });
            })
            .catch(err =>
                putStorage('packageSelected', this.state.packageSelected));
    }

    _onSelect(e){
        this.setState({
            packageSelected: e
        }, () => putStorage('packageSelected', this.state.packageSelected));


        //because the phrasesStep need to stay empty for the content get new Package
        cleanChromeStorage('localKeys');
    }

    updatingSelectField(){
      getChromeStorage('packages').then((packages) => {
        let objPackages = JSON.parse(packages);
        let options = [{value: 'default', label: 'Default by Fluany'}];
        for(let property in objPackages){
            options.push({value: property, label: property});
        }
        this.setState({
            options
        });
      });
    }

	render(){

		return (
			<section className="options">
				<Dropdown
				options={this.state.options}
				onChange={this._onSelect}
				value={this.state.packageSelected}
				placeholder="Select an option"
				/>
			</section>

		);
	}
}

export default SelectLanguageOptions;
