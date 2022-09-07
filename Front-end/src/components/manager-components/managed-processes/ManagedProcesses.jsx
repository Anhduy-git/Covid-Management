import ManagedProcess from "../managed-process/ManagedProcess";
import "./managedProcesses.css";

export default function ManagedProcesses({ managedProcesses }) {
  return (
    <div className="posts">
      {managedProcesses.map((mp) => (
        <ManagedProcess managedProcess={mp} />
      ))}
    </div>
  );
}
