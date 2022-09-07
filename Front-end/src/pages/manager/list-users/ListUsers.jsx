import { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import Users from "../../../components/manager-components/users/Users";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";
import Topbar from "../../../components/topbar/TopBar";


export default function ListUsers() {	

	const [users, setUsers] = useState([]);	
	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState("?sortBy=state:name");
	const [nameSortType, setNameSortType] = useState(1);
	const [stateSortType, setStateSortType] = useState(1);

	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const onNameSortClick = () => {		
		if (nameSortType === 1) {
			setNameSortType(-1);
			// if (!sortTerm.includes("name")) {
			// 	if (sortTerm === "?sortBy=") {
			// 		setSortTerm(sortTerm + "-name");
			// 	} else {
			// 		setSortTerm(sortTerm + ":-name");
			// 	}
			// } else {
			// 	const index = sortTerm.indexOf("name");
			// 	setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
			// }
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setNameSortType(1);
			// if (!sortTerm.includes("name")) {
			// 	if (sortTerm === "?sortBy=") {
			// 		setSortTerm(sortTerm + "name");
			// 	} else {
			// 		setSortTerm(sortTerm + ":name");
			// 	}
			// } else {
			// 	const index = sortTerm.indexOf("name");
			// 	setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
			// }
			const index = sortTerm.indexOf("name");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	const onStateSortClick = () => {		
		if (stateSortType === 1) {
			setStateSortType(-1);
			// if (!sortTerm.includes("state")) {
			// 	if (sortTerm === "?sortBy=") {
			// 		setSortTerm(sortTerm + "-state");
			// 	} else {
			// 		setSortTerm(sortTerm + ":-state");
			// 	}
			// } else {
			// 	const index = sortTerm.indexOf("state");
			// 	setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
			// }
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setStateSortType(1);
			// if (!sortTerm.includes("state")) {
			// 	if (sortTerm === "?sortBy=") {
			// 		setSortTerm(sortTerm + "state");
			// 	} else {
			// 		setSortTerm(sortTerm + ":state");
			// 	}
			// } else {
			// 	const index = sortTerm.indexOf("state");
			// 	setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
			// }
			const index = sortTerm.indexOf("state");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	useEffect(() => {
		const fetchUsers = async () => {
			try {
								
				const res = await axios.get(`/users/getAll/${sortTerm}`, config);						
				if (res.data) {
					console.log(res.data);
					setUsers(res.data);
				}
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchUsers();
	},[users, sortTerm]); 
	
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
        <h1 className="h4 text-gray-900 mb-4 text-center">Danh sách người dùng</h1>
        <div className="overflow-scroll main-content">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
				<div className="row">
					<div className="col-lg-12">
					<div className="p-5">
						<form className="user">
							<Users users={users} searchTerm={searchTerm}/>
						</form>
					</div>
					</div>
				</div>
				
				
				</div>
			</div>
			</div>   
		</div>
				{/* /.container-fluid */}
			
					{/* End of Main Content */}
				</div>
				{/* End of Content Wrapper */}
				</div>        
			</div>			
		</div>
	);
}


{/* <div className="home">
			<input type="text" 
				placeholder="Search by id number"
				onChange={(event) => {
					setSearchTerm(event.target.value);					
			}} />
			<button className="loginButton" onClick={onNameSortClick}>
				Sort By Name
			</button>	
			<button className="loginButton" onClick={onStateSortClick}>
				Sort By state
			</button>		
			<Users users={users} searchTerm={searchTerm}/>	

			<Link to={"/createUsers"} className="link">
				<button className="loginButton">
					Add
				</button>	
			</Link>
			
		</div> */}