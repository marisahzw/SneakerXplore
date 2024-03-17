import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


const UnreleasedSneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnreleasedSneakers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/unreleased-sneakers?page=${page}`);
        setSneakers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching unreleased sneakers:', error);
        setLoading(false);
      }
    };

    fetchUnreleasedSneakers();
  }, [page]);

  // Grouping sneakers by release date
  const groupedSneakers = sneakers.reduce((acc, sneaker) => {
    const releaseDate = sneaker.release_date_formatted;
    if (!acc[releaseDate]) {
      acc[releaseDate] = [];
    }
    acc[releaseDate].push(sneaker);
    return acc;
  }, {});

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderSneakers = () => {
    return Object.keys(groupedSneakers).map(date => (
      <div key={date}>
        <h2 className='sneaker-date'>{date}</h2>
        <div className='unreleased'>
          {groupedSneakers[date].map(sneaker => (
            <div className='sneakerCard-calendar' key={sneaker.id}>
              <hr/>
              <div className='name-image'>
                <Link to={`/sneaker/${sneaker.slug}/${sneaker.id}`}>
                  <h4>{sneaker.name}</h4>
                  <div className='image-card-calendar'>
                    <img src={sneaker.image_url} alt={sneaker.name} />
                  </div>
                </Link>
              </div>
              <p>{sneaker.release_date_from_now}</p>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    return (
      <div className='pagination-cal'>
        <button className='prev-button' onClick={handlePrevPage} disabled={page === 1}>&laquo; </button>
        <button className='next-button' onClick={handleNextPage}>&raquo; </button>
      </div>
    );
  };

  return (
    <div className='container-calendar'>
      <h1 className='cal-releases'>Releases</h1>
      {loading ? <div>Loading...</div> : renderSneakers()}
      {renderPagination()}
    </div>
  );
};

export default UnreleasedSneakers;
