import { Link } from "react-router-dom";

export default function TreatmentPlace({ treatmentPlace, idx, setModalOpen, setDeleteID }) {
	const onDeleteButtonClick = () => {		
		setModalOpen(true);
		setDeleteID(treatmentPlace._id);
	}
	return (	
		<tr>
			<th scope="row">{idx + 1}</th>
			<td>{treatmentPlace.name}</td>
			<td>{treatmentPlace.capacity}</td>
			<td>{treatmentPlace.currentPatients}</td>
			<td>
				<a className="dropdown-item " href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
				</a>
				{/* Dropdown - Setting account */}
				<div className="dropdown-menu dropdown-menu-right shadow " aria-labelledby="userDropdown">				
				<button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={onDeleteButtonClick}>
					<i className="bi bi-trash text-gray-400" />
					Xóa
				</button>                       
				</div>
			</td>
		</tr>
  );
}
