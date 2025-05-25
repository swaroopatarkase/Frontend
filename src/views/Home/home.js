import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./home.css";
import Chocolate from "../../components/Chocolate"; 
import addChocolate from "./../../assets/add_8220596.png"; 
import { Link } from 'react-router-dom';

function App() {
  const [chocolates, setChocolates] = useState([]);

  const loadChocolates = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`); 
      console.log(response);
      setChocolates(response.data.data);
    } catch (error) {
      console.error("Error fetching chocolates:", error); 
      setChocolates([]);
    }
  };

  useEffect(() => {
    loadChocolates();
  }, []);

  return (
    <div>
      <h1 className='app-heading'> Chocolate World</h1> 
      <div className='chocolatecard-home'> 
        {chocolates.map((chocolate, index) => {
          const { id, name, description, price } = chocolate;
          return (
            <Chocolate
              key={id || index}
              id={id}
              name={name}
              description={description}
              price={price} 
            />
          );
        })}
      </div>
      {chocolates.length === 0 && (
        <h1 style={{ textAlign: 'center' }}>No chocolates found</h1>
      )}

      <Link to={"/add"}> <img src={addChocolate} className='icon-add-image' alt='add-icon' /></Link>
    </div>
  );
}

export default App;