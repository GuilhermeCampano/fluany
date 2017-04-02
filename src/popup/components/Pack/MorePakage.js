import React from 'react';
import { connect } from 'react-redux';
import { changePagination } from '../../actions/actions';

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
) => {

    return {
        packs: state.packs,
        paginationPackage: state.flags.paginationPackage
    };

};


export default connect(mapStateToProps)(MorePackage);
