import PageTitle from "../components/PageTitle";
import ActionTab from "../components/ActionTab";
import AddressTableDataRow from "../components/AddressTableDataRow";
import ActionButton from "../components/ActionButton";
import TableDataRow from "../components/TableDataRow";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { TABLE_HEADERS, ADDRESSES } from "../constants/tableConstants";
import { useModal } from "../hooks/useModal";
import { useLocation, useNavigate } from "react-router";
import { UPDATE_CONTACT } from "../routes/route";
import {
  ALL_OPTIONS,
  // FAVORITES_OPTIONS,
  // EMERGENCY_OPTIONS,
  // BLOCK_OPTIONS,
} from "../constants/options";
import { sendGETRequest } from "../services/service";

// const DUMMY = [
//   {
//     id: 1,
//     firstName: "Katarina",
//     lastName: "Yu",
//     phoneNumber: "+63 927 123 1234",
//     isFavorite: true,
//     deliveryAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//     billingAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//   },
//   {
//     id: 2,
//     firstName: "Katarina",
//     lastName: "Yu",
//     phoneNumber: "+63 927 123 1234",
//     isFavorite: true,
//     deliveryAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//     billingAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//   },
//   {
//     id: 3,
//     firstName: "Katarina",
//     lastName: "Yu",
//     phoneNumber: "+63 927 123 1234",
//     isFavorite: true,
//     deliveryAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//     billingAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//   },
//   {
//     id: 4,
//     firstName: "Katarina",
//     lastName: "Yu",
//     phoneNumber: "+63 927 123 1234",
//     isFavorite: true,
//     deliveryAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//     billingAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//   },
//   {
//     id: 5,
//     firstName: "Katarina",
//     lastName: "Yu",
//     phoneNumber: "+63 927 123 1234",
//     isFavorite: true,
//     deliveryAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//     billingAddress: {
//       houseNo: 719,
//       street: "123 Manuel L. Quezon",
//       city: "Mandaue",
//       province: "Cebu",
//       zipCode: 6014,
//     },
//   },
// ];

