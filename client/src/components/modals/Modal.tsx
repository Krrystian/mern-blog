import React from "react";
import { AiOutlineClose } from "react-icons/ai";
interface ModalProps {
  heading?: string;
  body: React.ReactNode;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ heading, body, close }) => {
  return (
    <div
      className="xl:w-2/4 w-full md:w-4/5 border-y-4 md:border-4 lg:rounded-xl bg-black text-white border-[#DC6A00] relative overflow-hidden 
    "
    >
      <AiOutlineClose
        color="#dc6a00"
        size={40}
        className="cursor-pointer absolute right-2 top-2"
        onClick={close}
      />
      <p className="w-full h-[100px] flex text-center justify-center p-8 text-2xl">
        {heading}
      </p>
      <div className="h-full w-full">{body}</div>
    </div>
  );
};

export default Modal;
