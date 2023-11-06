import { useState } from "react";
import { PasswordSchema } from "../validations/Signup";

export const usePassword = () => {
  const [showPasswordObj, setShowPasswordObj] = useState({
    password: false,
    confirmPassword: false,
  });

  const validatePassword = (value) => {
    let error;
    try {
      PasswordSchema.validateSync({ password: value });
    } catch (validationError) {
      error = validationError.errors[0];
    }
    return error;
  };

  const handleShowPassword = (id) => {
    setShowPasswordObj((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return {
    showPasswordObj,
    handleShowPassword,
    validatePassword
  }
};
