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
  });

  const addChocolate = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        id: chocolate.id,
        name: chocolate.name,
        description: chocolate.description,
        price: chocolate.price
      });

      toast.success(response?.data?.message || "Chocolate added successfully!");

      setChocolate({
        id: "",
        name: "",
        description: "",
        price: "",
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Error details:", error);
    }
  };

  return (
    <div>
      <h1 className='add-page-heading'> Add Chocolate</h1>

      <div className='chocolate-form'>
        <input 
          type='text' 
          placeholder='ID' 
          className='user-input' 
          value={chocolate.id}
          onChange={(e) => setChocolate({ ...chocolate, id: e.target.value })} 
        />
        <input 
          type='text' 
          placeholder='Name' 
          className='user-input' 
          value={chocolate.name}
          onChange={(e) => setChocolate({ ...chocolate, name: e.target.value })} 
        />
        <input 
          type='text' 
          placeholder='Description' 
          className='user-input' 
          value={chocolate.description}
          onChange={(e) => setChocolate({ ...chocolate, description: e.target.value })} 
        />
        <input 
          type='number' 
          placeholder='Price' 
          className='user-input' 
          value={chocolate.price}
          onChange={(e) => setChocolate({ ...chocolate, price: e.target.value })} 
        />
      </div>

      <center>
        <button 
          type='button' 
          className='chocolate-add-btn' 
          onClick={addChocolate}
        > 
          Add Chocolate
        </button>
      </center>

      <Link to={"/"}>
        <img src={Homeimg} className='Home-img-addpage' alt='home-icon' />
      </Link>
      
      <Toaster />
    </div>
  );
}

export default AddChocolate;
