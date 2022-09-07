import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./necessaryInfo.css";
import ConfirmModal from "../../../components/modals/confirm-modal/ConfirmModal";

export default function NecessaryInfo() {

	// const priceRef = useRef();		
	// const nameRef = useRef();
	// const unitRef = useRef();
	const { token, isFetching } = useContext(Context);
	const history = useHistory();

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [unit, setUnit] = useState('');
	const [updating, setUpdating] = useState(false);
	const [imageUpdated, setImageUpdated] = useState(false);
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

	const search = useLocation().search;
	const idQuery = new URLSearchParams(search).get('id');
	
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
		setImageUpdated(true);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {			
            await axios.post(`necessaries/${idQuery}/uploadImage`, {                
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
			await axios.patch(`/necessaries/${idQuery}/update`, {
				name,
				price,
				unit				
			},
			config);				
			if (selectedFile && imageUpdated) {
				
				const reader = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onloadend = () => {				
					uploadImage(reader.result);
				};		
			}			
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err)			
		}
	};

	const onConfirmDeleteBtnClick = async () => {
		
		try {						
			await axios.delete(`/necessaries/${idQuery}/delete`, config);
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err)			
		}
		
	}


	useEffect(() => {		
		const fetchDataOfNecessary = async() => {
			try {
				const res = await axios.get(`/necessaries/${idQuery}/get`, config);	
				//init data of current user
				if (res.data) {
					setName(res.data.name);
					setPrice(res.data.price);
					setUnit(res.data.unit);
					setPreviewSource(res.data.image);
				}

			} catch(err) {
				console.log(err);
			}
		}
						
		fetchDataOfNecessary();
	},[])

	return (
	<div className="login">
		<span className="loginTitle">Users Info</span>
		<form className="loginForm" onSubmit={handleSubmit} >
			<input
				id="fileInput"
				type="file"
				name="image"
				onChange={handleFileInputChange}
				value={fileInputState}
				className="form-input"
				disabled={!updating}
			/>
			{previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '200px' }}
                />
        	)}
			<label>Name</label>
			<input
				type="text"
				className="loginInput"				
				value={name}			
				disabled={!updating}
				onChange={(e) => setName(e.target.value)}

			/>
			
			<label>Price</label>
			<input
				type="text"
				className="loginInput"				
				value={price}				
				disabled={!updating}
				onChange={(e) => setPrice(e.target.value)}
			/>
			<label>Unit</label>
			<input
				type="text"
				className="loginInput"				
				value={unit}			
				disabled={!updating}
				onChange={(e) => setUnit(e.target.value)}
			/>		
			

			<button className="loginButton" type="submit" style={{visibility: updating ? 'visible':'hidden'}}>
				Save
			</button>

		</form>     
		<button className="loginButton" onClick={() => setUpdating(!updating)}>
			Update
		</button>
		<button className="loginButton" onClick={() => setModalDeleteOpen(true)}>
			Delete
		</button>
		{modalDeleteOpen && <ConfirmModal 
		setOpenModal={setModalDeleteOpen}
		onConfirm={onConfirmDeleteBtnClick} 
		messageTitle={"DELETE"} 
		messageBody={"You want to delete ?"}/>}
	</div>
	);
}
