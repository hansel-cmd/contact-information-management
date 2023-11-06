import { Link } from "react-router-dom";
import { SIGNUP, FORGOT_PASSWORD } from "../routes/route";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginSchema } from "../validations/Login";
import Api from "../services/api";
import ErrorMessageContainer from "../components/ErrorMessageContainer";
import Spinner from "../components/Spinner";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values, actions) => {
    try {
      const response = await Api().post("login/", values);
      console.log(response);

      if (response.status === 200) {
        // Better use redux to handle tokens.
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      setLoginError("");
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
    </div>
  );
};

export default Login;
