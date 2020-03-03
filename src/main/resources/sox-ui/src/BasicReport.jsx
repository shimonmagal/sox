import './BasicReport.css';

import React from 'react';
import axios from 'axios';

class BasicReport extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {data: {}, error: ""};
		
		axios.get("/api/report")
			.then(resp => console.log(resp))
			.catch(error => this.setState({error: error}));
	}
	
	render()
	{
		return (
			<div>
				<h1>authenticated!</h1>
			</div>
		);
	}
}

export default BasicReport;
