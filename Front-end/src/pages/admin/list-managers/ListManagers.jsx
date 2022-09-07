import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import Managers from "../../../components/admin-components/managers/Managers";
import "./listManagers.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import AdminTopbar from "../../../components/admin-components/admin-topbar/AdminTopBar";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import { rectangle2, covid1 } 
	from "../../../assets";

export default function ListManagers() {		
	const [managers, setManagers] = useState([]);	
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	useEffect(() => {
		const fetchManagers = async () => {
			try {
				const res = await axios.get("/managers/getAll", config);				
				if (res.data) {
					setManagers(res.data);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchManagers();
	},[managers]); //if search update, then run again

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`, backgroundRepeat: "no-repeat"}}>  
		 
        <div id="wrapper">
			<AdminSidebar />
          
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
			
				<AdminTopbar />		
				
				{/* Begin Page Content */}							
				<div className="container-fluid">
				{/* Page Heading */}
				{/* <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> */}
				<h1 className="h3 mb-4 text-gray-800 text-center"><strong>Quản lý tài khoản</strong></h1>
				<Managers managers={managers}/>
			</div>				
			{/* /.container-fluid */}

			{/* End of Main Content */}
            </div>
            {/* End of Content Wrapper */}
          </div>         
        </div>
		
		
      </div>
	);
}


