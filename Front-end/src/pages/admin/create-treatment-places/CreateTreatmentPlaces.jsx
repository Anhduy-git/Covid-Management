import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import { rectangle2, covid2 } 
	from "../../../assets";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import AdminTopbar from "../../../components/admin-components/admin-topbar/AdminTopBar";

export default function CreateManagers() {

	const nameRef = useRef();	
	const capacityRef = useRef();
	const currentPatientsRef = useRef();	
	const { token } = useContext(Context);
	const history = useHistory();
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			await axios.post("/treatmentPlaces/create", {
				name: nameRef.current.value,
				capacity: capacityRef.current.value,
				currentPatients: currentPatientsRef.current.value
			}, config);
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err.response.data)			
		}
	};

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
        {/* Page Wrapper */}
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
                {/* /.container-fluid */}
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                      <div className="col-lg-5 d-none d-lg-block"><img src={covid2} /></div>
                      <div className="col-lg-7">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Thêm địa điểm</h1>
                          </div>
                          <form className="location" onSubmit={handleSubmit}>
                            <div className="form-group">
                              <input type="text" className="form-control form-control-user" placeholder="Địa điểm" ref={nameRef}/>
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control form-control-user" placeholder="Sức chứa" ref={capacityRef}/>
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control form-control-user" placeholder="Số lượng tiếp nhận hiện tại" ref={currentPatientsRef}/>
                            </div>
                            <button className="btn btn-primary btn-user btn-block" type="submit">
                              Thêm
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Main Content */}
            </div>
            {/* End of Content Wrapper */}
          </div>
         
        </div>
      </div>
	);
}



{/* <div className="login">
		<span className="loginTitle">Add New Managers</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>
		<label>Capacity</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter capacity..."
			ref={capacityRef}
		/>
		<label>Current Patiens</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter current patients..."
			ref={currentPatientsRef}
		/>
		<button className="loginButton" type="submit">
			Add
		</button>
		</form>    
		
	</div> */}