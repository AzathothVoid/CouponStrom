import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/OldHeader";
import Footer from "../../components/Footer/Footer";
import { AlphabeticalPaginator, Pagination } from "../../utils/Paginate";
import storeData from "./storeData";
import TopStores from "../../components/Sections/TopStores/TopStoresSection";

export default function Stores() {
  const [currLetter, setLetter] = useState("A");
  const [currPage, setCurrPage] = useState(1);
  const [stores, setStores] = useState(storeData);

  // filtering stores based on first letter
  console.log("Store data", storeData);
  var filterStores;
  if (currLetter.length === 1) {
    filterStores = stores.filter((store) => store.name.startsWith(currLetter));
  } else {
    filterStores = stores.filter((store) =>
      /^[^a-zA-Z\s]/.test(store.name.charAt(0))
    );
  }

  //variables for creating paginator for each Alphabetical category
  const itemsPerPage = 24;
  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const storesToShow = filterStores.slice(startIndex, endIndex);

  //handler functions for pagination change
  const handleLetterChange = (letter) => {
    setLetter(letter);
    setCurrPage(1);
  };

  // For automatically lowering page number for alphabet categories with lower no of pages
  //   if (currPage > Math.ceil(filterStores.length / itemsPerPage)) {
  //     handlePageChange(Math.ceil(filterStores.length / itemsPerPage));
  //   }

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  // updating store data state whenever storeData.jsx files gets updated
  useEffect(() => {
    setStores(storeData);
  }, [storeData]);

  const storeElements = storesToShow.map((store) => (
    <div className="justify-self-center col-lg-3 col-md-4 col-sm-6 text-center col-xs-6 mb-3">
      <Link to={`/stores/${store.id}`} key={store.id}>
        <img className="m-2" width={"100x"} src={store.img} alt="" />
        {store.name}
      </Link>
    </div>
  ));

  return (
    <>
      <Header />
      <main>
        <div className="container bg-white rounded  my-5 py-4">
          <h1 className="text-center mb-5 mt-3">Stores</h1>
          <div className="container mb-5 border-bottom border-top">
            <AlphabeticalPaginator
              selectedLetter={currLetter}
              onPageChange={handleLetterChange}
            />
          </div>
          <div style={{ minHeight: "60vh" }} className="container row mt-5">
            {storeElements}
          </div>
          <Pagination
            totalItems={filterStores.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            forcePage={currPage - 1}
          />
        </div>

        <div className="my-3 ">
          <TopStores />
        </div>
      </main>
      <Footer />
    </>
  );
}
