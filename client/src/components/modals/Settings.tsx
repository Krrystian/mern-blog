import React from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { settingsClose } from "../../state/modal";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";

interface SettingsProps {
  open: boolean;
}

const Settings: React.FC<SettingsProps> = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const [fullName, setFullName] = React.useState<string>(
    user.firstName + " " + user.lastName
  );
  const body = (
    <div className="flex mx-3 justify-between">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-3 cursor-default">
          <img
            src={user.picturePath}
            alt="user"
            className="cursor-pointer border w-20 h-20 rounded-full"
          />
          <p className="text-2xl flex items-center">{fullName}</p>
        </div>
        <div className="flex gap-2">
          <FaLocationDot size={30} color="DC6A00" />
          <p className="text-xl">{user.location || "Unknown"}</p>
        </div>
        <div className="flex gap-2">
          <MdOutlineWork size={30} color="DC6A00" />
          <p className="text-xl">{user.location || "Unknown"}</p>
        </div>
        <div className="font-medium flex flex-col gap-2 text-xl">
          <p>
            <span className="text-[#DC6A00]">Food earned: </span>
            {user.impressions}
          </p>
          <p>
            <span className="text-[#DC6A00]">Profile visits: </span>
            {user.viewedProfile}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <button className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60">
          Change email
        </button>
        <button className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60">
          Change password
        </button>
        <button
          className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            dispatch(setLogout());
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
  return (
    <div
      className={`fixed z-50 w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-1000 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <Modal
        heading="Your Profile"
        body={body}
        close={() => dispatch(settingsClose())}
      />
    </div>
  );
};

export default Settings;
