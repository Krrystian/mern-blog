import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import UploadWidget from "../UploadWidget";
import { newPostClose } from "../../state/modal";
interface NewPostProps {
  open: boolean;
}

const NewPost: React.FC<NewPostProps> = ({ open }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const { register, handleSubmit, setValue } = useForm<FieldValues>({
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const res = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log("Error");
    }
    if (res.ok) {
      dispatch(newPostClose());
      window.scrollTo(0, 0);
      window.location.reload();
    }
    setLoading(false);
  };

  const body = (
    <div className="flex flex-col items-center mx-3">
      <textarea
        className="w-full bg-black border-y-2 border-[#DC6A00] resize-none p-3 focus:outline-none placeholder:text-center"
        rows={6}
        disabled={loading}
        placeholder="Click here to start typing..."
        {...register("description", { required: true })}
      />
      <UploadWidget
        loading={loading}
        setUrl={(value: string) => setValue("picturePath", value)}
      />
      <div className="grid grid-cols-2 w-full gap-3 my-3">
        <button
          disabled={loading}
          className="p-3 w-full bg-[#DC6A00]"
          onClick={() => {
            dispatch(newPostClose());
          }}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="p-3 w-full bg-[#DC6A00]"
          onClick={handleSubmit(onSubmit)}
        >
          Post
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
        heading="Create new post"
        body={body}
        close={() => dispatch(newPostClose())}
      />
    </div>
  );
};

export default NewPost;
