import React, { Component } from 'react';
import './css/App.less';

import Button from './Button';
import Display from './Display';

class App extends Component {
	state = {
		currentInput: '',
		previousInput: '',
		currentOperation: '',
		dropInput: false,
	}

	onClear() {
		this.setState({
			currentInput: '',
			previousInput: '',
			currentOperation: '',
			dropInput: false,
		});
	}

	onClearEntry() {
		this.setState({currentInput: ''});
	}

	onDigit(digit) {
		let current = this.state.currentInput;
		if (this.state.dropInput) {
			current = '';
		}

		this.setState({
			currentInput: `${current}${digit}`,
			dropInput: false,
		});
	}

	onDecimal() {
		if (this.state.currentInput.indexOf('.') === -1) {
			this.onDigit('.');
		}
	}

	onBackspace() {
		if (!this.state.dropInput) {
			this.setState({
				currentInput: this.state.currentInput.slice(0, -1),
			});
		}
	}

	unaryOperation(op, input) {
		switch(op) {
			case 'plusminus': return -input;
			case 'root': return Math.sqrt(input);
			case 'square': return Math.pow(input, 2);
			case 'reciprocal': return 1 / input;
			case 'percent':
				if (this.state.previousInput !== '') {
					return this.state.previousInput / 100 * input;
				}
		}
		return null;
	}

	onUnary(op) {
		if (this.state.currentInput !== '') {
			const result = this.unaryOperation(op, this.state.currentInput);
			if (result !== null) {
				this.setState({
					currentInput: `${result}`,
					dropInput: true,
				});
			}
		}
	}

	async onBinary(op) {
		await this.onResult();
	
		this.setState({
			previousInput: this.state.currentInput,
			currentInput: '',
			currentOperation: op,
		});
	}

	binaryOperation(op, a, b) {
		a = Number.parseFloat(a);
		b = Number.parseFloat(b);
		switch(op) {
			case 'plus': return a + b;
			case 'minus': return a - b;
			case 'multiply': return a * b;
			case 'divide': return a / b;
		}
	}

	onResult() {
		return new Promise((resolve, reject) => {
			if (this.state.previousInput !== '') {
				this.setState({
					previousInput: '',
					currentInput: this.binaryOperation(
						this.state.currentOperation,
						this.state.previousInput,
						this.state.currentInput
					),
					currentOperation: '',
					dropInput: true,
				}, resolve);
			} else {
				resolve();
			}
		});
	}

	render() {
		return (
			<div className="App">
				<div className="btns-wrap">
					<Display>
						{this.state.previousInput}
						&nbsp;
						{this.state.currentOperation}
						&nbsp;
						{this.state.currentInput}
					</Display>
				</div>
				<div className="btns-wrap">
					<Button onClick={this.onUnary.bind(this, 'percent')}>%</Button>
					<Button onClick={this.onUnary.bind(this, 'root')}>&#x221a;</Button>
					<Button onClick={this.onUnary.bind(this, 'square')}>x<sup>2</sup></Button>
					<Button onClick={this.onUnary.bind(this, 'reciprocal')}>1/x</Button>
					<Button onClick={this.onClearEntry.bind(this)}>CE</Button>
					<Button onClick={this.onClear.bind(this)}>C</Button>
					<Button onClick={this.onBackspace.bind(this)}>&#x232b;</Button>
					<Button onClick={this.onBinary.bind(this, 'divide')}>&#x00F7;</Button>
					<Button onClick={this.onDigit.bind(this, 7)} className="digit">7</Button>
					<Button onClick={this.onDigit.bind(this, 8)} className="digit">8</Button>
					<Button onClick={this.onDigit.bind(this, 9)} className="digit">9</Button>
					<Button onClick={this.onBinary.bind(this, 'multiply')}>&#x00d7;</Button>
					<Button onClick={this.onDigit.bind(this, 4)} className="digit">4</Button>
					<Button onClick={this.onDigit.bind(this, 5)} className="digit">5</Button>
					<Button onClick={this.onDigit.bind(this, 6)} className="digit">6</Button>
					<Button onClick={this.onBinary.bind(this, 'minus')}>&#x2212;</Button>
					<Button onClick={this.onDigit.bind(this, 1)} className="digit">1</Button>
					<Button onClick={this.onDigit.bind(this, 2)} className="digit">2</Button>
					<Button onClick={this.onDigit.bind(this, 3)} className="digit">3</Button>
					<Button onClick={this.onBinary.bind(this, 'plus')}>+</Button>
					<Button onClick={this.onUnary.bind(this, 'plusminus')}>&#x00b1;</Button>
					<Button onClick={this.onDigit.bind(this, 0)} className="digit">0</Button>
					<Button onClick={this.onDecimal.bind(this)}>.</Button>
					<Button onClick={this.onResult.bind(this)}>=</Button>
				</div>
			</div>
		);
	}
}

export default App;
