import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

interface NewPostProps {
  open: boolean;
}

const NewPost: React.FC<NewPostProps> = ({ open }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    setScreenHeight(window.innerHeight);
  }, [open]);
  return (
    <div
      className={`fixed z-50 w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-1000 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <Modal heading="Create new post" body />
    </div>
  );
};

export default NewPost;
