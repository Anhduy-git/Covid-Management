import ChooseNecessary from "../choose-necessary/ChooseNecessary";
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
