import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import NotifyModal from "../../../components/modals/notify-modal/NotifyModal";
import { rectangle2, account, manage, location, register } 
	from "../../../assets";
import Topbar from "../../../components/topbar/TopBar";


export default function CreateUsers() {

	const usernameRef = useRef();	
	const nameRef = useRef();
	const idRef = useRef();
	const emailRef = useRef();
	const birthRef = useRef();
	const { token, isFetching } = useContext(Context);
	const history = useHistory();

	const [cities, setCities] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [treatmentPlaces, setTreatmentPlaces] = useState([]);
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedDistrict, setSelectedDistrict] = useState('');
	const [selectedWard, setSelectedWard] = useState('');
	const [selectedState, setSelectedState] = useState('F0');
	const [selectedTreatmentPlace, setSelectedTreatmentPlace] = useState('');
	
	const [modalNotifyOpen, setModalNotifyOpen] = useState(false);

	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};

	
	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {			
			console.log("yes")
			const res = await axios.post("/users/create", {
				username: usernameRef.current.value,				
				name: nameRef.current.value,
				identityCard: idRef.current.value,
				email: emailRef.current.value,
				dateOfBirth: birthRef.current.value,
				address: {city: selectedCity, district: selectedDistrict, ward: selectedWard},
				state: selectedState,
				placeOfTreatment: selectedTreatmentPlace

			}, config);
			if (res.data && res.data.treatmentPlaceIsFull) {
				setModalNotifyOpen(true);
				return;
			}
			window.location.replace(`/listRelatedUsers?username=${usernameRef.current.value}`);
		} catch (err) {
			console.log(err.response.data)			
		}
	};
	
	const onChangeCity = (e) => {		
		//set selected district
		setSelectedCity(e.target.value);
		const selectedCity = cities.filter((city) => city.name === e.target.value)[0];
		//init districts
		setDistricts(selectedCity.districts);
		setSelectedDistrict(districts[0].name);
		//init wards
		setWards(selectedCity.districts[0].wards);
		setSelectedWard(wards[0].name);		
	}

	const onChangeDistrict = (e) => {		
		//set selected district
		setSelectedDistrict(e.target.value);		
		const selectedDistrict = districts.filter((district) => district.name === e.target.value)[0];
		//init wards
		setWards(selectedDistrict.wards);
		setSelectedWard(wards[0].name);	
	}

	useEffect(() => {		
		
		const fetchCities = async () => {
			try {				
				const res = await axios.get("/addresses/getAll", config);					
				if (res.data) {
					//set city
					setCities(res.data);;
					setSelectedCity(res.data[0].name);
					//init districts
					setDistricts(res.data[0].districts);;				
					setSelectedDistrict(res.data[0].districts[0].name);
					//init wards
					setWards(res.data[0].districts[0].wards);
					setSelectedWard(res.data[0].districts[0].wards[0].name);						
				}
				
			} catch (err) {				
				console.log(err);
			}			
		};
		const fetchPlaceOfTreatments = async() => {
			const res = await axios.get("/treatmentPlaces/getAll", config);
			setTreatmentPlaces(res.data);
			setSelectedTreatmentPlace(res.data[0].name);
		}			
		fetchCities();		
		fetchPlaceOfTreatments();
	},[])

	return (
		<div id="page-top" style={{backgroundImage: `url(${rectangle2})`}}>   
			{/* Page Wrapper */}
			<div id="wrapper">
			<ManagerSidebar />
			{/* Content Wrapper */}
			<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<Topbar />  
				<div className="container-fluid">
				{/* Page Heading */}
				<div className="card o-hidden border-0 shadow-lg my-5">
				<div className="card-body p-0">
					{/* Nested Row within Card Body */}
					<div className="row">
					<div className="col-lg-5 d-none d-lg-block bg-register-image" style={{backgroundImage: `url(${register})`}}/>
					<div className="col-lg-7">
						<div className="p-5">
						<div className="text-center">
							<h1 className="h4 text-gray-900 mb-4">Thêm người vào hệ thống!</h1>
						</div>
						<form className="user" onSubmit={handleSubmit}>
							<div className="form-group row">
							<div className="col-sm-6 mb-3 mb-sm-0">
								<input type="username" className="form-control form-control-user"  
								placeholder="Username" ref={usernameRef}/>
							</div>
							<div className="col-sm-6">
								<input type="text" className="form-control form-control-user"  placeholder="Họ Tên" 
								ref={nameRef}/>
							</div>							
							</div>
							<div className="form-group row">
								<div className="col-sm-6 mb-3 mb-sm-0" >
									<input type="email" className="form-control form-control-user"  placeholder="Email" 
									ref={emailRef}/>
								</div>
								<div className="col-sm-6">
								<input type="text" className="form-control form-control-user"  placeholder="CCCD/CMND" 
									ref={idRef}/>
								</div>	
							</div>
							
							<div className="form-group row">
							<div className="col-sm-6 mb-3 mb-sm-0">
								<input type="text" className="form-control form-control-user"  placeholder="Ngày sinh" 
								ref={birthRef}/>
							</div>
							<div className="col-sm-6">
								<input type="text" className="form-control form-control-user"  placeholder="Địa chỉ" />
							</div>
							</div>
							<div className="form-group row">
							<div className="col-sm-6 mb-3 mb-sm-0">
								<select className="form-select form-control-user" 
								aria-label="Default select example" name="state" value={selectedState} 
								onChange={(e) => setSelectedState(e.target.value)}>
								<option selected>Trạng thái</option>
								<option value="F0">F0</option>
								<option value="F1">F1</option>
								<option value="F2">F2</option>
								<option value="F3">F3</option>
								</select>
							</div>
							<div className="col-sm-6 mb-3 mb-sm-0">
								<select className="form-select form-control-user" 
								aria-label="Default select example"
								name="placeOfTreatment" value={selectedTreatmentPlace} 
								onChange={(e) => setSelectedTreatmentPlace(e.target.value)}>
								<option selected>Nơi điều trị/cách ly</option>
								{treatmentPlaces.map((treatmentPlace, key) => {								
									return <option key={key} value={treatmentPlace.name}>{treatmentPlace.name}</option>
									})}
								</select>
							</div>
							</div>
							<div className="form-group">
							<button type="submit" className="btn btn-primary btn-user btn-block">
								Next
							</button>
							</div></form>
						</div>
					</div>
					</div>
				</div>
				</div>
				{/* /.container-fluid */}
			</div>
					{/* End of Main Content */}
				</div>
				{/* End of Content Wrapper */}
				</div>        
			</div>
			</div>
			
			
		
	
	);
}


