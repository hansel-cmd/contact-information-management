const Modal = ({
  fnCancel,
  fnContinue,
  showModal,
  size = "sm",
  title = "Are you sure?",
  body = "Confirm?",
  cancelLabel = "Cancel",
  continueLabel = "Continue",
  isLoading = false
}) => {
  const SIZES = {
    sm: {
      width: "w-[480px]",
      "max-height": "max-h-32",
    },
    md: "",
    lg: "",
  };

  return (
    <div
      className={`${
        showModal ? "fixed" : "hidden"
      } min-h-screen top-0 left-0 w-full z-50`}
    >
      <div className="absolute min-h-screen w-full bg-black opacity-80"></div>
      <div
        className={`fixed top-12 left-1/2 -translate-x-1/2 min-h-fit ${SIZES.sm.width} rounded-lg opacity-100 bg-white overflow-auto transform duration-300`}
      >
        <div className="flex bg-white grow items-center px-4 pt-2 pb-2 justify-between border-b-2">
          <h1 className="font-bold text-xl">{title}</h1>
          <button className="text-2xl" onClick={fnCancel}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div
          className={`p-4 mb-2 overflow-y-auto ${SIZES["sm"]["max-height"]}`}
        >
          <p>{body}</p>
        </div>
        <div className="flex gap-3 justify-end px-4 mb-2">
          <button
            className="p-2 rounded bg-gray-500 hover:bg-gray-600 text-white cursor-pointer mb-2 disabled:bg-gray-400"
            onClick={fnCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            className="p-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer mb-2 disabled:bg-red-500"
            onClick={fnContinue}
            disabled={isLoading}
          >
            {isLoading ? 'Pending...'  : continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
