import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="brand hide">
        <img className="brand-img" src="vite.svg" alt="" />
        <a className="brand-name">couponstrom</a>
      </div>

      <div className="searchbar">
        <input
          id="searchbar"
          className="form-control mr-sm-2"
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
