import React, { Component } from 'react';
import './css/App.less';
import classNames from 'classnames';

import Button from './Button';
import Display from './Display';

class App extends Component {
	state = {
		currentInput: '',
		previousInput: '',
		currentOperation: '',
		dropInput: false,
		error: false,
	}

	isCorrectResult = result => {
		return Number.isFinite(result) && !Number.isNaN(result);
	}

	onClear = () => {
		this.setState({
			currentInput: '',
			previousInput: '',
			currentOperation: '',
			dropInput: false,
			error: false,
		});
	}

	onClearEntry = () => {
		this.setState({ currentInput: '', error: false });
	}

	onDigit = digit => {
		const { currentInput, dropInput } = this.state;
		let current = currentInput;
		if (dropInput) current = '';

		this.setState({
			currentInput: `${current}${digit}`,
			dropInput: false,
			error: false,
		});
	}

	onDecimal = () => {
		if (this.state.currentInput.indexOf('.') === -1) this.onDigit('.');
	}

	onBackspace = () => {
		const { currentInput, dropInput } = this.state;
		if (!dropInput) {
			this.setState({
				currentInput: currentInput.slice(0, -1),
				error: false,
			});
		}
	}

	unaryOperation = (op, input) => {
		switch(op) {
			case 'plusminus': return -input;
			case 'root': return Math.sqrt(input);
			case 'square': return Math.pow(input, 2);
			case 'reciprocal': return 1 / input;
			case 'percent':
				if (this.state.previousInput !== '') return this.state.previousInput / 100 * input;
		}
		return null;
	}

	onUnary = (op) => {
		if (this.state.currentInput !== '') {
			const result = this.unaryOperation(op, this.state.currentInput);
			if (result !== null) {
				this.setState({
					currentInput: `${result}`,
					dropInput: true,
					error: !this.isCorrectResult(result),
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
			error: false,
		});
	}

	binaryOperation = (op, a, b) => {
		a = Number.parseFloat(a);
		b = Number.parseFloat(b);
		switch(op) {
			case 'plus': return a + b;
			case 'minus': return a - b;
			case 'multiply': return a * b;
			case 'divide': return a / b;
		}
	}

	onResult = () => {
		return new Promise((resolve, reject) => {
			if (this.state.previousInput !== '') {
				const result = this.binaryOperation(
					this.state.currentOperation,
					this.state.previousInput,
					this.state.currentInput
				);

				this.setState({
					previousInput: '',
					currentInput: `${result}`,
					currentOperation: '',
					dropInput: true,
					error: !this.isCorrectResult(result),
				}, resolve);

			} else {
				resolve();
			}
		});
	}

	operationSymbol = (op) => {
		switch(op) {
			case 'percent': return <span>%</span>;
			case 'root': return <span>&#x221a;</span>;
			case 'square': return <span>x<sup>2</sup></span>;
			case 'reciprocal': return <span>1/x</span>;
			case 'divide': return <span>&#x00F7;</span>;
			case 'multiply': return <span>&#x00d7;</span>;
			case 'minus': return <span>&#x2212;</span>;
			case 'plus': return <span>+</span>;
		}
		return op;
	}

	render() {
		const { error, previousInput, currentOperation, currentInput, } = this.state;

		return (
			<div className={classNames('App', {shake: error})}>
				<div className="btns-wrap">
					<Display>
						{previousInput}
						&nbsp;
						{this.operationSymbol(currentOperation)}
						&nbsp;
						{currentInput !== '' ? currentInput : (currentOperation === '' ? '0' : '')}
					</Display>
				</div>
				<div className="btns-wrap">
					<Button onClick={() => this.onUnary('percent')}>%</Button>
					<Button onClick={() => this.onUnary('root')}>{this.operationSymbol('root')}</Button>
					<Button onClick={() => this.onUnary('square')}>{this.operationSymbol('square')}</Button>
					<Button onClick={() => this.onUnary('reciprocal')}>{this.operationSymbol('reciprocal')}</Button>
					<Button onClick={() => this.onClearEntry()}>CE</Button>
					<Button onClick={() => this.onClear()}>C</Button>
					<Button onClick={() => this.onBackspace()}>&#x232b;</Button>
					<Button onClick={() => this.onBinary('divide')}>{this.operationSymbol('divide')}</Button>
					<Button onClick={() => this.onDigit(7)} className="digit">7</Button>
					<Button onClick={() => this.onDigit(8)} className="digit">8</Button>
					<Button onClick={() => this.onDigit(9)} className="digit">9</Button>
					<Button onClick={() => this.onBinary('multiply')}>{this.operationSymbol('multiply')}</Button>
					<Button onClick={() => this.onDigit(4)} className="digit">4</Button>
					<Button onClick={() => this.onDigit(5)} className="digit">5</Button>
					<Button onClick={() => this.onDigit(6)} className="digit">6</Button>
					<Button onClick={() => this.onBinary('minus')}>{this.operationSymbol('minus')}</Button>
					<Button onClick={() => this.onDigit(1)} className="digit">1</Button>
					<Button onClick={() => this.onDigit(2)} className="digit">2</Button>
					<Button onClick={() => this.onDigit(3)} className="digit">3</Button>
					<Button onClick={() => this.onBinary('plus')}>{this.operationSymbol('plus')}</Button>
					<Button onClick={() => this.onUnary('plusminus')}>&#x00b1;</Button>
					<Button onClick={() => this.onDigit(0)} className="digit">0</Button>
					<Button onClick={() => this.onDecimal()}>.</Button>
					<Button onClick={() => this.onResult()}>=</Button>
				</div>
			</div>
		);
	}
}

export default App;
