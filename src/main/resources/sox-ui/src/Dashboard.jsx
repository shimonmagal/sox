import React from 'react';

import Chart from 'react-apexcharts'

class Dashboard extends React.Component
{
	constructor(props) {
		super(props);
		
		this.state = {
			openClosed: {
				options: {
					chart: {
						width: 380,
						type: 'pie',
					},
					labels: ['Open', 'Closed'],
				},
				series: [20, 80],
				labels: ['Open', 'Closed']
			},
			tasksStatus: {
				options: {
					labels: ['Approved', 'In process', 'Incorrect', 'Approved after reject', 'Approval - 2nd approver', 'Approved - 2nd approver'],
					chart: {
						width: 500,
						type: 'pie',
					}
				},
				series: [44, 55, 34, 17, 13, 7],
			}
		}
	}
	
	onClickHandler()
	{
	
	}
	
	render() {
		
		return (
			<div className="donut">
				<table>
					<tr>
						<td>
							<h4>Open/Closed tasks</h4>
							<Chart options={this.state.openClosed.options} series={this.state.openClosed.series} type="pie" width="350" />
						</td>
						<td>
							<h4>All tasks by status</h4>
							<Chart options={this.state.tasksStatus.options} series={this.state.tasksStatus.series} type="pie" width="440" />
						</td>
					</tr>
				</table>
			</div>
		);
	}
}

export default Dashboard;
