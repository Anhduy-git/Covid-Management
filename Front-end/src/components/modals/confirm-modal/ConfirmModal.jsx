import React from "react";
import './confirmModal.css'

function ConfirmModal({ setOpenModal, onConfirm, messageTitle, messageBody }) {
	return (
		<div className="modalBackground">
		<div className="modalContainer">
			<div className="titleCloseBtn">
			<button
				onClick={() => {
				setOpenModal(false);
				}}
			>
				X
			</button>
			</div>
			<div className="title">
			<h1>{messageTitle}</h1>
			</div>
			<div className="body">
			<p>{messageBody}</p>
			</div>
			<div className="footer">
			<button
				onClick={() => {
				setOpenModal(false);
				}}
				id="cancelBtn"
			>
				Thoát
			</button>
			<button onClick={()=> {
				setOpenModal(false);
				onConfirm();
			}}>Xác nhận</button>
			</div>
		</div>
		</div>
	);
}

export default ConfirmModal;

