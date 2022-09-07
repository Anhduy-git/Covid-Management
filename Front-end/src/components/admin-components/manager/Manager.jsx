import "./manager.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

export default function Manager({ manager, idx }) {
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	const onClickBlockBtn = async() => {
		try {
			await axios.get(`/managers/${manager.username}/block`, config);
		} catch(err) {
			console.log(err);
		}
	}
	return (
		<>     
			<tr>
				<th scope="row">{idx}</th>
				<td>{manager.username}</td>
				<td>{manager.email}</td>
				<button onClick={onClickBlockBtn} className="btn btn-primary">
					Khóa
				</button>
				<button className="btn btn-primary">
					Lịch sử quản lý
				</button>
			</tr>
			
		</>

	);
}
