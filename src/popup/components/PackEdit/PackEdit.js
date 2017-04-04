import React from 'react';
import { connect } from 'react-redux';
import TitlePack from '../Pack/TitlePack';
import { changePackageTitle,
         changePackageDescription,
         isEditPackage } from '../../actions/actions';

let PackEdit = ({
  dispatch,
  isEdit
}) => {

  const handlePackageTitle = e => {
		console.log('editing title ');
  };

  const Container = () => (
      <section className="config-package">
				<nav>
					<button className="btn btn-back">Voltar
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
					<TitlePack title="teste victor"/>
					<p> Curabitur vulputate vestibulum lorem. </p>
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
