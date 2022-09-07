import React, { useState, useEffect } from "react";
import "./necessariesPackagesCart.css";

const NecessariesPackagesCart = ({ cart, totalPrice, handleChange, handlePrice, handleRemove, handleOrder }) => {
  
	

	useEffect(() => {
		handlePrice();
		
	});

	return (
	<article>
		{cart.map((item) => (
		<div className="cart_box" key={item._id}>
			<div className="cart_img">
			<img src={item.image} alt="" />
			<p>{item.name}</p>
			</div>
			<div>
			<button onClick={() => handleChange(item, 1)}>+</button>
			<button>{item.quantity}</button>
			<button onClick={() => handleChange(item, -1)}>-</button>
			</div>
			<div>
			<span>{item.totalPrice}</span>
			<button onClick={() => handleRemove(item._id)}>Remove</button>
			</div>
		</div>
		))}
		<div className="total">
		<span>Total Price of necessaries Packages</span>
		<span>{totalPrice}</span>
		</div>
		<button onClick={() => handleOrder()}>Order</button>
	</article>
	);
};

export default NecessariesPackagesCart;