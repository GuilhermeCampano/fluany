import React, {Component} from 'react';
import {compose, multiply, divide, isEmpty, ifElse} from 'ramda';
import { Line } from 'rc-progress';
import {getChromeStorage} from 'shared/helpers';
import PubSub from 'pubsub-js';

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
    getChromeStorage('packageSelected').then(packageSelected => {
      getChromeStorage('packages')
        .then(JSON.parse)
        .then(packages => {
            let arrPackageSelected = packages[packageSelected.label];
            if(isEmpty(arrPackageSelected)){
                this.setState({
                    totalCards: 0,
                    lengthCards: 0,
                    color: this.getColorToPoint()
                });
            }else{
                this.setState({
                    totalCards: arrPackageSelected.cards.length,
                    lengthCards: arrPackageSelected.cardsInProgress.length,
                    color: this.getColorToPoint()
                });
            }
        });
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
      PubSub.subscribe('EVENT_SELECTED_PACKAGE', (topic, value) => {
          console.log('cauu')
        this._updatePointInPackage();
      });
	}

  render(){
      let cardsAccepted = this.state.totalCards - this.state.lengthCards;
      let porcent = this.state.totalCards ? compose(multiply(100), divide) : () => 0;
		return (
			  <section>
				  <section className="content-progress">
					 <Line percent={porcent(cardsAccepted, this.state.totalCards)} strokeWidth="4" strokeColor={this.getColorToPoint()} />
				</section>
			</section>
		);
	}
}

export default Points;
