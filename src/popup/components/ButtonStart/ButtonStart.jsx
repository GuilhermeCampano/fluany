import React, {Component} from 'react';

class ButtonStart extends Component{

	render(){
		return (

			<section className="start">
			  <p id="playTitle">click to play</p>
			  <a className="action-button shadow animate blue">Play</a>
			</section>

		);
	}
}

export default ButtonStart;