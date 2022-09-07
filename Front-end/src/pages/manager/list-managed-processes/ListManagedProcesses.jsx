import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import ManagedProcesses from "../../../components/manager-components/managed-processes/ManagedProcesses";
import "./listManagedProcesses.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link, useLocation } from "react-router-dom";

export default function ListManagedProcesses() {		
	const [managedProcesses, setManagedProcesses] = useState([]);
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	useEffect(() => {
		const fetchManagedProcesses = async () => {
			try {
				const res = await axios.get(`/users/${username}/getManagedProcesses`, config);				
				if (res.data && res.data.managedProcesses) {
					setManagedProcesses(res.data.managedProcesses);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchManagedProcesses();
	},[managedProcesses]); //if search update, then run again

	return (
	<>
		<Header />
		<div className="home">
		<ManagedProcesses managedProcesses={managedProcesses}/>		
		<ManagerSidebar />
		</div>
	</>
	);
}
