import { Link } from "react-router-dom";
import { SIGNUP, FORGOT_PASSWORD } from "../routes/route";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoginSchema } from "../validations/Login";
import Api from "../services/api";
import ErrorMessageContainer from "../components/ErrorMessageContainer";


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
                <div
                  role="status"
                  className={props.isSubmitting ? "block" : "hidden"}
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
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
