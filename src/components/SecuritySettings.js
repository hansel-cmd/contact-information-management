import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "./Spinner";
import Toast from "./Toast";
import { useToast } from "../hooks/useToast";
import { useEdit } from "../hooks/useEdit";
import SecuritySettingsSchema from "../validations/SecuritySettings";
import { usePassword } from "../hooks/usePassword";
import { sendPUTRequest } from "../services/service";

const SecuritySettings = () => {
  const { isEditable, enableEdit, disableEdit } = useEdit();
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");
  const { showToast, handleShowToast } = useToast(3000);
  const { showPasswordObj, handleShowPassword, validatePassword } =
    usePassword();

  const handleCancel = (props) => {
    props.resetForm();
    disableEdit();
  };

  const handleUpdateSecurity = async (values, actions) => {
    try {
      await sendPUTRequest(
        {
          old_password: values.oldPassword,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        },
        "user/update-password/"
      );
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Updated Successfully!");
      disableEdit();
    } catch (error) {
      console.log("error updating password", error);
      setIcon("bi bi-x-circle-fill text-red-500");
      setMessage('Cannot perform action. Please try again later.');
    }
    handleShowToast();
  };

  return (
    <>
      <h1 className="text-2xl font-bold pt-4">Security Settings</h1>
      <p className="mb-4 text-gray-500">
        Provide your old password and enter a new password
      </p>
      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleUpdateSecurity}
        validationSchema={SecuritySettingsSchema}
      >
        {(props) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor="oldPassword" className="mb-1">
                Old Password
              </label>
              <ErrorMessage name="oldPassword">
                {(error) => <p className="text-red-600">{error}</p>}
              </ErrorMessage>
              <div className="relative">
                <Field
                  id="oldPassword"
                  name="oldPassword"
                  type={showPasswordObj["oldPassword"] ? "text" : "password"}
                  className="border-2 p-1 disabled:bg-gray-200 w-full"
                  disabled={!isEditable}
                />
                <button
                  type="button"
                  name="oldPassword"
                  onClick={() => handleShowPassword("oldPassword")}
                  className={`${
                    isEditable ? "absolute" : "hidden"
                  } top-[5px] right-1 border-2 border-transparent w-10`}
                >
                  <i
                    className={`bi ${
                      showPasswordObj["oldPassword"]
                        ? "bi-eye-fill"
                        : "bi-eye-slash-fill"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <ErrorMessage name="password">
                {(error) => <p className="text-red-600">{error}</p>}
              </ErrorMessage>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPasswordObj["password"] ? "text" : "password"}
                  className="border-2 p-1 disabled:bg-gray-200 w-full"
                  validate={validatePassword}
                  disabled={!isEditable}
                />
                <button
                  type="button"
                  name="password"
                  onClick={() => handleShowPassword("password")}
                  className={`${
                    isEditable ? "absolute" : "hidden"
                  } top-[5px] right-1 border-2 border-transparent w-10`}
                >
                  <i
                    className={`bi ${
                      showPasswordObj["password"]
                        ? "bi-eye-fill"
                        : "bi-eye-slash-fill"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="confirmPassword" className="mb-1">
                Confirm Password
              </label>
              <ErrorMessage name="confirmPassword">
                {(error) => <p className="text-red-600">{error}</p>}
              </ErrorMessage>
              <div className="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showPasswordObj["confirmPassword"] ? "text" : "password"
                  }
                  className="border-2 p-1 disabled:bg-gray-200 w-full"
                  validate={validatePassword}
                  disabled={!isEditable}
                />
                <button
                  type="button"
                  name="confirmPassword"
                  onClick={() => handleShowPassword("confirmPassword")}
                  className={`${
                    isEditable ? "absolute" : "hidden"
                  } top-[5px] right-1 border-2 border-transparent w-10`}
                >
                  <i
                    className={`bi ${
                      showPasswordObj["confirmPassword"]
                        ? "bi-eye-fill"
                        : "bi-eye-slash-fill"
                    }`}
                  ></i>
                </button>
              </div>
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
                  disabled={!props.isValid || props.isSubmitting}
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

export default SecuritySettings;
