import ChooseNecessary from "../choose-necessaries-package/ChooseNecessariesPackage";
import "./chooseNecessaries.css";

export default function ChooseNecessaries({ chooseNecessaries, handleClick }) {
  return (
    <div className="posts">
		{chooseNecessaries.map((n, index) => (
			<div key={index}>				
				<ChooseNecessary chooseNecessary={n} handleClick={handleClick}/>
		  	</div>
			
		))}
    </div>
  );
}
