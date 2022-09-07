import "./chooseNecessary.css";
import { Link } from "react-router-dom";

export default function ChooseNecessary({ chooseNecessary, handleClick }) {
  
  return (
	
	
	<div className="post">
		{chooseNecessary.image && <img className="postImg" src={chooseNecessary.image} alt="" />}
		<div className="postInfo">		
			<span className="postTitle">{chooseNecessary.name}</span>	
			<span className="postTitle">{chooseNecessary.price}</span>
			<span className="postTitle">{chooseNecessary.unit}</span>		
		</div>
		<button onClick={() => handleClick(chooseNecessary)}>Add to Cart</button>
	</div>
	
  );
}
