import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useLocation, useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";
import Topbar from "../../../components/topbar/TopBar";


export default function CreateRelatedUsers() {

	
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const history = useHistory();	
	const identityCardRef = useRef();
	const { token } = useContext(Context);

	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			await axios.post(`/users/${username}/createRelatedUsers`, {
				relatedUser: identityCardRef.current.value
			}, config);			
			//back to list related users page
			window.location.replace(`/listRelatedUsers?username=${username}`);
		} catch (err) {
			console.log(err.response.data)			
		}
	};
	
	

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
		{/* Page Wrapper */}
		<div id="wrapper">
		<ManagerSidebar />
		{/* Content Wrapper */}
		<div id="content-wrapper" className="d-flex flex-column">
		<div id="content">
			<Topbar />  
			<div className="container-fluid">
			{/* Page Heading */}
			<div className="card o-hidden border-0 shadow-lg my-5">
			<div className="card-body p-0">
				{/* Nested Row within Card Body */}
				<div className="row">
				<div className="col-lg-5 d-none d-lg-block bg-register-image" style={{backgroundImage: `url(${register})`}}/>
				<div className="col-lg-7">
					<div className="p-5">
					<div className="text-center">
						<h1 className="h4 text-gray-900 mb-4">Thêm người vào hệ thống!</h1>
					</div>
					<form className="user" onSubmit={handleSubmit}>

						<div className="col-sm-6">
							<input type="text" className="form-control form-control-user"  placeholder="CCCD/CMND" 
								ref={identityCardRef}/>
						</div>	
						<button type="submit" className="btn btn-primary btn-user btn-block">
							Thêm
						</button>
						
					</form>
					</div>
				</div>
				</div>
			</div>
			</div>
			{/* /.container-fluid */}
		</div>
				{/* End of Main Content */}
			</div>
			{/* End of Content Wrapper */}
			</div>        
		</div>
		</div>
	);
}
