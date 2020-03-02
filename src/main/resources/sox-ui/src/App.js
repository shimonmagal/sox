import './App.css';

import React from 'react';
import BasicReport from "./BasicReport";
import Login from "./Login";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			loginFailedReason: ""
		}
	}

	onLoginSuccess()
	{
		this.setState({authenticated: true});
	}

	render() {
		return (
			<div>
                <h1>Welcome to SOX!</h1>
				{ !this.state.authenticated ?
					<Login onLoginSuccess={this.onLoginSuccess.bind(this)} /> :
					<BasicReport />
				}
			</div>
		);
	}
}

export default App;
