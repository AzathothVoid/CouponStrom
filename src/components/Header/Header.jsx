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
            className={`btn navbar-btn btn-p nav-btn nav-font ${
              currPage === navItem ? "text-primary" : null
            }`}
          >
            {navItem.toUpperCase()}
          </button>
        </Link>
      </li>
    );
  });

  return (
    <header>
      <div className="position-relative">
        <div className="row">
          <img width={"100%"} src="/nav-bg.jpeg" alt="" />
        </div>
        <div className="row d-flex">
          <div className="col-lg-4"></div>
          <div className="container navbar col-lg-8 d-flex flex-md-row-reverse">
            <ul className="nav nav-spacing list">{navElements}</ul>
            <div className="searchbar">
              <input
                id="searchbar"
                className="form-control mr-sm-2 text-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
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
