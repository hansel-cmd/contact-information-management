import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "./Spinner";
import Toast from "./Toast";
import { useToast } from "../hooks/useToast";
import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import { sendPUTRequest } from "../services/service";
import { useEdit } from "../hooks/useEdit";
import createUsernameSchema from "../validations/AccountSettings";

const AccountSettings = () => {
  const { isEditable, enableEdit, disableEdit } = useEdit();
  const { showToast, handleShowToast } = useToast(3000);
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const handleCancel = (props) => {
    props.resetForm();
    disableEdit();
  };

  const handleUpdate = async (values, actions) => {
    try {
      await sendPUTRequest(values, "user/update-account/");
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Updated Successfully!");
      setUser({ ...user, username: values.username });
      disableEdit();
    } catch (error) {
      console.log("error handling update account information", error);
      setIcon("bi bi-x-circle-fill text-red-500");
      setMessage("Cannot perform action. Please try again later.");
    }
    handleShowToast();
  };

  const UsernameSchema = createUsernameSchema(user.id)

  return (
    <>
      <h1 className="text-2xl font-bold pt-4 dark:text-white">Account Information</h1>
      <p className="mb-4 text-gray-500 dark:text-fontDark-600">Update your username</p>
      <Formik
        initialValues={{ username: user.username }}
        onSubmit={handleUpdate}
        enableReinitialize={true}
        validationSchema={UsernameSchema}
      >
        {(props) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="mb-1 dark:text-fontDark-600">
                Username
              </label>
              <ErrorMessage name="username">
                {(error) => <p className="text-red-600">{error}</p>}
              </ErrorMessage>
              <Field
                id="username"
                name="username"
                type="text"
                className="border-2 p-1 disabled:bg-gray-200 dark:disabled:bg-gray-400"
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
                  className="flex items-center justify-center p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer disabled:bg-primary-400"
                  disabled={
                    !props.isValid ||
                    user.username === props.values.username ||
                    props.isSubmitting
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

export default AccountSettings;
