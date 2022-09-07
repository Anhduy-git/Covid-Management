import "./userManagedProcess.css";
import moment from "moment";

export default function UserManagedProcess({ managedProcess }) {
	
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
