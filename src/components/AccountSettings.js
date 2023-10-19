const AccountSettings = ({ isEditable, enableEdit, disableEdit }) => {
  return (
    <>
      <h1 className="text-2xl font-bold pt-4">Account Information</h1>
      <p className="mb-4 text-gray-500">
        Update your username
      </p>
      <form action="">
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input id="username" type="text" className="border-2 p-1 disabled:bg-gray-200" disabled={!isEditable}/>
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

export default AccountSettings;
