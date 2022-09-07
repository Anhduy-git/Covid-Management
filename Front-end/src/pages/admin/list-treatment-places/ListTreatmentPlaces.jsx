import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin-components/admin-sidebar/AdminSidebar";
import TreatmentPlaces from "../../../components/admin-components/treatment-places/TreatmentPlaces";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../components/modals/confirm-modal/ConfirmModal";
import { rectangle2 } from "../../../assets";
import AdminTopbar from "../../../components/admin-components/admin-topbar/AdminTopBar";


export default function ListTreatmentPlaces() {		
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);	
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [deleteID, setDeleteID] = useState();

	const { token } = useContext(Context);	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};	

	useEffect(() => {
		const fetchTreatmentPlaces = async () => {			
			try {
				const res = await axios.get("/treatmentPlaces/getAll");
				if (res.data) {
					setTreatmentPlaces(res.data);
				}
				
			} catch (err) {				
				console.log(err.response.data);
			}
		};
		
		fetchTreatmentPlaces();
	}, [treatmentPlaces, deleteID]); //if search update, then run again

	const onConfirmDeleteBtnClick = async () => {
		
		try {						
			const res = await axios.delete(`/treatmentPlaces/${deleteID}/delete`, config);			
			if (res.data) {
				setTreatmentPlaces(res.data);
			}
		} catch (err) {
			console.log(err)			
		}
		
	}

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>  
		 {modalDeleteOpen && <ConfirmModal 
					setOpenModal={setModalDeleteOpen}
					onConfirm={onConfirmDeleteBtnClick} 
					messageTitle={"XÓA"} 
					messageBody={"Bạn muốn xóa ?"}/>}
		<div className="container-fluid">
        {/* Page Wrapper */}
        <div id="wrapper">
			<AdminSidebar />
          
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
			
				<AdminTopbar />		
				{/* Begin Page Content */}			
				
					
				{/* Page Heading */}
				<h1 className="h3 mb-4 text-gray-800 text-center"><strong>Địa điểm cách ly / điều trị</strong></h1>
				<TreatmentPlaces treatmentPlaces={treatmentPlaces} setModalOpen={setModalDeleteOpen} setDeleteID={setDeleteID}/>
			</div>
			{/* /.container-fluid */}
			{/* End of Main Content */}
            </div>
            {/* End of Content Wrapper */}
          </div>         
        </div>
		
      </div>
	);
}


{/* <>
		<Header />
		<div className="home">
		<TreatmentPlaces treatmentPlaces={treatmentPlaces}/>	

		<Link to={"/createTreatmentPlaces"} className="link">
			<button>
				Add
			</button>	
		</Link>

		<AdminSidebar />
		</div>
	</> */}