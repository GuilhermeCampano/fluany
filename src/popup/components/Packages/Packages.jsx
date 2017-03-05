import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, cleanPackages} from 'shared/helpers';
import AddPackage from '../AddPackage/AddPackage';

class Packages extends Component{
	constructor(props) {
		super(props);
      this.renderPackagesList = this.renderPackagesList.bind(this);
      this.handlerItemPackage = this.handlerItemPackage.bind(this);
      this.renderPackageEdit  = this.renderPackageEdit.bind(this);
      this.state = {
          addingPackage: false,
          packages: {},
          editingPackage: false
      }
	}

    handlerItemPackage(e){
        console.log(e.currentTarget.getAttribute('title'));
        this.setState({
            editingPackage: e.currentTarget
        });
    }

  renderPackagesList(){

      let element = (<div></div>)

      for(let property in this.state.packages){
          element = [(<li key={property}
                          title={property}
                          onClick={this.handlerItemPackage}>
                          <span>{property}</span>
                      </li>), ...element ]
      }

      return element;
  }

    renderPackageEdit(name){
        let packageTitleElement, container;

        if(this.state.editingPackage){
            let packageName = this.state.editingPackage.getAttribute('title');
            packageTitleElement = (<h3 className="editingPackage__title">{packageName}</h3>);
        }

        container = (<section className={"editingPackage__container " + (this.state.editingPackage ? "editingPackage__container--edit" : "")}>
                          {packageTitleElement}
                          <input className="question__field" placeholder="Question"/>
                          <input className="response__field" placeholder="Response"/>
                          <button>
                                <svg className="arrow" viewBox="0 0 85 85">
                                    <path className="arrow-out" d="M37.5 23.5l15 19-15 19"/>
                                    <path className="arrow-in" d="M2.092 23.5l15 19-15 19"/>
                                </svg>
                          </button>
                    </section>);

        return container
    }

    componentDidMount(){

        /* cleanPackages();*/
        chrome.storage.sync.get('packages', obj => {
            this.setState({
                packages: JSON.parse(obj.packages)
            });
        });

        //get value if the user is adding package<Updating view)
        PubSub.subscribe('addingPackage', (topic, value) => {
            this.setState({addingPackage: true})

            /* cleanPackages();*/
            chrome.storage.sync.get('packages', obj => {
                this.setState({
                    packages: JSON.parse(obj.packages)
                });
            });
        });
  }

	  render(){


        return (
         <div>
            {this.renderPackageEdit()}
            <section className={"Packages " + (this.state.editingPackage ? "editingPackage" : "")}>
                <h3>Yours packages:</h3>
                <ul>
                    {this.renderPackagesList()}
                    <AddPackage/>
                </ul>
            </section>
        </div>
        );
	}
}

export default Packages;
