import { Link } from "react-router-dom";

export default function NecessariesPackage({ necessariesPackage }) {
  
	return (
		<Link to={`/necessariesPackageInfo?id=${necessariesPackage._id}`} className="link">
		<div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
		<div className="card">
			<div className="d-flex justify-content-between p-3">
			<a href="product.html"><p className="lead mb-0">{necessariesPackage.name}</p></a>
			</div>
			{necessariesPackage.image && <img src={necessariesPackage.image} className="card-img-top" alt="Laptop" />}
			<div className="card-body">
			<div className="d-flex justify-content-between mb-3">
				<h5 className="mb-0">Giới hạn</h5>
				<h5 className="text-dark mb-0">100/ngày</h5>
			</div>
			<div className="d-flex justify-content-between mb-2">
				<p className="text-muted mb-0">Tối đa: <span className="fw-bold">20</span></p>
			</div>
			<div className="d-flex justify-content-between mb-2">
				<p className="text-muted mb-0">Tổng tiền: <span className="fw-bold">{necessariesPackage.totalPrice}</span></p>
			</div>
			</div>
		</div>
		</div>
		</Link>

	);
}

