import React, { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { settingsClose } from "../../state/modal";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { setCopyUser, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import UpdateSettings from "./UpdateSettings";
interface SettingsProps {
  open: boolean;
}
const Settings: React.FC<SettingsProps> = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCopy = useSelector((state: any) => state.auth.userCopy);
  const user = useSelector((state: any) => state.auth.user);
  const [updateModalOpen, setUpdateModalOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("");
  const [callSubmit, setCallSubmit] = React.useState<boolean>(false);

  if (open) document.body.style.overflow = "hidden";
  useEffect(() => {
    setCallSubmit(false);
    if (open) dispatch(setCopyUser({ user: user }));
  }, [open]);

  const handleUpdate = (type: string) => {
    setUpdateModalOpen(true);
    setType(type);
  };

  const body = (
    <div className="flex flex-col mx-3 pb-3">
      <div className="flex md:flex-row flex-col py-6 justify-between border-t-2 border-[#DC6A00]">
        <div className="flex flex-col gap-3 w-full items-center">
          <img
            src={userCopy.picturePath}
            alt="user"
            width={75}
            height={75}
            className="cursor-pointer border rounded-full"
          />
          <div className="flex gap-3 cursor-default">
            <p className="text-2xl flex items-center">
              {userCopy.firstName + " " + userCopy.lastName}
            </p>
          </div>
          <div className="flex gap-2">
            <FaLocationDot size={30} color="DC6A00" />
            <p className="text-xl">{userCopy.location || "Unknown"}</p>
            <AiFillEdit
              size={23}
              className="cursor-pointer"
              onClick={() => handleUpdate("location")}
            />
          </div>
          <div className="flex gap-2">
            <MdOutlineWork size={30} color="DC6A00" />
            <p className="text-xl">{userCopy.occupation || "Unknown"}</p>
            <AiFillEdit
              size={23}
              className="cursor-pointer"
              onClick={() => handleUpdate("occupancy")}
            />
          </div>
          <div className="font-medium flex flex-col gap-2 text-xl">
            <p>
              <span className="text-[#DC6A00]">Food earned: </span>
              {userCopy.impressions}
            </p>
            <p>
              <span className="text-[#DC6A00]">Profile visits: </span>
              {userCopy.viewedProfile}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2 p-3">
          <button
            className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
            onClick={() => handleUpdate("email")}
          >
            Change email
          </button>
          <button
            className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
            onClick={() => handleUpdate("password")}
          >
            Change password
          </button>
          <button
            className="w-[70%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
            onClick={() => {
              dispatch(setLogout());
              dispatch(settingsClose());
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-3 w-full">
        <button
          className="p-3 text-xl bg-[#DC6A00] w-full duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => dispatch(settingsClose())}
        >
          Close
        </button>
        <button
          className="p-3 text-xl bg-[#DC6A00] w-full duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setCallSubmit((prev) => !prev);
          }}
        >
          Save
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
      <UpdateSettings
        callSubmit={callSubmit}
        open={updateModalOpen}
        type={type}
        close={() => setUpdateModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
