import { useEffect, useState } from "react";
import { sendGETRequest } from "../services/service";

export const useFetchContacts = (query) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const handlePageSizeSelect = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await sendGETRequest(
          `/search-contacts/?q=${encodeURIComponent(
            query
          )}&limit=${pageSize}&page=${currentPage}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log("contacts error", err);
        if (err.response?.status === 404) {
          setCurrentPage(1);
        }
      }
    };
    getContacts();
  }, [pageSize, currentPage, data.count, query]);

  return {
    currentPage,
    pageSize,
    data,
    handlePageSizeSelect,
    handlePageChange,
    setData,
  }
};
