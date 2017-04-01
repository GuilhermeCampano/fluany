import React from 'react';
import {connect} from 'react-redux';
import Create from './create';

let Packs = ({dispatch}) => {
    return (
        <section>
				    <ul className="packs-content">
                <Create/>
				    </ul>
        </section>
    );
}

export default connect()(Packs);
