import React, {Component} from 'react';

class SelectLanguageOptions extends Component{

	render(){
		return (

			<section className="options">
				<p>Select a language</p>
				<div className="select">
					<select name="languageSelect" id="slct" className="languageSelect">
						<option value="0">Português</option>
						<option value="1">English</option>
					</select>
				</div>
			</section>

		);
	}
}

export default SelectLanguageOptions;
