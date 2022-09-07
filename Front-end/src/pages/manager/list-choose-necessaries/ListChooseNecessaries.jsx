import { useEffect, useState, useContext } from "react";
import Header from "../../../components/header/Header";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import ChooseNecessaries from "../../../components/manager-components/choose-necessaries/ChooseNecessaries";
import "./listChooseNecessaries.css";
import axios from "axios";
import { Context } from "../../../context/Context";
import { Link, useLocation, useHistory } from "react-router-dom";


export default function ListChooseNecessaries({handleClick}) {	

	const location = useLocation();
	const [chooseNecessaries, setChooseNecessaries] = useState([]);	
	const [checked, setChecked] = useState([]);
	const {token} = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};
	const history = useHistory();


	
	useEffect(() => {
		const fetchChooseNecessaries = async () => {
			try {
				console.log("yes")
				const res = await axios.get('/necessaries/getAll', config);
				if (res.data) {
					const tmp = res.data;
					tmp.forEach((item) => {
						item.amount = 1;
					});
					setChooseNecessaries(tmp);
					
				}												
			} catch (err) {				
				console.log(err);
			}
		};
		
		fetchChooseNecessaries();
	},[]); //if search update, then run again

	return (
	<>
		
		<div className="home">
			<ChooseNecessaries chooseNecessaries={chooseNecessaries} handleClick={handleClick}/>	

			
		
		</div>
	</>
	);
}
