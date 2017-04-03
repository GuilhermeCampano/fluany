import React from 'react';
import { connect } from 'react-redux';

/**
 * A component to see/edit package's title
 *
 * @param  {Function} onChange   A function to receive value when change textarea;
 * @param  {String}   title   The package title
 * @return {Component}
 */
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

const {
  func, string
} = React.PropTypes;

TitlePack.propTypes = {
  onChange: func.isRequired,
  title: string.isRequired
};

export default connect()(TitlePack);
