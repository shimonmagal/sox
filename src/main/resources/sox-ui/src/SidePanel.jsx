import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UploadExcel from "./UploadExcel";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import 'font-awesome/css/font-awesome.min.css';

import Dashboard from './Dashboard';
import Controls from "./Controls";

import './SidePanel.css'

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
							<SideNav.Nav defaultSelected="dashboard">
								<NavItem eventKey="dashboard">
									<NavIcon>
										<i className="fa fa-fw fa-dashboard" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Dashboard
									</NavText>
								</NavItem>
								<NavItem eventKey="processes">
									<NavIcon>
										<i className="fa fa-fw fa-cogs" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Devices
									</NavText>
								</NavItem>
								<NavItem eventKey="risks">
									<NavIcon>
										<i className="fa fa-fw fa-bomb" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Risks
									</NavText>
								</NavItem>
								
								<NavItem eventKey="controls">
									<NavIcon>
										<i className="fa fa-fw fa-book" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Controls
									</NavText>
								</NavItem>
								<NavItem eventKey="task-schedule">
									<NavIcon>
										<i className="fa fa-fw fa-calendar" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Task schedule
									</NavText>
								</NavItem>
								<NavItem eventKey="Tasks">
									<NavIcon>
										<i className="fa fa-fw fa-tasks" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Tasks
									</NavText>
								</NavItem>
								<NavItem eventKey="reports">
									<NavIcon>
										<i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
									</NavIcon>
									<NavText>
										Reports
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
								<div className="SoxTitle">
									<h5>SOX Controls Manager</h5>
								</div>
								<br/>
								
								<Route exact path="/" component={props => <Dashboard />} />
								<Route path="/processes" component={props => <Processes />} />
								<Route path="/risks" component={props => <Risks />} />
								<Route path="/controls" component={props => <Controls />} />
								<Route path="/task-schedule" component={props => <TaskSchedule />} />
								<Route path="/tasks" component={props => <Tasks />} />
								<Route path="/reports" component={props => <Reports />} />
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

const Processes = (props) =>
{
	return (
		<div>
			<h2>This is the processes page</h2>
		</div>
	);
};

const Risks = (props) =>
{
	return (
		<div>
			<h2>This is the risks page</h2>
		</div>
	);
};

const TaskSchedule = (props) =>
{
	return (
		<div>
			<h2>This is the task schedule page</h2>
		</div>
	);
};

const Tasks = (props) =>
{
	return (
		<div>
			<h2>This is the Tasks page</h2>
		</div>
	);
};
const Reports = (props) =>
{
	return (
		<div>
			<h2>This is the reports page</h2>
		</div>
	);
};

export default SidePanel;
