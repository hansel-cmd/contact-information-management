const ErrorMessageContainer = ({ icon = 'bi bi-exclamation-circle', msg }) => {
  return (
    <p
      className={`text-sm bg-red-400 text-white px-2 py-1 rounded-sm mb-2 ${
        !msg && "hidden"
      }`}
    >
      <i className={`${icon} me-2`}></i>
      {msg}
    </p>
  );
};

export default ErrorMessageContainer;
