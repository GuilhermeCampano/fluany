import React from 'react';
import { connect } from 'react-redux';
import Create from './Create';
import Pack from './Pack';
import MorePackage from './MorePakage';
import { filter, toLower, take, compose } from 'ramda';

/**
 * A component to list store's packs
 *
 * @param  {Array} packs   Store's packs
 * @return {Component}
 */
let PackList = ({
    packs
    }) => {

    return (
        <section>
				    <ul className="packs-content">
                <Create/>
                {packs.map(pack =>
                        <Pack
                         key={pack.id}
                         {...pack}/>
                 )}
				    </ul>
            <MorePackage/>
        </section>
    );
}


/**
 * A function to take the packages in accordance with the store's pagination
 *
 * @param  {Array} packs        Store's packs
 * @return {Number} pagination  Store's pagination
 */
const getVisiblePackages = (
    packs,
    pagination
) => take(pagination, packs);


/**
 * A function to filter packages in accordance with the store's filter
 *
 * @param  {Array} packs           Store's packs
 * @return {String} filterPackage  Store's filterPackage
 */
const getSearchPackages = (
    packs,
    filterPackage
) => filter(pack => {
        let title = toLower(pack.title);
        let description = toLower(pack.description);

        return title.indexOf(filterPackage) != -1
               || description.indexOf(filterPackage) != -1;

    }, packs);

const mapStateToProps = (
  state
) => ({
      packs: getVisiblePackages(
                getSearchPackages(state.packs, state.flags.filterPackage),
                state.flags.paginationPackage
      )
    }
);


const {
  array
} = React.PropTypes;

PackList.propTypes = {
    packs: array.isRequired
};

export default connect(
    mapStateToProps)(PackList);
