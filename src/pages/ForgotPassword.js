import { Link } from "react-router-dom";
import { LOGIN } from "../routes/route";

const ForgotPassword = () => {
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
        <form action="">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input id="email" type="text" className="border-2 p-1" />
          </div>
          <input
            type="submit"
            value="Retrieve Password"
            className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
          />
        </form>
        <div className="border-x-4 h-1 my-2"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
