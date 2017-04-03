import React from 'react';
import { connect } from 'react-redux';

const DescriptionPack = ({onChange, description}) => (
    <div className="description-package--container">
			<textarea
				className="input-description-package"
				type="text"
				onChange={onChange}
				value={description}
				spellCheck="false"
				maxLength="92"
				autoCorrect="false">
			</textarea>
    </div>
)


export default connect()(DescriptionPack);
