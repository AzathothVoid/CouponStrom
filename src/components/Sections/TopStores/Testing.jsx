import React from "react";
import { Link } from "react-router-dom";
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
    const storeElement = (
      <Link to={`/stores/${store.id}`} key={store.id}>
        <div key={store.id} className="">
          <Card
            type={store.type}
            title={store.title}
            likes={store.likes}
            image={store.image}
          />
        </div>
      </Link>
    );
    if ((index + 1) % max === 0) {
      return [<div></div>, storeElement];
    }
    return storeElement;
  });

  return (
    <section className="container-fluid p-2 ms-1 mb-4 mt-4 top-stores">
      <div className="">
        <div className="container">
          <h2 className="mb-3 ps-2 ms-1">Top Stores</h2>
        </div>
        <div className="d-flex flex-xs-column flex-md-row justify-content-center flex-wrap gap-3">
          {storesElement}
        </div>
      </div>
    </section>
  );
}
