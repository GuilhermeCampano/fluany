import React from 'react';
import { connect } from 'react-redux';

let Palette = ({dispatch}) => {
    return (
        <section className="palette-color">
            <ul>
                <li>
                    <label className="color-4"></label>
                </li>
                <li>
                    <label className="color-2"></label>
                </li>
                <li>
                    <label className="color-1 active"></label>
                </li>
                <li>
                    <label className="color-3"></label>
                </li>
            </ul>
        </section>
    );
}

const mapstatetoprops = (
    state
) => {

    return {
        packs: state.packs
    };

};


export default connect(mapstatetoprops)(Palette);
