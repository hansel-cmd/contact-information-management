import PageTitle from "../components/PageTitle";
import BillingAddress from "../components/BillingAddress";
import DeliveryAddress from "../components/DeliveryAddress";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { PatternFormat } from "react-number-format";
import { NewContactSchema } from "../validations/NewContact";
import removeExtraSpaces from "../utils/removeExtraSpaces";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import * as Yup from "yup";
import { useState } from "react";
import Api from "../services/api";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { useIcon } from "../hooks/useIcon";
import { useCallbackPrompt } from "../hooks/useCallbackPrompt";
import Modal from "../components/Modal";
import FileUploadContainer from "../components/FileUploadContainer";

const NewContact = () => {
  //binary
  const [thumbnail, setThumbnail] = useState(undefined);
  const [image, setImage] = useState(null);
  const profileRef = useRef(null);
  const { showToast, handleShowToast } = useToast(3000);
  const [message, setMessage] = useState("");
  const { icon, setIsError } = useIcon();
  const [showDialog, setShowDialog] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog);

  const handleSubmit = async (values, actions) => {
    // from: '+63 (xxx) xxx-xxxx' to '+63xxxxxxxxxx'
    const phoneNumber = values.phoneNumber.replace(/[()\s-]/g, "");
    console.log("phoneNUmber", phoneNumber);

    const formData = new FormData();
    if (image) formData.append("profile", image);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("house_no", values.houseNo);
    formData.append("street", values.street);
    formData.append("city", values.city);
    formData.append("province", values.province);
    formData.append("zipcode", values.zipCode);
    formData.append("delivery_house_no", values.delivery_houseNo);
    formData.append("delivery_street", values.delivery_street);
    formData.append("delivery_city", values.delivery_city);
    formData.append("delivery_province", values.delivery_province);
    formData.append("delivery_zipcode", values.delivery_zipCode);
    formData.append("is_favorite", values.favorite);
    formData.append("s_blocked", false);
    formData.append("is_emergency", values.emergency);

    try {
      const response = await Api().post("create-contact/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      if (response?.status === 201) {
        setMessage("Created Successfully!");
        setIsError(false);
        actions.resetForm();
      }
    } catch (error) {
      console.log("error sending", error);
      setIsError(true);
      setMessage("Cannot Perform Action. Please try again later.");
    }

    handleShowToast();
  };

  const NumberField = ({ field }) => {
    return (
      <PatternFormat
        {...field}
        type="tel"
        format="+63 (###) ###-####"
        mask="_"
        className="border-2 p-1"
        placeholder="+63 (xxx) xxx-xxxx"
      />
    );
  };

  const FileValidationSchema = Yup.object({
    profile: Yup.mixed()
      .test("is-file-too-big", "File exceeds 10MB", () => {
        let valid = true;
        const files = profileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test(
        "is-file-of-correct-type",
        "Invalid file type. File type must be JPEG, JPG, or PNG.",
        () => {
          let valid = true;
          const files = profileRef?.current?.files;
          if (files) {
            const fileArr = Array.from(files);
            fileArr.forEach((file) => {
              const type = file.type.split("/")[1];
              const validTypes = ["jpeg", "png", "jpg"];
              if (!validTypes.includes(type)) {
                valid = false;
              }
            });
          }
          return valid;
        }
      ),
  });

  const CombinedSchema = Yup.object()
    .concat(NewContactSchema)
    .concat(FileValidationSchema);

  return (
    <>
      <PageTitle icon={"bi bi-plus-circle-fill"} title={"New Contact"} />
      <div className="p-5 shadow-lg border-2 rounded-lg">
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
            favorite: false,
            emergency: false,
          }}
          onSubmit={handleSubmit}
          validationSchema={CombinedSchema}
        >
          {(props) => {
            if (props.dirty && !showDialog) {
              setShowDialog(true);
            } else if (!props.dirty && showDialog) {
              setShowDialog(false);
            }
            
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
                          />
                        </label>
                      </div>

                      <div className="pt-4">
                        <div className="flex flex-col mb-4">
                          <label htmlFor="firstName" className="mb-1">
                            First Name
                          </label>
                          <ErrorMessage name="firstName">
                            {(error) => <p className="text-red-600">{error}</p>}
                          </ErrorMessage>
                          <Field
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="border-2 p-1"
                            onBlur={(e) => removeExtraSpaces(e, props)}
                          />
                        </div>
                        <div className="flex flex-col mb-4 flex-1">
                          <label htmlFor="lastName" className="mb-1">
                            Last Name
                          </label>
                          <ErrorMessage name="lastName">
                            {(error) => <p className="text-red-600">{error}</p>}
                          </ErrorMessage>
                          <Field
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="border-2 p-1"
                            onBlur={(e) => removeExtraSpaces(e, props)}
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
                          />
                          <label htmlFor="favorite" className="ms-2 text-base">
                            Add this contact to Favorites
                          </label>
                        </div>
                        <div className="flex items-center border-t-2 mt-2 pt-2">
                          <Field
                            id="emergency"
                            name="emergency"
                            type="checkbox"
                          />
                          <label htmlFor="emergency" className="ms-2 text-base">
                            Add this contact to Emergency Contacts
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </section>

                <section className="flex-[2] px-4">
                  <div className="py-4">
                    <BillingAddress />
                  </div>

                  <div className="py-4">
                    <DeliveryAddress formikProps={props} />
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
          )}}
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
