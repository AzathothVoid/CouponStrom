import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "./headerData";

export default function Header() {
  const [currPage, setCurrPage] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [hamStatus, setHamStatus] = useState(false);
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
            className={`btn navbar-btn btn-p nav-btn nav-font ${
              currPage === navItem ? "text-primary-custom fw-bold" : null
            }`}
          >
            {navItem.toUpperCase()}
          </button>
        </Link>
      </li>
    );
  });

  const hamburgerElement = () => {
    return (
      <div class="d-block d-lg-none px-1">
        <div class="list">{navElements}</div>
      </div>
    );
  };

  const handleHamburger = () => {
    setHamStatus((prev) => !prev);
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
          <div className="container navbar row mw-100 px-3 flex-nowrap d-flex align-items-center">
            <div className="col-7 col-sm-5 col-md-3">
              <img src={"/logo.svg"} alt="" />
            </div>
            <button
              style={{ width: "fit-content" }}
              class="navbar-toggler d-block d-lg-none"
              type="button"
              onClick={handleHamburger}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="navbar col-9 row flex-nowrap d-none d-lg-flex justify-content-lg-end">
              <ul
                className={`nav nav-spacing list ${
                  searchStatus ? "col-7" : "col-8"
                } d-flex justify-content-center`}
              >
                {navElements}
              </ul>
              <div className={`searchbar ${searchStatus ? "col-5" : "col-4"}`}>
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
                      className="form-control input-search-custom mr-sm-2 text-dark"
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
          {hamStatus ? hamburgerElement() : null}
          <div className="d-flex flex-row-reverse position-absolute bottom-15 end-0"></div>
        </div>
      </div>
    </header>
  );
}
