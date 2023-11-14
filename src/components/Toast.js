const Toast = ({
  icon = "bi bi-check-circle-fill text-green-500",
  message,
  showToast,
  setShowToast,
}) => {

  return (
    <>
      {showToast && (
        <div className="fixed top-10 left-1/2 z-50 transform -translate-x-1/2 bg-white border border-gray-300 dark:border-accentDark-700 dark:bg-primaryDark-700 shadow-md rounded-md p-4">
          <div className="flex items-center">
            <i className={`${icon} text-2xl mr-2`}></i>
            
            <div className="text-gray-800 dark:text-fontDark-700">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
