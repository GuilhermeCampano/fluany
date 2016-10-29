import React, {Component} from 'react';
import { Line } from 'rc-progress';

//Max point : 1000
class Points extends Component {

	constructor(props) {
		super(props);
		this.state = {
			point: 200,
			level: 1,
			color: '#3FC7FA'
		};
	}

	getColorToPoint(){

		if(this.state.point < 300){
			return '#FE8C6A';
		}else
			if(this.state.point < 700){
				return '#3FC7FA';
			}else
				return '#85D262';
	}

	componentDidMount() {
		this.setState({
			color: this.getColorToPoint()
		});

		//get level of the User
		chrome.storage.sync.get('levelStep', obj => {
			console.log(obj);
			if(obj.levelStep){
				  this.setState({
              level: obj.levelStep.level,
              point: obj.levelStep.point});
			}
		});
	}

	render(){
		return (
			<section>
				<section className="content-progress">
					 <Line percent={(this.state.point/100)*10} strokeWidth="4" strokeColor={this.state.color} />
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
