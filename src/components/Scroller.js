import { useScrollToTop } from "../hooks/useScrollToTop";

const Scroller = ({ children }) => {
  useScrollToTop();

  return <>{children}</>;
};

export default Scroller;
