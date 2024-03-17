import React from "react";
import './Hero.css'
import hero_image from '../Assets/Hero/heroImage1.jpeg'
import arrow_icon from '../Assets/arrow.png'


const Hero = () =>{
    return (
        <div className="hero">
            <div className="hero-left">

                <h2>NEW ARRIVALS ONLY</h2>

                <div>
                  
                    <p>Where Sneaker</p>
                    <p>Dreams,</p>
                    <p>Meet Price Reality!</p>
                </div>

                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt=""/>
                </div>


            </div>

            <div className="hero-right">
                <img src={hero_image} alt=""/>
            
            </div> 
            
        </div>
    )









}
export default Hero