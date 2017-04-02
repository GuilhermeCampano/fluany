import React from 'react';
import { connect } from 'react-redux';
import { isEditTitlePackage } from '../../actions/actions';
import Play  from '../Play/Play';

let Pack = ({
    dispatch,
    title,
    id,
    description}) => {

    let titleInput;
    setTimeout(() => {
        titleInput.blur()
    }, 100);

    const TitlePackage = () => (
        <div className="title-package--container">
            <textarea
                className="input-title-package"
                type="text"
                ref={input => {titleInput = input;}}
                value={title}>
            </textarea>
        </div>
    )

    const DescriptionPackage = () => (
        <div className="description-package--container">
            <textarea
                className="input-description-package"
                type="text"
                value={description}
                spellCheck="false"
                autoCorrect="false">
            </textarea>
        </div>
    )

    return (
            <li className="pack-item color-1">
                {TitlePackage()}
                {DescriptionPackage()}
                <Play />
            </li>
    );
}

export default connect()(Pack);
