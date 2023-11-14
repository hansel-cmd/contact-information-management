import { useState } from "react";
import { TABLE_HEADERS } from "../constants/tableConstants";

export const useActionTab = () => {
  const [query, setQuery] = useState("");
  const [dataIdsChecked, setDataIdsChecked] = useState([]);
  const [availableTableColumns, setAvailableTableColumns] =
  useState(TABLE_HEADERS);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearQueryString = () => {
    setQuery("");
  };

  const handleTableColumnUpdate = (e) => {
    const updated = availableTableColumns.map((tableColumn) => {
      if (tableColumn.key === e.target.name) {
        return {
          ...tableColumn,
          isVisible: e.target.checked,
        };
      }
      return tableColumn;
    });
    setAvailableTableColumns(updated);
    console.log(e.target.name, e.target.checked);
    console.log(updated);
    console.log("handling table column update...");
  };
  
  return {
    query,
    dataIdsChecked,
    availableTableColumns,
    setDataIdsChecked,
    clearQueryString,
    handleSearch,
    handleTableColumnUpdate,
  }

};
