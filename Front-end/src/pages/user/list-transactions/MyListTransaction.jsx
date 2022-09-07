import Header from "../../../components/header/Header";
import UserSidebar from "../../../components/user-components/user-sidebar/UserSidebar";
import UserTransactions from "../../../components/user-components/user-transactions/UserTransactions";
import "./myListTransaction.css";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";

export default function MyListTransaction() {		
	const { token } = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await axios.get(`/users/me/transactions`, config);
				if (res.data) {
					setTransactions(res.data);
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
		<UserTransactions userTransactions={transactions}/>		
		<UserSidebar />
		</div>
	</>
	);
}
