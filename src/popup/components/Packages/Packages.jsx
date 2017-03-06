import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, cleanPackages} from 'shared/helpers';
import AddPackage from '../AddPackage/AddPackage';
import CardItem from './CardItem.jsx';
import Toggle from 'react-toggle';

class Packages extends Component{
    constructor(props) {
        super(props);
        this.renderPackagesList = this.renderPackagesList.bind(this);
        this.handlerItemPackage = this.handlerItemPackage.bind(this);
        this.renderPackageEdit  = this.renderPackageEdit.bind(this);
        this.handlerDeletePackage = this.handlerDeletePackage.bind(this);
        this.getPackageByName     = this.getPackageByName.bind(this);
        this.moreCardItem         = this.moreCardItem.bind(this);
        this.handleSaveToggle = this.handleSaveToggle.bind(this);

        this.state = {
            addingPackage: false,
            packages: {},
            editingPackage: false,
            saveToggle: false,
            cardItems: [],
            cardItemsValue: []
        }
    }

    handlerItemPackage(e){
        this.setState({
            editingPackage: e.currentTarget
        });
    }

    handlerDeletePackage(e){
    }

    renderPackagesList(){
        let element = "";
        for(let property in this.state.packages){
            element = [(<li key={property}
                            title={property}
                            onClick={this.handlerItemPackage}>
                            <span className="delete__package" onClick={this.handlerDeletePackage}>
                                <svg width="15" height="15" viewBox="0 0 64 64">
                                    <path fill="#fff"
                                          d="M24.72 8.777h14.56v3.747H24.72zM7.917 11.56h48.164v4.818H7.918z"/>
                                    <path fill="none"
                                          stroke="#fff"
                                          d="M40.212 57.362V27.005M32 57.398V27.04m-8.212 30.394V27.077m-11.06-7.594h38.543v40.254H12.73z"/>
                                </svg>
                            </span>
                            <span className="package__name">{property}</span>
                        </li>), ...element ]
        }

        return element;
    }

    getPackageByName(name){
        return new Promise( (resolve, reject) => {
            chrome.storage.sync.get('packages', obj => {
                let pckg = JSON.parse(obj.packages);
                if(pckg.hasOwnProperty(name))
                    resolve(pckg[name])
                reject("not found");
            });
        });
    }

    handleSaveToggle(e){
        if(e.target.checked){
            console.log('to save: ', this.state.cardItemsValue);

            this.getPackageByName('Cidades').then((cards => {
                let newCards = [...cards, ...this.state.cardItemsValue];
                console.log('newCards: ', newCards);

                chrome.storage.sync.get('packages', obj => {

                    let newobj = JSON.parse(obj.packages);
                    console.log('after newobj: ', newobj);
                    console.log('editing: ', this.state.editingPackage.getAttribute('title'))
                    newobj[this.state.editingPackage.getAttribute('title')] = newCards;

                    console.log('new obj: ', newobj)
                });
            }));
        }
    }

    renderPackageEdit(name){
        let packageTitleElement;


        if(this.state.editingPackage){
            let packageName = this.state.editingPackage.getAttribute('title');
            packageTitleElement = (
                <header>
                    <h3 className="editingPackage__title">{packageName}</h3>
                    <label className="card__save--toggle">
                        <Toggle
                            defaultChecked={this.state.saveToggle}
                            onChange={this.handleSaveToggle} />
                        <span className="card__save--label">Save</span>
                    </label>
                </header>
            );
        }

        return (
            <section className={"editingPackage__container " + (this.state.editingPackage ? "editingPackage__container--edit" : "")}>
                {packageTitleElement}
                <ul className="editingPackage__questions">
                    {this.state.cardItems}
                </ul>
                <button className="card__more-btn" onClick={this.moreCardItem}>+ more</button>
            </section>
        );
    }

    moreCardItem(){
        this.setState({
            cardItems: [...this.state.cardItems,
                        <CardItem cards={this.state.cardItems}
                                  itemsArr={this.state.cardItemsValue}/>]
        });
    }

    componentDidMount(){

        /* cleanPackages();*/
        chrome.storage.sync.get('packages', obj => {
            if(obj.packages){
                this.setState({
                    packages: JSON.parse(obj.packages)
                });
            }
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

        //add first component card items
        this.setState({
            cardItems: [...this.state.cardItems,
                        <CardItem cards={this.state.cardItems}
                                  itemsArr={this.state.cardItemsValue}/>]
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
