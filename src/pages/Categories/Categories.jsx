import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import categoriesData from "./categoriesData";
import { AlphabeticalPaginator } from "../../utils/Paginate";

export default function Categories() {
  const [categories, setCategories] = useState(categoriesData.categories);
  const [currLetter, setLetter] = useState("A");

  var filterCategories;
  if (currLetter.length === 1) {
    filterCategories = categories.filter((category) =>
      category.name.startsWith(currLetter)
    );
  } else {
    filterCategories = categories.filter((category) =>
      /^[^a-zA-Z\s]/.test(category.name.charAt(0))
    );
  }

  // Generating category elements
  const categoryElements = filterCategories.map((category) => {
    return (
      <div
        key={category.id}
        className="col-lg-3 col-md-4 col-sm-6 text-sm-center mb-3"
      >
        <Link to={`/categories/${category.id}`}>
          <h3 className="border-bottom mb-2">{category.name}</h3>
        </Link>
        <ul className="list list-group">
          {category.subcategories.map((subCat) => {
            return (
              <Link
                key={subCat.id}
                to={`/categories/${category.id}/${subCat.id}`}
              >
                <li className="mb-2">{subCat.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  });

  const handleLetterChange = (letter) => {
    setLetter(letter);
    setCurrPage(1);
  };

  useEffect(() => {
    setCategories(categoriesData.categories);
  }, [categoriesData]);

  return (
    <>
      <Header />
      <div className="container bg-white rounded my-5 py-4">
        <h1 className="text-center mb-5 mt-3">Categories</h1>
        <div className="container mb-5 border-bottom border-top">
          <AlphabeticalPaginator
            selectedLetter={currLetter}
            onPageChange={handleLetterChange}
          />
        </div>
        <div className="container row">{categoryElements}</div>
      </div>
      <Footer />
    </>
  );
}
