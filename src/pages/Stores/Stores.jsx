import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AlphabeticalPaginator, Pagination } from "../../utils/Paginate";
import storeData from "./storeData";

export default function Stores() {
  const [currLetter, setLetter] = useState("A");
  const [currPage, setCurrPage] = useState(1);
  const [stores, setStores] = useState(storeData);

  const letterCode = currLetter.charCodeAt(0);

  // filtering stores based on first letter
  const filterStores = stores.filter((store) =>
    store.name.startsWith(currLetter)
  );

  //variables for creating paginator for each Alphabetical category
  const itemsPerPage = 24;
  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const storesToShow = filterStores.slice(startIndex, endIndex);

  // updating store data state whenever storeData.jsx files gets updated
  useEffect(() => {
    setStores(storeData);
  }, [storeData]);

  const storeElements = storesToShow.map((store) => (
    <div className="col-lg-3 col-md-4 col-sm-6 text-center col-xs-6 mb-3">
      <a href="">{store.name}</a>
    </div>
  ));

  const handleLetterChange = (letter) => {
    setLetter(letter);
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mb-5">
          <div className="border-bottom">
            <AlphabeticalPaginator
              selectedLetter={currLetter}
              onPageChange={handleLetterChange}
            />
          </div>
          <div style={{ minHeight: "50vh" }} className="container row mt-5">
            {storeElements}
          </div>
          <Pagination
            totalItems={filterStores.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
