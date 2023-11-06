import { useState } from "react";

export const useToast = (delay) => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);

    // Automatically hide the toast after 3 seconds (adjust time as needed)
    setTimeout(() => {
      setShowToast(false);
    }, delay);
  };

  return {
    showToast,
    handleShowToast,
  };
};
