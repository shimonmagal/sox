import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UploadExcel from "./UploadExcel";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import 'font-awesome/css/font-awesome.min.css';

class SidePanel extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {expanded: false};
	}
	
	render() {
		return (
			<Router>
				<Route render={({ location, history }) => (
					<React.Fragment>
						<SideNav
							style={{'background-color': '#0394fc'}}
							onSelect={(selected) => {
								const to = '/' + selected;
								if (location.pathname !== to) {
									history.push(to);
								}
							}}
							
							onToggle = {(expanded) => {
								this.setState({ expanded: expanded });
							}}
						>
							<SideNav.Toggle />
							<SideNav.Nav defaultSelected="home">
								<NavItem eventKey="home">
									<NavIcon>
										<i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Home
									</NavText>
								</NavItem>
								<NavItem eventKey="about">
									<NavIcon>
										<i className="fa fa-fw fa-info" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Devices
									</NavText>
								</NavItem>
								<NavItem eventKey="upload-excel">
									<NavIcon>
										<i className="fa fa-fw fa-table" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Upload excel
									</NavText>
								</NavItem>
							</SideNav.Nav>
						</SideNav>
						<main>
							<div
								style={{
									marginLeft: this.state.expanded ? 240 : 64,
									padding: '15px 20px 0 20px'
								}}
							>
								<h1>Welcome to SOX</h1>
								<Route path="/home" component={props => <Home />} />
								<Route path="/about" component={props => <About />} />
								<Route path="/upload-excel" component={props => <UploadExcel />} />
							</div>
						</main>
					</React.Fragment>
				)}
				/>
			</Router>
		);
	}
}

const Home = (props) =>
{
	return (
		<div>
			<h1>This is the home page</h1>
		</div>
	);
};

const About = (props) =>
{
	return (
		<div>
			<h1>This is the about page</h1>
		</div>
	);
};

export default SidePanel;
