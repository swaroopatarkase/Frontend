import React, { useEffect, useState } from 'react';
import "./details.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const [chocolate, setChocolate] = useState({}); 
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);      

  const loadChocolateDetails = async (id) => { 
    setLoading(true); 
    setError(null);   

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`); 
      setChocolate(response.data.data); 
    } catch (err) {
      setError(err.message || "Error fetching details"); 
      console.error("Error details:", err); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadChocolateDetails(id); 
  }, [id]);

  if (loading) {
    return <div className="loading">Loading details...</div>; 
  }

  if (error) {
    return <div className="error">Error: {error}</div>; 
  }

  if (!chocolate) { 
      return <div className="not-found">Chocolate not found.</div>;
  }

  return (
    <div className='detailpage-body'>
      <h1 className='detail-page'> Chocolate Details</h1>
      <div className='detail-page-info'>
        <h2> ID: {chocolate.id}</h2> 
        <h2> Name: {chocolate.name}</h2>
        <h2> Description: {chocolate.description}</h2>
        {chocolate.price && <h2>Price: {chocolate.price}</h2>} 
      </div>

    </div>
  );
}

export default Detail;