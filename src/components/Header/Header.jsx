import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navData } from "./headerData";
import stores from "../../pages/Stores/storeData";

export default function Header() {
  const [currPage, setCurrPage] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [storeData, setStoreData] = useState(stores);
  const [searchTerm, setSearchTerm] = useState("");

  const searchedStores = storeData
    .filter((store) => {
      return store.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .slice(0, 10);

  useEffect(() => {
    const drop = window.addEventListener("resize", lookForSmall);

    return () => drop;
  }, []);

  const lookForSmall = (event) => {
    setSearchTerm("");
  };

  const searchedStoresElements = searchedStores.map((store) => {
    return (
      <Link to={`/stores/${store.id}`}>
        <li className="my-1 border-bottom row flex-nowrap">
          <div className="col-3 col-md-1">
            <img className="w-100" src={store.img} alt="" />
          </div>
          <button
            className={`btn-custom col-9 col-md-11 border-0 navbar-btn btn-p nav-btn nav-font text-start search-hover w-100`}
          >
            {store.name}
          </button>
        </li>
      </Link>
    );
  });

  const currStatus = window.location.pathname;

  useEffect(() => {
    setStoreData(storeData);
  }, [storeData]);

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
            className={`btn-custom text-white border-0 fs-5 navbar-btn rounded btn-p nav-btn nav-font ${
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

  const handleSearching = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="container-fluid px-0">
      <div className="position-relative row">
        <div className="col-12 px-0 ">
          <img width={"100%"} src="/nav-banner.jpg" alt="" />
        </div>
        <div className="col-12 py-3 shadow bg-footer-custom">
          <div className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a href="#" className="navbar-brand">
                <img className="w-100" src="/logo.svg" alt="" />
              </a>
              <button
                className="navbar-toggler bg-white"
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
                    className="btn text-light btn-search-main fw-bold "
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
                      value={searchTerm}
                      onChange={handleSearching}
                      autoComplete="false"
                      aria-label="Search"
                      autoFocus
                    />
                    <button
                      class="btn bg-primary-custom btn-search-secondary text-white"
                      type="button"
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
      {searchTerm ? (
        <div className="container border mt-3 rounded">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 overflow-hidden">
            {searchedStoresElements}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
