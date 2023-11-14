import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (e) => {
    const root = document.getElementsByTagName("html")[0];
    if (e.target.checked) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "ON");
      setIsDarkMode(true);
    } else {
      root.classList.remove("dark");
      localStorage.removeItem("darkMode");
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    const item = localStorage.getItem("darkMode");
    if (!item) return;
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("dark");
    localStorage.setItem("darkMode", "ON");
    setIsDarkMode(true);
  }, []);

  return { isDarkMode, toggleDarkMode };
};
