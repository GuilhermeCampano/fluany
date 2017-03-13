import React, {Component} from 'react';
import Alarm from 'shared/Alarms';
import PubSub from 'pubsub-js';
import R from 'ramda';
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
        this.handlerDeletePackage = this.handlerDeletePackage.bind(this);
        this.getPackageByName     = this.getPackageByName.bind(this);
        this.moreCardItem         = this.moreCardItem.bind(this);
        this.handleSaveToggle     = this.handleSaveToggle.bind(this);
        this.renderListCards      = this.renderListCards.bind(this);
        this.changeColorPackage   = this.changeColorPackage.bind(this);
        this.getPackageColor      = this.getPackageColor.bind(this);
        this.handleChangeCard     = this.handleChangeCard.bind(this);
        this.renderCard           = this.renderCard.bind(this);
        this.handleDeleteCard     = this.handleDeleteCard.bind(this);

        this.state = {
            addingPackage: false,
            packages: {},
            editing: false,
            packageNameIsEditing: false,
            saveToggle: false,
            cardItemsComponents: [],
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
        getChromeStorage('packages').then( packages => {
            let newobj = JSON.parse(packages);
            delete newobj[this.state.packageNameIsEditing];

            //updating packages state
            this.setState({
                packages: newobj
            });

            //saving
            putStorage('packages', JSON.stringify(newobj));
            setTimeout( () => this.setState({editing:false}), 600);
        });
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
                    <span className="top__ribbon">
                        <span>{pckg}</span>
                    </span>
                    {/* <span className="package__name">{pckg}</span> */}
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


    handleDeleteCard(index){
        const packageName = this.state.packageNameIsEditing;
        const removeCard = list => R.remove(index, index, list)
        this.setState({
            cardItemsValue: removeCard(this.state.cardItemsValue),
            cardItemsComponents: removeCard(this.state.cardItemsComponents)
        }, () => {
            getChromeStorage('packages').then( packages => {
                let newobj = R.assoc(packageName,
                                     this.state.cardItemsValue,
                                     JSON.parse(packages));

                putStorage('packages', JSON.stringify(newobj));
            });
        });
    }

    handleSaveToggle(e){
        if(e.target.checked){
            const packageName = this.state.packageNameIsEditing;
            const newCards = this.state.cardItemsValue;
            const frontIsEmpty = s => R.isEmpty(R.last(newCards).front)
            const backIsEmpty  = s => R.isEmpty(R.last(newCards).back)
            const lastIsEmpty = R.either(frontIsEmpty, backIsEmpty)();
            const redirectToHome = () => setTimeout( () => this.setState({editing:false}), 1000);

            if(!lastIsEmpty){
                getChromeStorage('packages').then( packages => {
                    let newobj = R.assoc(packageName, newCards, JSON.parse(packages));
                    putStorage('packages', JSON.stringify(newobj));
                    redirectToHome();
                });
            }else
              redirectToHome();

        }
    }

    handleChangeCard(cardId, value, field){
        let updatingCard = R.update(cardId,
                               R.assoc(field, value, this.state.cardItemsValue[cardId]),
                               this.state.cardItemsValue);
        this.setState({
            cardItemsValue: updatingCard
        });
    }

    renderCard(card, index){
        let props = {
            value: this.state.cardItemsValue[index],
            id: index,
            key: index,
            onChange: this.handleChangeCard,
            handleDeleteCard: this.handleDeleteCard
        }
        return (<CardItem {...props} />);
    }

    renderListCards(){
        this.getPackageByName(this.state.packageNameIsEditing)
            .then( cards => {
                //updating cardItems of the package ^
                let cardItemsComponents;
                if(R.isEmpty(cards)){
                    this.setState({
                      cardItemsValue: [{front: "", back: ""}]
                    }, () =>
                        cardItemsComponents = [
                            <CardItem value={this.state.cardItemsValue}
                                    id={0}
                                    key={0}
                                    onChange = {this.handleChangeCard}
                                    handleDeleteCard = {this.handleDeleteCard}/>
                        ]);
                }else{
                    this.setState({
                        cardItemsValue: R.append({front: "", back: ""}, cards)
                    }, () =>
                        cardItemsComponents =  R.addIndex(R.map)(this.renderCard, this.state.cardItemsValue));
                }

                this.setState({
                    cardItemsComponents
                });
            })
            .catch( (err) => {
                //add first component card item
            });
    }

    changeColorPackage(e){
        let colorActive = e.currentTarget.getAttribute('data-item');
        getChromeStorage('packagesColor')
            .then(packages => {
                let newobj = packages;
                newobj[this.state.packageNameIsEditing] = colorActive;
                this.setState({
                    colorPackages: newobj
                }, () => putStorage('packagesColor', newobj))
            })
            .catch( () => {
                let newobj = {};
                newobj[this.state.packageNameIsEditing] = colorActive;
                putStorage('packagesColor', newobj);
            });
    }

    renderPackageEdit(name){
        let packageTitleElement;
        if(this.state.editing){
            let packageName = this.state.packageNameIsEditing;
            packageTitleElement = (
                <header>
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
                    <span className="delete__package" onClick={this.handlerDeletePackage} title="Delete package">
                        <svg width="23" height="23" viewBox="0 0 64 64">
                            <path fill="#fff"
                                d="M24.72 8.777h14.56v3.747H24.72zM7.917 11.56h48.164v4.818H7.918z"/>
                            <path fill="none"
                                stroke="#fff"
                                d="M40.212 57.362V27.005M32 57.398V27.04m-8.212 30.394V27.077m-11.06-7.594h38.543v40.254H12.73z"/>
                        </svg>
                    </span>
                    <h3 className="editingPackage__title">{packageName}
                    </h3>
                    <p>
                        {JSON.stringify(this.state.cardItemsValue)}
                    </p>
                </header>
            );
        }

        let classEditContainer = "editingPackage__container " + (this.state.editing ? "editingPackage__container--edit" : "");
        return (
            <section className={classEditContainer}>
                {packageTitleElement}
                <ul className="editingPackage__questions">
                    {this.state.cardItemsComponents}
                </ul>
                <button className="card__more-btn" onClick={this.moreCardItem}>+ more</button>
            </section>
        );
    }

    moreCardItem(){
        this.setState({
            cardItemsComponents: [...this.state.cardItemsComponents,
                        <CardItem />]
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
