import React, {Component} from 'react';
import { Line } from 'rc-progress';
import {getChromeStorage} from 'shared/helpers';

//Max point : 1000
class Points extends Component {

	constructor(props) {
		super(props);
		this.state = {
			point: 0,
			level: 1,
			color: '#3FC7FA'
		};
	}

	getColorToPoint(){
		if(this.state.point < 300)
			return '#FE8C6A';
		else
			if(this.state.point < 700)
				return '#3FC7FA';
			else
				return '#85D262';
	}

	componentDidMount() {
		//get level of the User
    getChromeStorage('localKeys')
        .then(localKeys => {
            this.setState({
                level: localKeys.level,
                point: localKeys.points});
        })
        .catch(() => {
            this.setState({
                level: 1,
                point: 0
            });
        })
        .then(() => this.setState({color: this.getColorToPoint()}));
	}

	render(){
		return (
			<section>
				<section className="content-progress">
					 <Line percent={(this.state.point/100)*10} strokeWidth="4" strokeColor={this.getColorToPoint()} />
				</section>
			</section>
		);
	}
}

export default Points;
