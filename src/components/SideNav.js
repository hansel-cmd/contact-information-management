import { useLocation } from "react-router";
import NavigationLink from "./NavigationLink";
import { NAVIGATION, ACTIONS, OTHERS } from "../routes/navigationLinks";
import { sendPOSTRequest } from "../services/service";
import { getItem, removeItem } from "../services/localStorage";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../routes/route";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const SideNav = ({ isOpen, handleToggleSideNav, WIDE, NARROW }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext)

  const handleLogout = async () => {
    const refresh_token = getItem("refresh_token");
    try {
      await sendPOSTRequest({ refresh_token }, "logout/");
      removeItem("token");
      removeItem("refresh_token");
      setUser({})
      navigate(LOGIN, { replace: true });
    } catch (error) {
      console.log("logout failed.", error);
    }
  };

  return (
    <div
      className={`gap-10 ${
        isOpen ? WIDE : NARROW
      } h-full flex-initial bg-primary-600 dark:bg-primaryDark-700 fixed duration-300`}
    >
      <div className="h-screen relative">
        <NavigationLink
          divider={"Navigation"}
          isOpen={isOpen}
          links={NAVIGATION}
          location={location.pathname}
        />

        <NavigationLink
          divider={"Actions"}
          isOpen={isOpen}
          links={ACTIONS}
          location={location.pathname}
        />

        {/* Logout */}
        <NavigationLink
          divider={null}
          isOpen={isOpen}
          links={OTHERS}
          location={location.pathname}
          isLogout={true}
          fn={handleLogout}
        />
      </div>

      <div className="absolute right-[-10px] top-0 hidden md:block">
        <button
          className={`bg-primary-700 dark:bg-accentDark-700 dark:hover:bg-primaryDark-700 w-7 h-7 rounded-full hover:bg-blue-900 ${
            !isOpen ? "rotate-180" : ""
          } duration-300`}
          onClick={handleToggleSideNav}
        >
          <i className="bi bi-caret-left-fill rounded-full text-[12px] text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
