import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import R from 'ramda';
import {putStorage, getChromeStorage} from 'shared/helpers';

class AddPackage extends Component{

	  constructor(props) {
		  super(props);
        this.handlerAddPackage        = this.handlerAddPackage.bind(this);
        this.renderButtonAddPackage   = this.renderButtonAddPackage.bind(this);
        this.handlerCreatePackage     = this.handlerCreatePackage.bind(this);
        this.handlerChangePackageName = this.handlerChangePackageName.bind(this);
		    this.state = {
			      addingPackage: false,
            packageName: ""
		    }
	  }

    handlerAddPackage(){
        //communication with components (addClass and hidden button play)
        this.setState({addingPackage: true},
                      () => PubSub.publish('addingPackage', true));
    }

    renderButtonAddPackage(){
        return (
            <li key="add">
                <button className="addPackage-btn"
                        title="Add new package"
                        onClick={this.handlerAddPackage}>+
                </button>
            </li>
        );
    }

    handlerCreatePackage(){
        //updating packagea
        getChromeStorage('packages')
            .then(JSON.parse)
            .then(R.assoc(this.state.packageName, []))
            .then(JSON.stringify)
            .then(newpack => putStorage('packages', newpack))
            .catch(err => putStorage("packages",
                                     JSON.stringify(R.assoc(this.state.packageName, [], {}))))
            .then(() => {
                this.setState({
                    addingPackage: false
                }, () => PubSub.publish('addingPackage', false));
            });

    }

    handlerChangePackageName(e){
        this.setState({
            packageName: e.target.value
        });
    }

    renderNewPackage(){
        return (
            <div className="creatingItem__container">
                <input placeholder="Package name"
                       className="packageName"
                       maxLength={11}
                       onChange={this.handlerChangePackageName}/>

                <button className="creatingItem__create-btn"
                        onClick={this.handlerCreatePackage}>Create
                </button>
            </div>
        );
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
