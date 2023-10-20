import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import categorieData from "../Categories/categoriesData";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const categoryData = categorieData.categories.find(
    (category) => Number.parseInt(categoryId) === category.id
  );

  const keywords = categoryData.keywords.map((keyword) => {
    return (
      <span className="col col-lg-3 px-0 bg-white  text-center fs-tags text-dark">
        {keyword}
      </span>
    );
  });

  return (
    <>
      <Header />
      <div className="container-fluid shadow-tb p-5 bg-primary-custom">
        <div className="row d-flex justify-content-center align-content-center">
          <div className="col-12 col-sm-8 col-md-9">
            <h1 className="h1 mb-2 fw-bolder">{categoryData.name}</h1>
            <p className="">{categoryData.description}</p>
          </div>
          <div className="col-12 col-sm-4 col-md-3">
            <div className="row gx-custom-7 gh-custom-7">
              <span className="fs-2 fw-bolder px-0">TAGS</span>
              {keywords}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
