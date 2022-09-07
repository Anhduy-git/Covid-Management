import "./header.css";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Header() {

	const { user, dispatch } = useContext(Context);  	
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace('/');
	};
	return (
	<div className="header">
		
		<button className="topListItem" onClick={handleLogout}>
			{user && "LOGOUT"}
		</button>
		
	</div>
	);
}
