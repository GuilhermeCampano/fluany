import React from 'react';
import { connect } from 'react-redux';

const TitlePack = ({onChange, title}) => (
    <div className="title-package--container">
			<textarea
				className="input-title-package"
				type="text"
				onChange={onChange}
				spellCheck="false"
				autoCorrect="false"
				maxLength="21"
				value={title}>
			</textarea>
    </div>
);


export default connect()(TitlePack);
