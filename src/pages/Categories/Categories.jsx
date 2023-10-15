import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/OldHeader";
import Footer from "../../components/Footer/Footer";
import categoriesData from "./categoriesData";
import { AlphabeticalPaginator } from "../../utils/Paginate";
import SimpleSlider from "../../components/Slider";

export default function Categories() {
  const [categories, setCategories] = useState(categoriesData);
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
          <h3 className="border-bottom">{category.name}</h3>
        </Link>
        <ul className="list list-group">
          {category.subcats.map((subCat) => {
            return (
              <Link
                key={subCat.id}
                to={`/categories/${category.id}/${subCat.id}`}
              >
                <li>{subCat.name}</li>
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
    setCategories(categoriesData);
  }, [categoriesData]);

  return (
    <>
      <Header />
      <SimpleSlider />
      <div className="container">
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
