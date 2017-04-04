import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search/Search';
import PackList from '../components/Pack/PackList';

const Home = ({isEdit}) => {
	if(isEdit){
		return null;
	}else
		return (
				<div>
					<Search/>
					<PackList/>
				</div>
		);
};

const mapStateToProps = (
  state
) => {
  return {
    isEdit: state.flags.isEditPackage
  };
};

export default connect(mapStateToProps)(Home);
