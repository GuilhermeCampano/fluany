import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage} from 'shared/helpers';

class ButtonStart extends Component{
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.state = {
			titleButton: "Play",
			play: true,
			rangeInterval: 1
		}

		this.alarm = new Alarm('remindme', 1); //default
	}

	componentDidMount() {
		chrome.storage.sync.get('playing', (obj) => {
			if(obj.playing){
				this.setState({titleButton: "Stop", play: false});
			}
		});
		//get value in inputInterval component
		PubSub.subscribe('rangeInterval', (topic, value) => {

			this.setState({rangeInterval: value})
		})
	}

	handleClick(){
		
		this.setState({play: !this.state.play});

	}

	play(){
		this.handleClick();
		chrome.storage.sync.get('playing', (obj) => {
			if(obj.playing){
				chrome.storage.sync.set({playing: false}, () => {
					
					console.log('stoped');
					this.alarm.cancel();
					this.setState({titleButton: "Play"})
				});
			}else{
				chrome.storage.sync.set({playing: true}, () => {
					this.alarm.cancel();
					this.alarm = new Alarm('remindme', this.state.rangeInterval); //update Interval

					console.log('created with ' + this.state.rangeInterval + ' interval');
					this.alarm.create();
					this.setState({titleButton: "Stop"})
					//saving in localStorage, beacause background script  it will take the value
					putStorage('rangeInterval', this.state.rangeInterval);
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