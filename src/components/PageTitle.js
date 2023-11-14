const PageTitle = ({ title, icon }) => {
  return (
    <h1 className="pt-2 pb-5 text-2xl font-bold ">
      <span className="me-2">
        <i className={icon}></i>
      </span>{" "}
      { title }
    </h1>
  );
};

export default PageTitle;
