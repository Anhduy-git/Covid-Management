import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./necessaryPackageInfo.css";
import Cart from "../necessaries-cart/NecessariesCart";
import ListChooseNecessaries from "../list-choose-necessaries/ListChooseNecessaries";
import ConfirmModal from "../../../components/modals/confirm-modal/ConfirmModal";


export default function NecessaryPackageInfo() {

	
	const { token } = useContext(Context);
	const history = useHistory();

	const [name, setName] = useState('');	
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

	//state of necessaries choose
	const [cart, setCart] = useState([]);
	const [show, setShow] = useState(false);
	const [price, setPrice] = useState(0);

	//check if value exist
	const handleClick = (item) => {	
		const index = cart.findIndex(object => {
			return object._id === item._id;
		});
		//necessary exist
		if (index !== -1) {			
			return;
		}
		setCart([...cart, item]);
	};

	const handleChange = (item, d) => {
		const ind = cart.indexOf(item);		
		const arr = cart;
		arr[ind].amount += d;		
		if (arr[ind].amount === 0) arr[ind].amount = 1;
		setCart([...arr]);
	};

	const handlePrice = () => {
		let ans = 0;
		cart.map((item) => (ans += item.amount * item.price));
		setPrice(ans);
	};

	const handleRemove = (id) => {
		const arr = cart.filter((item) => item._id !== id);
		setCart(arr);
		handlePrice();
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
            await axios.post(`necessaryPackages/${idQuery}/uploadImage`, {                
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
			//create necessaries array
			let necessaries = [];
			for (let item of cart) {
				necessaries.push({necessary: item._id, quantity: item.amount});
			}			
			await axios.patch(`/necessaryPackages/${idQuery}/update`, {
				name,
				necessaries,
				totalPrice: price			
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
			await axios.delete(`/necessaryPackages/${idQuery}/delete`, config);
			//back to list managers page
			history.goBack();
		} catch (err) {
			console.log(err)			
		}
		
	}


	useEffect(() => {		
		const fetchDataOfNecessary = async() => {
			try {
				const res = await axios.get(`/necessaryPackages/${idQuery}/get`, config);	
				//init data of current user
				if (res.data) {
					console.log(res.data);
					setName(res.data.name);										
					setPreviewSource(res.data.image);
					//get the cart
					let tmp = [];
					for (let item of res.data.necessaries) {
						tmp.push({...item.necessary, amount: item.quantity});
					}
					setCart(tmp);					
					setPrice(res.data.totalPrice);
				}

			} catch(err) {
				console.log(err);
			}
		}
						
		fetchDataOfNecessary();
	},[])

	return (
	<div className="login">
		<span className="loginTitle">Necessary Package Info</span>
		
		<form className="loginForm" onSubmit={handleSubmit}>

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
			style={{ height: '300px' }}
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
		
			
		
		<button className="loginButton" type="submit" style={{visibility: updating ? 'visible':'hidden'}}>
			Save
		</button>

		</form>   
		<button disabled={!updating} className="loginButton" onClick={() => setShow(!show)}>Add Necessaries</button>
		{show ? <ListChooseNecessaries handleClick={handleClick}/>:
			<Cart disabled={!updating} cart={cart} price={price} setCart={setCart} handleChange={handleChange} handlePrice={handlePrice} handleRemove={handleRemove}/>
		}  
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
