/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export const useIcon = () => {
  const [isError, setIsError] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (isError && icon !== "bi bi-x-circle-fill text-red-500") {
        setIcon("bi bi-x-circle-fill text-red-500")
    }
    
    if (!isError && icon !== "bi bi-check-circle-fill text-green-500") {
        setIcon("bi bi-check-circle-fill text-green-500")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return { icon, setIsError };
};
