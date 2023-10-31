import React from "react";
import { Link } from "react-router-dom";
import { useDataState } from "../../Data/DataContext";
import StoreCard from "../../Cards/StoreCard";

export default function TopStoresSection() {
  const useData = useDataState();
  const storesData = useData.stores;
  const total = 10;

  const sortedData = storesData.sort(
    (item1, item2) => item2.likes - item1.likes
  );

  const filteredData = sortedData.slice(0, total);

  const storesElement = filteredData.map((store, index) => {
    const storeElement = (
      <Link to={`/stores/${store.id}`} key={store.id}>
        <div key={store.id} className="">
          <StoreCard data={store} />
        </div>
      </Link>
    );

    return storeElement;
  });

  return (
    <section id="topStoresSection" className="container top-stores ">
      <h2 className="mb-3 ms-1 text-center text-primary-custom">Top Stores</h2>

      <div className="d-flex flex-xs-column flex-md-row justify-content-center flex-wrap gap-2">
        {storesElement}
      </div>
    </section>
  );
}
