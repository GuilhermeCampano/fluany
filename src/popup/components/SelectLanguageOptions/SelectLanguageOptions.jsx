import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import {getChromeStorage} from '../../../shared/helpers';

class SelectLanguageOptions extends Component{

	constructor(){
		  super();
      this.state = {
          options: []
      }
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
				value={this.state.options[0]}
				placeholder="Select an option"
				/>
			</section>

		);
	}
}

export default SelectLanguageOptions;
