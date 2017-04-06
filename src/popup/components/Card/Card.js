import React from 'react';
import { connect } from 'react-redux';
import { inc } from 'ramda';

const Card = ({
    dispatch,
    packs,
    index,
    colorID
}) => {

    return (
        <li className={"card-item color-" + colorID}>
            <p className="card-item--count">{ inc(index) }</p>
        </li>
    );
}

const mapStateToProps = (
    state
) => {
    return {
		    packs: state.packs
    };
};

export default connect(mapStateToProps)(Card);
