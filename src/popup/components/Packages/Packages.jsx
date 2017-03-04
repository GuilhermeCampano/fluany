import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage} from 'shared/helpers';
import AddPackage from '../AddPackage/AddPackage';

class Packages extends Component{
	constructor(props) {
		super(props);
		this.state = {
			addingPackage: false
		}
	}

	render(){
		return (

			  <section className="Packages">
            <h3>Yours packages:</h3>

            <AddPackage/>
        </section>

		);
	}
}

export default Packages;
