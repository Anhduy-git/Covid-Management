
import { Link } from "react-router-dom";
import { rectangle2, account, manage, location } 
	from "../../../assets";
import AdminSidebar from "../admin-sidebar/AdminSidebar";
import AdminTopbar from "../admin-topbar/AdminTopBar";


export default function AdminFeatures() {
  return (
	<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
        {/* Page Wrapper */}
        <div id="wrapper">
         <AdminSidebar />
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
		  <div id="content">
			<AdminTopbar />  
            {/* Main Content */}
			<div className="container-fluid">
			{/* Page Heading */}
			{/* <h1 class="h3 mb-4 text-gray-800">Blank Page</h1> */}
			<div className="row">
			<div className="col-12 col-sm-6 col-md-4">
			<Link to={'/createManagers'} className="link">
				<button className="btn1 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={account} alt="" /><br />Tạo tài khoản</button>
			</Link>
			</div>
			<div className="col-12 col-sm-6 col-md-4">
			<Link to={'/listManagers'} className="link">
				<button className="btn2 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={manage} alt="" /><br />Quản lý thông tin</button>
			</Link>
			</div>
			<div className="col-12 col-sm-6 col-md-4">
			<Link to={'/listTreatmentPlaces'} className="link">
				<button className="btn3 rounded" style={{"margin":"30px", "height":"188px", "width":"255px"}}><img src={location} alt="" /><br />Địa điểm điều trị/Cách ly</button>
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



{/* <div className="posts">		
		<Link to={'/listManagers'} className="link">
			<div className="post">
				<img className="postImg" src={f2} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Quản lý tài khoản</span>								
				</div>			
			</div>
		</Link>
		<Link to={`/listTreatmentPlaces`} className="link">
			<div className="post">
				<img className="postImg" src={f3} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Địa điểm điều trị/cách ly</span>								
				</div>			
			</div>
		</Link>	
		<Link to={`/`} className="link">
			<div className="post">
				<img className="postImg" src={f4} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Cài đặt</span>								
				</div>			
			</div>
		</Link>	
		
    </div> */}