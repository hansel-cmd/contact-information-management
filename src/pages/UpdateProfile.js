import { useState } from "react";
import PageTitle from "../components/PageTitle";

const UpdateProfile = () => {
  const [isEditable, setIsEditable] = useState(false);

  const enableEdit = () => {
    setIsEditable(true);
  };

  const disableEdit = () => {
    // reset changes
    setIsEditable(false);
  };

  return (
    <>
      <PageTitle icon={"bi bi-floppy-fill"} title={"Update Profile"} />
      <div className="flex justify-center items-center flex-col">
        <div className="border-2 rounded w-full lg:w-auto p-5 shadow-lg">
          <h1 className="text-2xl font-bold pt-4">Profile Information</h1>
          <p className="mb-4 text-gray-500">
            Enter your updated profile information
          </p>
          <form action="">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col mb-4 lg:me-4">
                <label htmlFor="firstName" className="mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="border-2 p-1 disabled:bg-gray-200"
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="lastName" className="mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="border-2 p-1 disabled:bg-gray-200"
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="border-2 p-1 disabled:bg-gray-200"
                disabled={!isEditable}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phoneNumber" className="mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                className="border-2 p-1 disabled:bg-gray-200"
                disabled={!isEditable}
              />
            </div>

            {!isEditable && (
              <input
                type="button"
                value="Edit Profile"
                className="p-2 rounded w-full bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
                onClick={enableEdit}
              />
            )}

            {isEditable && (
              <>
                <input
                  type="button"
                  value="Cancel"
                  className="p-2 rounded w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer mb-2"
                  onClick={disableEdit}
                />
                <input
                  type="submit"
                  value="Update"
                  className="p-2 rounded w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                />
              </>
            )}
          </form>
          <div className="border-x-4 h-1 my-2"></div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
