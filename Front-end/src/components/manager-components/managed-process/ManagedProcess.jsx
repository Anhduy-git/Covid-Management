import "./managedProcess.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";
import moment from "moment";

export default function ManagedProcess({ managedProcess }) {
	
	const strDate = moment(managedProcess.date).format('DD/MM/YYYY');
	
	return (
	
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{strDate}</span>								
				<span className="postTitle">{managedProcess.activity}</span>
			</div>				
		</div>
	
	);
}
