import React from "react";
import { Link } from "react-router-dom";
import { navData } from "./headerData";

export default function Header(props) {
  const navElements = navData.map((navItem) => {
    return (
      <li>
        <Link to={`/${navItem.toLowerCase()}`}>
          <button
            className={`btn navbar-btn btn-p nav-btn nav-font ${
              props.currPage === navItem ? "text-primary" : null
            }`}
          >
            {navItem.toUpperCase()}
          </button>
        </Link>
      </li>
    );
  });

  return (
    <header className="header">
      <div className="brand hide">
        <img className="brand-img" src="vite.svg" alt="" />
        <a className="brand-name">couponstrom</a>
      </div>
      <nav className="navbar">
        <div className="container-fluid">
          <ul className="nav nav-spacing">{navElements}</ul>
        </div>
      </nav>
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
    </header>
  );
}
