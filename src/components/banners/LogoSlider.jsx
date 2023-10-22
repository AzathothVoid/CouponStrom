import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = (props) => {
  const [settings, setSettings] = useState(props.settings);
  const { data } = props;

  useEffect(() => {
    const dispatch = window.addEventListener("resize", sizeListener);

    return () => dispatch;
  }, []);

  const sizeListener = (e) => {
    if (window.innerWidth <= 768) {
      setSettings((prev) => {
        return { ...prev, arrows: false };
      });
    } else {
      setSettings(defaultSettings);
    }
  };
  return (
    <div className="container">
      <div className="slider-container">
        <div className="centered-content">
          <Slider {...settings}>{data}</Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
