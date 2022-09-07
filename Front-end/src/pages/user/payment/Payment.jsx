import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import "./payment.css";


export default function Payment() {

	const payAmountRef = useRef();	
	const [debt, setDebt] = useState(0);
	const { token } = useContext(Context);
	const [modalNotifySuccessOpen, setModalNotifySuccessOpen] = useState(false);
	const [modalNotifyFailOpen, setModalNotifyFailOpen] = useState(false);
	
	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {			
			const res = await axios.post("/users/me/payOff", {
				moneyTransfer: payAmountRef.current.value

			}, config);
			if (res.data && res.data.payOffSuccess) {
				setModalNotifySuccessOpen(true);
			} else {
				setModalNotifyFailOpen(true);
			}
						
		} catch (err) {
			console.log(err.response.data)			
		}
	};
	


	useEffect(() => {		
		
		const fetchDebt = async () => {
			try {				
				const res = await axios.get("/users/me/debt", config);	
				if (res.data) {
					setDebt(res.data)
					console.log(res.data);
				}
				
			} catch (err) {				
				console.log(err);
			}			
		};		
		fetchDebt();
	},)

	return (
	<div className="login">
		<span className="loginTitle">Payment</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Debt</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter username..."
			value={debt}
			disabled={true}
		/>		
		<label>Payment Amount</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter amount to pay..."
			ref={payAmountRef}
		/>

		<button className="loginButton" type="submit">
			Pay
		</button>
		
		
		</form>     
		{modalNotifySuccessOpen && <NotifyModal 
		setOpenModal={setModalNotifySuccessOpen}		
		messageTitle={"SUCCESS"} 
		messageBody={"Pay off successfully"}/>}

		{modalNotifyFailOpen && <NotifyModal 
		setOpenModal={setModalNotifyFailOpen}		
		messageTitle={"FAILURE"} 
		messageBody={"Pay off Fail"}/>}
	</div>
	);
}
