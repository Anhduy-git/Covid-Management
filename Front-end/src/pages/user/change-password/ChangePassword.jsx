import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import UserSidebar from "../../../components/user-components/user-sidebar/UserSidebar";
import "./changePassword.css";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import ConfirmModal from "../../../components/modals/confirm-modal/ConfirmModal";


export default function ChangePassword() {

	const currentPasswordRef = useRef();	
	const newPasswordRef = useRef();
	const reenterNewPasswordRef = useRef();	

	const [modalSaveOpen, setModalSaveOpen] = useState(false);
	const [modalNotifyOpen, setModalNotifyOpen] = useState(false);

	const { token, dispatch } = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};	
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace('/');
	};

	const onConfirmSaveBtnClick = async () => {
		
		try {						
			await axios.patch(`/users/me/updatePassword`, 
			{
				currentPassword: currentPasswordRef.current.value,
				newPassword: newPasswordRef.current.value
			},
			config);
			//back to list managers page
			handleLogout();
		} catch (err) {
			console.log(err)			
		}
		
	}
	
	const onSaveButtonClick = () => {		
		if ((newPasswordRef.current.value != reenterNewPasswordRef.current.value) 
		|| (newPasswordRef.current.value == '')) {
			setModalNotifyOpen(true);
			return;
		}
		setModalSaveOpen(true);
	}


	return (
	<div className="login">
		<span className="loginTitle">Change password</span>
		
		<label>Current Password: </label>
		<input
			type="password"
			className="loginInput"
			placeholder="Enter curent password..."
			ref={currentPasswordRef}
		/>	

		<label>New Password: </label>
		<input
			type="password"
			className="loginInput"
			placeholder="Enter new password..."
			ref={newPasswordRef}
		/>	

		<label>Re-enter New Password: </label>
		<input
			type="password"
			className="loginInput"
			placeholder="Re-enter new password..."
			ref={reenterNewPasswordRef}
		/>		

	
		<button className="loginButton" onClick={onSaveButtonClick}>
			Save
		</button>			
		    
		{modalSaveOpen && <ConfirmModal 
		setOpenModal={setModalSaveOpen}
		onConfirm={onConfirmSaveBtnClick} 
		messageTitle={"SAVE"} 
		messageBody={"You want to change password ?"}/>}

		{modalNotifyOpen && <NotifyModal 
		setOpenModal={setModalNotifyOpen}		
		messageTitle={"ERROR"} 
		messageBody={"Invalid Password"}/>}
	</div>
	);
}
