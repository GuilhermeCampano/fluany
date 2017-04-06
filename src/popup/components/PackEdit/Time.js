import React from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { changeTimePackage } from '../../actions/actions';

let Time = ({
  dispatch,
	packs,
	idPackage
}) => {

	const handleTimeChange = (component, value) => {
		  dispatch(changeTimePackage(value, idPackage));
	};

	return (
		  <section className="time-container">
			<InputRange
				maxValue={20}
				minValue={1}
				value={packs[idPackage].timeMinutes}
				onChange={handleTimeChange}
				defaultValue={4}
				labelSuffix="min"
			/>
		</section>
	);
}

const mapStateToProps = (
  state
) => {
  return {
		packs: state.packs
  };
};

export default connect(mapStateToProps)(Time);
