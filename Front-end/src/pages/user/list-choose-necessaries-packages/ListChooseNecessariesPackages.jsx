import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import UserSidebar from "../../../components/user-components/user-sidebar/UserSidebar";
import ChooseNecessariesPackages from "../../../components/user-components/choose-necessaries-packages/ChooseNecessariesPackages";
import "./listChooseNecessariesPackages.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";


export default function ListChooseNecessariesPackages({handleClick}) {	

	
	const [chooseNecessariesPackages, setChooseNecessariesPackages] = useState([]);	
	const {token} = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const history = useHistory();


	
	useEffect(() => {
		const fetchChooseNecessariesPackages = async () => {
			try {				
				const res = await axios.get('/necessaryPackages/getAll', config);
				if (res.data) {
					const tmp = res.data;
					tmp.forEach((item) => {
						item.quantity = 1;
					});
					setChooseNecessariesPackages(tmp);
					
				}												
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchChooseNecessariesPackages();
	},[]); //if search update, then run again

	return (
	<>
		
		<div className="home">
			<ChooseNecessariesPackages chooseNecessariesPackages={chooseNecessariesPackages} handleClick={handleClick}/>	

		</div>
	</>
	);
}
