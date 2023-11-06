const Toast = ({ icon, message, showToast, setShowToast }) => {
    return (
      <>
        {showToast && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-md rounded-md p-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="text-gray-800">{message}</div>
            </div>
          </div>
        )}
      </>
    );
  };

export default Toast;