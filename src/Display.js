import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import './Display.less';

class Display extends Component {
	static propTypes = {
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className={classNames('Display')}>
				{this.props.children}
			</div>
		);
	}
}

export default Display;
