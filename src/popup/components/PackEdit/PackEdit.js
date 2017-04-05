import React from 'react';
import { connect } from 'react-redux';
import { assoc } from 'ramda';
import TitlePack from '../Pack/TitlePack';
import DescriptionPack from '../Pack/DescriptionPack';
import Time from './Time';
import { changePackageTitle,
         changePackageDescription,
         isEditPackage, newPackage } from '../../actions/actions';

let PackEdit = ({
    dispatch,
    isEdit,
    packflag
}) => {

  const handlePackTitle = e => {
      dispatch(newPackage(assoc('title', e.target.value, packflag)));
  };

	const handlePackDescription = e => {
      dispatch(newPackage(assoc('description', e.target.value, packflag)));
	};

	const handleComeBack = () => {
		dispatch(isEditPackage(false));
	};

	const titleProps = {
		onChange: handlePackTitle,
		title: packflag.title
	};

	const descriptionProps = {
		onChange: handlePackDescription,
		description: packflag.description
	};

  const Container = () => (
      <section className="config-package">
				<nav>
					<button className="btn btn-back" onClick={handleComeBack}>Voltar
							<svg className="arrow-back">
								<use xlinkHref="#icon-arrow"></use>
							</svg>
					</button>
					<button className="btn btn-save">Salvar pacote</button>
					<button className="btn btn-delete">
						<span>Excluir</span>
						<svg className="trash-icon">
							<use xlinkHref="#icon-trash"></use>
						</svg>
					</button>
				</nav>
				<div>
					<TitlePack {...titleProps}/>
					<DescriptionPack {...descriptionProps}/>
          {/* <Time idPackage={0}/> */}
				</div>
      </section>
  );

  return isEdit ? Container() : (<div></div>);
};

const mapStateToProps = (
  state
) => {
  return {
      isEdit: state.flags.isEditPackage,
      packflag: state.flags.newPackage
  };
};

export default connect(mapStateToProps)(PackEdit);
