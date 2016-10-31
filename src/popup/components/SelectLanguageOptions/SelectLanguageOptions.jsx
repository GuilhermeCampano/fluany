import React, {Component} from 'react';
import Dropdown from 'react-dropdown';

class SelectLanguageOptions extends Component{

	constructor(){
		super();

		this.state = {
			options: [
			  { value: 'en', label: 'English' }
			]
		};
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
