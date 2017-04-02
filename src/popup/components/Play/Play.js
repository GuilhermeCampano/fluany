import React from 'react';
import { connect } from 'react-redux';

let Play = () => {
    return (
        <section className="play-content">
            <svg className="play-icon">
                <use xlinkHref="#icon-play"></use>
            </svg>
            <span className="play-label">Play</span>
        </section>
    );
}


export default connect()(Play);
