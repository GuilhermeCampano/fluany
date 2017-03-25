import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import ButtonStart from '../ButtonStart/ButtonStart';
import PubSub from 'pubsub-js';
import {getChromeStorage, putStorage, cleanPackages, cleanChromeStorage} from '../../../shared/helpers';

class SelectLanguageOptions extends Component{

    constructor(){
        super();
        this.state = {
            options: [],
            playing: false
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

        PubSub.subscribe('EVENT_PLAYING', (topic, value) => {
            console.log('uuuuu', value)
            this.setState({playing: !value});
        });

        getChromeStorage('playing')
            .then(playing => {
                this.setState({
                    playing: playing
                })
            })
        getChromeStorage('packageSelected')
            .then(packageSelected => {
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

        PubSub.publish('EVENT_SELECTED_PACKAGE', e.label);
    }

    updatingSelectField(){
        getChromeStorage('packages')
            .then(JSON.parse)
            .then(packages => {
                let options = [{value: 'default', label: 'Default by Fluany'}];
                for(let property in packages){
                    options.push({value: property, label: property});
                }
                this.setState({
                    options
                });
            });
    }

	render(){
		return (
			<section className={"options" + (this.state.playing ? " playing" : "")}>
				<Dropdown
				options={this.state.options}
				onChange={this._onSelect}
				value={this.state.packageSelected}
				placeholder="Select an option"
/>
        <ButtonStart />
			</section>

		);
	}
}

export default SelectLanguageOptions;
