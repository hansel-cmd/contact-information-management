import PageTitle from "../components/PageTitle";
import ActionTab from "../components/ActionTab";
import AddressTableDataRow from "../components/AddressTableDataRow";
import ActionButton from "../components/ActionButton";
import TableDataRow from "../components/TableDataRow";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { ADDRESSES } from "../constants/tableConstants";
import { useModal } from "../hooks/useModal";
import { useLocation, useNavigate } from "react-router";
import { UPDATE_CONTACT } from "../routes/route";
import { JUST_DELETE_OPTION } from "../constants/options";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { useActionTab } from "../hooks/useActionTab";
import { useFetchContacts } from "../hooks/useFetchContacts";
import { useContactMethods } from "../hooks/useContactMethods";
import { useTableMethods } from "../hooks/useTableMethods";
import { lookUpParentVisibility } from "../utils/utilities";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shouldShowModal, openModal, closeModal } = useModal();
  const { showToast, handleShowToast } = useToast(3000);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState("");
  const [idToBeDeleted, setIdToBeDeleted] = useState(null);

  const {
    query,
    dataIdsChecked,
    availableTableColumns,
    clearQueryString,
    handleSearch,
    handleTableColumnUpdate,
    setDataIdsChecked,
  } = useActionTab();

  const {
    currentPage,
    pageSize,
    data,
    handlePageSizeSelect,
    handlePageChange,
    setData,
  } = useFetchContacts({query});

  const {
    shouldShowModal: shouldShowModalForSelected,
    openModal: openModalForSelected,
    closeModal: closeModalForSelected,
  } = useModal();

  const { handleDelete, handleBlock, handleEmergency, handleFavorite } =
    useContactMethods({
      data,
      idToBeDeleted,
      pageSize,
      currentPage,
      handlePageChange,
      setData,
      setIcon,
      setMessage,
      handleShowToast,
    });

  const {
    isDeletingSelected,
    areAllChecked,
    handleCheckBox,
    handleCheckAll,
    handleDeleteSelected,
    handleSelectedOptions,
  } = useTableMethods({
    data,
    dataIdsChecked,
    pageSize,
    currentPage,
    setDataIdsChecked,
    handleDelete,
    handlePageChange,
    openModalForSelected,
    closeModalForSelected,
  });

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
