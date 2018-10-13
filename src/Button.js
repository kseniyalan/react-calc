import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import './Button.less';

class Button extends Component {
	static propTypes = {
		children: PropTypes.string.isRequired,
		className: PropTypes.string,
		onClick: PropTypes.func.isRequired,
	};

	static defaultProps = {
	};

	render() {
		return (
			<div className={classNames('Button', this.props.className)}
			     onClick={this.props.onClick}
			>
				{this.props.children}
			</div>
		);
	}
}

export default Button;
