import { useEffect, useState } from "react";
import "./userTransaction.css";
import moment from "moment";
import NecessariesPackagesCartView from "../necessaries-packages-cart-view/NecessariesPackagesCartView";
export default function UserTransaction({ userTransaction }) {
	
	const [necessaryPackages, setNecessaryPackages] = useState([]);
	useEffect(() => {
		const tmp = [];
		for (let item of userTransaction.necessaryPackages) {
			const necessaryPackage = item.necessaryPackage;
			necessaryPackage.quantity = item.quantity;
			tmp.push(necessaryPackage);
		}
		setNecessaryPackages(tmp);		
		
	},[]);
	const strDate = moment(userTransaction.createdAt).format('DD/MM/YYYY');
	
	return (
	
		<div className="post">      
			<div className="postInfo">        
				
				<span className="postTitle">{strDate}</span>								
				<span className="postTitle">Total Price: {userTransaction.totalPrice}</span>
				<NecessariesPackagesCartView cart={necessaryPackages} totalPrice={userTransaction.totalPrice} />
			</div>				
		</div>
	
	);
}
