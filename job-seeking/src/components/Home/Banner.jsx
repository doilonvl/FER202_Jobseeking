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
        <Link to="/job">
        <button className="destination-button">
          Apply Job Now
          <span className="destination-button-arrow"><img src="/img/Continue.png" alt="arrow" style={{ width: '24px', height: '24px' }} /></span>
        </button>
        </Link> 
        <Link to="/addCv">
        <button className="gallery-button">
        <span className="gallery-button-play"><img src="/img/play.png" alt="play" style={{ width: '24px', height: '24px' }} /></span>
          Create CV for better job
        </button>
        </Link>
      </div>
      <div className="banner-image">
        <img src="/img/Traveller1.png" alt="Banner"/>
      </div>
    </div>
  );
};

export default Banner;
