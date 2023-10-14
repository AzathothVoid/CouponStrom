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
        activeClassName={"active-custom"}
        previousClassName="previous"
        nextClassName="next"
        breakClassName="break"
      />
    </div>
  );
};

export const AlphabeticalPaginator = ({ selectedLetter, onPageChange }) => {
  const alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0-9";

  return (
    <div className="container">
      <div className="alphabetical-paginator d-flex justify-content-center d-flex flex-wrap">
        {alphabet.split(" ").map((letter) =>
          letter === " " ? null : (
            <span
              key={letter}
              className={`${
                selectedLetter === letter ? "active-custom" : ""
              } fs-5`}
              onClick={() => onPageChange(letter)}
            >
              {letter}
            </span>
          )
        )}
      </div>
    </div>
  );
};
