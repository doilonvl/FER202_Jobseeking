import React from "react";
import "../Styles/Home.css"
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <p className="banner-text-small">
        WE WELCOME HEARING FROM PASSIONATE CANDIDATES
        </p>
        <h1 className="banner-text-large">
          Recruiting <br />
          talent management
        </h1>
        <p className="content">
          With Job Portal you can experience new job and <br />
         find the job that best suits you
        </p>
        <Link to="/destination">
        <button className="destination-button">
          Our Services
          <span className="destination-button-arrow"><img src="/img/Continue.png" alt="arrow" style={{ width: '24px', height: '24px' }} /></span>
        </button>
        </Link> 
        <Link to="/gallery">
        <button className="gallery-button">
        <span className="gallery-button-play"><img src="/img/play.png" alt="play" style={{ width: '24px', height: '24px' }} /></span>
          Our Gallery
        </button>
        </Link>
      </div>
      <div className="banner-image">
        <img src="/img/Designer.png" alt="Banner" style={{marginLeft:"10%", marginTop:"20%"}}/>
      </div>
    </div>
  );
};

export default Banner;
