import PageTitle from "../components/PageTitle";
import BillingAddress from "../components/BillingAddress";
import DeliveryAddress from "../components/DeliveryAddress";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createCombinedSchema } from "../validations/NewContact";
import { removeExtraSpaces } from "../utils/utilities";
import Spinner from "../components/Spinner";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useIcon } from "../hooks/useIcon";
import { useCallbackPrompt } from "../hooks/useCallbackPrompt";
import Modal from "../components/Modal";
import FileUploadContainer from "../components/FileUploadContainer";
import NumberField from "../components/NumberField";
import handleSubmitContact from "../services/handleSubmitContact";
import { getItem, removeItem } from "../services/localStorage";
import { useLocation } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NewContact = () => {
  useDocumentTitle('Synk: New Contact')
  //binary
  const [thumbnail, setThumbnail] = useState(undefined);
  const [image, setImage] = useState(null);
  const profileRef = useRef(null);
  const { showToast, handleShowToast } = useToast(3000);
  const [message, setMessage] = useState("");
  const { icon, setIsError } = useIcon();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const handleSubmit = async (values, actions) => {
    handleSubmitContact(
      values,
      actions,
      image,
      "create-contact/",
      "POST",
      setMessage,
      setIsError,
      setThumbnail,
      setShowDialog,
      handleShowToast
    );
  };

  useEffect(() => {
    const oldThumbnail = getItem('oldThumbnail')
    if (oldThumbnail) removeItem('oldThumbnail')
  }, [])

  const CombinedSchema = createCombinedSchema(profileRef);

  return (
    <>
      <PageTitle icon={"bi bi-plus-circle-fill"} title={"New Contact"} />
      <div className="p-5 shadow-lg border-2 rounded-lg dark:bg-primaryDark-700 dark:text-fontDark-700">
        <Formik
          initialValues={{
            profile: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
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
            favorite: location.state === 'favorite',
            emergency: location.state === 'emergency',
          }}
          onSubmit={handleSubmit}
          validationSchema={CombinedSchema}
        >
          {(props) => {
            return (
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
                              Add this contact to Favorites
                            </label>
                          </div>
                          <div className="flex items-center border-t-2 mt-2 pt-2">
                            <Field
                              id="emergency"
                              name="emergency"
                              type="checkbox"
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
                              Add this contact to Emergency Contacts
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

                    <button
                      type="submit"
                      className="flex justify-center items-center p-2 rounded w-44 bg-primary-600 hover:bg-primary-700 text-white cursor-pointer float-right disabled:bg-primary-400"
                      disabled={!props.isValid || props.isSubmitting}
                    >
                      <Spinner isLoading={props.isSubmitting}></Spinner>
                      {props.isSubmitting ? "Saving..." : "Save Contact"}
                    </button>
                  </section>
                </section>
              </Form>
            );
          }}
        </Formik>

        <Toast icon={icon} message={message} showToast={showToast} />

        <Modal
          fnCancel={cancelNavigation}
          fnContinue={confirmNavigation}
          showModal={showPrompt}
          body="Changes you have made may not be saved. Do you want to leave without finishing?"
          title="Leave the page?"
          cancelLabel="Cancel"
          continueLabel="Leave Page"
        ></Modal>
      </div>
    </>
  );
};

export default NewContact;
