import { Link, useNavigate } from "react-router-dom";
import { SIGNUP, FORGOT_PASSWORD } from "../routes/route";
import { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginSchema } from "../validations/Login";
import ErrorMessageContainer from "../components/ErrorMessageContainer";
import Spinner from "../components/Spinner";
import AuthContext from "../context/authContext";
import VerifyModal from "../components/VerifyModal";
import { useModal } from "../hooks/useModal";
import { sendPOSTRequest, sendPUTRequest } from "../services/service";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { INDEX } from "../routes/route";
import { setItem } from "../services/localStorage";

const modalTitle = "Enter the 6-digit code";
const modalHeaderBody = (
  <span>
    We have sent a <strong>6-digit code</strong> to your email for email
    verification.
  </span>
);
const modalFooterBody =
  "You must verify your email address before you can log in.";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { shouldShowModal, closeModal, openModal } = useModal();
  const [verificationError, setVerificationError] = useState("");
  const { showToast, handleShowToast } = useToast(3000);
  const navigate = useNavigate();
  // These are the tokens returned when we log in but the email was not yet verified.
  // We can reuse these tokens once the email is verified.
  const [tokens, setTokens] = useState({});

  const handleVerify = async (otp) => {
    try {
      const response = await sendPUTRequest(
        {
          user_id: user.id,
          token: otp.join(""),
        },
        "verify-email-confirmation/"
      );
      if (response.status === 200) {
        closeModal();
        setVerificationError("");

        // show success message!
        handleShowToast();

        setUser((current) => ({ ...current, is_email_confirmed: true }));

        // set the tokens from when we logged in
        setItem("token", tokens.token);
        setItem("refresh_token", tokens.refresh);

        // proceed to the dashboard.
        setTimeout(() => {
          navigate(INDEX, { replace: true });
        }, 1200);
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
      const response = await sendPOSTRequest(values, "login/");
      console.log("logging in", response);
      if (response.data?.user?.is_email_confirmed) {
        setItem("token", response.data.access);
        setItem("refresh_token", response.data.refresh);

        setLoginError("");
        setUser({ ...response.data?.user });

        // proceed to the dashboard.
        navigate(INDEX, { replace: true });

        return;
      }

      // send email verification.
      try {
        console.log("i am sending email verification...");
        const emailResponse = await sendPOSTRequest(
          {
            user_id: response.data?.user?.id,
            email: response.data?.user?.email,
          },
          "send-email-confirmation/"
        );

        if (emailResponse.status === 200) {
          setLoginError("");
          setUser({ ...response.data.user });
          setTokens({
            token: response.data.access,
            refresh: response.data.refresh,
          });
          // Show the modal to verify email.
          openModal();
        }
      } catch (error) {
        setLoginError("Cannot perform action. Please try again later.");
        return;
      }
    } catch (err) {
      // Invalid credentials.
      if (err?.response?.status === 401) {
        setLoginError("Incorrect Username/Password.");
        return;
      }
      setLoginError("Cannot perform action. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-80 sm:w-96 p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 pt-4">
          Sign in to your account
        </h1>
        <ErrorMessageContainer
          icon={"bi bi-exclamation-circle"}
          msg={loginError}
        />

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          {(props) => (
            <Form>
              <div className="flex flex-col mb-4">
                <label htmlFor="username" className="mb-1">
                  Username
                </label>
                <ErrorMessage name="username">
                  {(error) => <p className="text-red-600">{error}</p>}
                </ErrorMessage>
                <Field
                  id="username"
                  type="text"
                  name="username"
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
                    type={showPassword ? "text" : "password"}
                    className="border-2 p-1 w-full"
                  />
                  <button
                    type="button"
                    className="absolute top-[5px] right-1 border-2 border-transparent w-10"
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="my-2">
                <Link
                  to={FORGOT_PASSWORD}
                  className="text-blue-700 font-semibold hover:underline underline-offset-2"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer disabled:bg-blue-400"
                disabled={props.isSubmitting}
              >
                <Spinner isLoading={props.isSubmitting}></Spinner>
                {props.isSubmitting ? "Signing in" : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="border-x-4 h-1 my-2"></div>
        <div className="border-t-2 pt-4">
          <p>
            Don't have an account yet?
            <span className="text-blue-700 font-semibold ms-1">
              <Link to={SIGNUP} className="hover:underline underline-offset-2">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>

      <VerifyModal
        modalTitle={modalTitle}
        modalHeaderBody={modalHeaderBody}
        modalFooterBody={modalFooterBody}
        showModal={shouldShowModal}
        fnCancel={() => {
          setVerificationError("");
          closeModal();
        }}
        fnContinue={handleVerify}
        errorMessage={verificationError}
      ></VerifyModal>

      <Toast
        message="Your email address has been verified! Redirecting..."
        showToast={showToast}
      />
    </div>
  );
};

export default Login;
