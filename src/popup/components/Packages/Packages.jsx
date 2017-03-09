import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import {putStorage, cleanPackages, getChromeStorage} from 'shared/helpers';
import AddPackage from '../AddPackage/AddPackage';
import CardItem from './CardItem.jsx';
import Toggle from 'react-toggle';

class Packages extends Component{
    constructor(props) {
        super(props);
        this.renderPackagesList   = this.renderPackagesList.bind(this);
        this.handlerItemPackage   = this.handlerItemPackage.bind(this);
        this.renderPackageEdit    = this.renderPackageEdit.bind(this);
        this.handlerDeletePackage = this.handlerDeletePackage.bind(this);
        this.getPackageByName     = this.getPackageByName.bind(this);
        this.moreCardItem         = this.moreCardItem.bind(this);
        this.handleSaveToggle     = this.handleSaveToggle.bind(this);
        this.renderListCards      = this.renderListCards.bind(this);
        this.changeColorPackage   = this.changeColorPackage.bind(this);
        this.getPackageColor      = this.getPackageColor.bind(this);

        this.state = {
            addingPackage: false,
            packages: {},
            editing: false,
            packageNameIsEditing: false,
            saveToggle: false,
            cardItems: [],
            colorPackages: {},
            cardItemsValue: []
        }
    }

    handlerItemPackage(e){
        this.setState({
            packageNameIsEditing: e.currentTarget.getAttribute('title'),
            editing: true
        }, () => this.renderListCards());
    }

    handlerDeletePackage(e){
        console.log('deleting package');
    }

    getPackageColor(packg){
        let colorPackage = this.state.colorPackages[packg];
        if(typeof(colorPackage) === 'undefined') colorPackage = "";
        return "package__color-" + colorPackage;
    }

    renderPackagesList(){
        let element = [];
        for(let pckg in this.state.packages){
            element = [(
                <li key     = {pckg}
                    title   = {pckg}
                    className = {this.getPackageColor(pckg)}
                    onClick = {this.handlerItemPackage}>
                    <span className="delete__package" onClick={this.handlerDeletePackage}>
                        <svg width="15" height="15" viewBox="0 0 64 64">
                            <path fill="#fff"
                                  d="M24.72 8.777h14.56v3.747H24.72zM7.917 11.56h48.164v4.818H7.918z"/>
                            <path fill="none"
                                  stroke="#fff"
                                  d="M40.212 57.362V27.005M32 57.398V27.04m-8.212 30.394V27.077m-11.06-7.594h38.543v40.254H12.73z"/>
                        </svg>
                    </span>
                    <span className="package__name">{pckg}</span>
                </li>
            ), ...element ]
        }
        return element;
    }


    /**
    * @param {String} name
    */
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
            let packageName = this.state.packageNameIsEditing;
            this.getPackageByName(packageName).then( cards => {
                let newCards = this.state.cardItemsValue;
                getChromeStorage('packages').then( packages => {
                    let newobj = JSON.parse(packages);
                    newobj[packageName] = newCards;
                    putStorage('packages', JSON.stringify(newobj));
                    setTimeout( () =>this.setState({editing:false}), 1000);
                });
            });
        }
    }

    renderListCards(){
        this.getPackageByName(this.state.packageNameIsEditing)
            .then( cards => {
            //updating cardItems of the package ^
            let cardItemsComponents = cards.map( (card, index) =>
                <CardItem load={card}
                          index={index}
                          itemsArr={this.state.cardItemsValue}/>);

            this.setState({
                cardItemsValue: cards
            }, () => {
                this.setState({
                    cardItems: [...cardItemsComponents,
                                <CardItem itemsArr={this.state.cardItemsValue}/>]
                });
            });
        }).catch( (err) => {
            //add first component card items
            this.setState({
                cardItems: [...this.state.cardItems,
                            <CardItem itemsArr={this.state.cardItemsValue}/>]
            });
        });
    }

    changeColorPackage(e){
        let colorActive = e.currentTarget.getAttribute('data-item');
        console.log('package color: ', this.state.colorPackages);
        getChromeStorage('packagesColor')
            .then(packages => {
                let newobj = packages;
                newobj[this.state.packageNameIsEditing] = colorActive;
                console.log('newobj: ', newobj);
                this.setState({
                    colorPackages: newobj
                }, () => putStorage('packagesColor', newobj))
            })
            .catch( () => {
                let newobj = {};
                console.log('entrou catch')
                newobj[this.state.packageNameIsEditing] = colorActive;
                console.log('newobj-> ', newobj);
                putStorage('packagesColor', newobj);
            });
    }

    renderPackageEdit(name){
        let packageTitleElement;
        if(this.state.editing){
            let packageName = this.state.packageNameIsEditing;
            packageTitleElement = (
                <header>
                    <h3 className="editingPackage__title">{packageName}</h3>
                    <div className="colors__container">
                        <ul>
                            <li key="1">
                                <label className={"colors__item colors__item-1" + (this.state.colorPackages[this.state.packageNameIsEditing] === "1" ? " active": "")}
                                       onClick={this.changeColorPackage}
                                       data-item="1"></label></li>
                            <li key="2">
                                <label className={"colors__item colors__item-2" + (this.state.colorPackages[this.state.packageNameIsEditing] === "2" ? " active": "")}
                                       onClick={this.changeColorPackage}
                                       data-item="2"></label></li>
                            <li key="3">
                                <label className={"colors__item colors__item-3" + (this.state.colorPackages[this.state.packageNameIsEditing] === "3" ? " active": "")}
                                       onClick={this.changeColorPackage}
                                       data-item="3"></label></li>
                            <li key="4">
                                <label className={"colors__item colors__item-4" + (this.state.colorPackages[this.state.packageNameIsEditing] === "4" ? " active": "")}
                                       onClick={this.changeColorPackage}
                                       data-item="4"></label></li>
                            <li key="5">
                                <label className={"colors__item colors__item-5" + (this.state.colorPackages[this.state.packageNameIsEditing] === "5" ? " active": "")}
                                       onClick={this.changeColorPackage}
                                       data-item="5"></label></li>
                        </ul>
                    </div>
                    <label className="card__save--toggle">
                        <Toggle
                            defaultChecked={this.state.saveToggle}
                            onChange={this.handleSaveToggle} />
                        <span className="card__save--label">Save</span>
                    </label>
                </header>
            );
        }

        let classEditContainer = "editingPackage__container " + (this.state.editing ? "editingPackage__container--edit" : "");
        return (
            <section className={classEditContainer}>
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
        getChromeStorage('packages').then( packages => {
            this.setState({
                packages: JSON.parse(packages)
            });
        });

        //get value if the user is adding package<Updating view)
        PubSub.subscribe('addingPackage', (topic, value) => {
            this.setState({addingPackage: true});
            getChromeStorage('packages').then( packages => {
                this.setState({
                    packages: JSON.parse(packages)
                });
            });
        });

        getChromeStorage('packagesColor')
            .then(packages => {
                console.log('packages: ',packages);
                this.setState({
                    colorPackages: packages
                });
            });
    }

	  render(){
        let classPackageEdit = "Packages " + (this.state.editing ? "editingPackage" : "");
        return (
            <div>
                {this.renderPackageEdit()}
                <section className={classPackageEdit}>
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
