import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage} from 'shared/helpers';

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
        this.setState({addingPackage: true});
        PubSub.publish('addingPackage', true); //communication with components (addClass and hidden button play)
    }

    handlerCreatePackage(){
        chrome.storage.sync.get('packages', obj => {
            let newobj = {};
            newobj[this.state.packageName] = [];

            if(obj.packages){
                newobj = JSON.parse(obj.packages);
                newobj[this.state.packageName] = [];
                putStorage("packages", JSON.stringify(newobj));
            }else{
                putStorage("packages", [JSON.stringify(newobj)]);
            }

            this.setState({
                addingPackage: false
            });

            PubSub.publish('addingPackage', false); //communication with components (addClass and hidden button play)
        });
    }

    handlerChangePackageName(e){
        this.setState({
            packageName: e.target.value
        });
    }

    savePackageName(){
    }

    renderNewPackage(){
        return (
            <div>
                <input placeholder="Package name" className="packageField" onChange={this.handlerChangePackageName}/>
                <button className="create-button" onClick={this.handlerCreatePackage}>Create</button>
            </div>
        );
    }

    renderButtonAddPackage(){
        return (
            <li key="add">
                <button className="addPackage" title="Add new package" onClick={this.handlerAddPackage}>+</button>
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
