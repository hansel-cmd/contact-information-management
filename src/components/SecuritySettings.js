const SecuritySettings = ({ isEditable, enableEdit, disableEdit }) => {
  return (
    <>
      <h1 className="text-2xl font-bold pt-4">Security Settings</h1>
      <p className="mb-4 text-gray-500">
        Provide your old password and enter a new password
      </p>
      <form action="">
        <div className="flex flex-col mb-4">
          <label htmlFor="oldPassword" className="mb-1">
            Old Password
          </label>
          <input
            id="oldPassword"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={!isEditable}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="newPassword" className="mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            type="text"
            className="border-2 p-1 disabled:bg-gray-200"
            disabled={!isEditable}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="confirmPassword" className="mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
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
    </>
  );
};

export default SecuritySettings;
