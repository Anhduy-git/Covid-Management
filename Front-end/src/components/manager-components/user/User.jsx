import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

export default function User({ user }) {
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	// const onClickBlockBtn = async() => {
	// 	try {
	// 		await axios.get(`/managers/${manager.username}/block`, config);
	// 	} catch(err) {
	// 		console.log(err.response.data);
	// 	}
	// }
	return (
			<>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
				<input type="text" className="form-control form-control-user" id="exampleUsername" value={user.username} />
				</div>
				<div className="col-sm-6">
				<input type="text" className="form-control form-control-user" id="exampleLastName" value={user.name} />
				</div>
			</div>
			<div className="form-group">
				<input type="email" className="form-control form-control-user" id="exampleInputIdentity" value={user.identityCard} />
			</div>
			<div className="form-group">
				<Link to={`/userInfo/?username=${user.username}`} className="btn btn-primary btn-user btn-block">
				Chi tiết
				</Link>
			</div>						
		
			</>

	);
}


