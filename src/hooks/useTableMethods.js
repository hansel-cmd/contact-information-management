import { useEffect, useState } from "react";

export const useTableMethods = ({
  data,
  dataIdsChecked,
  pageSize,
  currentPage,
  setDataIdsChecked,
  handleDelete,
  handlePageChange,
  openModalForSelected,
  closeModalForSelected
}) => {
    const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [areAllChecked, setAreAllChecked] = useState(false);
  const handleCheckAll = (e) => {
    setAreAllChecked(e.target.checked);
  };

  const handleSelectedOptions = (method) => {
    if (method === "delete") openModalForSelected();
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      if (dataIdsChecked.length === data.results.length - 1) {
        setAreAllChecked(true);
      }
      setDataIdsChecked((ids) => [...ids, Number(e.target.value)]);
    } else {
      const temp = dataIdsChecked.filter((id) => id !== Number(e.target.value));
      setDataIdsChecked([...temp]);
    }
  };

  const handleDeleteSelected = async () => {
    const countSelected = dataIdsChecked.length;

    try {
      setIsDeletingSelected(true);
      await Promise.allSettled(dataIdsChecked.map((id) => handleDelete(id)));

      // data.count is the count of the data before all the deletion
      const totalPages = Math.ceil(data.count / pageSize);
      // If we selected all the contacts in this page, and delete them,
      // and it is the last page, then we go back to the previous page
      if (countSelected === pageSize && totalPages === currentPage) {
        handlePageChange(currentPage - 1);
      }
    } catch (error) {
      console.log("error deleting all contacts", error);
    }

    setIsDeletingSelected(false);
    closeModalForSelected();
  };

  useEffect(() => {
    if (areAllChecked) {
      const ids = data.results.map((data) => data.id);
      setDataIdsChecked(ids);
    } else {
      setDataIdsChecked([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areAllChecked, data.results]);

  return {
    isDeletingSelected,
    areAllChecked,
    handleCheckBox,
    handleCheckAll,
    handleSelectedOptions,
    handleDeleteSelected,
  };
};
