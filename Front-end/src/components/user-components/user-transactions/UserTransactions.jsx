import UserTransaction from "../user-transaction/UserTransaction";
import "./userTransactions.css";

export default function UserTransactions({ userTransactions }) {
  return (
    <div className="posts">
      {userTransactions.map((ut) => (
        <UserTransaction key={ut._id} userTransaction={ut} />
      ))}
    </div>
  );
}
