import { useState } from "react";
import ToolTip from "./Tooltip";
import TableColumnSettings from "./TableColumnSettings";
import { useNavigate } from "react-router";
import { NEW_CONTACT } from "../routes/route";

const ActionTab = ({
  handleTableColumnUpdate,
  availableTableColumns,
  dataIdsChecked,
  handleSelectedOptions,
  availableOptions,
}) => {
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const navigate = useNavigate();
  const handleSelect = (e) => {
    handleSelectedOptions(e.target.value);
  };

  return (
    <>
      <div className="mb-10 flex gap-5 items-center flex-wrap">
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg"
          onClick={() => navigate(NEW_CONTACT)}
        >
          <span>
            <i className="bi bi-plus-lg"></i>
          </span>{" "}
          New Contact
        </button>

        <div className="flex items-center rounded-md bg-gray-200 px-2 py-2 grow">
          <i className="bi bi-search text-gray-400 text-lg block cursor-pointer"></i>
          <input
            type="search"
            className="w-full ms-2 bg-transparent focus:outline-none text-gray-900 border-0 border-transparent focus:ring-0"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="mb-2 flex gap-5 items-end justify-between flex-wrap flex-col-reverse sm:flex-row sm:items-center">
        <div className="py-1">
          <select
            name="options"
            id="options"
            className="rounded-md bg-white ring-1 border ring-black ring-opacity-5 focus:outline-none px-2 py-1 me-2"
            disabled={dataIdsChecked.length === 0}
            onChange={handleSelect}
          >
            <option
              value="5"
              className="px-4 py-2 text-[16px] block"
              disabled
              defaultValue
            >
              Select Options
            </option>
            {availableOptions.map((option) => (
              <option
                key={option.key}
                value={option.key}
                className="px-4 py-2 text-[16px] block"
              >
                {option.name}
              </option>
            ))}
          </select>
          <label htmlFor="page_size">
            Selected {dataIdsChecked.length} items
          </label>
        </div>

        <div className="relative text-left">
          <button
            className="relative group bg-primary-600 px-2 py-1 rounded-md hover:bg-primary-700"
            onClick={() => setShowColumnSettings((current) => !current)}
          >
            <ToolTip
              id={"column_settings"}
              content={"Show Table Columns"}
            ></ToolTip>
            <i className="bi bi-columns text-2xl text-white"></i>
          </button>

          <div
            className={`${
              showColumnSettings ? "block" : "hidden"
            } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              {availableTableColumns.map((column) => {
                if (
                  column.key === "selectRow" ||
                  column.key === "firstName" ||
                  column.key === "lastName"
                )
                  return null;

                return (
                  <TableColumnSettings
                    key={column.key}
                    name={column.key}
                    id={column.key}
                    label={column.name}
                    handleTableColumnUpdate={handleTableColumnUpdate}
                    isChecked={column.isVisible}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionTab;
