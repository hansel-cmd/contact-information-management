import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { sendGETRequest } from "../services/service";
import { formatPhoneNumber } from "../utils/utilities";
import { UPDATE_CONTACT, NOT_FOUND, INDEX } from "../routes/route";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const ContactDetail = () => {
  useDocumentTitle("Synk: Contact Details");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({});

  useEffect(() => {
    const getContact = async () => {
      setIsLoading(true);
      try {
        const response = await sendGETRequest(`contact/${id}/`);
        if (response.status === 200) {
          setContact(response.data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          navigate(NOT_FOUND, { replace: true });
        } else {
          navigate(INDEX, { replace: true });
        }
      }
      setIsLoading(false);
    };
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <button>
        <Link to={location.state ?? "/"}>
          <p className="text-4xl group">
            <i className="bi bi-arrow-left-circle group-hover:hidden"></i>
            <i className="bi bi-arrow-left-circle-fill hidden group-hover:block"></i>
          </p>
        </Link>
      </button>
      <PageTitle icon={"bi bi-person-badge-fill"} title={"Contact Details"} />
      <div className="p-5 shadow-lg border-2 rounded-lg dark:bg-primaryDark-700 dark:text-fontDark-700">
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="w-">
              <Spinner
                isLoading={true}
                width={"w-10"}
                height={"h-10"}
              ></Spinner>
            </div>
          </div>
        ) : (
          <section className="flex grow gap-5 flex-wrap">
            <section className="flex-1 md:border-e-2 sm:px-4">
              <div className="py-4">
                <fieldset className="border-t-2 border-blue-700">
                  <legend className="ms-4 px-2">Basic information</legend>

                  <div className="flex items-center justify-center w-full pt-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-48 h-48 border-2 rounded-full"
                    >
                      {contact.profile ? (
                        <img
                          src={contact.profile}
                          alt="Uploaded"
                          className="w-48 h-48 rounded-full"
                        />
                      ) : (
                        <div className="flex justify-center items-center m-h-[12rem] w-48 h-48 rounded-full bg-red-800">
                          <span className="text-6xl text-white">
                            {contact?.first_name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="pt-4">
                    <div className="flex flex-col mb-4">
                      <label htmlFor="firstName" className="mb-1 ">
                        First Name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.first_name}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col mb-4 flex-1">
                      <label htmlFor="lastName" className="mb-1">
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.last_name}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-4">
                    <label htmlFor="phoneNumber" className="mb-1">
                      Phone Number
                    </label>
                    <PatternFormat
                      disabled={true}
                      type="tel"
                      format="+63 (###) ###-####"
                      mask="_"
                      className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                      value={formatPhoneNumber(contact.phone_number)}
                      placeholder="+63 (xxx) xxx-xxxx"
                    />
                  </div>
                </fieldset>
              </div>

              <div className="py-4">
                <fieldset className="border-t-2 border-blue-700">
                  <legend className="ms-4 px-2">Others</legend>
                  <div className="pt-4">
                    <div className="flex items-center">
                      <input
                        id="favorite"
                        name="favorite"
                        type="checkbox"
                        className=" accent-red-500 text-white disabled:accent-red-500"
                        checked={contact.is_favorite}
                        onChange={(e) => {}}
                      />
                      <label htmlFor="favorite" className="ms-2 text-base">
                        Favorites
                      </label>
                    </div>
                    <div className="flex items-center border-t-2 mt-2 pt-2">
                      <input
                        id="emergency"
                        name="emergency"
                        type="checkbox"
                        className=" accent-red-500 text-white disabled:accent-red-500"
                        checked={contact.is_emergency}
                        onChange={(e) => {}}
                      />
                      <label htmlFor="emergency" className="ms-2 text-base">
                        Emergency Contact
                      </label>
                    </div>
                    <div className="flex items-center border-t-2 mt-2 pt-2">
                      <input
                        id="blocked"
                        name="blocked"
                        type="checkbox"
                        className=" accent-red-500 text-white disabled:accent-red-500"
                        checked={contact.is_blocked}
                        onChange={(e) => {}}
                      />
                      <label htmlFor="blocked" className="ms-2 text-base">
                        Blocked
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </section>

            <section className="flex-[2] px-4">
              <div className="py-4">
                <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
                  <legend className="ms-4 px-2">Billing Address</legend>
                  <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-4 pt-4">
                    <div className="flex flex-col flex-[1] justify-between flex-wrap">
                      <label htmlFor="houseNo" className="mb-1">
                        House No.
                      </label>
                      <input
                        id="houseNo"
                        name="houseNo"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.house_no}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[2] justify-between flex-wrap">
                      <label htmlFor="street" className="mb-1">
                        Street
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.street}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[4] justify-between flex-wrap">
                      <label htmlFor="city" className="mb-1">
                        City/Town
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.city}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
                    <div className="flex flex-col flex-[2] justify-between flex-wrap">
                      <label htmlFor="province" className="mb-1">
                        Province
                      </label>
                      <input
                        id="province"
                        name="province"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.province}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[1] justify-between flex-wrap">
                      <label htmlFor="zipCode" className="mb-1">
                        Zip Code
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.zipcode}
                        disabled={true}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="py-4">
                <fieldset className="border-t-2 border-blue-700 flex flex-col min-w-0">
                  <legend className="ms-4 px-2 mb-4">Delivery Address</legend>
                  <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-4 pt-4">
                    <div className="flex flex-col flex-[1] justify-between flex-wrap">
                      <label htmlFor="delivery_houseNo" className="mb-1">
                        House No.
                      </label>

                      <input
                        id="delivery_houseNo"
                        name="delivery_houseNo"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.delivery_house_no}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[2] justify-between flex-wrap">
                      <label htmlFor="delivery_street" className="mb-1">
                        Street
                      </label>

                      <input
                        id="delivery_street"
                        name="delivery_street"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.delivery_street}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[3] justify-between flex-wrap">
                      <label htmlFor="delivery_city" className="mb-1">
                        City/Town
                      </label>

                      <input
                        id="delivery_city"
                        name="delivery_city"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.delivery_city}
                        disabled={true}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3 grow flex-wrap mb-2">
                    <div className="flex flex-col flex-[2] justify-between flex-wrap">
                      <label htmlFor="delivery_province" className="mb-1">
                        Province
                      </label>

                      <input
                        id="delivery_province"
                        name="delivery_province"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.delivery_province}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col flex-[1] justify-between flex-wrap">
                      <label htmlFor="delivery_zipCode" className="mb-1">
                        Zip Code
                      </label>

                      <input
                        id="delivery_zipCode"
                        name="delivery_zipCode"
                        type="text"
                        className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400 dark:text-black"
                        value={contact.delivery_zipcode}
                        disabled={true}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="flex flex-wrap lg:justify-end justify-start pt-4 gap-2">
                <button
                  type="submit"
                  className="flex justify-center items-center p-2 px-6 min-w-[180px] rounded bg-primary-600 hover:bg-primary-700 text-white cursor-pointer float-right disabled:bg-primary-400"
                  onClick={(e) => {
                    navigate(UPDATE_CONTACT.replace(":id", id), {
                      state: location.pathname,
                    });
                  }}
                >
                  Edit Contact
                </button>
              </div>
            </section>
          </section>
        )}
      </div>
    </>
  );
};

export default ContactDetail;
