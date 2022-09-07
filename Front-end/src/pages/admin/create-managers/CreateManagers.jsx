import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import AdminTopbar from "../../../components/admin-components/admin-topbar/AdminTopBar";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import { rectangle2, covid1 } 
	from "../../../assets";

export default function CreateManagers() {

	const userRef = useRef();	
	const emailRef = useRef();
	const history = useHistory();
	const { token, isFetching } = useContext(Context);		
	const [modalFailOpen, setModalFailOpen] = useState(false);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			
			await axios.post("/managers/create", {
				username: userRef.current.value,
				email: emailRef.current.value,
			}, config);
			//back to list managers page
			history.push('/listManagers');
			
		} catch (err) {
			setModalFailOpen(true)
			console.log(err)			
		}
	};

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`, backgroundRepeat: "no-repeat"}}>  
		 
        <div id="wrapper">
			<AdminSidebar />
          
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
			
				<AdminTopbar />		
				
				{/* Begin Page Content */}							
					
				<div className="container-fluid">
				{/* Page Heading */}
				<div className="card o-hidden border-0 shadow-lg my-5">
					
				<div className="card-body p-0">
					
					<div className="row">
					<div className="col-lg-5 d-none d-lg-block bg-account-img" style={{backgroundImage: `url(${covid1})`, backgroundRepeat: "no-repeat"}} />
					<div className="col-lg-7">
						<div className="p-5">
						<div className="text-center">
							<h1 className="h4 text-gray-900 mb-4">Tạo tài khoản!</h1>
						</div>
						
						<form className="user" onSubmit={handleSubmit}>
							
							<div className="form-group">
							<input type="username" className="form-control form-control-user" id="exampleInputUsername" placeholder="Username" ref={userRef}/>
							</div>
							<div className="form-group">
							<input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email" ref={emailRef}/>
							</div>
							<button disabled={isFetching} type="submit" className="btn btn-primary btn-user btn-block">
							Lưu tài khoản
							</button>         
							
        {/* Page Wrapper */}
						</form>						
						{modalFailOpen && <div className="alert alert-danger" role="alert">
							Tạo tài khoản thất bại
						</div>}
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

// {modalSuccessOpen && <NotifyModal 
// 	setOpenModal={setModalSuccessOpen}
// 	messageTitle={"THÀNH CÔNG"} 
// 	messageBody={"Thêm người quản lý thành công!"}/>} 


