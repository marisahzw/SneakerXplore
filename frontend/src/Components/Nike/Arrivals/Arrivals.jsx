import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Arrivals.css';

function Arrivals() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/nike-arrivals');
        setShoes(response.data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>New Arrivals From Nike</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="shoe-container">
        {shoes.length > 0 &&
          shoes.map((shoe, index) => (
            <div key={index} className="shoe-card">
              <a href={shoe.href} target="_blank" rel="noopener noreferrer">
                <img src={shoe.image} alt={shoe.title} />
              </a>
              <h2>{shoe.title}</h2>
              <p>{shoe.subtitle}</p>
              <p>{shoe.currency} {shoe.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Arrivals;
