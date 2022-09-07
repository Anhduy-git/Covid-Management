import React, { useState, useEffect } from "react";
import "./necessariesPackagesCartView.css";

const NecessariesPackagesCartView = ({ cart, totalPrice}) => {

	return (
	<article>
		{cart.map((item) => (
		<div className="cart_box" key={item._id}>
			<div className="cart_img">
			<img src={item.image} alt="" />
			<p>{item.name}</p>
			</div>
			<div>
			
			<button>{item.quantity}</button>
			
			</div>
			<div>
			<span>{item.totalPrice}</span>
			
			</div>
		</div>
		))}		
	</article>
	);
};

export default NecessariesPackagesCartView;