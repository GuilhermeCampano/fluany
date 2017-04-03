import React from 'react';
import { connect } from 'react-redux';
import { changePackageTitle,
         changePackageDescription } from '../../actions/actions';
import Play  from '../Play/Play';
import Palette from '../Palette/Palette';
import TitlePack from './TitlePack';
import DescriptionPack from './DescriptionPack';

let Pack = ({
    dispatch,
    title,
    id,
    colorID,
    description,
    isChangingColor}) => {

    const handlePackageTitle = e => {
        dispatch(changePackageTitle(id, e.target.value));
    }

    const handlePackageDescription = e => {
        dispatch(changePackageDescription(id, e.target.value));
    }

    return (
            <li className={"pack-item color-" + colorID}>
                <TitlePack onChange={handlePackageTitle} title={title}/>
                <DescriptionPack onChange={handlePackageDescription} description={description}/>
                <Play />
                <Palette isChanging={isChangingColor} colorID={colorID} packageid={id}/>
            </li>
    );
}

export default connect()(Pack);
