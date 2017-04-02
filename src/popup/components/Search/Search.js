import React from 'react';
import { connect } from 'react-redux';
import { changeFilterPackage, toggleActiveSearch } from '../../actions/actions';
let Search = ({
    dispatch,
    filterPackage,
    isActiveSearch }) => {

    const handleChangeFilter = e => {
        dispatch(changeFilterPackage(e.target.value));
    };

    return (
        <section className={"search-content " + (isActiveSearch ? "search-active":"")}>
            <svg className="search-icon" onClick={() => dispatch(toggleActiveSearch())}>
                <use xlinkHref="#icon-search"></use>
            </svg>
            {isActiveSearch}
            <input type="search"
                className="search-input"
                placeholder="Pesquisar"
                onChange={handleChangeFilter}
                value={filterPackage}></input>
        </section>
    );
}

const mapStateToProps = (
    state
) => {
    return {
        filterPackage: state.flags.filterPackage,
        isActiveSearch: state.flags.isActiveSearch
    };
};

export default connect(mapStateToProps)(Search);
