import React, {Component} from 'react';
import Alarm from 'shared/Alarms';

class ButtonStart extends Component{
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.alarm = new Alarm('remindme', 1);
		this.state = {
			titleButton: "Play",
			play: true
		}
	}

	componentDidMount() {
		chrome.storage.sync.get('playing', (obj) => {
			if(obj.playing){
				this.setState({titleButton: "Stop", play: false});
			}
		});
	}

	handleClick(){
		
		this.setState({play: !this.state.play});

	}

	play(){
		this.handleClick();
		chrome.storage.sync.get('playing', (obj) => {
			if(obj.playing){
				chrome.storage.sync.set({playing: false}, () => {
					
					console.log('stop');
					
					this.alarm.cancel();
					this.setState({titleButton: "Play"})
				});
			}else{
				chrome.storage.sync.set({playing: true}, () => {
					
					console.log('playing');
					
					this.alarm.create();
					this.setState({titleButton: "Stop"})
				});
			}
		});
	}

	render(){
		return (

			<section className="start">

			  <a 	className={"action-button shadow animate " +  (this.state.play ? "blue" : "red") } onClick={this.play}>
			  		{this.state.titleButton}
			  </a>

			</section>

		);
	}
}

export default ButtonStart;