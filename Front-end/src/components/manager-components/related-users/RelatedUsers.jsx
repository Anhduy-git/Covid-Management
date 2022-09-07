import RelatedUser from "../related-user/RelatedUser";

export default function RelatedUsers({ users, searchTerm }) {	
  return (
    <table className="table table-borderless">
	<thead>
	<tr>
		<th scope="col">STT</th>
		<th scope="col">Họ Tên</th>
		<th scope="col">CMND / CCCD</th>
	</tr>
	</thead>
	<tbody className="table-group-divider">
		{users.map((u, idx) => (
			u.identityCard.includes(searchTerm) && <RelatedUser key={u._id} user={u} idx={idx}/>
		))}
	
	</tbody>
</table>
  );
}

