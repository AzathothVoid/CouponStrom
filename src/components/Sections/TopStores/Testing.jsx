import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopStoresData from "./TopStoresData";
import Card from "../../Cards/Card";

export default function TopStoresSection() {
  const total = 10;
  const max = 5;
  var toDisplay;

  if (TopStoresData.length % max === 0) {
    toDisplay = TopStoresData.length;
  } else {
    toDisplay = max * Math.floor(TopStoresData.length / max);
  }

  const filteredData = TopStoresData.slice(0, toDisplay);

  const storesElement = filteredData.map((store, index) => {
    return (
      <div key={store.id} className="">
        <Card
          type={store.type}
          title={store.title}
          likes={store.likes}
          image={store.image}
        />
      </div>
    );
  });

  return (
    <section className="container-fluid p-2 ms-1 mb-4 mt-4 top-stores">
      <div className="text-center">
        <h2 className="mb-3 text-primary-custom">Top Stores</h2>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {storesElement}
        </div>
      </div>
    </section>
  );
}
