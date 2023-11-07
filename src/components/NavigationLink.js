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
                className={`py-2 mx-3 hover:bg-primary-700 rounded-md group cursor-pointer ${
                  navigation.path === location ? "bg-primary-700" : ""
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
            className="py-2 mx-3 hover:bg-primary-700 rounded-md group cursor-pointer"
            onClick={fn}
          >
            <div
              className={`px-4 flex items-center ${isOpen ? "w-[226px]" : ""}`}
            >
              <span className="me-4 text-xl">
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
