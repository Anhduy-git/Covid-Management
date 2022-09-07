import axios from "axios";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { register } from "../../assets";

export default function RegisterPassword() {  
	const passwordRef = useRef();	
	const [error, setError] = useState(false);
	const search = useLocation().search;
  	const username = new URLSearchParams(search).get('username');
	

	const handleSubmit = async (e) => {
	e.preventDefault(); //not refresh page
	setError(false);
	try {
		await axios.patch(`/users/${username}/updatePassword`, {
			password: passwordRef.current.value,
		});
		window.location.replace("/login");
	} catch (err) {
		console.log(err);
		setError(true);
	}
	};
	return (
		<div className="bg-gradient-light">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image" style={{backgroundImage: `url(${register})`}} />
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Nhập mật khẩu mới</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>                      
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" className="form-control form-control-user" 
						  id="exampleInputPassword" placeholder="Password" ref={passwordRef}/>
                        </div>                        
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Lưu
                      </button>
                    </form>
					{error && <span style={{color:"red", marginTop:"10px"}}>Có lỗi xảy ra</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	);
}
