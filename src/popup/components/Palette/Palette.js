import React from 'react';
import { connect } from 'react-redux';
import { changeColorID, isChangingColor } from '../../actions/actions';

let Palette = ({
    dispatch,
    packageid,
    isChanging,
    colorID}) => {

    const handleChangeColor = (colorid) => {
        dispatch(changeColorID(colorid, packageid));
        dispatch(isChangingColor(false, packageid));
    };

    const handleClickOnPalette = () => {
        dispatch(isChangingColor(true, packageid));
    };

    const paletteColors = () => (
            <ul>
                <li>
                    <label onClick={() => handleChangeColor(4)}
                        className={"color-4" + (colorID === 4 ?  " active": "")}></label>
                </li>
                <li>
                    <label onClick={() => handleChangeColor(2)}
                        className={"color-2" + (colorID === 2 ?  " active": "")}></label>
                </li>
                <li>
                    <label onClick={() => handleChangeColor(1)}
                        className={"color-1" + (colorID === 1 ?  " active": "")}></label>
                </li>
                <li>
                    <label onClick={() => handleChangeColor(3)}
                        className={"color-3" + (colorID === 3 ?  " active": "")}></label>
                </li>
            </ul>
    );

    return (
        <section className={"palette-color" + (isChanging ? " changing-color": "")}>
            {paletteColors()}
            <svg className="brush-icon" onClick={handleClickOnPalette}>
                <use xlinkHref="#icon-brush"></use>
            </svg>
        </section>
    );
}


export default connect()(Palette);
