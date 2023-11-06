import { Link } from "react-router-dom";
import { LOGIN } from "../routes/route";
import VerifyModal from "../components/VerifyModal";
import { useModal } from "../hooks/useModal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ForgotPasswordSchema } from "../validations/ForgotPassword";
import { useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessageContainer from "../components/ErrorMessageContainer";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { usePassword } from "../hooks/usePassword";
import {
  sendGETRequest,
  sendPOSTRequest,
  sendPUTRequest,
} from "../services/service";

const modalTitle = "Enter the 6-digit code";
const modalHeaderBody = (
  <span>
    We have sent a <strong>6-digit code</strong> to your email for password
    reset verification.
  </span>
);

const ForgotPassword = () => {
  const { showToast, handleShowToast } = useToast(3000);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const { shouldShowModal, closeModal, openModal } = useModal();
  const [showOthers, setShowOthers] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // An error state that is not handled by the Formik.
  const [email, setEmail] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const { showPasswordObj, handleShowPassword, validatePassword } =
    usePassword();

  const handleCancel = () => {
    setVerificationError("");
    closeModal();
  };

  const handleSendOTP = async (values, actions, email) => {
    if (!email) {
      setEmailError("Email is required.");
      setTimeout(() => {
        setEmailError("");
      }, 1500);
      return;
    }
    setIsGeneratingToken(true);
    try {
      const response = await sendPOSTRequest(
        { email },
        "generate-forgot-password-token/"
      );
      if (response.status === 200) {
        setEmail(email);
        openModal();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setError("Email is not linked to any account.");
        return;
      }
      setError("Cannot Perform Action. Please try again later.");
    }

    setIsGeneratingToken(false);
  };

  const handleVerifyOTP = async (otp) => {
    console.log(otp)
    try {
      const response = await sendGETRequest(
        `validate-forgot-password-token/?email=${email}&token=${otp.join("")}`
      );
      if (response.status === 200) {
        setVerificationError("");
        closeModal();
        setShowOthers(true);
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setVerificationError("The provided 6-digit code is invalid/expired.");
        return;
      }
      setVerificationError("Cannot perform action. Please try again later.");
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await sendPUTRequest(
        {
          email: values.email,
          password: values.password,
          confirm_password: values.confirmPassword,
        },
        "reset-password/"
      );

      if (response.status === 200) {
        setError("");
        setShowOthers(false);
        actions.resetForm();

        handleShowToast();
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setError(err.response.data.error);
        return;
      }
      setError("Cannot Perform Action. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-80 sm:w-96 p-5 shadow-lg">
        <button>
          <Link to={LOGIN}>
            <p className="text-4xl group">
              <i className="bi bi-arrow-left-circle group-hover:hidden"></i>
              <i className="bi bi-arrow-left-circle-fill hidden group-hover:block"></i>
            </p>
          </Link>
        </button>
        <h1 className="text-2xl font-bold mb-4 pt-4">
          Enter your email address
        </h1>
        <p className="mb-4 text-gray-500">
          Enter your email address associated to your account to retrieve your
          password
        </p>
        <ErrorMessageContainer icon={"bi bi-exclamation-circle"} msg={error} />
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
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

                <p className="text-red-600">{emailError}</p>
                <Field
                  id="email"
                  type="text"
                  name="email"
                  className="border-2 p-1 disabled:bg-gray-200"
                  disabled={showOthers}
                />
              </div>

              <button
                type="submit"
                className={` ${
                  showOthers ? "hidden" : "flex"
                } justify-center items-center p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer disabled:bg-blue-400`}
                onClick={(values, actions) =>
                  handleSendOTP(values, actions, props.values.email)
                }
                disabled={
                  !props.values.email ||
                  "email" in props.errors ||
                  isGeneratingToken
                }
              >
                <Spinner isLoading={isGeneratingToken}></Spinner>
                {isGeneratingToken ? "Checking Email..." : "Reset Password"}
              </button>

              {/* Others */}

              <div className={showOthers ? "block" : "hidden"}>
                <div className="flex flex-col mb-4 relative">
                  <label htmlFor="password" className="mb-1">
                    New Password
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
                  className="flex justify-center items-center p-2 rounded w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer disabled:bg-red-400"
                  disabled={!props.isValid || props.isSubmitting}
                >
                  <Spinner isLoading={props.isSubmitting}></Spinner>
                  {props.isSubmitting
                    ? "Resetting Password..."
                    : "Reset Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="border-x-4 h-1 my-2"></div>
      </div>

      <VerifyModal
        modalTitle={modalTitle}
        modalHeaderBody={modalHeaderBody}
        showModal={shouldShowModal}
        errorMessage={verificationError}
        fnCancel={handleCancel}
        fnContinue={handleVerifyOTP}
      ></VerifyModal>

      <Toast
        message="Your account password has been reset!"
        showToast={showToast}
      ></Toast>
    </div>
  );
};

export default ForgotPassword;
