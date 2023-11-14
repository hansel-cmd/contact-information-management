import PageTitle from "../components/PageTitle";
import BillingAddress from "../components/BillingAddress";
import DeliveryAddress from "../components/DeliveryAddress";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCallbackPrompt } from "../hooks/useCallbackPrompt";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { createCombinedSchema } from "../validations/NewContact";
import Api from "../services/api";
import { removeExtraSpaces } from "../utils/utilities";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import Toast from "../components/Toast";
import { INDEX, NOT_FOUND } from "../routes/route";
import FileUploadContainer from "../components/FileUploadContainer";
import NumberField from "../components/NumberField";
import { formatPhoneNumber } from "../utils/utilities";
import { useToast } from "../hooks/useToast";
import { useIcon } from "../hooks/useIcon";
import handleSubmitContact from "../services/handleSubmitContact";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shouldShowModal, closeModal, openModal } = useModal();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const [props, setProps] = useState(null);
  const handleDiscard = () => {
    props.resetForm();
    navigate(location.state || INDEX);
    closeModal();
  };

  const [initialValues, setInitialValues] = useState({
    profile: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    favorite: "",
    emergency: "",
    blocked: "",
    houseNo: "",
    street: "",
    city: "",
    province: "",
    zipCode: "",
    delivery_houseNo: "",
    delivery_street: "",
    delivery_city: "",
    delivery_province: "",
    delivery_zipCode: "",
  });

  useEffect(() => {
    const getContact = async () => {
      try {
        setIsLoading(true);
        const response = await Api().get(`contact/${id}`);
        if (response?.status === 200) {
          const data = {
            profile: response?.data?.profile,
            firstName: response?.data?.first_name,
            lastName: response?.data?.last_name,
            phoneNumber: formatPhoneNumber(response?.data?.phone_number),
            favorite: response?.data?.is_favorite,
            emergency: response?.data?.is_emergency,
            blocked: response?.data?.is_blocked,
            houseNo: response?.data?.house_no,
            street: response?.data?.street,
            city: response?.data?.city,
            province: response?.data?.province,
            zipCode: response?.data?.zipcode,
            delivery_houseNo: response?.data?.delivery_house_no,
            delivery_street: response?.data?.delivery_street,
            delivery_city: response?.data?.delivery_city,
            delivery_province: response?.data?.delivery_province,
            delivery_zipCode: response?.data?.delivery_zipcode,
          };
          setInitialValues(data);
          if (response?.data?.profile) {
            localStorage.setItem("oldThumbnail", response?.data?.profile);
            setThumbnail(response?.data?.profile);
          } else {
            localStorage.removeItem("oldThumbnail");
          }
        }
      } catch (error) {
        if (error.response?.status === 404) {
          navigate(NOT_FOUND, { replace: true });
        }
      }
    };

    getContact();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //binary
  const [thumbnail, setThumbnail] = useState(undefined);
  const [image, setImage] = useState(null);
  const profileRef = useRef(null);
  const { showToast, handleShowToast } = useToast(3000);
  const [message, setMessage] = useState("");
  const { icon, setIsError } = useIcon();

  const handleSubmit = async (values, actions) => {
    handleSubmitContact(
      values,
      actions,
      image,
      `contact/update/${id}/`,
      "PUT",
      setMessage,
      setIsError,
      setThumbnail,
      setShowDialog,
      handleShowToast
    );
  };

  const CombinedSchema = createCombinedSchema(profileRef);

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
      <PageTitle icon={"bi bi-pencil-fill"} title={"Edit Contact"} />
      <div className="p-5 shadow-lg border-2 rounded-lg  dark:bg-primaryDark-700 dark:text-fontDark-700">
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
          <Formik
            initialValues={{
              profile: "",
              firstName: initialValues.firstName,
              lastName: initialValues.lastName,
              phoneNumber: initialValues.phoneNumber,
              favorite: initialValues.favorite,
              emergency: initialValues.emergency,
              blocked: initialValues.blocked,
              houseNo: initialValues.houseNo,
              street: initialValues.street,
              city: initialValues.city,
              province: initialValues.province,
              zipCode: initialValues.zipCode,
              delivery_houseNo: initialValues.delivery_houseNo,
              delivery_street: initialValues.delivery_street,
              delivery_city: initialValues.delivery_city,
              delivery_province: initialValues.delivery_province,
              delivery_zipCode: initialValues.delivery_zipCode,
            }}
            onSubmit={handleSubmit}
            validationSchema={CombinedSchema}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <section className="flex grow gap-5 flex-wrap">
                  <section className="flex-1 md:border-e-2 sm:px-4">
                    <div className="py-4">
                      <fieldset className="border-t-2 border-blue-700">
                        <legend className="ms-4 px-2">Basic information</legend>

                        <div className="flex items-center justify-center w-full pt-4">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <FileUploadContainer
                              profileRef={profileRef}
                              setThumbnail={setThumbnail}
                              thumbnail={thumbnail}
                              setImage={setImage}
                              formikProps={props}
                              handleMe={(e) =>
                                setShowDialog(e.target.files.length > 0)
                              }
                            />
                          </label>
                        </div>

                        <div className="pt-4">
                          <div className="flex flex-col mb-4">
                            <label htmlFor="firstName" className="mb-1">
                              First Name
                            </label>
                            <ErrorMessage name="firstName">
                              {(error) => (
                                <p className="text-red-600">{error}</p>
                              )}
                            </ErrorMessage>
                            <Field
                              id="firstName"
                              name="firstName"
                              type="text"
                              className="border-2 p-1 dark:text-black"
                              onBlur={(e) => {
                                if (props.dirty && !showDialog) {
                                  setShowDialog(true);
                                } else if (!props.dirty && showDialog) {
                                  setShowDialog(false);
                                }
                                removeExtraSpaces(e, props);
                              }}
                            />
                          </div>
                          <div className="flex flex-col mb-4 flex-1">
                            <label htmlFor="lastName" className="mb-1">
                              Last Name
                            </label>
                            <ErrorMessage name="lastName">
                              {(error) => (
                                <p className="text-red-600">{error}</p>
                              )}
                            </ErrorMessage>
                            <Field
                              id="lastName"
                              name="lastName"
                              type="text"
                              className="border-2 p-1 dark:text-black"
                              onBlur={(e) => {
                                if (props.dirty && !showDialog) {
                                  setShowDialog(true);
                                } else if (!props.dirty && showDialog) {
                                  setShowDialog(false);
                                }
                                removeExtraSpaces(e, props);
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col mb-4">
                          <label htmlFor="phoneNumber" className="mb-1">
                            Phone Number
                          </label>
                          <ErrorMessage name="phoneNumber">
                            {(error) => <p className="text-red-600">{error}</p>}
                          </ErrorMessage>
                          <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            onBlur={(e) => {
                              if (props.dirty && !showDialog) {
                                setShowDialog(true);
                              } else if (!props.dirty && showDialog) {
                                setShowDialog(false);
                              }
                              props.getFieldProps(e.target.name).onBlur(e);
                            }}
                            component={NumberField}
                          />
                        </div>
                      </fieldset>
                    </div>

                    <div className="py-4">
                      <fieldset className="border-t-2 border-blue-700">
                        <legend className="ms-4 px-2">Others (Optional)</legend>
                        <div className="pt-4">
                          <div className="flex items-center">
                            <Field
                              id="favorite"
                              name="favorite"
                              type="checkbox"
                              disabled={props.values.blocked}
                              onBlur={(e) => {
                                if (props.dirty && !showDialog) {
                                  setShowDialog(true);
                                } else if (!props.dirty && showDialog) {
                                  setShowDialog(false);
                                }
                                props.getFieldProps(e.target.name).onBlur(e);
                              }}
                            />
                            <label
                              htmlFor="favorite"
                              className="ms-2 text-base"
                            >
                              Favorites
                            </label>
                          </div>
                          <div className="flex items-center border-t-2 mt-2 pt-2">
                            <Field
                              id="emergency"
                              name="emergency"
                              type="checkbox"
                              disabled={props.values.blocked}
                              onBlur={(e) => {
                                if (props.dirty && !showDialog) {
                                  setShowDialog(true);
                                } else if (!props.dirty && showDialog) {
                                  setShowDialog(false);
                                }
                                props.getFieldProps(e.target.name).onBlur(e);
                              }}
                            />
                            <label
                              htmlFor="emergency"
                              className="ms-2 text-base"
                            >
                              Emergency Contact
                            </label>
                          </div>
                          <div className="flex items-center border-t-2 mt-2 pt-2">
                            <Field
                              id="blocked"
                              name="blocked"
                              type="checkbox"
                              disabled={
                                props.values.favorite || props.values.emergency
                              }
                              onBlur={(e) => {
                                if (props.dirty && !showDialog) {
                                  setShowDialog(true);
                                } else if (!props.dirty && showDialog) {
                                  setShowDialog(false);
                                }
                                props.getFieldProps(e.target.name).onBlur(e);
                              }}
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
                      <BillingAddress
                        onBlur={(e) => {
                          if (props.dirty && !showDialog) {
                            setShowDialog(true);
                          } else if (!props.dirty && showDialog) {
                            setShowDialog(false);
                          }
                          props.getFieldProps(e.target.name).onBlur(e);
                        }}
                      />
                    </div>

                    <div className="py-4">
                      <DeliveryAddress
                        formikProps={props}
                        onBlur={(e) => {
                          if (props.dirty && !showDialog) {
                            setShowDialog(true);
                          } else if (!props.dirty && showDialog) {
                            setShowDialog(false);
                          }
                          props.getFieldProps(e.target.name).onBlur(e);
                        }}
                      />
                    </div>

                    <div className="flex flex-wrap lg:justify-end justify-start pt-4 gap-2">
                      <button
                        type="button"
                        className="flex justify-center items-center p-2 px-6 min-w-[180px] rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer float-right disabled:bg-red-400"
                        disabled={props.isSubmitting}
                        onClick={() => {
                          // myFunction()
                          setShowDialog(false);
                          setProps(props);

                          openModal();
                        }}
                      >
                        <Spinner isLoading={props.isSubmitting}></Spinner>
                        Discard Changes
                      </button>

                      <button
                        type="submit"
                        className="flex justify-center items-center p-2 px-6 min-w-[180px] rounded bg-primary-600 hover:bg-primary-700 text-white cursor-pointer float-right disabled:bg-primary-400"
                        disabled={!props.isValid || props.isSubmitting}
                      >
                        <Spinner isLoading={props.isSubmitting}></Spinner>
                        {props.isSubmitting ? "Updating..." : "Update Contact"}
                      </button>
                    </div>
                  </section>
                </section>
              </Form>
            )}
          </Formik>
        )}

        <Modal
          fnCancel={cancelNavigation}
          fnContinue={confirmNavigation}
          showModal={showPrompt}
          body="Changes you have made may not be saved. Do you want to leave without finishing?"
          title="Leave the page?"
          cancelLabel="Cancel"
          continueLabel="Leave Page"
        ></Modal>

        <Modal
          fnCancel={() => {
            setShowDialog(true);
            closeModal();
          }}
          fnContinue={handleDiscard}
          showModal={shouldShowModal}
          body="Changes you have made may not be saved. Do you want to continue?"
          title="Discard Changes?"
          cancelLabel="Cancel"
          continueLabel="Discard"
        ></Modal>

        <Toast icon={icon} message={message} showToast={showToast} />
      </div>
    </>
  );
};

export default EditContact;
