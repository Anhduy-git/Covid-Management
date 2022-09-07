
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, Link } from "react-router-dom";
import "./myInfo.css";
import axios from "axios";

export default function MyInfo() {
	
	const { token } = useContext(Context);
	
	const [username, setUsername] = useState('');	
	const [name, setName] = useState('');	
	const [id, setID] = useState('');	
	const [email, setEmail] = useState('');	
	const [dateOfBirth, setDateOfBirth] = useState('');	
	const [debt, setDebt] = useState('');	
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);
	const [city, setCity] = useState('');
	const [district, setDistrict] = useState('');
	const [ward, setWard] = useState('');
	const [state, setState] = useState('F0');
	const [treatmentPlace, setTreatmentPlace] = useState('');
	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};	

	useEffect(() => {
					
		const fetchUserInfo = async () => {			
			try {							
				
				const res = await axios.get("/users/me", config);	
				
				if (res.data) {
					console.log(res.data);
					setUsername(res.data.username);
					setName(res.data.name);
					setID(res.data.identityCard);
					setEmail(res.data.email);
					setDebt(res.data.debt.toString());					
					setDateOfBirth(res.data.dateOfBirth);
					setCity(res.data.address.city);
					setDistrict(res.data.address.district);
					setWard(res.data.address.ward);
					setState(res.data.state);
					setTreatmentPlace(res.data.placeOfTreatment);
					
				}
				
			} catch (err) {				
				console.log(err);
			}			
		};		
		fetchUserInfo();
	},[])
	
	return (
	<div className="login">
		<span className="loginTitle">Users Info</span>
		
		
		<label>Username</label>
		<input
			type="text"
			className="loginInput"
			value={username}				
			disabled={true}

		/>
		
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			value={name}				
			disabled={true}
		/>
		<label>ID</label>
		<input
			type="text"
			className="loginInput"
			value={id}			
			disabled={true}
		/>		
		<label>Day of Birth</label>
		<input
			type="text"
			className="loginInput"
			value={dateOfBirth}			
			disabled={true}
		/>
		<label>city</label>
		<select disabled={true} name="city" value={city} >
			<option value={city}>{city}</option>
		</select>
		<select disabled={true} name="district" value={district} >
			<option value={district}>{district}</option>
		</select>
		<select disabled={true} name="ward" value={ward}>
			<option value={ward}>{ward}</option>
		</select>
		<label>State</label>
		<select disabled={true} name="state" value={state}>
		<option value={state}>{state}</option>
		</select>
		<label>Place of treatment</label>
		<select disabled={true} name="placeOfTreatment" value={treatmentPlace} >		
			<option value={treatmentPlace}>{treatmentPlace}</option>
		</select>
		
		<label>Debt</label>
		<input
			type="text"
			className="loginInput"
			value={debt}				
			disabled={true}
		/>

		

		<Link className="link" to={'/me/listManagedProcesses'}>
		<button className="loginButton">
			Managed Process View
		</button>
		</Link>

		<Link className="link" to={'/me/listTransactions'}>
		<button className="loginButton">
			Transaction Process View
		</button>
		</Link>
		     		
	</div>
	);
}
