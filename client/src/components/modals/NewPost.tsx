import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import UploadWidget from "../UploadWidget";
import { newPostClose, setSearchBy } from "../../state/modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface NewPostProps {
  open: boolean;
}

const NewPost: React.FC<NewPostProps> = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const url = import.meta.env.VITE_API_URL;
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
    const res = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (res.ok) {
      dispatch(newPostClose());
      dispatch(setSearchBy({ searchBy: "" }));
      window.scrollTo(0, 0);
      navigate("/");
      window.location.reload();
      toast.success("Post added successfully!", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
