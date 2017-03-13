import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, getChromeStorage, cleanChromeStorage} from 'shared/helpers';

class ButtonStart extends Component{
	constructor(props) {
		super(props);
		this.play = this.play.bind(this);
		this.state = {
			titleButton: "Play",
			play: true,
			rangeInterval: 1,
      addingPackage: false
		}

		this.alarm = new Alarm('remindme', 1); //default
	}

  componentDidMount() {
      /* Check if was already started*/
      getChromeStorage('playing')
        .then(playing => {
            this.setState({titleButton: "Stop", play: false});
        })
        .catch(err => {});

    //get value in inputInterval component
    PubSub.subscribe('rangeInterval', (topic, value) => {
        this.setState({rangeInterval: value})
    });

    //get value if the user is adding package
    PubSub.subscribe('addingPackage', (topic, value) => {
        this.setState({addingPackage: value})
    });
  }

	handleClick(){
    this.setState({play: !this.state.play});
	}

  play(){
    this.handleClick();
    getChromeStorage('playing')
        .then(playing => {
            /* If was already started, change the button to play and stop alarm */
            chrome.storage.sync.set({playing: false}, () => {
                this.alarm.cancel();
                this.setState({titleButton: "Play"});
            });
            cleanChromeStorage('packageIsBeingUsed');
    })
    .catch(() => {
        /* If not was started, to create alarm and change button text to Stop*/
        chrome.storage.sync.set({playing: true}, () => {
            this.alarm.cancel();
            this.alarm = new Alarm('remindme', this.state.rangeInterval); //update Interval
            this.alarm.create();
            this.setState({titleButton: "Stop"})
            //saving in localStorage, beacause background script  it will take the value
            putStorage('rangeInterval', this.state.rangeInterval);

            //blocking to edit package selected
            getChromeStorage('packageSelected')
                .then(packageSelected => {
                    putStorage('packageIsBeingUsed', packageSelected.value);
                });
        });
    });
	}

	render(){
		return (

			<section className="start">
			    <a title="Play to practice"
             className={"action-button shadow animate " +  (this.state.play ? "blue" : "red") }
             data-adding={this.state.addingPackage}
             onClick={this.play}>
			  		{this.state.titleButton}
			  </a>
			</section>

		);
	}
}

export default ButtonStart;
