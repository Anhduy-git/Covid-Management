import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import { useHistory, Link } from "react-router-dom";
import ManagerSidebar from "../../../components/manager-components/manager-sidebar/ManagerSidebar";
import "./createNecessariesPackages.css";
import NecessariesCart from "../necessaries-cart/NecessariesCart";
import ListChooseNecessaries from "../list-choose-necessaries/ListChooseNecessaries";

export default function CreateNecessariesPackages() {

	const nameRef = useRef();	
	
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

	//state of necessaries choose
	const [cart, setCart] = useState([]);
	const [show, setShow] = useState(false);
	const [price, setPrice] = useState(0);

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
		console.log(cart);
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
            await axios.post(`necessaryPackages/${necessaryID}/uploadImage`, {                
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
			const res = await axios.post("/necessaryPackages/create", {
				name: nameRef.current.value,
				necessaries,
				totalPrice: price
			}, config);
			const necessaryID = res.data;			
			if (selectedFile) {
				const reader = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onloadend = () => {				
					uploadImage(reader.result, necessaryID);
				};	
			}
			
			window.location.replace("/listNecessariesPackages")
								
			
		} catch (err) {
			console.log(err)			
		}
	};


	return (
	<div className="login">
		<span className="loginTitle">Add New Necessary Package</span>
		
		<form className="loginForm" onSubmit={handleSubmit}>

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
		<label>Name</label>
		<input
			type="text"
			className="loginInput"
			placeholder="Enter name..."
			ref={nameRef}
		/>			
		
		
		<button className="loginButton" type="submit">
			Add
		</button>
		

		</form>   
		<button onClick={() => setShow(!show)}>Add Necessaries</button>
		{show ? <ListChooseNecessaries handleClick={handleClick}/>:
			<NecessariesCart cart={cart} price={price} setCart={setCart} handleChange={handleChange} handlePrice={handlePrice} handleRemove={handleRemove}/>
		}  
		
	</div>
	);
}
