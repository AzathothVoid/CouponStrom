// Pagination.js
import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  forcePage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // +1 because react-paginate uses 0-based indexing
    onPageChange(selectedPage);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        forcePage={forcePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName="previous"
        nextClassName="next"
        breakClassName="break"
      />
    </div>
  );
};

export const AlphabeticalPaginator = ({ selectedLetter, onPageChange }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="container">
      <div className="alphabetical-paginator d-flex justify-content-center d-flex flex-wrap">
        {alphabet.split("").map((letter) => (
          <span
            key={letter}
            className={`${selectedLetter === letter ? "active" : ""} fs-5`}
            onClick={() => onPageChange(letter)}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
