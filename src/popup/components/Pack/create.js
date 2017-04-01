import React from 'react';
import {connect} from 'react-redux';
import {isCreatingPackage} from '../../actions/actions';

let Create = ({dispatch}) => {

    const handleClickNewItem = () => {
        dispatch(isCreatingPackage(true));
    };

    return (
        <li key="0" className="pack-item pack-item--new" onClick={handleClickNewItem}>
					  <p className="create-package--icon">+</p>
					  <p className="create-package--description">Adicionar novo pacote</p>
        </li>
    );
}

export default connect()(Create);
