import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/js/dist/carousel";
import { useDataState } from "./Data/DataContext";

export default function SimpleSlider(props) {
  const useData = useDataState();
  const data = useData.ads;

  const sliderElements = data.map((item, index) => {
    return (
      <div
        style={{ height: "500px" }}
        className={`card carousel-item ${index === 0 ? "active" : null}`}
      >
        <img
          style={{ minHeight: "100%" }}
          className="w-100"
          src={item.images[0].image}
          alt=""
        />
      </div>
    );
  });

  const indicatorElements = data.map((item, index) => {
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
      <div className="carousel-indicators d-none d-md-flex">
        {indicatorElements}
      </div>
      <div className="carousel-inner" role="listbox">
        {sliderElements}
      </div>
      <button
        className="carousel-control-prev d-none d-md-block"
        type="button"
        data-bs-target="#simpleSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next d-none d-md-block"
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
