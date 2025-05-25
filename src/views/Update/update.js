import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./update.css";
import Homeimg from "./../../assets/home-access_17252932.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function UpdateChocolate() { 
  const { id } = useParams();
  const navigate = useNavigate();
  const [chocolate, setChocolate] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });
  

  async function loadChocolateDetails(id) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/chocolates/${id}`);
      const data = response.data.data;
      setChocolate({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price || "",
      });
    } catch (error) {
      console.error("Error fetching chocolate details:", error);
      toast.error("Error fetching details");
    }
  }

  useEffect(() => {
    loadChocolateDetails(id);
  }, [id]);

  const updateChocolate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', chocolate.id);
      formData.append('name', chocolate.name);
      formData.append('description', chocolate.description);
      formData.append('price', chocolate.price);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/chocolates/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response?.data?.message || "Chocolate updated successfully!");
      navigate("/"); 

    } catch (error) {
      console.error("Error updating chocolate:", error);
      toast.error(error?.response?.data?.message || "Error updating chocolate");
    }
  };

  return (
    <div>
      <h1 className='add-page-heading'> Update Chocolate</h1>

      <div className='chocolate-form'>
        <input type='text' placeholder='ID' className='user-input' value={chocolate.id} disabled />
        <input type='text' placeholder='Name' className='user-input' value={chocolate.name}
          onChange={(e) => setChocolate({...chocolate, name: e.target.value })} />
        <input type='text' placeholder='Description' className='user-input' value={chocolate.description}
          onChange={(e) => setChocolate({...chocolate, description: e.target.value })} />
        <input type='number' placeholder='Price' className='user-input' value={chocolate.price}
          onChange={(e) => setChocolate({...chocolate, price: e.target.value })} />
      </div>
      <button type='button' className='chocolate-add-btn' onClick={updateChocolate}>
        Update Chocolate
      </button>
      <Link to={"/"}>
        <img src={Homeimg} className='Home-img-addpage' alt='home-icon' />
      </Link>
      <Toaster />
    </div>
  );
}

export default UpdateChocolate;