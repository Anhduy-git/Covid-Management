import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import Necessaries from "../../../components/manager-components/necessaries/Necessaries";
import "./listNecessaries.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";
import Topbar from "../../../components/topbar/TopBar";

export default function ListNecessaries() {	

	const [necessaries, setNecessaries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortTerm, setSortTerm] = useState("?sortBy=price:name");
	const [nameSortType, setNameSortType] = useState(1);
	const [priceSortType, setPriceSortType] = useState(1);
	const {token} = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	
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
	const onPriceSortClick = () => {		
		if (priceSortType === 1) {
			setPriceSortType(-1);	
			const index = sortTerm.indexOf("price");
			setSortTerm(sortTerm.slice(0, index) + "-" + sortTerm.slice(index));
		} else {
			setPriceSortType(1);		
			const index = sortTerm.indexOf("price");
			setSortTerm(sortTerm.slice(0, index - 1) + sortTerm.slice(index));
		}
	}
	
	useEffect(() => {
		const fetchNecessaries = async () => {
			try {
				console.log(sortTerm);
				const res = await axios.get(`/necessaries/getAll/${sortTerm}`, config);
				if (res.data) {
					setNecessaries(res.data);
				}												
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchNecessaries();
	}); //if search update, then run again

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
				<h1 className="h3 mb-4 text-gray-800 text-center"><strong>Gói sản phẩm hiện có</strong></h1>
				<div className="overflow-scroll main-content">
				<div className="row">
					
					<div className="col-md-6 col-lg-4 mb-4 mb-md-0">
					<div className="card">
						<div className="d-flex justify-content-between p-3">
						<a href="#"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" className="card-img-top" alt="Laptop" />
						<div className="card-body">
						<div className="d-flex justify-content-between mb-3">
							<h5 className="mb-0">Giới hạn</h5>
							<h5 className="text-dark mb-0">100/ngày</h5>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
						</div>
						</div>
					</div>
					</div>
					<div className="col-md-6 col-lg-4 mb-4 mb-md-0">
					<div className="card">
						<div className="d-flex justify-content-between p-3">
						<a href="#"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" className="card-img-top" alt="Laptop" />
						<div className="card-body">
						<div className="d-flex justify-content-between mb-3">
							<h5 className="mb-0">Giới hạn</h5>
							<h5 className="text-dark mb-0">100/ngày</h5>
						</div>
						<div className="d-flex justify-content-between mb-2">
							<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
						</div>
						</div>
					</div>
					</div>
					<div className="row">
					<div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
						<div className="card">
						<div className="d-flex justify-content-between p-3">
							<a href="#"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" className="card-img-top" alt="Laptop" />
						<div className="card-body">
							<div className="d-flex justify-content-between mb-3">
							<h5 className="mb-0">Giới hạn</h5>
							<h5 className="text-dark mb-0">100/ngày</h5>
							</div>
							<div className="d-flex justify-content-between mb-2">
							<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
							</div>
						</div>
						</div>
					</div>
					<div className="col-md-6 col-lg-4 mb-4 mb-md-0">
						<div className="card">
						<div className="d-flex justify-content-between p-3">
							<a href="#"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" className="card-img-top" alt="Laptop" />
						<div className="card-body">
							<div className="d-flex justify-content-between mb-3">
							<h5 className="mb-0">Giới hạn</h5>
							<h5 className="text-dark mb-0">100/ngày</h5>
							</div>
							<div className="d-flex justify-content-between mb-2">
							<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
							</div>
						</div>
						</div>
					</div>
					<div className="col-md-6 col-lg-4 mb-4 mb-md-0">
						<div className="card">
						<div className="d-flex justify-content-between p-3">
							<a href="#"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp" className="card-img-top" alt="Laptop" />
						<div className="card-body">
							<div className="d-flex justify-content-between mb-3">
							<h5 className="mb-0">Giới hạn</h5>
							<h5 className="text-dark mb-0">100/ngày</h5>
							</div>
							<div className="d-flex justify-content-between mb-2">
							<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div></div>
				{/* /.container-fluid */}
			
					{/* End of Main Content */}
				</div>
				{/* End of Content Wrapper */}
				</div>        
			</div>			
		</div>
	);
}





<>
<Header />

<div className="home">
	<div>
		<input type="text" 
			placeholder="Search by name"
			onChange={(event) => {
				setSearchTerm(event.target.value);					
		}} />
	</div>

	<button className="loginButton" onClick={onNameSortClick}>
		Sort By Name
	</button>	
	<button className="loginButton" onClick={onPriceSortClick}>
		Sort By Price
	</button>	
	<Necessaries necessaries={necessaries} searchTerm={searchTerm}/>	

	<Link to={"/createNecessaries"} className="link">
		<button>
			Add
		</button>	
	</Link>

</div>
</>