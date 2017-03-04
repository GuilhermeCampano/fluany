import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage} from 'shared/helpers';

class AddPackage extends Component{

	  constructor(props) {
		  super(props);
        this.handlerAddPackage = this.handlerAddPackage.bind(this);
        this.renderButtonAddPackage = this.renderButtonAddPackage.bind(this);
		    this.state = {
			      addingPackage: false
		    }
	  }

    handlerAddPackage(){
        this.setState({addingPackage: true});
    }

    renderNewPackage(){

        return (
            <div>
                <input placeholder="Package name"/>
            </div>
        )
    }

    renderButtonAddPackage(){
        return (
            <div>
                <button className="addPackage" title="Add new package" onClick={this.handlerAddPackage}>+</button>
            </div>
        )
    }


	  render(){
        let element;
        if(this.state.addingPackage){
            element = this.renderNewPackage();
        }else{
            element = this.renderButtonAddPackage();
        }

        return element;
	  }
}

export default AddPackage;
