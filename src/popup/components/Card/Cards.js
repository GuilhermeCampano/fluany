import React from 'react';
import { connect } from 'react-redux';
import { map,  } from 'ramda';
import Card from './Card';

const Cards = ({
    dispatch,
    packs,
    idPackage
}) => {

    const cardMap = (card, index) => <Card key={index} index={index} {...card}/>;

    return (
        <section>
            <ul className="card-content">
                { packs[idPackage].cards.map(cardMap) }
            </ul>
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

export default connect(mapStateToProps)(Cards);
