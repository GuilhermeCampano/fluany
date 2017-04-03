import React from 'react';
import { connect } from 'react-redux';
import { changePagination } from '../../actions/actions';

/**
 * A component to click and see more package
 *
 * @param  {Function} dispatch   The result from `store.dispatch()`
 * @param  {Array}    packs   Store's packs
 * @param  {Number}   paginationPackage   A flag to know pagination number
 * @return {Component}
 */
let MorePackage = ({
    dispatch,
    packs,
    paginationPackage }) => {

    const handleClickMorePack = () => {
        dispatch(changePagination());
    };

    let isPagination = paginationPackage  > packs.length;
    return (
            <section className={"more-package--content " + (isPagination ? "more-package--hidden":"")}>
            <button className="more-package--button btn" onClick={handleClickMorePack}>+ Carregar mais</button>
        </section>
    );
}

const mapStateToProps = (
    state
) => ({
        packs: state.packs,
        paginationPackage: state.flags.paginationPackage
    }
);

const {
  func, array, number
} = React.PropTypes;

MorePackage.propTypes = {
    dispatch: func.isRequired,
    paginationPackage: number.isRequired,
    packs: array.isRequired
};

export default connect(mapStateToProps)(MorePackage);
