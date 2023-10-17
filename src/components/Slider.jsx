import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/js/dist/carousel";

const logosAndNames = [
  {
    id: 1,
    name: "Company A",
    logoUrl: "/booking-com.webp",
  },
  {
    id: 2,
    name: "Company B",
    logoUrl: "/samsung.webp",
  },
  {
    id: 3,
    name: "Company C",
    logoUrl: "/spooky.png",
  },
  {
    id: 4,
    name: "Company D",
    logoUrl: "/Hardees-logo.png",
  },
  {
    id: 5,
    name: "Company E",
    logoUrl: "/Hardees-logo.png",
  },
  // Add more companies here
];

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderElements = logosAndNames.map((logo, index) => {
    return (
      <div className={`card carousel-item ${index === 0 ? "active" : null}`}>
        <img style={{ width: "100%" }} src={`${logo.logoUrl}`} alt="" />
      </div>
    );
  });

  const indicatorElements = logosAndNames.map((logo, index) => {
    return (
      <button
        type="button"
        data-bs-target="#simpleSlider"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : null}
        aria-label={`Slide ${index + 1}`}
      ></button>
    );
  });

  return (
    <div
      id="simpleSlider"
      className="carousel slide carousel-dark"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">{indicatorElements}</div>
      <div className="carousel-inner" role="listbox">
        {sliderElements}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#simpleSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#simpleSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
