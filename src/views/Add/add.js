import React, { useState } from 'react';
import "./add.css";
import Homeimg from "./../../assets/home-access_17252932.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function AddChocolate() {
  const [chocolate, setChocolate] = useState({
    id: "",
    name: "",
    description: "",
    price: "", 
    image: null, 
  });

  const addChocolate = async () => {
    try {
      const formData = new FormData(); 
      formData.append('id', chocolate.id);
      formData.append('name', chocolate.name);
      formData.append('description', chocolate.description);
      formData.append('price', chocolate.price);
      if (chocolate.image) {
        formData.append('image', chocolate.image);
      }


      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chocolates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response?.data?.message);

      setChocolate({
        id: "",
        name: "",
        description: "",
        price: "",
        image: null,
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred"); 
      console.error("Error details:", error); 
    }
  };

  const handleImageChange = (e) => {
    setChocolate({
      ...chocolate,
      image: e.target.files[0], 
    });
  };

  return (
    <div>
      <h1 className='add-page-heading'> Add Chocolate</h1>

      <div className='chocolate-form'>
        <input type='text' placeholder='ID' className='user-input' value={chocolate.id}
          onChange={(e) => setChocolate({ ...chocolate, id: e.target.value })} />
        <input type='text' placeholder='Name' className='user-input' value={chocolate.name}
          onChange={(e) => setChocolate({ ...chocolate, name: e.target.value })} />
        <input type='text' placeholder='Description' className='user-input' value={chocolate.description}
          onChange={(e) => setChocolate({ ...chocolate, description: e.target.value })} />
        <input type='number' placeholder='Price' className='user-input' value={chocolate.price}
          onChange={(e) => setChocolate({ ...chocolate, price: e.target.value })} />
        <input type='file' className='user-input' onChange={handleImageChange} />
      </div>
      <button type='button' className='chocolate-add-btn' onClick={addChocolate}> 
        Add Chocolate
      </button>
      <Link to={"/"}>
        <img src={Homeimg} className='Home-img-addpage' alt='home-icon' />
      </Link>
      <Toaster />
    </div>
  );
}

export default AddChocolate;