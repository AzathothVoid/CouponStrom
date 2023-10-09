import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const defaultSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Number of logos to show at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // Set the time in milliseconds between each scroll
  centerMode: false, // Change to true if you want the logos to be centered
  variableWidth: false, // Change to true if you want logos to have variable width
};

const SliderComponent = () => {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <div className="container cust-container">
      <div className="slider-container">
        <div className="centered-content">
          <Slider {...settings}>
            {logosAndNames.map((item) => (
              <div key={item.id} className="slider-item">
                <img width={"100%"} src={item.logoUrl} alt={item.name} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
