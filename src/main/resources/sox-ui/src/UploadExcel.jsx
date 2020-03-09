import React from 'react';
import axios from "axios";

class UploadExcel extends React.Component
{
	constructor(props)
	{
		super(props)
		
		this.state = {
			selectedFile: null,
			uploaded: false
		}
	}
	
	onChangeHandler(event)
	{
		this.setState({
			selectedFile: event.target.files[0]
		})
	}
	
	onClickHandler()
	{
		const data = new FormData()
		data.append('file', this.state.selectedFile)
	
		let self = this;
		axios.put("/api/excel", data, {})
			.then(res => {
				if (res.statusText == 200)
				{
					this.setState({uploaded: true})
				}
				else
				{
					this.setState({error: "Failed with code: " + res.statusText})
				}
			});
	}
	
	
	render()
	{
		return (
			<div>
				<p>Upload your excel:</p>
				<div className="form-group files">
					<label>Upload Your File </label>
					<input type="file" className="form-control" multiple onChange={this.onChangeHandler.bind(this)}/>
				</div>
				<button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler.bind(this)}>Upload
				</button>
			</div>
		);
	}
}

export default UploadExcel;
