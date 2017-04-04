import React from 'react';
import { connect } from 'react-redux';
import PackEdit from '../components/PackEdit/PackEdit';
const PackConfig = ({isEdit}) => {
	if(isEdit){
		return (
				<div>
					<PackEdit />
				</div>
		);
	}else
		return null;
}


const mapStateToProps = (
  state
) => {
  return {
    isEdit: state.flags.isEditPackage
  };
};

export default connect(mapStateToProps)(PackConfig);
