import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopStoresData from "./TopStoresData";
import Card from "../../Cards/Card";

const defaultSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Number of logos to show at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // Set the time in milliseconds between each scroll
  centerMode: false, // Change to true if you want the logos to be centered
  variableWidth: false, // Change to true if you want logos to have variable width
};

export default function TopStoresSection() {
  const [settings, setSettings] = useState(defaultSettings);

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

  const storesElement = TopStoresData.map((store, index) => {
    return (
      <div className={`item ${index === 0 ? "active" : null}`}>
        <div className="col-xs-4">
          <Card
            type={store.type}
            title={store.title}
            likes={store.likes}
            image={store.image}
          />
        </div>
      </div>
    );
  });

  return (
    <section className="container">
      <div class="row">
        <div class="col-md-12">
          <div class="carousel slide multi-item-carousel" id="theCarousel">
            <div class="carousel-inner">
            {storesElement}``
              <a
                class="left carousel-control"
                href="#theCarousel"
                data-slide="prev"
              >
                <i class="glyphicon glyphicon-chevron-left"></i>
              </a>
              <a
                class="right carousel-control"
                href="#theCarousel"
                data-slide="next"
              >
                <i class="glyphicon glyphicon-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
