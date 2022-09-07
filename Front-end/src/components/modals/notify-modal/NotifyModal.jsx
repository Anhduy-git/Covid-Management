import React from "react";


function NotifyModal({ setOpenModal, messageTitle, messageBody }) {
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
		</div>
		</div>
	);
}

export default NotifyModal;