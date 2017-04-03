import React from 'react';
import { connect } from 'react-redux';
import { changePackageTitle,
         changePackageDescription } from '../../actions/actions';
import Play  from '../Play/Play';
import Palette from '../Palette/Palette';

let Pack = ({
    dispatch,
    title,
    id,
    colorID,
    description,
    isChangingColor}) => {

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
                maxLength="21"
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
                maxLength="92"
                autoCorrect="false">
            </textarea>
        </div>
    )

    return (
            <li className={"pack-item color-" + colorID}>
                {TitlePackage()}
                {DescriptionPackage()}
                <Play />
                <Palette isChanging={isChangingColor} colorID={colorID} packageid={id}/>
            </li>
    );
}

export default connect()(Pack);
