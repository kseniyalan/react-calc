import React, { Component } from 'react';
import './css/App.less';

import Button from './Button';
import Display from './Display';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="btns-wrap">
					<Display/>
				</div>
				<div className="btns-wrap">
					<Button>%</Button>
					<Button>&#x221a;</Button>
					<Button>x<sup>2</sup></Button>
					<Button>1/x</Button>
					<Button>CE</Button>
					<Button>C</Button>
					<Button>&#x232b;</Button>
					<Button>&#x00F7;</Button>
					<Button className="digit">7</Button>
					<Button className="digit">8</Button>
					<Button className="digit">9</Button>
					<Button>&#x00d7;</Button>
					<Button className="digit">4</Button>
					<Button className="digit">5</Button>
					<Button className="digit">6</Button>
					<Button>&#x2212;</Button>
					<Button className="digit">1</Button>
					<Button className="digit">2</Button>
					<Button className="digit">3</Button>
					<Button>+</Button>
					<Button>&#x00b1;</Button>
					<Button className="digit">0</Button>
					<Button>.</Button>
					<Button>=</Button>
				</div>
			</div>
		);
	}
}

export default App;
