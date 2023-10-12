import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import categorieData from "../Categories/categoriesData";

export default function SubCatPage() {
  const { categoryId, subCatId } = useParams();
  const subCatData = categorieData
    .find((category) => Number.parseInt(categoryId) === category.id)
    .subcats.find((subCat) => Number.parseInt(subCatId) === subCat.id);

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex  mt-4">
          <div className="me-4">
            <h2>{subCatData.name}</h2>
          </div>

          <div className="d-flex flex-column">
            <h2>Description</h2>
            <p className="mb-0">{subCatData.desc}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
