import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((pageNum) => (
        <button
          key={pageNum}
          className={`px-4 py-2 rounded ${
            currentPage === pageNum + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handlePageClick(pageNum + 1)}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
