import { useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  // Convert non-array data to an array (if needed)
  const dataArray = Array.isArray(data) ? data : [];

  // Ensure maxPage is at least 1 to handle empty data
  const maxPage = Math.max(1, Math.ceil(dataArray.length / itemsPerPage));

  function currentData() {
    if (dataArray.length === 0) return [];

    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;

    return dataArray.slice(begin, end);
  }

  function nextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  }

  function prevPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function jumpToPage(page) {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  }

  return { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage };
}

export default usePagination;
