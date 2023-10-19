import { Link } from "react-router-dom";
import { SIGNUP, FORGOT_PASSWORD } from "../routes/route";

const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-80 sm:w-96 p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 pt-4">
          Sign in to your account
        </h1>
        <form action="">
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input id="username" type="text" className="border-2 p-1" />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input type="password" className="border-2 p-1" />
            <button className="absolute top-1/2 right-1 border-2 border-transparent w-10">
              <i class="bi bi-eye-fill"></i>
            </button>
          </div>
          <div className="my-2">
            <Link
              to={FORGOT_PASSWORD}
              className="text-blue-700 font-semibold hover:underline underline-offset-2"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            type="submit"
            value="Sign in"
            className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
          />
        </form>
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
