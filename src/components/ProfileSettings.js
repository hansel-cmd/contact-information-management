import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../components/Spinner";
import NumberField from "../components/NumberField";
import { useContext, useState } from "react";
import { useEdit } from "../hooks/useEdit";
import { useToast } from "../hooks/useToast";
import AuthContext from "../context/authContext";
import { UpdateProfileSchema } from "../validations/UpdateProfile";
import Toast from "../components/Toast";
import { sendPUTRequest } from "../services/service";
import { formatPhoneNumber } from "../utils/utilities";

const ProfileSettings = () => {
  const { user, setUser } = useContext(AuthContext);
  const { isEditable, enableEdit, disableEdit } = useEdit();
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");
  const { showToast, handleShowToast } = useToast(3000);
  const handleCancel = (props) => {
    props.resetForm();
    disableEdit();
  };

  const areTheSame = (values) => {
    return user.first_name === values.firstName &&
      user.last_name === values.lastName &&
      user.phone_number === values?.phoneNumber.replace(/[()\s-]/g, "");;
  };

  const handleUpdateProfile = async (values, actions) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
    };

    if (values.phoneNumber) {
      data["phone_number"] = values.phoneNumber.replace(/[()\s-]/g, "");
    }

    try {
      await sendPUTRequest(data, "user/update/");
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Updated Successfully!");
      setUser({...user, ...data})
      disableEdit();
    } catch (error) {
      console.log("error updating profile...", error);
      setIcon("bi bi-x-circle-fill text-red-500");
      setMessage("Cannot perform action. Please try again later.");
    }

    handleShowToast();
  };

  return (
    <>
      <h1 className="text-2xl font-bold pt-4">Profile Information</h1>
      <p className="mb-4 text-gray-500">
        Enter your updated profile information
      </p>
      <Formik
        initialValues={{
          firstName: user.first_name,
          lastName: user.last_name,
          phoneNumber: formatPhoneNumber(user.phone_number) ?? "",
        }}
        onSubmit={handleUpdateProfile}
        enableReinitialize={true}
        validationSchema={UpdateProfileSchema}
      >
        {(props) => (
          <Form>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col mb-4 lg:me-4 justify-between w-full flex-wrap">
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
                  className="border-2 p-1 disabled:bg-gray-200"
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-col mb-4 lg:me-4 justify-between w-full flex-wrap">
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
                  className="border-2 p-1 disabled:bg-gray-200"
                  disabled={!isEditable}
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
                onBlur={(e) => {
                  props.getFieldProps(e.target.name).onBlur(e);
                }}
                disabled={!isEditable}
              />
            </div>

            {!isEditable && (
              <input
                type="button"
                value="Edit Profile"
                className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
                onClick={enableEdit}
              />
            )}

            {isEditable && (
              <>
                <button
                  type="button"
                  className="p-2 rounded w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer mb-2 disabled:bg-red-400"
                  onClick={(e) => handleCancel(props)}
                  disabled={props.isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center p-2 rounded w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:bg-green-400"
                  disabled={
                    !props.isValid ||
                    props.isSubmitting ||
                    areTheSame(props.values)
                  }
                >
                  <Spinner isLoading={props.isSubmitting}></Spinner>
                  {props.isSubmitting ? "Updating..." : "Update"}
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
      <Toast icon={icon} message={message} showToast={showToast} />
    </>
  );
};

export default ProfileSettings;
