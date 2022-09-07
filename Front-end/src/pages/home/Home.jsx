
import Header from "../../components/header/Header";
import AdminFeatures from "../../components/admin-components/features/AdminFeatures";
import ManagerFeatures from "../../components/manager-components/features/ManagerFeatures";
import UserFeatures from "../../components/user-components/features/UserFeatures";

import "./home.css";



import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Home() {	
	const { user, priority } = useContext(Context);

	

	return (
	<>

		
		
		{priority == 0 && <AdminFeatures />}
		{priority == 1 && <ManagerFeatures />}
		{priority == 2 && <UserFeatures />}		

			
		
	</>
	);
}
