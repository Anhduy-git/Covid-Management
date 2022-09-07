import Necessary from "../necessary/Necessary";
import "./necessaries.css";

export default function Necessaries({ necessaries, searchTerm }) {
  return (
    <div className="posts">
		{necessaries.map((n) => (
			n.name.toLowerCase().includes(searchTerm.toLowerCase()) && <Necessary key={n._id} necessary={n} />
		))}
    </div>
  );
}
