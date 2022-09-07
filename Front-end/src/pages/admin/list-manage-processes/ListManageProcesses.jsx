import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import ManageProcesses from "../../../components/admin-components/manage-processes/ManageProcesses";
import "./listManageProcesses.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link, useLocation } from "react-router-dom";

export default function ListManageProcesses() {		
	const [manageProcesses, setManageProcesses] = useState([]);
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	useEffect(() => {
		const fetchManageProcesses = async () => {
			try {
				const res = await axios.get(`/managers/${username}/getManageProcesses`, config);				
				if (res.data && res.data.manageProcesses) {
					setManageProcesses(res.data.manageProcesses);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchManageProcesses();
	},[manageProcesses]); //if search update, then run again

	return (
	<>
		<Header />
		<div className="home">
		<ManageProcesses manageProcesses={manageProcesses}/>		
		<AdminSidebar />
		</div>
	</>
	);
}
