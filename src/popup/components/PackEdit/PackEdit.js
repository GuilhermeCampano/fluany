import React from 'react';
import { connect } from 'react-redux';
import TitlePack from '../Pack/TitlePack';
import DescriptionPack from '../Pack/DescriptionPack';
import { changePackageTitle,
         changePackageDescription,
         isEditPackage } from '../../actions/actions';

let PackEdit = ({
  dispatch,
  isEdit
}) => {

  const handlePackTitle = e => {
		console.log('editing title ');
  };

	const handlePackDescription = e => {

	};

	const handleComeBack = () => {
		dispatch(isEditPackage(false));
	};

	const titleProps = {
		onChange: handlePackTitle,
		title: "Título do pacote"
	};

	const descriptionProps = {
		onChange: handlePackDescription,
		description: "Click aqui para mudar a descrição do pacote"
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
				</div>
      </section>
  );

  return isEdit ? Container() : (<div></div>);
};

const mapStateToProps = (
  state
) => {
  return {
    isEdit: state.flags.isEditPackage
  };
};

export default connect(mapStateToProps)(PackEdit);
