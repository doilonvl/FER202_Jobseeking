import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import Banner from "./Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const airlineImages = [
    "/img/image-27.png",
    "/img/image-28.png",
    "/img/image-29.png",
    "/img/image-30.png",
    "/img/image-31.png",
  ];
  
  const services = [
    {
      title: "Affordable Prices",
      description: "We provide some very affordable prices compared to others.",
      icon: "/img/wallet.png",
    },
    {
      title: "Unforgettable Experience",
      description:
        "We provide a vacation experience that will be unforgettable.",
      icon: "/img/user.png",
    },
    {
      title: "Very Friendly Service",
      description:
        "We will provide excellent and friendly service for the sake of our customers.",
      icon: "/img/heart.png",
    },
  ];

  return (
    <div>
      <Banner />
      <div className="home">
        <div className="left-side">
          <h1>
            Get Experience <br />
            Which are professional
          </h1>
          <p>Consulting market search</p>
          <img src="/img/explore.svg" alt="Experience" />
        </div>
        <div className="right-side">
          {services.map((service, index) => (
            <div className="icon-text-container" key={index}>
              <div className="icon-container">
                <img src={service.icon} alt={service.title} />
              </div>
              <div className="text-container">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home">
        <button
          className="airline-button"
          style={{ backgroundImage: 'url("/img/image-27.png")' }}
        ></button>
        <button
          className="airline-button"
          style={{ backgroundImage: 'url("/img/image-28.png")' }}
        ></button>
        <button
          className="airline-button"
          style={{ backgroundImage: 'url("/img/image-29.png")' }}
        ></button>
        <button
          className="airline-button"
          style={{ backgroundImage: 'url("/img/image-30.png")' }}
        ></button>
        <button
          className="airline-button"
          style={{ backgroundImage: 'url("/img/image-31.png")' }}
        ></button>
      </div>

      <div className="home">
        <div className="left-side">
          <h1 style={{ width: "332px" }}>
            Destinations <br />
            Most Popular
          </h1>
        </div>
        <div className="mid-content">
          Some of the most popular destinations for <br />
          you visit with a view the beautiful one.
        </div>
        <div className="circle-button">
          <button className="circle-button-white">
            <img src="/img/arrowleft.png" alt="arrow" />
          </button>
        </div>
        <div className="circle-button" style={{ marginLeft: "12px" }}>
          <button className="circle-button-black">
            <img src="/img/arrowright.png" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
