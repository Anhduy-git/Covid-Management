import "./single.css";
import Sidebar from "../../components/admin-components/sidebar/Sidebar";
import SinglePost from "../../components/admin-components/singlePost/SinglePost";

export default function Single() {
  return (
    <div className="single">
      <SinglePost/>
      <Sidebar />
    </div>
  );
}
