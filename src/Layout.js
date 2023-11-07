import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { useMemo, useState } from "react";
import useScreenSize from "./hooks/useScreenSize";

const NARROW = "w-[80px]";
const WIDE = "w-[250px]";
const NARROW_MARGIN = "ms-[80px]";
const WIDE_MARGIN = "ms-[250px]";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleSideNav = () => {
    setIsOpen((current) => !current);
  };

  const screenSize = useScreenSize();
  useMemo(() => {
    if (screenSize.width < 768) {
      setIsOpen(false);
    }
  }, [screenSize]);

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-20">
        <SideNav
          isOpen={isOpen}
          handleToggleSideNav={handleToggleSideNav}
          NARROW={NARROW}
          WIDE={WIDE}
        ></SideNav>
        <div
          className={`${
            isOpen ? WIDE_MARGIN : NARROW_MARGIN
          } duration-300 flex justify-center`}
        >
          <div className="container p-5 sm:p-10 sm:pt-8 lg:p-20 lg:pt-12">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
