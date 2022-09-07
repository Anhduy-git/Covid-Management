import { useEffect, useState, useContext } from "react";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";
import Topbar from "../../../components/topbar/TopBar";
import RelatedUsers from "../../../components/manager-components/related-users/RelatedUsers";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";

export default function ListRelatedUsers() {	

	const [relatedUsers, setRelatedUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState("?sortBy=state:name");
	const [nameSortType, setNameSortType] = useState(1);
	const [stateSortType, setStateSortType] = useState(1);	
	const {token} = useContext(Context);
	const search = useLocation().search;
	const username = new URLSearchParams(search).get('username');
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const history = useHistory();

	const onNameSortClick = () => {		
		if (nameSortType === 1) {
			setNameSortType(-1);		
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setNameSortType(1);		
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	const onStateSortClick = () => {		
		if (stateSortType === 1) {
			setStateSortType(-1);			
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setStateSortType(1);			
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	
	useEffect(() => {
		const fetchRelatedUsers = async () => {
			try {			
				const res = await axios.get(`/users/${username}/getRelatedUsers/${sortTerm}`, config);
				if (res.data) {
					console.log(res.data);
					setRelatedUsers(res.data);
				}												
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchRelatedUsers();
	}, [relatedUsers, sortTerm]); //if search update, then run again

	return (
		
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
			{/* Page Wrapper */}
			<div id="wrapper">
			<ManagerSidebar />
			{/* Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<Topbar />  
				
				<div className="container-fluid">
				{/* Page Heading */}
				{/* <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> */}
				<h1 className="h3 mb-4 text-gray-800 text-center">Danh sách người liên đới</h1>
					<RelatedUsers users={relatedUsers} searchTerm={searchTerm}/>
      			</div>
				  <Link to={`/createRelatedUsers?username=${username}`} className="nav-link">
				  <button type="button" className="btn btn-primary ">
							Thêm
					</button>
					</Link>
				{/* /.container-fluid */}
			</div>
					
					{/* End of Main Content */}
				</div>
				{/* End of Content Wrapper */}
				</div>        
			</div>			
		
	);
		
	
	
}
