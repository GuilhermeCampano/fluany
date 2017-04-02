import React from 'react';
import { connect } from 'react-redux';
import Create from './create';
import Pack from './Pack';
import { filter, toLower } from 'ramda';

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
        </section>
    );
}

const getVisiblePackages = (
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
) => {
  return {
      packs: getVisiblePackages(state.packs, state.flags.filterPackage)
  };
};

export default connect(
    mapStateToProps)(PackList);
