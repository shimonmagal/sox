import './App.css';

import React from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from "axios";

const CLIENT_ID = "302172748643-4ku8jk6v9le1agq7qtj82qn4ombphkld.apps.googleusercontent.com";

class Login extends React.Component
{
	constructor(props)
	{
		super(props)
		
		this.state = {
			loginFailedReason: ''
		}
	}
	
	onGoogleResponse(googleResponse)
	{
		console.log(googleResponse);
		let self = this;
		axios({
			method: 'POST',
			url: 'api/login',
			data: googleResponse.tokenId,
			headers: {'Content-Type': 'text/plain; charset=utf-8'}
		})
			.then(response => {
				console.log(response);
				if (response.status == 200)
				{
					self.setState({loginFailedReason: ''});
					self.props.onLoginSuccess();
				}
				else
				{
					self.setState({loginFailedReason: response.statusText});
					console.log(response);
				}
			})
			.catch((error) => {
				console.log(error.message);
				self.setState({loginFailedReason: error.message});
			});
	}
	
	render()
	{
		return (
			<div className="Login">
				<p>Please login using a Gmail account</p>
				<GoogleLogin
					clientId={CLIENT_ID}
					buttonText="Login"
					onSuccess={this.onGoogleResponse.bind(this)}
					onFailure={this.onGoogleResponse.bind(this)}
					cookiePolicy={'single_host_origin'}
				/>
				{this.state.loginFailedReason != '' ? <p>Login failed: {this.state.loginFailedReason}</p> : null}
			</div>
		);
	}
}

export default Login;
