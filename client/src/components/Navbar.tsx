import { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { newPostOpen, setSearchBy } from "../state/modal";

const Navbar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const searchBy = useSelector((state: any) => state.modal.post.searchBy);
  const handleSearch = () => {
    dispatch(setSearchBy({ searchBy: ref.current?.value }));
    window.scrollTo(0, 0);
  };
  return (
    <div className=" fixed h-[100px] w-full max-w-screen z-10 text-[#DC6A00] border-b-2 border-[#DC6A00] text-4xl flex text-center bg-black/90">
      <div className="w-[30%] cursor-default select-none h-full flex justify-center items-center">
        <p
          className="cursor-pointer hover:bg-[#DC6A00] hover:text-black p-3 duration-500"
          onClick={() => {
            window.scrollTo(0, 0);
            window.location.reload();
            dispatch(setSearchBy({ searchBy: "" }));
          }}
        >
          Why?
        </p>
      </div>
      <div className="w-[40%] h-full flex items-center relative">
        <input
          className=" text-white/80 p-3 w-full bg-white/10 rounded-xl placeholder-white/80 focus:outline-none placeholder:text-center"
          placeholder="Search"
          defaultValue={searchBy}
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
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
        <p className="cursor-pointer hover:bg-[#DC6A00] hover:text-black p-3 duration-500">
          New Post
        </p>
      </div>
    </div>
  );
};

export default Navbar;
