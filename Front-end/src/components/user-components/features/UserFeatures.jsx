
import "./userFeatures.css";
import { Link } from "react-router-dom";

import f1 from '../../../assets/f1.png'
import f2 from '../../../assets/f2.png'
import f3 from '../../../assets/f3.png'
import f4 from '../../../assets/f4.png'

export default function UserFeatures() {
  return (
    <div className="posts">		
		<Link to={'/me'} className="link">
			<div className="post">
				<img className="postImg" src={f1} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Thông tin cá nhân</span>								
				</div>			
			</div>
		</Link>
		<Link to={'/me/changePassword'} className="link">
			<div className="post">
				<img className="postImg" src={f1} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Đổi mật khẩu</span>								
				</div>			
			</div>
		</Link>
		<Link to={'/buyNecessariesPackages'} className="link">
			<div className="post">
				<img className="postImg" src={f3} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Mua Gói Nhu Yếu phẩm</span>								
				</div>			
			</div>
		</Link>	
		<Link to={'/me/payment'} className="link">
			<div className="post">
				<img className="postImg" src={f4} alt="" />
				<div className="postInfo">									
					<span className="postTitle">Thanh toán</span>								
				</div>			
			</div>
		</Link>	
    </div>
  );
}
