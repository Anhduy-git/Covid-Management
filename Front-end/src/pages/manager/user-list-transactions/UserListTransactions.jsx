import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import UserTransactions from "../../../components/user-components/user-transactions/UserTransactions";
import "./userListTransactions.css";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../../context/Context";
import axios from "axios";

export default function UserListTransactions() {		
	const { token } = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const [transactions, setTransactions] = useState([]);
	const search = useLocation().search;
	const usernameQuery = new URLSearchParams(search).get('username');

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await axios.get(`/users/${usernameQuery}/getTransactions`, config);
				if (res.data) {
					setTransactions(res.data);
				}												
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchTransactions();
	},[]);

	return (
	<>
		<Header />
		<div className="home">
		<UserTransactions userTransactions={transactions}/>		
		<ManagerSidebar />
		</div>
	</>
	);
}
