import { useLocation } from "react-router";
import NavigationLink from "./NavigationLink";
import { NAVIGATION, ACTIONS, OTHERS } from "../routes/navigationLinks";

const SideNav = ({ isOpen, handleToggleSideNav, WIDE, NARROW }) => {
  const location = useLocation();

  return (
    <div
      className={`gap-10 ${
        isOpen ? WIDE : NARROW
      } h-full flex-initial bg-primary-600 fixed duration-300`}
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

        <NavigationLink
          divider={null}
          isOpen={isOpen}
          links={OTHERS}
          location={location.pathname}
        />
      </div>

      <div className="absolute right-[-10px] top-0 hidden md:block">
        <button
          className={`bg-primary-700 w-7 h-7 rounded-full hover:bg-blue-900 ${
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
