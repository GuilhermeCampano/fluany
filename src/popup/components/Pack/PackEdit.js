import React from 'react';
import { connect } from 'react-redux';
import { changePackageTitle,
         changePackageDescription } from '../../actions/actions';

let PackEdit = ({
    dispatch,
    }) => {

    return (
        <section>
            <nav>
                <button className="btn">Voltar</button>
                <button className="btn">Excluir</button>
                <button className="btn">Salvar pacote</button>
            </nav>
            <div>
                <h3>Pack do victor teste</h3>
                <p> Curabitur vulputate vestibulum lorem. </p>
            </div>
        </section>
    );
}

export default connect()(PackEdit);
