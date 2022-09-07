import UserManagedProcess from "../user-managed-process/UserManagedProcess";
import "./userManagedProcesses.css";

export default function UserManagedProcesses({ managedProcesses }) {
  return (
    <div className="posts">
      {managedProcesses.map((mp) => (
        <UserManagedProcess key={mp._id} managedProcess={mp} />
      ))}
    </div>
  );
}
