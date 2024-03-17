import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const SneakerList = () => {
  const [sneakers, setSneakers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSneakers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/sneakers?page=${pageNumber}`);
      setSneakers(response.data);
      setPage(pageNumber);
      window.scrollTo(0, 0); 
    } catch (error) {
      console.error("Error fetching sneakers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSneakers(page);
  }, [page]);

  const handleNextPage = () => {
    fetchSneakers(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchSneakers(page - 1);
    }
  };

  const renderPagination = () => {
    return (
      <div className="center">
        <div className="pagination">
          <button className="prev-button" onClick={handlePrevPage} disabled={page === 1}>&laquo;</button>
          <button className="next-button" onClick={handleNextPage}>&raquo;</button>
        </div>
      </div>
    );
  };

  const convertToCAD = (usdPrice) => {
    // Conversion rate from USD to CAD
    const conversionRate = 1.27; 
    return (usdPrice * conversionRate).toFixed(2); 
  };

  return (
    <div>
      <h1>Sneakers</h1>
      
      <div className="container">
        <div className="sneaker-list">
          {sneakers.map((sneaker) => (
            <Link to={`/sneaker/${sneaker.id}`} key={sneaker.id} className="sneaker-card">
              <img src={sneaker.image_url} alt={sneaker.name} onError={(e) => e.target.src = '/placeholder.jpg'} />
              <div className="sneakerPrice">CA${convertToCAD(sneaker.links[0].prices.usd)}</div>
              <div className="sneakerName">{sneaker.name}</div>
            </Link>
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </div>

      {renderPagination()}
    </div>
  );
};

export default SneakerList;
