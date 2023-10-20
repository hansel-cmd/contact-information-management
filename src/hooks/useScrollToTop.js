import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    console.log('hello world')
    window.scrollTo(0, 0);
  });
};
