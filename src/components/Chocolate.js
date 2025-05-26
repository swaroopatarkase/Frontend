import React from 'react';
import './Chocolate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Chocolate({ id, name, description, price }) {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  const deleteChocolate = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      console.log('Delete Response:', response.data);
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting chocolate:', error);
    }
  };

  return (
    <div
      onClick={() => {
        navigate(`/detail/${id}`);
      }}
    >
      <div className="chocolate-card">
        <div className="chocolate-details">
          <span className="chocolate-id">{id}</span>
          <span className="chocolate-name"> {name}</span>
          <div>
            <span className="chocolate-description">Description: {description}</span><br/>
            {price !== undefined && (
              <span className="chocolate-price">Price: ${price}</span>
            )}
          </div>

          <button
            type="button"
            className="Delete-btn"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              deleteChocolate(id);
              console.log(`Delete ${name}`);
            }}
          >
            Delete
          </button>

          <button
            type="button"
            className="Edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/update/${id}`);
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
