import axios from "axios";
import { useRef, useState } from "react";
import { register } from "../../assets";

export default function RegisterAdmin() { 
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();	
	const [error, setError] = useState(false);	
	

	const handleSubmit = async (e) => {
	e.preventDefault(); //not refresh page
	setError(false);
	try {
		await axios.post(`/managers/createAdmin`, {
			username: usernameRef.current.value,
			password: passwordRef.current.value,
			email: emailRef.current.value,
			isAdmin: true
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
                      <h1 className="h4 text-gray-900 mb-4">Tạo tài khoản ADMIN!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input type="username" className="form-control form-control-user" 
						id="exampleusername" placeholder="Username" ref={usernameRef}/>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" 
						id="exampleInputEmail" placeholder="Email" ref={emailRef}/>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" className="form-control form-control-user" 
						  id="exampleInputPassword" placeholder="Password" ref={passwordRef}/>
                        </div>                        
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Lưu tài khoản
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


{/* <div className="register">
		<span className="registerTitle">Register</span>
		<form className="registerForm" onSubmit={handleSubmit}>

		<label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
		
		<label>Password</label>
		<input
			type="password"
			className="registerInput"
			placeholder="Enter your password..."
			onChange={(e) => setPassword(e.target.value)}
		/>
		<button className="registerButton" type="submit">
			Register
		</button>
		</form>
		
		{error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
	</div> */}