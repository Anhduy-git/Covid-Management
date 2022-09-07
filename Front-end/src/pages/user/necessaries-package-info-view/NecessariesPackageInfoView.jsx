import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./necessariesPackageInfoView.css";
import NecessariesCartView from "../necessaries-cart-view/NecessariesCartView";




export default function NecessariesPackageInfoView() {

	
	const { token } = useContext(Context);
	const history = useHistory();
	const [name, setName] = useState('');	
	const [cart, setCart] = useState([]);
	const [price, setPrice] = useState(0);
	const [previewSource, setPreviewSource] = useState('');

	const search = useLocation().search;
	const idQuery = new URLSearchParams(search).get('id');
	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};


	

	


	useEffect(() => {		
		const fetchDataOfNecessary = async() => {
			try {
				const res = await axios.get(`/necessaryPackages/${idQuery}/get`, config);	
				//init data of current user
				if (res.data) {
					
					setName(res.data.name);										
					setPreviewSource(res.data.image);
					//get the cart
					let tmp = [];
					for (let item of res.data.necessaries) {
						tmp.push({...item.necessary, amount: item.quantity});
					}
					setCart(tmp);					
					setPrice(res.data.totalPrice);
				}

			} catch(err) {
				console.log(err);
			}
		}
						
		fetchDataOfNecessary();
	},[])

	return (
	<div className="login">
		<span className="loginTitle">Necessary Package Info</span>
		
		

		
		{previewSource && (
		<img
			src={previewSource}
			alt="chosen"
			style={{ height: '300px' }}
		/>
        )}
		<label>Name</label>
		<input
			type="text"
			className="loginInput"				
			value={name}			
			disabled={true}
		
		/>					
		<span>Total Price of necessaries</span>
		<span>{price}</span>
		
		<NecessariesCartView  cart={cart} price={price} />
		
		
	</div>
	);
}
