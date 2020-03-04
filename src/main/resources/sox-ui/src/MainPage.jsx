import './MainPage.css';

import React from 'react';
import SidePanel from "./SidePanel";

class MainPage extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		return (
			<SidePanel />
		);
	}
}

export default MainPage;
