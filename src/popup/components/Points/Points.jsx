import React, {Component} from 'react';
import { Line } from 'rc-progress';
import {getChromeStorage} from 'shared/helpers';

class Points extends Component {

	constructor(props) {
		super(props);
		this.state = {
      lengthCards: 0,
      totalCards: 0,
			level: 1,
			color: '#3FC7FA'
		};
	}

 _updatePointInPackage(){
    getChromeStorage('packageSelected').then( packageSelected => {
      getChromeStorage('packages')
        .then(JSON.parse)
        .then( packages => {
          let arrPackageSelected = packages[packageSelected.label];
          this.setState({totalCards: arrPackageSelected.length});
        });

      getChromeStorage('cardStep')
        .then(JSON.parse)
        .then(newcard => {
           this.cards = newcard;
           this.setState({lengthCards: newcard.length});
        })//first time
        .catch(()=> {
          this.cards = 0;
          this.setState({lengthCards: 0});
        }).then(() => {
          this.setState({color: this.getColorToPoint()})
        })//finally
     });
  }
	getColorToPoint(){
    let cardsAccepted = this.state.totalCards - this.state.lengthCards;
		if(cardsAccepted < this.state.totalCards/3)
			return '#FE8C6A';
		else
			if(cardsAccepted < this.state.totalCards/2)
				return '#3FC7FA';
			else
				return '#85D262';
	}

	componentDidMount() {
    this._updatePointInPackage();
	}

 render(){
    let cardsAccepted = this.state.totalCards - this.state.lengthCards;
		return (
			  <section>
				  <section className="content-progress">
					 <Line percent={(cardsAccepted/this.state.totalCards)*100} strokeWidth="4" strokeColor={this.getColorToPoint()} />
				</section>
			</section>
		);
	}
}

export default Points;
