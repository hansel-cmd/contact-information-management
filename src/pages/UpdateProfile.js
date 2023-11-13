
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import ProfileSettings from "../components/ProfileSettings";
import EmailProfileSettings from "../components/EmailProfileSettings";

const TABS = {
  PROFILE: "PROFILE",
  EMAIL: "EMAIL",
};

const UpdateProfile = () => {
  const [tab, setTab] = useState(TABS.PROFILE);

  return (
    <>
      <PageTitle icon={"bi bi-floppy-fill"} title={"Update Profile"} />
      <div className="flex justify-center items-center flex-col">
        <div className="rounded w-full lg:w-[516px] shadow-lg">
          <ul className="flex border-2 bg-gray-200 grow text-center rounded-tl rounded-tr">
            <li
              className={`flex-1 p-4 hover:bg-gray-50 cursor-pointer border-e-[1px] border-e-gray-300 rounded-tl ${
                TABS.PROFILE === tab ? "bg-gray-50 " : ""
              }`}
              onClick={() => setTab(TABS.PROFILE)}
            >
              Profile Information
            </li>
            <li
              className={`flex-1 p-4 hover:bg-gray-50 cursor-pointer border-s-[1px] border-s-gray-300 rounded-tr ${
                TABS.EMAIL === tab ? "bg-gray-50" : ""
              }`}
              onClick={() => setTab(TABS.EMAIL)}
            >
              Email Information
            </li>
          </ul>
          <div className="border-2 border-t-0 rounded rounded-tl-none rounded-tr-none w-full lg:w-[516px] p-5">
            {tab === TABS.PROFILE && <ProfileSettings />}
            {tab === TABS.EMAIL && <EmailProfileSettings />}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
