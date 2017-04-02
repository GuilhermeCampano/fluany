import React from 'react';
import { connect } from 'react-redux';
import { changePackageTitle,
         changePackageDescription } from '../../actions/actions';
import Play  from '../Play/Play';

let Pack = ({
    dispatch,
    title,
    id,
    description}) => {

    let titleInput;

    const handlePackageTitle = e => {
        dispatch(changePackageTitle(id, e.target.value));
    }

    const handlePackageDescription = e => {
        dispatch(changePackageDescription(id, e.target.value));
    }

    const TitlePackage = () => (
        <div className="title-package--container">
            <textarea
                className="input-title-package"
                type="text"
                onChange={handlePackageTitle}
                spellCheck="false"
                autoCorrect="false"
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
                onChange={handlePackageDescription}
                value={description}
                spellCheck="false"
                maxLength="98"
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