{/* <form className="loginForm" onSubmit={handleSubmit}>
		<label>Username</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter username..."
			ref={usernameRef}
		/>		
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>
		<label>ID</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter ID..."
			ref={idRef}
		/>	
		<label>Email</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter email (if have)..."
			ref={emailRef}
		/>		
		<label>Day of Birth</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter day of Birth..."
			ref={birthRef}
		/>
		<label>city</label>
		<select name="city" value={selectedCity} onChange={(e) => onChangeCity(e)}>
			{cities.map((city, key) => {								
				return <option key={key} value={city.name}>{city.name}</option>
			})}
  		</select>
		<select name="district" value={selectedDistrict} onChange={(e) => onChangeDistrict(e)}>
			{districts.map((district, key) => {								
				return <option key={key} value={district.name}>{district.name}</option>
			})}
		</select>
		<select name="ward" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
			{wards.map((ward, key) => {								
				return <option key={key} value={ward.name}>{ward.name}</option>
			})}
  		</select>
		<label>State</label>
		<select name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
			<option value="F0">F0</option>
			<option value="F1">F1</option>
			<option value="F2">F2</option>
			<option value="F3">F3</option>
  		</select>
		<select name="placeOfTreatment" value={selectedTreatmentPlace} onChange={(e) => setSelectedTreatmentPlace(e.target.value)}>		
			{treatmentPlaces.map((treatmentPlace, key) => {								
				return <option key={key} value={treatmentPlace.name}>{treatmentPlace.name}</option>
			})}
  		</select>
				

		
		<button className="loginButton" type="submit">
			Next
		</button>
		
		
		</form>      */}