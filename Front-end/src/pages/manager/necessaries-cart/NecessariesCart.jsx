import React, { useState, useEffect } from "react";
import "./necessariesCart.css";

const NecessariesCart = ({ disabled,cart, price, handleChange, handlePrice, handleRemove }) => {
  
	

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
			<button disabled={disabled} onClick={() => handleChange(item, 1)}>+</button>
			<button>{item.amount}</button>
			<button disabled={disabled} onClick={() => handleChange(item, -1)}>-</button>
			</div>
			<div>
			<span>{item.price}</span>
			<button disabled={disabled} onClick={() => handleRemove(item._id)}>Remove</button>
			</div>
		</div>
		))}
		<div className="total">
		<span>Total Price of necessaries</span>
		<span>{price}</span>
		</div>
	</article>
	);
};

export default NecessariesCart;