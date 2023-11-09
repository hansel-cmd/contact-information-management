import { Link } from "react-router-dom";
import { LOGIN } from "../routes/route";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SignUpSchema } from "../validations/Signup";
import { useState } from "react";
import VerifyModal from "../components/VerifyModal";
import { useModal } from "../hooks/useModal";
import Spinner from "../components/Spinner";
import ErrorMessageContainer from "../components/ErrorMessageContainer";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { sendDELETERequest, sendPOSTRequest, sendPUTRequest } from "../services/service";
import { usePassword } from "../hooks/usePassword";
import {removeExtraSpaces} from "../utils/utilities";

const modalTitle = "Enter the 6-digit code";
const modalHeaderBody = (
  <span>
    You're almost there! Kindly check your email for a{" "}
    <strong>6-digit verification code</strong> to complete your account setup.
  </span>
);
const modalFooterBody =
  "Leaving this page without verifying your email address won't allow you access to the application.";

const Signup = () => {
  const [formActions, setFormActions] = useState(null);
  const { showToast, handleShowToast } = useToast(3000);
  const { shouldShowModal, openModal, closeModal } = useModal();
  const [userId, setuserId] = useState(null);
  const [signUpError, setSignUpError] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const { showPasswordObj, handleShowPassword, validatePassword } =
    usePassword();

  const handleCancel = async () => {
    // delete the user when it was signed up but email was not confirmed
    try {
      await sendDELETERequest(`users/delete/${userId}`);
      setVerificationError("");
    } catch (err) {
      formActions.resetForm();
    }

    closeModal();
  };

  const handleSubmit = async (values, actions) => {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
      confirm_password: values.confirmPassword,
    };

    try {
      const response = await sendPOSTRequest(data, "signup/");
      const emailResponse = await sendPOSTRequest(
        { user_id: response.data.id, email: response.data.email },
        "send-email-confirmation/"
      );
      if (emailResponse.status === 200) {
        setFormActions(actions);
        setuserId(response.data.id);
        setSignUpError("");
        openModal();
      }
    } catch (err) {
      console.log("sign up error:", err);
      setSignUpError("Cannot create an account. Please try again later.");
      return;
    }
  };

  const handleVerify = async (otp) => {
    try {
      const response = await sendPUTRequest(
        {
          user_id: userId,
          token: otp.join(""),
        },
        "verify-email-confirmation/"
      );
      if (response.status === 200) {
        closeModal();
        setVerificationError("");
        formActions.resetForm();
        setuserId(null);

        // show success message!
        handleShowToast();
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setVerificationError("The provided 6-digit code is invalid/expired.");
        return;
      }
      setVerificationError("Cannot perform action. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-[28rem] lg:w-[514px] p-5 shadow-lg">
        <h1 className="text-2xl font-bold pt-4">Create an account</h1>
        <p className="mb-4 text-gray-500">
          Enter your information to create your account
        </p>
        <ErrorMessageContainer
          icon={"bi bi-exclamation-circle"}
          msg={signUpError}
        />
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={SignUpSchema}
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
                    className="border-2 p-1 w-full"
                    onBlur={(e) =>removeExtraSpaces(e, props)}
                  />
                </div>
                <div className="flex flex-col mb-4 justify-between w-full flex-wrap">
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
                    className="border-2 p-1 w-full"
                    onBlur={(e) =>removeExtraSpaces(e, props)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-1">
                  Email Address
                </label>
                <ErrorMessage name="email">
                  {(error) => <p className="text-red-600">{error}</p>}
                </ErrorMessage>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="border-2 p-1"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="mb-1">
                  Username
                </label>
                <ErrorMessage name="username">
                  {(error) => <p className="text-red-600">{error}</p>}
                </ErrorMessage>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  className="border-2 p-1"
                />
              </div>
              <div className="flex flex-col mb-4 relative">
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
                    validate={validatePassword}
                    className="border-2 p-1 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleShowPassword("password")}
                    className="absolute top-[5px] right-1 border-2 border-transparent w-10"
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
              <div className="flex flex-col mb-4 relative">
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
                    className="border-2 p-1 w-full"
                  />
                  <button
                    type="button"
                    name="confirmPassword"
                    onClick={() => handleShowPassword("confirmPassword")}
                    className="absolute top-[5px] right-1 border-2 border-transparent w-10"
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
              <button
                type="submit"
                className="flex justify-center items-center p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer disabled:bg-blue-400"
                disabled={props.isSubmitting || !props.isValid}
              >
                <Spinner isLoading={props.isSubmitting} />
                {props.isSubmitting ? "Signing Up" : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="border-x-4 h-1 my-2"></div>
        <div className="border-t-2 pt-4">
          <p>
            Already have an account?
            <span className="text-blue-700 font-semibold ms-1">
              <Link to={LOGIN} className="hover:underline underline-offset-2">
                Sign In
              </Link>
            </span>
          </p>
        </div>
      </div>

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
      <Toast
        message="Your account is successfully created!"
        showToast={showToast}
      />
    </div>
  );
};

export default Signup;
