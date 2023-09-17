import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { newPostClose } from "../../state/modal";
interface ModalProps {
  heading?: string;
  body: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ heading, body }) => {
  const dispatch = useDispatch();
  //useForm
  return (
    <div
      className="xl:w-2/4 xl:h-3/4 lg:h-3/5 lg:w-2/5 w-full h-full lg:border-4 rounded-xl bg-black text-white border-[#DC6A00] relative overflow-hidden 
    "
    >
      <AiOutlineClose
        color="#dc6a00"
        size={40}
        className="cursor-pointer absolute right-2 top-2"
        onClick={() => dispatch(newPostClose())}
      />
      <p className="w-full h-[100px] flex text-center justify-center p-8 text-2xl">
        {heading}
      </p>
      <div className="h-full w-full">{body}</div>
    </div>
  );
};

export default Modal;
