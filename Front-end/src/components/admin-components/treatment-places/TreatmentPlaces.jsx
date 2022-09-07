import TreatmentPlace from "../treatment-place/TreatmentPlace";


export default function TreatmentPlaces({ treatmentPlaces, setModalOpen, setDeleteID }) {
  return (
		<table className="table table-borderless">
			<thead>
				<tr>
				<th scope="col">#</th>
				<th scope="col">Tên</th>
				<th scope="col">Sức chứa</th>
				<th scope="col">Số lượng</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
			{treatmentPlaces.map((tp, idx) => (
        		<TreatmentPlace key={tp._id} treatmentPlace={tp} idx={idx} 
				setModalOpen={setModalOpen} setDeleteID={setDeleteID}/>
      		))}				
			</tbody>
		</table> 
    
  );
}
