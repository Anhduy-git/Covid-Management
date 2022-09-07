
import { Link } from "react-router-dom";
import { accountSide, locationSide, 
	adminSide,  } 
	from "../../../assets";

export default function ManagerSidebar() {
  
  
  return (
   
		<>
		 {/* Sidebar */}
		 <ul className="navbar-nav sidebar sidebar-dark accordion rounded" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
              </div>
              <div className="sidebar-brand-text mx-3">Hi, Manager</div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
			<Link to={'/'} className="nav-link">				
				<img src={adminSide} />Người quản lý			
			</Link>
            </li>
            {/* Nav Item - Account Menu */}
            <li className="nav-item">
              <a className="nav-link"  data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
			  <img src={accountSide} />Quản lý người dùng
              </a>
              <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Thiết lập tài khoản:</h6>
				  <Link to={'/createUsers'} className="collapse-item active">
                	Thêm người dùng
				  </Link>
				  <Link to={'/listUsers'} className="collapse-item">
				  	Thông tin người dùng
				  </Link>                  
                </div>
              </div>
            </li>
           
            {/* Nav Item - Location Menu */}   
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
			  <img src={locationSide} />Quản lý sản phẩm
              </a>
			</li>
			<li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
			  <img src={locationSide} />Quản lý gói sản phẩm
              </a>
			</li>
              
          </ul>
          {/* End of Sidebar */}
	</>

		
	

		
	
	
  );
}

