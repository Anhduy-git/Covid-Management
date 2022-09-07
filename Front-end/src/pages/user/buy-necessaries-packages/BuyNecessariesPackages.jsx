import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, Link } from "react-router-dom";
import "./buyNecessariesPackages.css";
import NecessariesPackagesCart from "../necessaries-packages-cart/NecessariesPackagesCart";
import ListChooseNecessariesPackages from "../list-choose-necessaries-packages/ListChooseNecessariesPackages";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";

export default function BuyNecessariesPackages() {

	
	const { token } = useContext(Context);	
	const [modalNotifyOpen, setModalNotifyOpen] = useState(false);
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};	



	//state of necessaries choose
	const [cart, setCart] = useState([]);
	const [showCart, setShowCart] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	const handleClick = (item) => {
		const index = cart.findIndex(object => {
			return object._id === item._id;
		});
		//necessary exist
		if (index !== -1) {			
			return;
		}
		setCart([...cart, item]);
	};

	const handleChange = (item, d) => {		
		const ind = cart.indexOf(item);		
		const arr = cart;
		arr[ind].quantity += d;		
		if (arr[ind].quantity === 0) arr[ind].quantity = 1;
		setCart([...arr]);
	};

	const handlePrice = () => {
		let ans = 0;
		cart.map((item) => (ans += item.quantity * item.totalPrice));
		setTotalPrice(ans);
	};

	const handleRemove = (id) => {
		const arr = cart.filter((item) => item._id !== id);
		setCart(arr);
		handlePrice();
	};

	const handleOrder = async() => {
		let necessaryPackages = [];
		for (let item of cart) {
			necessaryPackages.push({necessaryPackage: item._id, quantity: item.quantity});
		}
		const res = await axios.post("/users/buyNecessaryPackages/", {
			necessaryPackages,
			totalPrice
		}, config);
		setModalNotifyOpen(true);
		setCart([]);
		setTotalPrice(0);
		setShowCart(false);
		
	};

	


	return (
	<div className="login">
		<span className="loginTitle">Buy Necessary Package</span>
		
		
		<button onClick={() => setShowCart(!showCart)}>Cart</button>
		{showCart ? <NecessariesPackagesCart cart={cart} totalPrice={totalPrice} 
		handleChange={handleChange} 
		handlePrice={handlePrice} 
		handleRemove={handleRemove}
		handleOrder={handleOrder}/> : 
		<ListChooseNecessariesPackages handleClick={handleClick}/>
			
		}  
		
		{modalNotifyOpen && <NotifyModal 
		setOpenModal={setModalNotifyOpen}		
		messageTitle={"SUCCESS"} 
		messageBody={"Order successfully"}/>}
	</div>
	
	);
}
