import { Link } from "react-router-dom";
import { LOGIN } from "../routes/route";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SignUpSchema, PasswordSchema } from "../validations/Signup";
import Api from "../services/api";
import { useState } from "react";
import VerifyModal from "../components/VerifyModal";
import { useModal } from "../hooks/useModal";
import Spinner from "../components/Spinner";

const Signup = () => {
  const { shouldShowModal, openModal, closeModal } = useModal();
  const [verificationError, setVerificationError] = useState("");
  const [showPasswordObj, setShowPasswordObj] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (value) => {
    let error;
    try {
      PasswordSchema.validateSync({ password: value });
    } catch (validationError) {
      error = validationError.errors[0];
    }
    return error;
  };

  const handleShowPassword = (id) => {
    setShowPasswordObj((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const handleCancel = () => {
    // delete the user, and its emailconfirmationtoken instances

    closeModal()
  }

  const handleSubmit = (values, actions) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        openModal();
      }, 5000);
    });
  };

  const handleVerify = () => {
    // verify otp sent

    // if sucessful, close the modal.
    // closeModal()

    // otherwise, show an error.
    setVerificationError("The provided 6-digit code is incorrect/invalid.");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-[28rem] lg:w-[514px] p-5 shadow-lg">
        <h1 className="text-2xl font-bold pt-4">Create an account</h1>
        <p className="mb-4 text-gray-500">
          Enter your information to create your account
        </p>
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
        errorMessage={verificationError}
        fnCancel={handleCancel}
        showModal={shouldShowModal}
        continueLabel={"Verify Email Address"}
        fnContinue={handleVerify}
      ></VerifyModal>
    </div>
  );
};

export default Signup;
