const ToolTip = ({ content }) => {
  return (
    <div
      className="absolute top-10 z-10 px-1 py-1 text-[10px] w-[100px] delay-0 opacity-0 duration-0 bg-gray-200 rounded-lg shadow-sm group-hover:opacity-100 group-hover:delay-1000 hidden"
    >
      {content}
    </div>
  );
};

export default ToolTip;
