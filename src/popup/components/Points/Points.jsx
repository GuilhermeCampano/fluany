import React, {Component} from 'react';
import { Line, Circle } from 'rc-progress';

class Points extends Component {

	constructor(props) {
		super(props);
		this.state = {
			point: "1.800",
			level: 1
		}
	}

	render(){
		return (
			<section>
				<section className="content-progress">
					 <Line percent="50" strokeWidth="4" strokeColor="#ffd400" />
				</section>
				<section className="content-point">
					<span className="Point-level">Level {this.state.level}</span>
					<span className="Point-over">1.120 Pts to Level {this.state.level + 1}</span>
					<span className="Point-point">{this.state.point}</span>
				</section>
			</section>
		);
	}
}

export default Points;