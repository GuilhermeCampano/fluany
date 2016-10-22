import React, {Component} from 'react';
import { Line, Circle } from 'rc-progress';

//Max point : 1000
class Points extends Component {

	constructor(props) {
		super(props);
		this.state = {
			point: 100,
			level: 1
		}
	}

	componentDidMount() {
		this.setState({point: 400});
	}
	render(){
		return (
			<section>
				<section className="content-progress">
					 <Line percent={''+ (this.state.point/100) * 10} strokeWidth="4" strokeColor="#ffd400" />
				</section>
				<section className="content-point">
					<span className="Point-level">Level {this.state.level}</span>
					<span className="Point-over">{1000 - this.state.point} Pts to Level {this.state.level + 1}</span>
					<span className="Point-point">{this.state.point}</span>
				</section>
			</section>
		);
	}
}

export default Points;