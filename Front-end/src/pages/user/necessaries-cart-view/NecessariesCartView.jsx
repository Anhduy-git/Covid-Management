import React, { useState, useEffect } from "react";
import "./necessariesCartView.css";

const NecessariesCartView = ({ cart, price }) => {
  
	
	

	return (
	<article>
		{cart.map((item) => (
		<div className="cart_box" key={item._id}>
			<div className="cart_img">
			<img src={item.image} alt="" />
			<p>{item.name}</p>
			</div>
			<div>
			
			<button>{item.amount}</button>
			
			</div>
			<div>
			<span>{item.price}</span>
			
			</div>
		</div>
		))}
		
	</article>
	);
};

export default NecessariesCartView;