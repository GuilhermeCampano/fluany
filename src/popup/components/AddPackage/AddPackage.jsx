import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, getChromeStorage} from 'shared/helpers';

class AddPackage extends Component{

	  constructor(props) {
		  super(props);
        this.handlerAddPackage = this.handlerAddPackage.bind(this);
        this.renderButtonAddPackage = this.renderButtonAddPackage.bind(this);
        this.handlerCreatePackage = this.handlerCreatePackage.bind(this);
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

    handlerCreatePackage(){
        let allPackages = {};
        allPackages[this.state.packageName] = [];
        getChromeStorage('packages')
            .then( packages => {
                //updating packages
                allPackages = JSON.parse(packages);
                allPackages[this.state.packageName] = [];
                putStorage("packages", JSON.stringify(allPackages));
            })
            .catch(err => {
                //first package:
                putStorage("packages", JSON.stringify(allPackages));
            })
            .then( () => {
                this.setState({
                    addingPackage: false
                    //communication with components (addClass and hidden button play)
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
                       onChange={this.handlerChangePackageName}/>

                <button className="creatingItem__create-btn"
                        onClick={this.handlerCreatePackage}>Create
                </button>
            </div>
        );
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
