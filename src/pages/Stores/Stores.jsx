import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { AlphabeticalPaginator, Pagination } from "../../utils/Paginate";
import TopStores from "../../components/Sections/TopStores/TopStoresSection";
import { useDataState } from "../../components/Data/DataContext";
import { Helmet } from "react-helmet";

export default function Stores() {
  const useData = useDataState();

  const [currLetter, setLetter] = useState("A");
  const [currPage, setCurrPage] = useState(1);
  const stores = useData.stores;

  // filtering stores based on first letter
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

  const keywords = stores.map((store) => {
    return store.name;
  });

  //handler functions for pagination change
  const handleLetterChange = (letter) => {
    setLetter(letter);
    setCurrPage(1);
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  const storeElements = storesToShow.map((store) => (
    <div
      key={store.id}
      className="justify-self-center col-lg-3 col-md-4 col-sm-6 text-center col-xs-6 mb-3"
    >
      <Link to={`/stores/${store.name}/${store.id}`} key={store.id}>
        <img
          style={{ maxWidth: "90px" }}
          className="m-2"
          width={"100x"}
          src={store.images[0].image}
          alt=""
        />
        {store.name}
      </Link>
    </div>
  ));

  return (
    <>
      <Helmet>
        <title>{`Browse All Stores-Coupons Strom`}</title>
        <meta
          name="description"
          content={`Browse through the wide variety of stores and choose the one you need. Get free discounted coupons and deals for your use! `}
        />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content={`Browse All Stores-Coupons Strom`} />
        <meta
          property="og:description"
          content={`Browse through the wide variety of stores and choose the one you need. Get free discounted coupons and deals for your use! `}
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${window.location.href}`} />
        <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
        <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
      </Helmet>
      <Header />
      <main>
        <div className="container bg-white rounded  my-4 py-4">
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
            // forcePage={currPage - 1}
          />
        </div>

        <div className="mb-5 ">
          <TopStores />
        </div>
      </main>
      <Footer />
    </>
  );
}
