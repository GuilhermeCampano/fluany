import React from 'react';
import { connect } from 'react-redux';
import { isEditTitlePackage } from '../../actions/actions';

let Pack = ({
    dispatch,
    title,
    description}) => {

    let titleInput;

    const TitlePackage = () => {
        return (
            <div className="title-package--container">
                <textarea
                    className="input-title-package"
                    type="text"
                    ref={input => {titleInput = input}}
                    value={title}>
                </textarea>
            </div>
        )
    };

    return (
            <li className="pack-item color-1">
                {TitlePackage()}
                <p className="pack-description">Nullam eu ante vel est convallis dignissim.</p>
            </li>
    );
}

export default connect()(Pack);
