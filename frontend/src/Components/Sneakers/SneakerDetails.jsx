import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import anime from 'animejs';


const SneakerDetail = () => {
  const { slug, id } = useParams(); // Extracting slug and id from URL params
  const [sneaker, setSneaker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchSneakerDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/sneaker/${slug}/${id}`);
        setSneaker(response.data.pageProps.item); 
        fetchExchangeRate(); 
      } catch (error) {
        console.error('Error fetching sneaker details:', error);
        setError('Error fetching sneaker details. Please try again later.');
      }
      setLoading(false);
    };

    const fetchExchangeRate = async () => {
      try {
        const exchangeResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(exchangeResponse.data.rates.CAD);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchSneakerDetails();
  }, [slug, id]);

  useEffect(() => {
    setTimeout(() => {
      const textWrapper = document.querySelector('.m12',);
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
        const animation = anime.timeline({loop: true})
          .add({
            targets: '.m12 .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70*i
          }).add({
            targets: '.m12',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
          });
  
        return () => animation.pause();
      }
    }, 100);
  }, [sneaker]);
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!sneaker) {
    return <div>Sneaker not found!</div>;
  }

  // Function to replace NL domain with Canada domain
  const replaceNLwithCanada = (deeplink) => {
    return deeplink.replace('www.nike.com/gb', 'www.nike.com/ca');
  };

  // Function to convert shoe sizes to US normal sizes
  const convertToUSSizes = (sizes) => {
    const usSizes = [];
    sizes.forEach((size) => {
      // Conversion logic based on your provided conversion
      const usSize = size * 0.1;
      usSizes.push(usSize);
    });
    return usSizes;
  };

  return (
    <div>

    
    <h1 className='m12'>{sneaker.name}</h1>
    <div className='container'>
       
      <div className='Details-card'>
      <div className='img-card'>
        <img src={sneaker.image_url} alt={sneaker.name} onError={(e) => e.target.src = '/placeholder.jpg'} />
      
        
      </div>

  
      <h2> Sneaker Details</h2>
      <div className='sneakerdetails-card'>
        <div className='details'>Stylecode: {sneaker.stylecode}</div>
        <hr />
        <div className='details'> Brand: {sneaker.brand}</div>
        <hr />
        <div className='details'>Model: {sneaker.model}</div>
        <hr />
        <div className='details'>Colorway: {sneaker.colorway}</div>
        <hr />
        <div className='details'>Color: {sneaker.color_slug}</div>
        <hr />
        <div className='details'>Audience: {sneaker.audience_slug && Array.isArray(sneaker.audience_slug) ? sneaker.audience_slug.join(', ') : 'Not specified'}</div>

        <hr />
        <div className='details'>Released: {sneaker.release_date_formatted}</div>
        <hr />
        <div className='details'>Rating: {sneaker.rating}</div>
      
      </div>
   
        <br />
      <div><div className='desc' dangerouslySetInnerHTML={{ __html: sneaker.description.en }} /></div>
      </div>
<div className='wheretobuy'>
      <h2>Where to Buy</h2>
      <div className='marketplace'>
        {sneaker.links.map((link, index) => (
          <div key={index}>
            <div className='name-header'>
               <img src={link.image_url} alt={sneaker.name} onError={(e) => e.target.src = '/placeholder.jpg'} />
               <h3>{link.shop}</h3>
            </div>

            
            <p>Price: ${link.prices.usd} (USD)</p>
            {exchangeRate && <p>Price in CAD: ${(link.prices.usd * exchangeRate).toFixed(2)}</p>}
            <p>Sizes Available </p>
            <p>{convertToUSSizes(link.sizes.us).join(' ')}  <a href={replaceNLwithCanada(link.deeplink)} target="_blank" rel="noopener noreferrer">View</a></p>

            
          </div>
        ))}
      </div>
      </div>
    </div>
    </div>
  );
};

export default SneakerDetail;
