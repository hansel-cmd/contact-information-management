import { Formik, Field, Form, ErrorMessage } from "formik";
import Spinner from "./Spinner";
import Toast from "./Toast";
import { useToast } from "../hooks/useToast";
import { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import { sendPUTRequest, sendPOSTRequest } from "../services/service";
import { useEdit } from "../hooks/useEdit";
import { createEmailUpdateSchema } from "../validations/UpdateProfile";
import { useModal } from "../hooks/useModal";
import VerifyModal from "./VerifyModal";

const modalTitle = "Enter the 6-digit code";
const modalHeaderBody = (
  <span>
    We have sent a <strong>6-digit code</strong> to your new email for verification.
  </span>
);
const modalFooterBody =
  "Leaving this page without verifying your new email address won't update your profile's email address.";

const EmailProfileSettings = () => {
  const { isEditable, enableEdit, disableEdit } = useEdit();
  const { showToast, handleShowToast } = useToast(3000);
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { shouldShowModal, closeModal, openModal } = useModal();
  const [verificationError, setVerificationError] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [formActions, setFormActions] = useState(null);

  const handleCancel = (props) => {
    if (props) props.resetForm();
    else {
        formActions.resetForm();
        closeModal();
    };
    disableEdit();
  };

  const handleUpdateEmail = async () => {
    try {
      await sendPUTRequest({ email: userEmail }, "user/update-account/");
      setIcon("bi bi-check-circle-fill text-green-500");
      setMessage("Updated Successfully!");
      setUser({ ...user, email: userEmail });
      disableEdit();
    } catch (error) {
      console.log("error handling update email information", error);
      setIcon("bi bi-x-circle-fill text-red-500");
      setMessage("Cannot perform action. Please try again later.");
    } finally {
      closeModal();
      handleShowToast();
      setVerificationError("");
    }
  };

  const handleVerify = async (otp) => {
    try {
      const response = await sendPUTRequest(
        { token: otp.join("") },
        "user/update-email/"
      );
      if (response.status === 200) {
        // update email
        await handleUpdateEmail();
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 400) {
        setVerificationError("The provided 6-digit code is invalid/expired.");
        return;
      }
      setVerificationError("Cannot perform action. Please try again later.");
    }
  };

  const handleSubmit = async (values, actions) => {
    console.log("UPDATING EMAIL...", values);
    try {
      // send a confirmation email
      const emailResponse = await sendPOSTRequest(values, "user/update-email/");
      if (emailResponse.status === 200) {
        setFormActions(actions);
        setUserEmail(values.email);
        openModal();
      }
    } catch (error) {
      console.log("error handling update email information", error);
      setIcon("bi bi-x-circle-fill text-red-500");
      setMessage("Cannot perform action. Please try again later.");
      handleShowToast();
    }
  };

  const EmailUpdateSchema = createEmailUpdateSchema(user.id);

  return (
    <>
      <h1 className="text-2xl font-bold pt-4">Email Information</h1>
      <p className="mb-4 text-gray-500">Update your email address</p>
      <Formik
        initialValues={{ email: user.email }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={EmailUpdateSchema}
      >
        {(props) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <ErrorMessage name="email">
                {(error) => <p className="text-red-600">{error}</p>}
              </ErrorMessage>
              <Field
                id="email"
                name="email"
                type="text"
                className="border-2 p-1 disabled:bg-gray-200"
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
                    user.email === props.values.email ||
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
      <VerifyModal
        modalTitle={modalTitle}
        modalHeaderBody={modalHeaderBody}
        modalFooterBody={modalFooterBody}
        errorMessage={verificationError}
        fnCancel={handleCancel}
        showModal={shouldShowModal}
        continueLabel={"Verify Email Address"}
        fnContinue={handleVerify}
      ></VerifyModal>

      <Toast icon={icon} message={message} showToast={showToast} />
    </>
  );
};

export default EmailProfileSettings;
