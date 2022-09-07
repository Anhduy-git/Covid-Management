import "./chooseNecessariesPackage.css";
import { Link } from "react-router-dom";

export default function ChooseNecessariesPackage({ chooseNecessariesPackage, handleClick }) {
  
  return (
	
	
	<div className="post">
		<Link to={`/necessariesPackageInfoView?id=${chooseNecessariesPackage._id}`} className="link">
		{chooseNecessariesPackage.image && <img className="postImg" src={chooseNecessariesPackage.image} alt="" />}
		<div className="postInfo">		
			<span className="postTitle">{chooseNecessariesPackage.name}</span>	
			<span className="postTitle">{chooseNecessariesPackage.totalPrice}</span>				
		</div>
		</Link>
		<button onClick={() => handleClick(chooseNecessariesPackage)}>Add to Cart</button>
	</div>
	
  );
}
