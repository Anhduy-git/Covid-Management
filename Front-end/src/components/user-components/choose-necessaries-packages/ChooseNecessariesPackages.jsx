import ChooseNecessariesPackage from "../choose-necessaries-package/ChooseNecessariesPackage";
import "./chooseNecessariesPackages.css";

export default function ChooseNecessariesPackages({ chooseNecessariesPackages, handleClick }) {
  return (
    <div className="posts">
		{chooseNecessariesPackages.map((n, index) => (
			<div key={index}>				
				<ChooseNecessariesPackage chooseNecessariesPackage={n} handleClick={handleClick}/>
		  	</div>
			
		))}
    </div>
  );
}
