import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { useContext } from "react";

export default function RelatedUser({ user, idx }) {
	const {token} = useContext(Context);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	return (						
		<tr>
			<th scope="row">{idx + 1}</th>
			<td>{user.name}</td>
			<td>{user.identityCard}</td>			
		</tr>

	);
}

			

