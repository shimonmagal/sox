import './App.css';

import React from 'react';
import MainPage from "./MainPage";
import Login from "./Login";
import SidePanel from "./SidePanel";

class App extends React.Component
{
	constructor(props)
	{
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
	
	render()
	{
		return (
			<div>
				<MainPage/>
			</div>
		);
	}
}

export default App;
