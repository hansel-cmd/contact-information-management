import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes/route";
import { useDarkMode } from "../hooks/useDarkMode";
import AuthContext from "../context/authContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("navbar:", user);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const openOffCanvas = () => {
    setShowOffCanvas(true);
  };

  const closeOffCanvas = () => {
    setShowOffCanvas(false);
  };

  if (showOffCanvas) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="bg-primary-600 fixed top-0 w-full py-2 px-5 flex justify-between z-50">
      <img src="/assets/logo512.png" alt="logo" className="w-[64px] h-[64px]" />
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer me-4 pe-4 border-e-2 border-white">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={toggleDarkMode}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
           peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
             after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
             after:transition-all dark:border-gray-600 peer-checked:bg-black"
          ></div>
          <span className="ml-3 text-sm font-medium text-white dark:text-yellow-500">
            <i
              className={
                isDarkMode ? "bi bi-moon-stars-fill" : "bi bi-sun-fill"
              }
            ></i>
          </span>
        </label>
        <p className="text-white">Hello, {user?.first_name}!</p>
        <span
          className="inline-block h-10 w-10 rounded-full overflow-hidden ms-3 cursor-pointer"
          onClick={openOffCanvas}
        >
          <img src="/assets/toArise.jpg" alt="icon" className="object-cover" />
        </span>
      </div>

      <div
        id="off-canvas"
        className={`${
          showOffCanvas ? "absolute" : "hidden"
        } top-0 left-0 min-h-screen w-full`}
      >
        <div className="absolute min-h-full w-full bg-black opacity-80"></div>
        <div className="fixed right-0 top-0 min-h-screen h-full w-96 opacity-100 bg-white overflow-y-auto transform duration-300">
          <div className="flex bg-white grow items-center px-4 pt-4 pb-2 justify-between border-b-2">
            <h1 className="font-bold text-3xl">Menu</h1>
            <button className="text-2xl" onClick={closeOffCanvas}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="flex p-4 gap-4 items-center">
            <img
              src="/assets/toArise.jpg"
              alt=""
              className="w-32 h-32 rounded-lg"
            />
            <div className="flex flex-wrap flex-col">
              <p className="text-lg font-bold">Katarina Yu</p>
              <p className="text-sm text-gray-600">
                <span className="me-2">
                  <i className="bi bi-person-badge-fill"></i>
                </span>
                katarinayu08
              </p>
              <p className="text-sm text-gray-600">
                <span className="me-2">
                  <i className="bi bi-envelope-at-fill"></i>
                </span>
                katarinayu@gmail.com
              </p>
              <p className="text-sm text-gray-600">
                <span className="me-2">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                +63 927 123 1234
              </p>
              <p className="text-sm text-gray-600">
                <span className="me-2">
                  <i className="bi bi-house-fill"></i>
                </span>
                719 Manuel L. Quezon Street Avenue Gangnamgu, Seoul, 6014
              </p>
            </div>
          </div>
          <div className="px-4">
            <button className="rounded px-1 py-1 w-full border-2 border-gray-500 hover:bg-gray-500 hover:text-white">
              Sign Out
            </button>
          </div>
          <div className="border-b-2 h-2 w-auto mx-4"></div>

          <div className="px-4 pt-4">
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-purple-800 inline-block text-white text-lg">
                <i className="bi bi-file-earmark-person-fill"></i>
              </div>
              <div>
                <Link to={routes.INDEX} onClick={closeOffCanvas}>
                  <p className="font-semibold">All Contacts</p>
                  <p className="text-sm text-gray-600">List of your contacts</p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-teal-600 inline-block text-white text-lg">
                <i className="bi bi-star-fill"></i>
              </div>
              <div>
                <Link to={routes.FAVORITES} onClick={closeOffCanvas}>
                  <p className="font-semibold">Favorites</p>
                  <p className="text-sm text-gray-600">
                    List of your favorite contacts
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-yellow-400 inline-block text-white text-lg">
                <i className="bi bi-bag-plus-fill"></i>
              </div>
              <div>
                <Link to={routes.EMERGENCY_CONTACTS} onClick={closeOffCanvas}>
                  <p className="font-semibold">Emergency Contacts</p>
                  <p className="text-sm text-gray-600">
                    List of your emergency contacts
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-blue-800 inline-block text-white text-lg">
                <i className="bi bi-slash-circle-fill"></i>
              </div>
              <div>
                <Link to={routes.BLOCKED} onClick={closeOffCanvas}>
                  <p className="font-semibold">Blocked Contacts</p>
                  <p className="text-sm text-gray-600">
                    List of your blocked contacts
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-orange-400 inline-block text-white text-lg">
                <i className="bi bi-plus-circle-fill"></i>
              </div>
              <div>
                <Link to={routes.NEW_CONTACT} onClick={closeOffCanvas}>
                  <p className="font-semibold">New Contact</p>
                  <p className="text-sm text-gray-600">Add a new connection</p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-lime-800 inline-block text-white text-lg">
                <i className="bi bi-floppy-fill"></i>
              </div>
              <div>
                <Link to={routes.UPDATE_PROFILE} onClick={closeOffCanvas}>
                  <p className="font-semibold">Update Profile</p>
                  <p className="text-sm text-gray-600">
                    Update your personal information
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center mb-1 hover:bg-gray-300 rounded p-2 cursor-pointer">
              <div className="py-2 px-4 rounded-lg bg-red-800 inline-block text-white text-lg">
                <i className="bi bi-gear-fill"></i>
              </div>
              <div className="flex flex-wrap">
                <Link to={routes.SETTINGS} onClick={closeOffCanvas}>
                  <p className="font-semibold">Settings</p>
                  <p className="text-sm text-gray-600">
                    All about account information and security
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b-2 h-2 w-auto mx-4"></div>

          <div className="flex justify-center pb-2 pt-3 flex-wrap items-center px-4">
            <p className="text-sm text-center max-w-[280px] text-gray-600">
              Copyright ©2023 Full Scale Learning. Hans Adey Cesa - All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
