import ManageProcess from "../manage-process/ManageProcess";
import "./manageProcesses.css";

export default function ManageProcesses({ manageProcesses }) {
  return (
    <div className="posts">
      {manageProcesses.map((mp) => (
        <ManageProcess manageProcess={mp} />
      ))}
    </div>
  );
}
