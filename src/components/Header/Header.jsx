import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "./headerData";

export default function Header() {
  const [currPage, setCurrPage] = useState("");
  const currStatus = window.location.pathname;

  if (currStatus && !currPage) {
    setCurrPage(
      currStatus
        .slice(1, currStatus.length)
        .replace(/^[a-z]/, (match) => match.toUpperCase())
    );
  } else if (!currStatus && currPage) {
    setCurrPage("");
  }

  const navElements = navData.map((navItem) => {
    return (
      <li>
        <Link to={`/${navItem.toLowerCase()}`}>
          <button
            className={`btn navbar-btn btn-p nav-btn nav-font text-light ${
              currPage === navItem ? "text-primary-custom fw-bold" : null
            }`}
          >
            {navItem.toUpperCase()}
          </button>
        </Link>
      </li>
    );
  });

  return (
    <header className="container-fluid px-0">
      <div className="position-relative row">
        <div className="col-12">
          <img width={"100%"} src="/nav-banner.jpg" alt="" />
        </div>
        <div className="col-12 py-3 shadow bg-nav-custom">
          <div className="container navbar d-flex justify-content-between">
            <ul className="nav nav-spacing list ">{navElements}</ul>
            <div className="searchbar">
              <input
                id="searchbar"
                className="form-control mr-sm-2 text-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn bg-primary-custom search-rounded"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>

          <div className="d-flex flex-row-reverse position-absolute bottom-15 end-0"></div>
        </div>
      </div>
    </header>
  );
}
