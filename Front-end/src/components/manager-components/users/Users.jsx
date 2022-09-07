import User from "../user/User";

export default function Users({ users, searchTerm }) {	
  return (
    <>
		{users.map((u) => (
			u.identityCard.includes(searchTerm) && <User key={u._id} user={u}/>
		))}
    </>
  );
}


