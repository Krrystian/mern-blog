import Input from "../../components/Input";
import { CgNametag } from "react-icons/cg";
import { RiAccountBoxLine, RiEyeOffLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
  onClick: () => void;
  onChange: (value: boolean) => void;
}
export const Register: React.FC<RegisterProps> = ({ onClick, onChange }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const url = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      picturePath: "",
      friends: [],
      location: "",
      occupation: "",
    },
  });
  const handleChange = useCallback(() => {
    onChange(false);
  }, [onChange]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const savedUserResponse = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const savedUser = await savedUserResponse.json();
    if (savedUserResponse.ok) {
      toast.success("Your account has been created!", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      handleChange();
    } else {
      toast.error(savedUser.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setDisabled(false);
  };
  return (
    <div className="text-white w-full h-full cursor-default flex justify-center items-center flex-col">
      <p className="font-bold text-2xl p-3 ">Register</p>
      <Input
        register={register}
        disabled={disabled}
        id="firstName"
        placeholder="First name"
        children={<CgNametag color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={disabled}
        id="lastName"
        placeholder="Last name"
        children={<RiAccountBoxLine color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={disabled}
        type="email"
        id="email"
        placeholder="Email address"
        children={<MdOutlineAlternateEmail color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={disabled}
        id="password"
        placeholder="Password"
        type="password"
        children={<RiEyeOffLine color="black" size={40} />}
      />
      <Button onClick={handleSubmit(onSubmit)} label="Continue" />
      <div className="flex justify-between font-medium w-[60%]">
        <p className="text-white/80 ">Have an account? </p>
        <p className="text-[#DC6A00] cursor-pointer" onClick={onClick}>
          Log in
        </p>
      </div>
    </div>
  );
};
