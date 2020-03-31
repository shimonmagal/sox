import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UploadExcel extends React.Component
{
	constructor(props)
	{
		super(props)
		
		this.state = {
			selectedFile: null,
			uploaded: false,
			count: 0
		}
	}
	
	onChangeHandler(event)
	{
		this.setState({
			selectedFile: event.target.files[0]
		})
	}
	
	onClickHandler(event)
	{
		const data = new FormData()
		data.append('file', this.state.selectedFile)
	
		let self = this;
		axios.put("/api/excel", data, {})
			.then(res => {
				if (res.status == 200)
				{
					this.setState({uploaded: true, count: this.state.count + 1})
					toast.success("File: " + this.state.selectedFile.name + " uploaded successfully");
				}
				else
				{
					this.setState({error: "Failed with code: " + res.statusText});
					toast.error("File: " + this.state.selectedFile.name + " failed uploading");
				}
			}).catch(() => {
				toast.error("File: " + this.state.selectedFile.name + " failed uploading");
		});
	}
	
	
	render()
	{
		return (
			<div>
				<p>Upload your excel:</p>
				<div className="form-group files">
					<input accept=".xlsx, .xls, .csv" key={this.state.count} style={{"height":"200px"}} type="file" className="form-control" multiple onChange={this.onChangeHandler.bind(this)}/>
				</div>
				<button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler.bind(this)}>Upload
				</button>
				<ToastContainer
					position="bottom-right"
					autoClose={4000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>			</div>
		);
	}
}

export default UploadExcel;
