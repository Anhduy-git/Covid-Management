import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import './login.css'
import {loginImg} from '../../assets'

export default function Login() {
	
	const userRef = useRef();	
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const history = useHistory();

	const handleSubmit = async (e) => {
	e.preventDefault();
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post("/users/login", {
			username: userRef.current.value,
			password: passwordRef.current.value,
		});
		const data = res.data;	
		if (data.userManager) {
			if (data.hasPassword) {
				if (data.userManager.isAdmin) {
					dispatch({ type: "LOGIN_SUCCESS_ADMIN", payload: data.userManager, token: data.token });
				} else {
					dispatch({ type: "LOGIN_SUCCESS_MANAGER", payload: data.userManager, token: data.token });
				}
			} else {
				console.log('No password provided')
				history.push(`/registerPassword?username=${data.userManager.username}`);
			}
			
		}
		else if (data.user) {
			if (data.hasPassword) {
				console.log('user')
				dispatch({ type: "LOGIN_SUCCESS_USER", payload: data.user, token: data.token });
			} else {
				console.log('No password provided')
				history.push(`/registerPassword?username=${data.user.username}`);
			}
		}		
		
	} catch (err) {
		console.log(err.response.data);
		dispatch({ type: "LOGIN_FAILURE" });
	}
	};

	return (
		<div className="bg-light">
            
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{backgroundImage: `url(${loginImg})`}} />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input type="username" className="form-control form-control-user" id="exampleInputUsername" 
							aria-describedby="emailHelp" placeholder="Enter Username" ref={userRef}/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control form-control-user" 
							id="exampleInputPassword" placeholder="Password" ref={passwordRef}/>
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck" />
                              <label className="custom-control-label" htmlFor="customCheck">Remember
                                Me</label>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isFetching}>
                            Login
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript*/}
        {/*  */}
        {/* Custom scripts for all pages*/}
      </div>
	);
}



// <div className="login">
	// 	<span className="loginTitle">Login</span>
	// 	<form className="loginForm" onSubmit={handleSubmit}>
	// 	<label>Username</label>
	// 	<input
	// 		type="text"
	// 		className="loginInput"
	// 		placeholder="Enter your username..."
	// 		ref={userRef}
	// 	/>
	// 	<label>Password</label>
	// 	<input
	// 		type="password"
	// 		className="loginInput"
	// 		placeholder="Enter your password..."
	// 		ref={passwordRef}
	// 	/>
	// 	<button className="loginButton" type="submit" disabled={isFetching}>
	// 		Login
	// 	</button>
	// 	</form>     
	// </div>