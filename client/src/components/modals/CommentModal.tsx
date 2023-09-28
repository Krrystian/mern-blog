import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FieldValues, SubmitHandler, set } from "react-hook-form";
import { closeComment } from "../../state/modal";
import state from "../../state";
interface CommentModalProps {
  open: boolean;
}

const CommentModal: React.FC<CommentModalProps> = ({ open }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const post = useSelector((state: any) => state.modal.post.data);
  const { register, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userPicturePath: "",
      comment: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);
  };

  const body = (
    <div className=" mx-3">
      <textarea
        className="w-full bg-black border-y-2 border-[#DC6A00] resize-none p-3 focus:outline-none placeholder:text-center"
        rows={2}
        disabled={loading}
        placeholder="Click here to start typing..."
        {...register("comment", { required: true })}
      ></textarea>
      <div className="col-span-2 w-full flex gap-2 my-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            close();
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("userPicturePath", user.picturePath);
            handleSubmit(onSubmit)();
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
  return (
    <div
      className={
        open
          ? "fixed z-[60] w-full h-full flex justify-center items-center bg-black/80"
          : "hidden"
      }
    >
      <Modal
        heading="Add comment"
        body={body}
        close={() => dispatch(closeComment())}
      />
    </div>
  );
};

export default CommentModal;
