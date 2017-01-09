import React, {Component} from 'react';
import InputRange from 'react-input-range';
import PubSub from 'pubsub-js';

class InputInterval extends Component{
	constructor(props){
		super(props);
		this.state = {
      value: 1
    };
	}

	componentDidMount() {
			//get value saved in LocalStorage :: exit popup
		  chrome.storage.sync.get('rangeInterval', (obj) => {
		  	//update value component : localStorage previous
		  	this.setState({value: obj.rangeInterval});
		  });
	}

	handleValueChange(component, value) {
    this.setState({
      value: value
    });
   	PubSub.publish('rangeInterval', value); //communication with components
  }

	render(){
		return (
			<section className="content-interval">

				<InputRange
					maxValue={20}
					minValue={1}
					value={this.state.value}
					onChange={this.handleValueChange.bind(this)}
					defaultValue={4}
					labelSuffix="min"
				/>

			</section>
		);
	}
}


export default InputInterval;
