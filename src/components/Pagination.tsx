import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../../src/styles/components/pagination.scss";

const Paging = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (page: any) => {
    setPage(page);
    console.log(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={6}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
