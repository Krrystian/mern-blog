import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import UploadWidget from "../UploadWidget";

interface NewPostProps {
  open: boolean;
}

const NewPost: React.FC<NewPostProps> = ({ open }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const handleChange = (value: string) => {
    setValue("description", value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      description: "",
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath: "",
    },
  });
  if (open) {
    document.body.style.overflow = "hidden";
  }
  const picturePath = watch("picturePath");

  const body = (
    <div className="flex flex-col w-full">
      <textarea
        className="bg-black border-y-2 h-[100%] border-[#DC6A00] p-3 mx-3 resize-none placeholder:text-center"
        rows={6}
        placeholder="Click here to start typing..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="w-full flex flex-col justify-center items-center">
        <UploadWidget
          setUrl={(value: string) => setValue("picturePath", value)}
        />
        {picturePath.length > 0 && (
          <p className="text-green-600">Picture added successfully</p>
        )}
      </div>
    </div>
  );
  return (
    <div
      className={`fixed z-50 w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-1000 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <Modal heading="Create new post" body={body} />
    </div>
  );
};

export default NewPost;
