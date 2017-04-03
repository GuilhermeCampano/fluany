import React from 'react';
import { connect } from 'react-redux';
import TitlePack from '../components/Pack/TitlePack';
import { changePackageTitle,
         changePackageDescription,
         isEditPackage } from '../actions/actions';

let PackEdit = ({
  dispatch,
  isEdit
}) => {

  const handlePackageTitle = e => {
  }

  const Container = () => (
      <section>
				<nav>
					<button className="btn">Voltar</button>
					<button className="btn">Excluir</button>
					<button className="btn">Salvar pacote</button>
				</nav>
				<div>
					<TitlePack title="teste victor"/>
					<p> Curabitur vulputate vestibulum lorem. </p>
				</div>
      </section>
  );

  return isEdit ? Container() : (<div></div>);
}

const mapStateToProps = (
  state
) => {
  return {
    isEdit: state.flags.isEditPackage
  };
};

export default connect(mapStateToProps)(PackEdit);
