import React from 'react';
import { connect } from 'react-redux';
import { isCreatingPackage,
         isEditPackage } from '../../actions/actions';

let Create = ({
    isCreating,
    dispatch}) => {

    const handleClickNewItem = () => {
        dispatch(isCreatingPackage(true));
    };

    const handleClickCancel = () => {
        dispatch(isCreatingPackage(false));
    }

    const handleClickCreate = () => {
        dispatch(isEditPackage(true));
    }

    const Creating = () => (
        <div className="pack-item--creating">
            <p className="pack-item--title">Adicionar novo pacote</p>
            <input className="pack-item--input"
                   name="newpack"
                   type="text"
                   placeholder="Qual o nome do novo pacote?"/>

            <div className="new-pack--buttons">
                <button className="btn btn-cancel"
                        onClick={handleClickCancel}>Cancelar</button>
                <button className="btn btn-create"
                        onClick={handleClickCreate}>Criar pacote</button>
            </div>
        </div>

    )

    const Content = () => (
        <div className="pack-item-content" onClick={handleClickNewItem}>
            <p className="create-package--icon">+</p>
            <p className="create-package--description">Adicionar novo pacote</p>
        </div>
    );

    return (
        <li key="0" className="pack-item pack-item--new">
            {isCreating ? Creating(): Content() }
        </li>
    );
}

const mapStateToProps = (
  state
) => {
  return {
      isCreating: state.flags.isCreatingPackage
  };
};

export default connect(
    mapStateToProps)(Create);
