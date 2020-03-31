import React from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

class Controls extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state = {
			"columns": [
				{key: 'id', name: 'Control id', sortable: true},
				{key: 'name', name: 'Name', sortable: true},
				{key: 'desc', name: 'Description', sortable: true}
				],
			"rows": [
				{id: 'ITGC-IS1', name: 'inactive accounts', desc: 'Periodic review of inactive accounts', __metaData: {}},
				{id: 'ITGC-IS2', name: 'Non IT Generic users', desc: 'Non IT Generic users - check content of roles', __metaData: {}},
				{id: 'ITGC-IS3', name: 'Users assigned to roles', desc: 'Users assigned to roles (by business data owners)', __metaData: {}}
				],
			sortColumn: "id",
			sortDirection: "ASC"
		};
		
		this.sortRows = (rows, sortColumn, sortDirection) => {
			const comparer = (a, b) => {
				if (sortDirection === "ASC") {
					return a[sortColumn] > b[sortColumn] ? 1 : -1;
				} else if (sortDirection === "DESC") {
					return a[sortColumn] < b[sortColumn] ? 1 : -1;
				}
			};
			
			let newRows = sortDirection === "NONE" ? rows : [...rows].sort(comparer);
			
			this.setState({"rows": newRows, sortDirection: sortDirection, sortColumn: sortColumn});
		};
	}
	
	render() {
		return (
			<div>
				<ReactDataGrid
					sortColumn={this.state.sortColumn}
					sortDirection={this.state.sortDirection}
					columns={this.state.columns}
					rows={this.state.rows}
					rowGetter={i => this.state.rows[i]}
					rowsCount={this.state.rows.length}
					minHeight={150}
					onSort={(sortColumn, sortDirection) => {
						console.log('hi');
						this.sortRows(this.state.rows, sortColumn, sortDirection)}
					}
				/>
			</div>
		);
	}
}

export default Controls;
