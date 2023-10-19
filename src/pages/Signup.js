import { Link } from "react-router-dom";
import {LOGIN } from "../routes/route";

const Signup = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border-2 rounded w-[28rem] lg:w-auto p-5 shadow-lg">
        <h1 className="text-2xl font-bold pt-4">Create an account</h1>
        <p className="mb-4 text-gray-500">Enter your information to create your account</p>
        <form action="">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:me-4">
              <label htmlFor="firstName" className="mb-1">
                First Name
              </label>
              <input id="firstName" type="text" className="border-2 p-1" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="lastName" className="mb-1">
                Last Name
              </label>
              <input id="lastName" type="text" className="border-2 p-1" />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1">
              Email Address
            </label>
            <input id="email" type="email" className="border-2 p-1" />
          </div>
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
            <input id="password" type="password" className="border-2 p-1" />
            <button className="absolute top-1/2 right-1 border-2 border-transparent w-10">
              <i class="bi bi-eye-fill"></i>
            </button>
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="confirmPassword" className="mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="border-2 p-1"
            />
            <button className="absolute top-1/2 right-1 border-2 border-transparent w-10">
              <i class="bi bi-eye-fill"></i>
            </button>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
          />
        </form>
        <div className="border-x-4 h-1 my-2"></div>
        <div className="border-t-2 pt-4">
          <p>
            Already have an account?
            <span className="text-blue-700 font-semibold ms-1">
              <Link to={LOGIN} className="hover:underline underline-offset-2">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
