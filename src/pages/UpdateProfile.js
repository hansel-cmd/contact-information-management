import PageTitle from "../components/PageTitle";

const UpdateProfile = () => {
  return (
    <>
      <PageTitle icon={"bi bi-floppy-fill"} title={"Update Profile"} />
      <div className="flex justify-center items-center flex-col">
        <div className="border-2 rounded w-[28rem] lg:w-auto p-5 shadow-lg">
          <h1 className="text-2xl font-bold pt-4">Create an account</h1>
          <p className="mb-4 text-gray-500">
            Enter your information to create your account
          </p>
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
            <input
              type="submit"
              value="Sign Up"
              className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
            />
          </form>
          <div className="border-x-4 h-1 my-2"></div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
