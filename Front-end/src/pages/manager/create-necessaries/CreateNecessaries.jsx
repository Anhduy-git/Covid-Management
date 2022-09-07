import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import "./createNecessaries.css";


export default function CreateNecessaries() {

	const nameRef = useRef();	
	const priceRef = useRef();
	const unitRef = useRef();	
	const { token, isFetching } = useContext(Context);
	const history = useHistory();	
	const config = {
		headers: {
			"Authorization": "Bearer " + token
		}
	};	

	const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    

    const uploadImage = async (base64EncodedImage, necessaryID) => {
        try {			
            await axios.post(`necessaries/${necessaryID}/uploadImage`, {                
                image: base64EncodedImage 
			}, config);              
            setFileInputState('');
            setPreviewSource('');            
        } catch (err) {
            console.error(err);
            
        }
    };

	
	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			const res = await axios.post("/necessaries/create", {
				name: nameRef.current.value,
				price: priceRef.current.value,
				unit: unitRef.current.value

			}, config);
			const necessaryID = res.data;
			if (!selectedFile) return;
			const reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onloadend = () => {				
				uploadImage(reader.result, necessaryID);
			};			
			
			window.location.replace("/listNecessaries")
		} catch (err) {
			console.log(err)			
		}
	};


	return (
	<div className="login">
		<span className="loginTitle">Add New Necessary</span>
		<form className="loginForm" onSubmit={handleSubmit}>
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>		
		<label>Price</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter price..."
			ref={priceRef}
		/>
		<label>Unit</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter unit..."
			ref={unitRef}
		/>		

		
		<input
			id="fileInput"
			type="file"
			name="image"
			onChange={handleFileInputChange}
			value={fileInputState}
			className="form-input"
		/>
		{previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
        )}
		
		

		<div>
			<button className="loginButton" type="submit">
				Add
			</button>
		</div>

		</form>     
		
	</div>
	);
}
