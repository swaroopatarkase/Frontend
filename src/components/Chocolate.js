import React from 'react';
import "./Chocolate.css"; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chocolate({ id, name, description, imageUrl, price }) { 
  const navigate = useNavigate();

  const deleteChocolate = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/chocolates/${id}`); 
      console.log("Delete Response:", response.data); 
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting chocolate:", error); 
    }
  };

  return (
    <div onClick={() => {
      navigate(`/detail/${id}`); 
    }}>
      <div className='chocolate-card'> 
        <img src={imageUrl} alt={name} className="chocolate-image" /> 
        <div className='chocolate-details'>
        <span className='chocolate-id'>{id}</span> 
          <span className='chocolate-name'> {name}</span> 
          <div>
            <span className='chocolate-description'> Description: {description}</span> 
            <span className='chocolate-price'>Price: ${price}</span> 
          </div>
          <button
            type='btn'
            className='Delete-btn'
            onClick={(e) => {
              deleteChocolate(id);
              e.stopPropagation(); 
              console.log(`Delete ${name}`);
            }}
          >
            Delete
          </button>

          <button
            type='btn'
            className='Edit-btn'
            onClick={(e) => {
              navigate(`/update/${id}`);
              e.stopPropagation();
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chocolate;