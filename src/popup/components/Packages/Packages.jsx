import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, cleanPackages} from 'shared/helpers';
import AddPackage from '../AddPackage/AddPackage';

class Packages extends Component{
	constructor(props) {
		super(props);
    this.renderPackagesList = this.renderPackagesList.bind(this);
		this.state = {
                    addingPackage: false,
      packages: {}
		}
	}

  renderPackagesList(){

      let element = (<li></li>)

      for(let property in this.state.packages){
          console.log(property);
          element = [(<li key={property}> <span>{property}</span></li>), ...element ]
      }

      console.log("element: ", element);
      return element;
  }

  componentDidMount(){

      /* cleanPackages();*/
      chrome.storage.sync.get('packages', obj => {
          this.setState({
            packages: JSON.parse(obj.packages)
          });
          console.log("packages:", this.state.packages);
      });

  }

	render(){
		return (

			  <section className="Packages">
            <h3>Yours packages:</h3>
            <ul>
                {this.renderPackagesList()}
                <AddPackage/>
            </ul>
        </section>

		);
	}
}

export default Packages;
