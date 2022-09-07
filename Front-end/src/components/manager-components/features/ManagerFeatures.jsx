
import ManagerFeaturesCSS from "./managerFeatures.module.css";
import { Link } from "react-router-dom";
import { rectangle2, account, manage, location } 
	from "../../../assets";
import ManagerSidebar from "../manager-sidebar/ManagerSidebar";
import Topbar from "../../topbar/TopBar";




export default function ManagerFeatures() {
  return (
	<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
	{/* Page Wrapper */}
	<div id="wrapper">
	 <ManagerSidebar />
	  {/* Content Wrapper */}
	  <div id="content-wrapper" className="d-flex flex-column">
	  <div id="content">
		<Topbar />  
		{/* Main Content */}
		<div className="container-fluid">
		{/* Page Heading */}
		{/* <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> */}
		<div className="row">
		<div className="col-12 col-sm-6 col-md-4">
		<Link to={'/listUsers'} className="link">
			<button className="btn1 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={account} alt="" /><br />Quản lý người dùng</button>
		</Link>
		</div>
		<div className="col-12 col-sm-6 col-md-4">
		<Link to={'/listNecessaries'} className="link">
			<button className="btn2 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={manage} alt="" /><br />Quản lý sản phẩm</button>
		</Link>
		</div>
		<div className="col-12 col-sm-6 col-md-4">
		<Link to={'/listNecessariesPackages'} className="link">
			<button className="btn3 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={location} alt="" /><br />Quản lý gói sản phẩm</button>
		</Link>
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

