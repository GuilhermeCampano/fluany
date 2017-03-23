import React, {Component} from 'react';
import Alarm from '../../../shared/Alarms';
import PubSub from 'pubsub-js';
import R from 'ramda';
import {putStorage, getChromeStorage} from '../../../shared/helpers';

class AddPackage extends Component{

	  constructor(props) {
        super(props);
		    this.state = {
			      addingPackage: false,
            packageName: "",
            requirePackageName: false
		    }
	  }

    handlerAddPackage = () => {
        //communication with components (addClass and hidden button play)
        this.setState({addingPackage: true, packageName: ""},
                      () => PubSub.publish('addingPackage', true));
    }

    renderButtonAddPackage = () => {
        return (
            <li key="add">
                <button className="addPackage-btn"
                        title="Add new package"
                        onClick={this.handlerAddPackage}>+
                </button>
            </li>
        );
    }

    handlerCreatePackage = (e) => {
        e.preventDefault();
        if(R.isEmpty(this.state.packageName)){
            this.setState({
                requirePackageName: true
            })
        }else
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

    handlerChangePackageName = (e) => {
        this.setState({
            packageName: e.target.value.trim()
        });
    }

    renderPackageNameRequired = () => {
        let element;
        if (this.state.requirePackageName){
            element = (<span className="creatingItem__required">This field cannot be left blank!</span>)
        }
        return element;
    }

    renderNewPackage(){
        return (
            <div className="creatingItem__container">
                {this.renderPackageNameRequired()}
                <form className="creatingItem__form">
                    <input placeholder="Package name"
                        className="packageName"
                        maxLength={11}
                        onChange={this.handlerChangePackageName} required autoFocus/>

                    <button className="creatingItem__create-btn"
                            onClick={this.handlerCreatePackage}>Create
                    </button>
                </form>
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