const lookUpParentVisibility = (parentKey, tableHeaders) => {
  const parent = tableHeaders.find((header) => header.key === parentKey);
  if (!parent) {
    return false;
  }

  return parent.isVisible;
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shouldShowModal, openModal, closeModal } = useModal();
  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTableColumns, setAvailableTableColumns] =
    useState(TABLE_HEADERS);
  const [pageSize, setPageSize] = useState(5);
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
          `/contacts?limit=${pageSize}&page=${currentPage}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log("contacts error", err);
      }
    };
    getContacts();
  }, [pageSize, currentPage]);

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

  const [dataIdsChecked, setDataIdsChecked] = useState([]);
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

  const [areAllChecked, setAreAllChecked] = useState(false);
  const handleCheckAll = (e) => {
    setAreAllChecked(e.target.checked);
  };

  useEffect(() => {
    if (areAllChecked) {
      const ids = data.results.map((data) => data.id);
      setDataIdsChecked(ids);
    } else {
      setDataIdsChecked([]);
    }
  }, [areAllChecked, data.results]);

  const handleSelectedOptions = (method) => {
    console.log("hello", method);
  };

  return (
    <div>
      <PageTitle
        icon={"bi bi-file-earmark-person-fill"}
        title={"All Contacts"}
      />
      <ActionTab
        handleTableColumnUpdate={handleTableColumnUpdate}
        availableTableColumns={availableTableColumns}
        dataIdsChecked={dataIdsChecked}
        handleSelectedOptions={handleSelectedOptions}
        availableOptions={ALL_OPTIONS}
      ></ActionTab>

      <div className="overflow-x-auto flex-1">
        <table className="border border-collapse border-slate-400 w-full">
          <thead>
            <tr className="text-center p-2">
              <th
                id="checkbox-all"
                rowSpan={2}
                colSpan={1}
                className="border border-collapse border-slate-400 p-2"
              >
                <input
                  type="checkbox"
                  name="data"
                  id="selectRow"
                  onChange={handleCheckAll}
                  checked={areAllChecked}
                />
              </th>

              {availableTableColumns.map(
                (header) =>
                  header.isVisible && (
                    <th
                      key={header.key}
                      rowSpan={header.rowSpan}
                      colSpan={header.colSpan}
                      className="border border-collapse border-slate-400 p-2"
                    >
                      {header.name}
                    </th>
                  )
              )}
            </tr>

            <tr className="text-center p-2">
              {ADDRESSES.map(
                (address) =>
                  lookUpParentVisibility(
                    address.parentKey,
                    availableTableColumns
                  ) && (
                    <th
                      key={`${address.parentKey}-${address.name}`}
                      className="border border-collapse border-slate-400 p-2"
                    >
                      {address.name}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.results.map((data) => {
              return (
                <tr key={data.id} className="text-center p-2">
                  <td className="border border-collapse border-slate-400 p-2">
                    <input
                      type="checkbox"
                      name="data"
                      value={data.id}
                      onChange={handleCheckBox}
                      checked={dataIdsChecked.includes(data.id)}
                    />
                  </td>
                  {lookUpParentVisibility(
                    "firstName",
                    availableTableColumns
                  ) && <TableDataRow data={data.firstName} />}
                  {lookUpParentVisibility(
                    "lastName",
                    availableTableColumns
                  ) && <TableDataRow data={data.lastName} />}
                  {lookUpParentVisibility(
                    "phoneNumber",
                    availableTableColumns
                  ) && <TableDataRow data={data.phoneNumber} />}

                  {lookUpParentVisibility(
                    "deliveryAddress",
                    availableTableColumns
                  ) && <AddressTableDataRow data={data.deliveryAddress} />}

                  {lookUpParentVisibility(
                    "billingAddress",
                    availableTableColumns
                  ) && <AddressTableDataRow data={data.billingAddress} />}

                  {lookUpParentVisibility("actions", availableTableColumns) && (
                    <td className="border border-collapse border-slate-400 py-2">
                      <div className="flex justify-center items-center h-full">
                        <ActionButton
                          title={"favorite"}
                          icon={"bi bi-star"}
                          iconFilled={"bi bi-star-fill"}
                          defaultColor={"text-yellow-500"}
                          onHoverColor={"text-yellow-300"}
                          fn={() => console.log("adding to favorites...")}
                        />
                        <ActionButton
                          title={"block"}
                          icon={"bi bi-ban"}
                          iconFilled={"bi bi-ban-fill"}
                          defaultColor={"text-orange-700"}
                          onHoverColor={"text-orange-800"}
                          fn={() => console.log("blocking contact...")}
                        />
                        <ActionButton
                          title={"emergency"}
                          icon={"bi bi-bag-plus"}
                          iconFilled={"bi bi-bag-plus-fill"}
                          defaultColor={"text-blue-700"}
                          onHoverColor={"text-blue-800"}
                          fn={() => console.log("blocking contact...")}
                        />
                        <ActionButton
                          title={"edit"}
                          icon={"bi bi-pencil"}
                          iconFilled={"bi bi-pencil-fill"}
                          defaultColor={"text-green-700"}
                          onHoverColor={"text-green-800"}
                          fn={() =>
                            navigate(UPDATE_CONTACT.replace(":id", data.id), {
                              state: location.pathname,
                            })
                          }
                        />
                        <ActionButton
                          title={"delete"}
                          icon={"bi bi-trash"}
                          iconFilled={"bi bi-trash-fill"}
                          defaultColor={"text-red-700"}
                          onHoverColor={"text-red-800"}
                          fn={openModal}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center justify-between flex-col lg:flex-row">
        <div className="py-1">
          <label htmlFor="page_size">Showing</label>
          <select
            name="pageSize"
            id="page_size"
            className="rounded-md bg-white ring-1 border ring-black ring-opacity-5 focus:outline-none px-2 py-1 mx-2"
            onChange={handlePageSizeSelect}
          >
            <option value="5" className="px-4 py-2 block">
              5
            </option>
            <option value="10" className="px-4 py-2 block">
              10
            </option>
            <option value="20" className="px-4 py-2 block">
              20
            </option>
            <option value="50" className="px-4 py-2 block">
              50
            </option>
            <option value="100" className="px-4 py-2 block">
              100
            </option>
          </select>
          <label htmlFor="page_size">entries</label>
        </div>
        <div className="py-1 flex flex-wrap">
          <Pagination
            currentPage={currentPage}
            totalCount={data.count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        fnContinue={() => {}}
        fnCancel={closeModal}
        showModal={shouldShowModal}
        size={"sm"}
        body={
          "Do you really want to delete this contact? This process cannot be undone."
        }
        continueLabel="Yes, Delete"
      ></Modal>
    </div>
  );
};

export default Home;
