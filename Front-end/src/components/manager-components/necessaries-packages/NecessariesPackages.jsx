import NecessariesPackage from "../necessaries-package/NecessariesPackage";
import "./necessariesPackages.css";

export default function NecessariesPackages({ necessariesPackages, searchTerm }) {
  return (	
	
		<div className="overflow-scroll main-content">
				<div className="row">
				{necessariesPackages.map((n) => (
					n.name.toLowerCase().includes(searchTerm.toLowerCase()) && <NecessariesPackage key={n._id} necessariesPackage={n} />
				))}
					
		</div>
		</div>
  );
}

				
