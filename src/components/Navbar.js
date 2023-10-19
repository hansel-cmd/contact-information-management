const Navbar = () => {
  return (
    <div className="bg-primary-600 fixed top-0 w-full py-2 px-5 flex justify-between z-50">
      <img src="/assets/logo512.png" alt="logo" className="w-[64px] h-[64px]" />
      <div className="flex items-center">
        <p className="text-white">Hello, Katarina!</p>
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden ms-3 cursor-pointer">
          <img src="/assets/toArise.jpg" alt="icon" className="object-cover" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
