import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";

let currentOTPIndex = 0;
const VerifyModal = ({
  modalTitle,
  modalHeaderBody,
  modalFooterBody,
  modalButtonTitle,
  errorMessage,
  showModal,
  fnCancel,
  fnContinue,
  continueLabel = "Continue",
}) => {
  const inputRefs = [
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
    useRef(""),
  ];
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (!value) {
      if (currentOTPIndex !== 0) {
        setActiveOTPIndex(currentOTPIndex - 1);
      }
    } else {
      setActiveOTPIndex(currentOTPIndex + 1);
    }
    setOTP(newOTP);
  };

  const handleOnKeyDown = (e, index) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") {
      if (activeOTPIndex === 0 || index === 0) return;
      setActiveOTPIndex(index - 1);
    }
  };

  const handleOnPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6 - activeOTPIndex);
    const newOTP = [...otp];

    let i;
    for (i = 0; i < pastedData.length; i++) {
      newOTP[activeOTPIndex + i] = pastedData[i];
    }

    setActiveOTPIndex(activeOTPIndex + i);
    setOTP(newOTP);
  };

  useEffect(() => {
    if (activeOTPIndex < 6 && inputRefs[activeOTPIndex].current) {
      inputRefs[activeOTPIndex].current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOTPIndex]);

  const reset = () => {
    setOTP(["", "", "", "", "", ""]);
    setActiveOTPIndex(0);
    currentOTPIndex = 0;
  };

  const handleCancel = async () => {
    await fnCancel();
    reset();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await fnContinue(otp);
    setIsSubmitting(false);
    reset();
  };

  return (
    <div
      className={`${
        showModal ? "fixed" : "hidden"
      } min-h-screen top-0 left-0 w-full z-50`}
    >
      <div className="absolute min-h-screen w-full bg-black opacity-80"></div>
      <div className="fixed top-12 left-1/2 -translate-x-1/2 min-h-fit w-[480px] rounded-lg opacity-100 bg-white overflow-auto transform duration-300">
        <div className="flex bg-white grow items-center px-4 pt-2 pb-2 justify-between border-b-2">
          <h1 className="font-bold text-xl">{modalTitle}</h1>
          <button className="text-2xl" onClick={handleCancel}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="p-4 mb-2 overflow-y-auto max-h-64">
          <p className="mb-4">{modalHeaderBody}</p>
          <p className="text-red-600 text-center mb-2">{errorMessage}</p>
          <div className="flex items-center justify-center">
            <div className="flex space-x-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  ref={inputRefs[index]}
                  key={index}
                  type="text"
                  className="w-12 h-12 border border-gray-300 rounded-md text-center"
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                  onPaste={handleOnPaste}
                  value={otp[index]}
                />
              ))}
            </div>
          </div>
          <p className="mt-4">{modalFooterBody}</p>
        </div>
        <div className="flex gap-3 justify-end px-4 mb-2">
          <button
            className="flex justify-center items-center p-2 rounded bg-primary-600 hover:bg-primary-700 text-white cursor-pointer mb-2 w-full disabled:bg-primary-400"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Spinner isLoading={isSubmitting} />
            {isSubmitting ? "Verifying..." : continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
