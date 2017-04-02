import React from 'react';
import { connect } from 'react-redux';
import Create from './create';
import Pack from './Pack';

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

const mapStateToProps = (
  state
) => {
  return {
      packs: state.packs
  };
};

export default connect(
    mapStateToProps)(PackList);
