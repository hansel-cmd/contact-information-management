import { useEffect, useState } from "react";
import { sendGETRequest } from "../services/service";

export const useFetchContacts = ({
  query,
  changes,
  isFavorite = false,
  isBlocked = false,
  isEmergency = false,
}) => {
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
      let queryParams = `&limit=${pageSize}&page=${currentPage}`;
      if (isFavorite) {
        queryParams += `&isFavorite=${1}`;
      }

      if (isBlocked) {
        queryParams += `&isBlocked=${1}`;
      }

      if (isEmergency) {
        queryParams += `&isEmergency=${1}`;
      }

      try {
        const response = await sendGETRequest(
          `/search-contacts/?q=${encodeURIComponent(query)}${queryParams}`
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
  }, [
    pageSize,
    currentPage,
    data.count,
    query,
    changes,
    isFavorite,
    isBlocked,
    isEmergency
  ]);

  return {
    currentPage,
    pageSize,
    data,
    handlePageSizeSelect,
    handlePageChange,
    setData,
  };
};
