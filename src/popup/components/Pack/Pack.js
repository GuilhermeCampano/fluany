import React from 'react';
import { connect } from 'react-redux';
import { changePackageTitle,
         changePackageDescription } from '../../actions/actions';
import Play  from '../Play/Play';
import Palette from '../Palette/Palette';
import TitlePack from './TitlePack';
import DescriptionPack from './DescriptionPack';

/**
 * A component to see Pack information
 *
 * @param  {Function} dispatch   The result from `store.dispatch()`
 * @param  {String} title   The package's title
 * @param  {Number} id   The package's id to change on Store
 * @param  {Number} colorID   The package's colorid to change package to color
 * @param  {Boolean} isChangingColor   A flag to know if package is wanting changing color
 * @return {Component}
 */

let Pack = ({
    dispatch,
    title,
    description,
    id,
    colorID,
    isChangingColor }) => {

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

const {
    func, number, bool, string
} = React.PropTypes;

Pack.propTypes = {
    dispatch: func.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    id: number.isRequired,
    colorID: number.isRequired,
    isChangingColor: bool.isRequired
}

export default connect()(Pack);

