import React from "react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AlphabeticalPaginator } from "../../utils/Paginate";
import storeData from "./storeData";

export default function Stores() {
  const [currLetter, setLetter] = useState("A");
  const [stores, setStores] = useState(storeData);

  const filterStores = stores.filter((store) =>
    store.name.startsWith(currLetter)
  );

  const storeElements = filterStores.map((store) => <div>{store.name}</div>);

  const handlePageChange = (letter) => {
    setLetter(letter);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <AlphabeticalPaginator
            selectedLetter={currLetter}
            onPageChange={handlePageChange}
          />
          {storeElements}
        </div>
      </main>
      <Footer />
    </>
  );
}
