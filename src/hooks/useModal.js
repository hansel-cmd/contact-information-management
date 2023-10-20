import { useState } from "react";

export const useModal = () => {
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const closeModal = () => {
    setShouldShowModal(false);
  };

  const openModal = () => {
    setShouldShowModal(true);
  };

  if (shouldShowModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return {shouldShowModal, closeModal, openModal}
};
