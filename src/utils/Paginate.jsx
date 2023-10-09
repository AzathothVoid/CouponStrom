// Pagination.js
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
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
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
