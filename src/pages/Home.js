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
import { JUST_DELETE_OPTION } from "../constants/options";
import {
  sendDELETERequest,
  sendGETRequest,
  sendPUTRequest,
} from "../services/service";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

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
  const { showToast, handleShowToast } = useToast(3000);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState("");
  const [idToBeDeleted, setIdToBeDeleted] = useState(null);
  const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [query, setQuery] = useState("");
  const {
    shouldShowModal: shouldShowModalForSelected,
    openModal: openModalForSelected,
    closeModal: closeModalForSelected,
  } = useModal();

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
    if (method === "delete") openModalForSelected();
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

  const handleFavorite = async (id) => {
    try {
      const response = await sendPUTRequest({}, `favorite-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isFavorite;
            return {
              ...result,
              isFavorite: !result.isFavorite,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Favorites!"
            : "Added to Favorites!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleEmergency = async (id) => {
    try {
      const response = await sendPUTRequest({}, `emergency-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isEmergency;
            return {
              ...result,
              isEmergency: !result.isEmergency,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Emergency Contacts!"
            : "Added to Emergency Contacts!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleBlock = async (id) => {
    try {
      const response = await sendPUTRequest({}, `blocked-contact/${id}/`);
      if (response.status === 200) {
        let previousValue = false;
        // update the state
        const updatedResults = data.results.map((result) => {
          if (result.id === id) {
            previousValue = result.isBlocked;
            return {
              ...result,
              isBlocked: !result.isBlocked,
            };
          }
          return result;
        });

        setData({ ...data, results: updatedResults });
        setIcon("bi bi-check-circle-fill text-green-500");
        setMessage(
          previousValue === true
            ? "Removed from Blocked Contacts!"
            : "Added to Blocked Contacts!"
        );
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setMessage(error?.response?.data.error);
      } else {
        setMessage("Cannot perform action. Please try again later.");
      }
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleDelete = async (selectedId) => {
    const id = selectedId ?? idToBeDeleted;
    try {
      await sendDELETERequest(`delete-contact/${id}/`);
      const updatedResults = data.results.filter((result) => result.id !== id);

      // If there is 1 contact in the last page, and it was deleted,
      //  our currentPage should be changed to last page - 1
      const remainder = data.count % pageSize;
      const totalPages = Math.ceil(data.count / pageSize);
      if (remainder === 1 && currentPage === totalPages) {
        handlePageChange(currentPage - 1);
      }

      setData({
        ...data,
        count: data.count - 1,
        results: updatedResults,
      });
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Contact is deleted successfully!");
    } catch (error) {
      setMessage("Cannot perform action. Please try again later.");
      setIcon("bi bi-x-circle-fill text-red-500");
    }

    handleShowToast();
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearQueryString = () => {
    setQuery("");
  };

  return (
    <div>
      <PageTitle
        icon={"bi bi-file-earmark-person-fill"}
        title={"All Contacts"}
      />
      <ActionTab
        clearQueryString={clearQueryString}
        queryString={query}
        handleSearch={handleSearch}
        handleTableColumnUpdate={handleTableColumnUpdate}
        availableTableColumns={availableTableColumns}
        dataIdsChecked={dataIdsChecked}
        handleSelectedOptions={handleSelectedOptions}
        availableOptions={JUST_DELETE_OPTION}
      ></ActionTab>

      <div className="overflow-x-auto flex-1">
        <table className="  w-full rounded-tl-lg rounded-tr-lg">
          <thead className="bg-primary-600 dark:bg-primaryDark-700 text-white">
            <tr className="text-center p-2">
              <th
                id="checkbox-all"
                rowSpan={2}
                colSpan={1}
                className=" border-slate-400 border-top-0 p-2 rounded-tl-lg"
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
                (header, index) =>
                  header.isVisible && (
                    <th
                      key={header.key}
                      rowSpan={header.rowSpan}
                      colSpan={header.colSpan}
                      className={`border-slate-400 p-2 ${
                        availableTableColumns.length - 1 === index
                          ? "rounded-tr-lg"
                          : ""
                      }`}
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
                      className=" border-slate-400 p-2"
                    >
                      {address.name}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.results.length !== 0 ? (
              data.results.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className={`text-center p-2 custom-group even:bg-slate-200 odd:bg-white`}
                  >
                    <td className=" border-slate-400 p-2">
                      <input
                        type="checkbox"
                        name="data"
                        value={item.id}
                        onChange={handleCheckBox}
                        checked={dataIdsChecked.includes(item.id)}
                      />
                    </td>
                    {lookUpParentVisibility(
                      "firstName",
                      availableTableColumns
                    ) && <TableDataRow data={item.firstName} id={item.id} />}
                    {lookUpParentVisibility(
                      "lastName",
                      availableTableColumns
                    ) && <TableDataRow data={item.lastName} id={item.id} />}
                    {lookUpParentVisibility(
                      "phoneNumber",
                      availableTableColumns
                    ) && <TableDataRow data={item.phoneNumber} id={item.id} />}

                    {lookUpParentVisibility(
                      "deliveryAddress",
                      availableTableColumns
                    ) && (
                      <AddressTableDataRow
                        data={item.deliveryAddress}
                        id={item.id}
                      />
                    )}

                    {lookUpParentVisibility(
                      "billingAddress",
                      availableTableColumns
                    ) && (
                      <AddressTableDataRow
                        data={item.billingAddress}
                        id={item.id}
                      />
                    )}

                    {lookUpParentVisibility(
                      "actions",
                      availableTableColumns
                    ) && (
                      <td className="border-l border-collapse border-slate-400 py-2 bg-slate-200">
                        <div className="flex justify-center items-center h-full">
                          <ActionButton
                            shouldBeFilled={item.isFavorite}
                            title={
                              item.isFavorite
                                ? "Remove from Favorites"
                                : "Add to Favorites"
                            }
                            icon={"bi bi-star"}
                            iconFilled={"bi bi-star-fill"}
                            defaultColor={"text-yellow-500"}
                            onHoverColor={"text-yellow-300"}
                            fn={() => {
                              console.log(`${item.id} adding to favorites...`);
                              handleFavorite(item.id);
                            }}
                          />
                          <ActionButton
                            shouldBeFilled={item.isBlocked}
                            title={
                              item.isBlocked
                                ? "Remove from Blocked"
                                : "Add to Blocked"
                            }
                            icon={"bi bi-ban"}
                            iconFilled={"bi bi-ban-fill"}
                            defaultColor={"text-orange-700"}
                            onHoverColor={"text-orange-800"}
                            fn={() => {
                              console.log("blocking contact...");
                              handleBlock(item.id);
                            }}
                          />
                          <ActionButton
                            shouldBeFilled={item.isEmergency}
                            title={
                              item.isEmergency
                                ? "Remove from Emergency Contacts"
                                : "Add to Emergency Contacts"
                            }
                            icon={"bi bi-bag-plus"}
                            iconFilled={"bi bi-bag-plus-fill"}
                            defaultColor={"text-blue-700"}
                            onHoverColor={"text-blue-800"}
                            fn={() => {
                              console.log("adding to emergency contact...");
                              handleEmergency(item.id);
                            }}
                          />
                          <ActionButton
                            title={"edit"}
                            icon={"bi bi-pencil"}
                            iconFilled={"bi bi-pencil-fill"}
                            defaultColor={"text-green-700"}
                            onHoverColor={"text-green-800"}
                            fn={() =>
                              navigate(UPDATE_CONTACT.replace(":id", item.id), {
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
                            fn={() => {
                              setIdToBeDeleted(item.id);
                              openModal();
                            }}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr className="bg-slate-200">
                <td className="border h-40 text-center" colSpan={20}>
                  No Contacts Available.
                </td>
              </tr>
            )}
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
        fnContinue={() => {
          handleDelete();
          closeModal();
        }}
        fnCancel={closeModal}
        showModal={shouldShowModal}
        size={"sm"}
        body={
          "Do you really want to delete this contact? This process cannot be undone."
        }
        continueLabel="Yes, Delete"
      ></Modal>

      {/* Delete Modal for Selected Items */}
      <Modal
        fnContinue={() => {
          handleDeleteSelected();
        }}
        fnCancel={closeModalForSelected}
        showModal={shouldShowModalForSelected}
        size={"sm"}
        body={
          "Do you really want to delete the selected contacts? This process cannot be undone."
        }
        continueLabel="Yes, Delete"
        isLoading={isDeletingSelected}
      ></Modal>

      <Toast icon={icon} message={message} showToast={showToast} />
    </div>
  );
};

export default Home;
