import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "./headerData";

export default function Header() {
  const [currPage, setCurrPage] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);

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
            className={`btn-custom border-0 navbar-btn btn-p nav-btn nav-font ${
              currPage === navItem ? "text-primary-custom fw-bold" : null
            }`}
          >
            {navItem.toUpperCase()}
          </button>
        </Link>
      </li>
    );
  });

  const handleHamburger = (e) => {
    setSearchStatus(true);
    const collapsible = document.getElementById("hamToggle");

    collapsible.classList.toggle("show");
  };

  const handleSearchChange = () => {
    setSearchStatus(true);
  };

  const handleSearch = () => {};

  return (
    <header className="container-fluid px-0">
      <div className="position-relative row">
        <div className="col-12 px-0">
          <img width={"100%"} src="/nav-banner.jpg" alt="" />
        </div>
        <div className="col-12 py-3 shadow bg-white">
          <div className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a href="#" className="navbar-brand">
                <img className="w-100" src="/logo.svg" alt="" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleHamburger}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="hamToggle" className="navbar-collapse">
                <ul className={`navbar-nav m-auto mb-2 mb-lg-0`}>
                  {navElements}
                </ul>

                {!searchStatus ? (
                  <button
                    className="btn text-light btn-search-main"
                    type="submit"
                    onClick={handleSearchChange}
                  >
                    Search
                  </button>
                ) : (
                  <div className="d-flex">
                    <input
                      id="searchbar"
                      className="form-control text-dark"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      autoFocus
                    />
                    <button
                      class="btn bg-primary-custom btn-search-secondary text-white"
                      type="button"
                      onClick={handleSearch}
                    >
                      <i class="bi-search"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
