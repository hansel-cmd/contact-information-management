const TableColumnSettings = ({ name, id, label, handleTableColumnUpdate, isChecked = true }) => {
  return (
    <div className="px-4 py-2 text-sm flex group hover:bg-gray-100 dark:hover:bg-accentDark-700 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={(e) => handleTableColumnUpdate(e)}
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className="ms-2 w-full text-gray-700 dark:text-fontDark-600 group-hover:text-gray-900 dark:group-hover:text-white  group-hover:cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default TableColumnSettings;
