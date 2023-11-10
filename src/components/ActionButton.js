const ActionButton = ({ shouldBeFilled, title, icon, iconFilled, defaultColor, onHoverColor, fn}) => {
  return (
    <button onClick={fn} className="mx-1" title={title}>
      <span className="text-2xl group">
        <i className={`${shouldBeFilled ? iconFilled : icon} ${defaultColor} group-hover:hidden`}></i>
        <i className={`${shouldBeFilled ? icon : iconFilled} ${onHoverColor} hidden group-hover:block`}></i>
      </span>
    </button>
  );
};

export default ActionButton;
