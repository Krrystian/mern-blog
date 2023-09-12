import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";

interface DetailsProps {
  location?: string;
  occupation?: string;
  food?: string;
  visits?: string;
}
export const Details: React.FC<DetailsProps> = ({
  location,
  occupation,
  food,
  visits,
}) => {
  return (
    <div className="flex mt-4 flex-col gap-4 text-white">
      <div className="flex gap-2">
        <FaLocationDot size={25} color="DC6A00" />
        <p>{location || "Unknown"}</p>
      </div>
      <div className="flex gap-2">
        <MdOutlineWork size={25} color="DC6A00" />
        <p>{occupation || "Unknown"}</p>
      </div>
      <div className=" font-medium">
        <p>
          <span className="text-[#DC6A00]">Food earned:</span> {food}
        </p>
        <p>
          <span className="text-[#DC6A00]">Profile visits:</span> {visits}
        </p>
      </div>
    </div>
  );
};
