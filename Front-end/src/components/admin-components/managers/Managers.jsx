import Manager from "../manager/Manager";
import "./managers.css";

export default function Managers({ managers }) {
  return (
	<table className="table table-borderless">
		<thead className="text-center">
			<tr>
			<th scope="col">#</th>
			<th scope="col">Tài khoản</th>
			<th scope="col">Email</th>
			</tr>
		</thead>
		<tbody className="table-group-divider text-center">			
			{managers.map((m, idx) => (
				<Manager key={m._id} manager={m} idx={idx}/>
			))}		
		</tbody>
	</table>    
  );
}
