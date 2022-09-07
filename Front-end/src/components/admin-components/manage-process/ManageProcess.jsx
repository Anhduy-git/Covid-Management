import "./manageProcess.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";
import moment from "moment";

export default function ManageProcess({ manageProcess }) {
	
	const strDate = moment(manageProcess.date).format('DD/MM/YYYY');
	
	return (
	
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{strDate}</span>								
				<span className="postTitle">{manageProcess.activity}</span>
			</div>				
		</div>
	
	);
}
