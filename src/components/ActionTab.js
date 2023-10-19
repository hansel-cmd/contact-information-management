import { useState } from "react";
import ToolTip from "./Tooltip";
import TableColumnSettings from "./TableColumnSettings";

const ActionTab = ({ handleTableColumnUpdate, availableTableColumns }) => {
  const [showColumnSettings, setShowColumnSettings] = useState(false);

  return (
    <>
      <div className="mb-10 flex gap-5 items-center flex-wrap">
        <button className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg">
          <span>
            <i className="bi bi-plus-lg"></i>
          </span>{" "}
          New Contact
        </button>

        <div className="flex items-center rounded-md bg-gray-200 px-2 py-2 grow">
          <i className="bi bi-search text-gray-400 text-lg block cursor-pointer"></i>
          <input
            type="search"
            className="w-full ms-2 bg-transparent focus:outline-none text-gray-900"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="mb-2 flex gap-5 items-center justify-between">
        <div className="py-1">
          <select
            name="options"
            id="options"
            className="rounded-md bg-white ring-1 border ring-black ring-opacity-5 focus:outline-none px-2 py-1 me-2"
            disabled
          >
            <option
              value="5"
              className="px-4 py-2 text-[16px] block"
              disabled
              defaultValue
            >
              Select Options
            </option>
            <option value="delete" className="px-4 py-2 text-[16px] block">
              Delete Items
            </option>
            <option value="favorite" className="px-4 py-2 text-[16px] block">
              Add Favorites
            </option>
            <option value="unfavorite" className="px-4 py-2 text-[16px] block">
              Unfavorite
            </option>
          </select>
          <label htmlFor="page_size">Selected 100 items</label>
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
