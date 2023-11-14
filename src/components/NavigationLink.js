import { Link } from "react-router-dom";

const NavigationLink = ({
  divider,
  links,
  isOpen,
  location,
  isLogout = false,
  fn
}) => {
  return (
    <>
      <div className={`mx-3 duration-300`}>
        <div className="horizontal-line text-sm text-white">
          {divider && (
            <span className={!isOpen ? "hidden" : ""}>{divider}</span>
          )}
        </div>
      </div>
      <ul className="text-white">
        {!isLogout ? (
          links.map((navigation) => (
            <Link to={navigation.path} key={navigation.path}>
              <li
                className={`py-2 mx-3 hover:bg-primary-700 dark:hover:bg-accentDark-700 dark:hover:text-white rounded-md group cursor-pointer ${
                  navigation.path === location ? "bg-primary-700 dark:bg-accentDark-700" : "dark:text-fontDark-600"
                }`}
              >
                <div
                  className={`px-4 flex items-center ${
                    isOpen ? "w-[226px]" : ""
                  }`}
                >
                  <span className="me-4 text-xl">
                    <i
                      className={`bi ${
                        navigation.path === location
                          ? navigation.iconFilled
                          : navigation.icon
                      } group-hover:hidden`}
                    ></i>
                    <i
                      className={`${navigation.iconFilled} hidden group-hover:inline-block`}
                    ></i>
                  </span>
                  <p className={`${!isOpen ? "hidden" : ""} duration-300`}>
                    {navigation.name}
                  </p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <li
            className="py-2 mx-3 hover:bg-primary-700 dark:hover:bg-accentDark-700 rounded-md group cursor-pointer"
            onClick={fn}
          >
            <div
              className={`px-4 flex items-center dark:text-fontDark-600 dark:group-hover:text-white ${isOpen ? "w-[226px]" : ""}`}
            >
              <span className="me-4 text-xl dark:text-fontDark-600">
                <i
                  className={`bi ${
                    "/sign-out" === location
                      ? 'bi-door-open-fill'
                      : 'bi-door-open'
                  } group-hover:hidden`}
                ></i>
                <i
                  className="bi bi-door-open-fill hidden group-hover:inline-block"
                ></i>
              </span>
              <p className={`${!isOpen ? "hidden" : ""} duration-300`}>
                Sign Out
              </p>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavigationLink;
