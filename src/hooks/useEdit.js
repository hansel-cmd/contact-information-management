import { useState } from "react";

export const useEdit = () => {
  const [isEditable, setIsEditable] = useState(false);

  const enableEdit = () => {
    setIsEditable(true);
  };

  const disableEdit = () => {
    setIsEditable(false);
  };

  return {
    isEditable,
    enableEdit,
    disableEdit,
  };
};
