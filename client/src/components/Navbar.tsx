import { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillHome, AiFillSetting, AiFillFileAdd } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { followerOpen, newPostOpen, setSearchBy } from "../state/modal";
import { settingsOpen } from "../state/modal";
import FollowersModal from "./modals/FollowersModal";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  profile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBy = useSelector((state: any) => state.modal.post.searchBy);
  const openFollowers = useSelector(
    (state: any) => state.modal.follower.isOpen
  );
  const handleSearch = () => {
    if (!profile) {
      dispatch(setSearchBy({ searchBy: ref.current?.value }));
      window.scrollTo(0, 0);
    }
  };
  const handleHome = () => {
    dispatch(setSearchBy({ searchBy: "" }));
    window.scrollTo(0, 0);
    navigate("/home");
  };
  return (
    <>
      <div className="p-3 md:p-0 fixed h-[100px] w-full max-w-screen z-10 text-[#DC6A00] border-b-2 border-[#DC6A00] text-4xl flex text-center bg-black/90">
        <div className="hidden md:flex w-[30%] cursor-default select-none h-full justify-center items-center">
          <p
            className="cursor-pointer hover:bg-[#DC6A00] hover:text-black p-3 duration-500 w-full mx-9"
            onClick={handleHome}
          >
            Why?
          </p>
        </div>
        <div className="w-[100%] md:w-[40%] h-full flex items-center relative">
          <input
            className="text-white/80 w-full p-3 bg-white/10 rounded-xl placeholder-white/80 focus:outline-none text-center "
            placeholder="Search"
            defaultValue={searchBy}
            disabled={profile}
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          ></input>
          <BiSearchAlt
            className={
              "absolute right-2 " +
              (profile ? "cursor-default" : "cursor-pointer")
            }
            onClick={handleSearch}
          />
        </div>

        <div
          className="hidden w-[30%] h-full md:flex items-center"
          onClick={() => {
            dispatch(newPostOpen());
          }}
        >
          <p className="cursor-pointer hover:bg-[#DC6A00] hover:text-black md:mx-9 p-3 duration-500 w-full">
            New Post
          </p>
        </div>
      </div>
      <div className="md:hidden p-8 md:p-0 fixed bottom-0 h-[100px] w-full max-w-screen z-10 text-[#DC6A00] text-4xl flex justify-between items-center bg-black/90 ">
        <AiFillHome className="cursor-pointer" onClick={handleHome} />
        <AiFillSetting
          className="cursor-pointer"
          onClick={() => dispatch(settingsOpen())}
        />
        <AiFillFileAdd
          className="cursor-pointer"
          onClick={() => dispatch(newPostOpen())}
        />
        <FaUserFriends
          className="cursor-pointer"
          onClick={() => dispatch(followerOpen())}
        />
      </div>
      <FollowersModal open={openFollowers} />
    </>
  );
};

export default Navbar;
