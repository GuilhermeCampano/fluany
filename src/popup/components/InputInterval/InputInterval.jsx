import React, {Component} from 'react';
import InputRange from 'react-input-range';

class InputInterval extends Component{
	constructor(props){
		super(props);
		this.state = {
      value: 2
    };
	}
	
	handleValueChange(component, value) {
    this.setState({
      value: value
    });
  }

	render(){
		return (
			<section className="content">

				<InputRange
					maxValue={20}
					minValue={2}
					value={this.state.value}
					onChange={this.handleValueChange.bind(this)}
					defaultValue={2}
					labelSuffix="min"
				/>

			</section>
		);
	}	
}


export default InputInterval;