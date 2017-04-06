import React from 'react';
import { connect } from 'react-redux';

/**
 * A component to see/edit package's description
 *
 * @param  {Function} onChange   A function to receive value when change textarea;
 * @param  {String}   description   The package description
 * @return {Component}
 */
const DescriptionPack = ({onChange, description}) => (
    <div className="description-package--container">
			<textarea
				className="input-description-package"
				type="text"
				onChange={onChange}
				value={description}
				spellCheck="false"
				maxLength="92"
        placeholder="Clique aqui para mudar a descrição"
				autoCorrect="false">
			</textarea>
    </div>
);


const {
  func, string
} = React.PropTypes;

DescriptionPack.propTypes = {
  onChange: func.isRequired,
  description: string.isRequired
};

export default connect()(DescriptionPack);
