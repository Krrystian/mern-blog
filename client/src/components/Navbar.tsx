import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { newPostOpen } from "../state/modal";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    console.log(search);
  };
  return (
    <div className=" fixed h-[100px] w-full max-w-screen z-10 text-[#DC6A00] border-b-2 border-[#DC6A00] text-4xl flex text-center bg-black/90">
      <div className="w-[30%] cursor-default select-none h-full flex justify-center items-center">
        whY?
      </div>
      <div className="w-[40%] h-full flex items-center relative">
        <input
          className=" text-white/80 p-3 w-full bg-white/10 rounded-xl placeholder-white/80 focus:outline-none placeholder:text-center"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(search);
            }
          }}
        ></input>
        <BiSearchAlt
          className="absolute right-2 cursor-pointer"
          onClick={handleSearch}
        />
      </div>

      <div
        className="w-[30%] h-full flex justify-center items-center"
        onClick={() => {
          dispatch(newPostOpen());
        }}
      >
        New Post
      </div>
    </div>
  );
};

export default Navbar;
