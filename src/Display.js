import React, { Component } from 'react';
import classNames from 'classnames';
import './Display.less';

class Display extends Component {
	render() {
		return (
			<div className={classNames('Display')}>
				{this.props.children}
			</div>
		);
	}
}

export default Display;
