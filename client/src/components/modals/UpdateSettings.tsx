import React, { useEffect, useMemo, useRef } from "react";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setCopyUser, setUser } from "../../state";
import { loadingClose, loadingOpen, settingsClose } from "../../state/modal";
import { toast } from "react-toastify";
import UploadWidget from "../UploadWidget";
interface UpdateSettingsProps {
  open: boolean;
  type: string;
  close: () => void;
  callSubmit: boolean;
}
const UpdateSettings: React.FC<UpdateSettingsProps> = ({
  open,
  type,
  close,
  callSubmit,
}) => {
  const userCopy = useSelector((state: any) => state.auth.userCopy);
  const token = useSelector((state: any) => state.auth.token);
  const { handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      id: userCopy._id,
      location: "",
      occupancy: "",
      email: "",
      currentEmail: "",
      picturePath: "",
      password: "",
      currentPassword: "",
    },
  });
  const dispatch = useDispatch();
  const currentEmail = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const occupancy = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const currentPassword = useRef<HTMLInputElement>(null);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (callSubmit) handleSubmit(onSubmit)();
  }, [callSubmit]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(loadingOpen());
    const res = await fetch(`${url}/users/${userCopy._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.errors.length === 0) {
      dispatch(setUser());
      dispatch(settingsClose());
      toast.success("Update was successfull!", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      {
        response.errors.map((error: any) => {
          toast.error("Unfortunately:  " + error, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
      }
    }
    dispatch(loadingClose());
  };

  const emailBody = (
    <div className="mx-3 py-6 font-medium grid grid-cols-2 text-xl border-t-2 border-[#DC6A00]">
      <p className="flex justify-end items-center px-4 cursor-default">
        Current email:
      </p>
      <input
        id="currentEmail"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your email"
        name="currentEmail"
        ref={currentEmail}
      ></input>
      <p className="flex justify-end items-center px-4 cursor-default">
        New email:
      </p>
      <input
        id="email"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your new email"
        name="email"
        ref={email}
      ></input>
      <div className="col-span-2 w-full flex gap-2 mt-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            close();
            if (currentEmail.current !== null) currentEmail.current.value = "";
            if (email.current !== null) email.current.value = "";
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("currentEmail", currentEmail.current?.value);
            setValue("email", email.current?.value);
            if (currentEmail.current !== null) currentEmail.current.value = "";
            if (email.current !== null) email.current.value = "";
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const passwordBody = (
    <div className="mx-3 py-6 font-medium grid grid-cols-2 text-xl border-t-2 border-[#DC6A00]">
      <p className="flex justify-end items-center px-4 cursor-default">
        Current password:
      </p>
      <input
        id="currentPassword"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your password"
        type="password"
        ref={currentPassword}
      ></input>
      <p className="flex justify-end items-center px-4 cursor-default">
        New password:
      </p>
      <input
        id="password"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your new password"
        type="password"
        ref={password}
      ></input>
      <div className="col-span-2 w-full flex gap-2 mt-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            close();
            if (currentPassword.current !== null)
              currentPassword.current.value = "";
            if (password.current !== null) password.current.value = "";
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("currentPassword", currentPassword.current?.value);
            setValue("password", password.current?.value);
            if (currentPassword.current !== null)
              currentPassword.current.value = "";
            if (password.current !== null) password.current.value = "";
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const locationBody = (
    <div className="mx-3 py-6 font-medium grid grid-cols-2 text-xl border-t-2 border-[#DC6A00]">
      <p className="flex justify-end items-center px-4 cursor-default">
        New location:
      </p>
      <input
        id="location"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your new location"
        ref={location}
      ></input>
      <div className="col-span-2 w-full flex gap-2 mt-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            close();
            if (location.current !== null) location.current.value = "";
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("location", location.current?.value);
            const changedUser = {
              ...userCopy,
              location: location.current?.value,
            };
            dispatch(setCopyUser({ user: changedUser }));
            if (location.current !== null) location.current.value = "";
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const occupancyBody = (
    <div className="mx-3 py-6 font-medium grid grid-cols-2 text-xl border-t-2 border-[#DC6A00]">
      <p className="flex justify-end items-center px-4 cursor-default">
        New occupancy:
      </p>
      <input
        id="occupancy"
        className="p-3 bg-inherit focus:outline-none"
        placeholder="Type your occupancy"
        ref={occupancy}
      ></input>
      <div className="col-span-2 w-full flex gap-2 mt-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            if (occupancy.current !== null) occupancy.current.value = "";
            close();
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("occupancy", occupancy.current?.value);
            const changedUser = {
              ...userCopy,
              occupation: occupancy.current?.value,
            };
            if (occupancy.current !== null) occupancy.current.value = "";
            dispatch(setCopyUser({ user: changedUser }));
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const pictureBody = (
    <div className="mx-3 py-6 font-medium grid grid-cols-2 text-xl border-t-2 border-[#DC6A00]">
      <div className="col-span-2 flex flex-col justify-center items-center">
        <UploadWidget
          setUrl={(value: string) => {
            setValue("picturePath", value);
          }}
        />
      </div>
      <div className="col-span-2 w-full flex gap-2 mt-6">
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            setValue("picturePath", "");
            close();
          }}
        >
          Cancel
        </button>
        <button
          className="w-[50%] p-3 bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60"
          onClick={() => {
            const picture = watch("picturePath");
            const changedUser = {
              ...userCopy,
              picturePath: picture,
            };
            dispatch(setCopyUser({ user: changedUser }));
            close();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
  const header = useMemo(() => {
    if (type === "email") return "Change email";
    else if (type === "password") return "Change password";
    else if (type === "location") return "Change location";
    else if (type === "picture") return "Change picture";
    else return "Change occupancy";
  }, [type]);

  const body = useMemo(() => {
    if (type === "email") return emailBody;
    else if (type === "password") return passwordBody;
    else if (type === "location") return locationBody;
    else if (type === "picture") return pictureBody;
    else return occupancyBody;
  }, [type]);

  return (
    <div
      className={
        open
          ? "fixed z-[60] w-full h-full flex justify-center items-center bg-black/80"
          : "hidden"
      }
    >
      <Modal heading={header} body={body} close={close} />
    </div>
  );
};

export default UpdateSettings;
