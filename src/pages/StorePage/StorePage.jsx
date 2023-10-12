import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import storesData from "../../pages/Stores/storeData";

export default function StorePage(props) {
  const { storeId } = useParams();
  const storeData = storesData.find(
    (store) => store.id === Number.parseInt(storeId)
  );

  console.log("Store data: ", storeData);
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex  mt-4">
          <div className="me-4">
            <h2>{storeData.name}</h2>
            <img src={`/${storeData.img}`} alt="" />
          </div>

          <div className="d-flex flex-column">
            <h2>Description</h2>
            <p className="mb-0">{storeData.desc}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
