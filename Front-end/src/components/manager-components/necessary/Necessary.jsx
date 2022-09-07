import "./necessary.css";
import { Link } from "react-router-dom";

export default function Necessary({ necessary }) {
  
  return (
	
	<Link to={`/necessaryInfo?id=${necessary._id}`} className="link">
		<div className="post">
			{necessary.image && <img className="postImg" src={necessary.image} alt="" />}
			<div className="postInfo">			
				<span className="postTitle">{necessary.name}</span>		
				<span className="postTitle">{necessary.price}</span>			
			</div>
		</div>
	</Link>
  );
}

<div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
	<div className="card">
		<div className="d-flex justify-content-between p-3">
		<a href="product.html"><p className="lead mb-0">Thực phẩm tươi sống</p></a>
		</div>
		{necessary.image && <img src={necessary.image} className="card-img-top" />}
		<div className="card-body">
		<div className="d-flex justify-content-between mb-3">
			<h5 className="mb-0">Giới hạn</h5>
			<h5 className="text-dark mb-0">100/ngày</h5>
		</div>
		<div className="d-flex justify-content-between mb-2">
			<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
		</div>
		</div>
	</div>
</div>