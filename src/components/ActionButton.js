const ActionButton = ({ favorite, icon, iconFilled, defaultColor, onHoverColor, fn}) => {
  return (
    <button onClick={fn} className="mx-1">
      <span className="text-2xl group">
        <i className={`${icon} ${defaultColor} group-hover:hidden`}></i>
        <i className={`${iconFilled} ${onHoverColor} hidden group-hover:block`}></i>
      </span>
    </button>
  );
};

export default ActionButton;
