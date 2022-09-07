import Header from "../../../components/header/Header";
import UserSidebar from "../../../components/user-components/user-sidebar/UserSidebar";
import UserManagedProcesses from "../../../components/user-components/user-managed-processes/UserManagedProcesses";
import "./myListManagedProcesses.css";
import { Context } from "../../../context/Context";
import { useContext, useRef, useEffect, useState } from "react";
import axios from "axios";

export default function MyListManagedProcesses() {		

	const { token } = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const [managedProcesses, setManagedProcesses] = useState([]);
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await axios.get(`/users/me/managedProcesses`, config);
				if (res.data) {
					setManagedProcesses(res.data);
				}												
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchTransactions();
	},[]);

	return (
	<>
		<Header />
		<div className="home">
		<UserManagedProcesses managedProcesses={managedProcesses}/>		
		<UserSidebar />
		</div>
	</>
	);
}
