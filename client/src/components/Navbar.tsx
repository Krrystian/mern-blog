import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    console.log(search);
  };
  return (
    <div className="h-[100px] w-screen z-10 text-[#DC6A00] border-b-2 border-[#DC6A00] text-4xl flex items-center text-center bg-transparent">
      <p className="w-[30%] cursor-default select-none">whY?</p>
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

      <div className="w-[30%] text-3xl">New Post</div>
    </div>
  );
};

export default Navbar;
