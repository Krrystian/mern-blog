import { useState } from "react";
import Input from "../../components/Input";
import { CgNametag } from "react-icons/cg";
import { RiAccountBoxLine, RiEyeOffLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../../components/Button";

interface RegisterProps {
  onClick: () => void;
  loading?: boolean;
}
export const Register: React.FC<RegisterProps> = ({ onClick, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="text-white w-full h-full cursor-default flex justify-center items-center flex-col">
      <p className="font-bold text-2xl p-3 ">Register</p>
      <Input
        register={register}
        disabled={loading}
        id="firstName"
        placeholder="First name"
        children={<CgNametag color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={loading}
        id="lastName"
        placeholder="Last name"
        children={<RiAccountBoxLine color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={loading}
        type="email"
        id="email"
        placeholder="Email address"
        children={<MdOutlineAlternateEmail color="black" size={40} />}
      />
      <Input
        register={register}
        disabled={loading}
        id="password"
        placeholder="Password"
        type="password"
        children={<RiEyeOffLine color="black" size={40} />}
      />
      <Button onClick={() => console.log("Clicked!")} label="Continue" />
      <div className="flex justify-between font-medium w-[60%]">
        <p className="text-white/80 ">Have an account? </p>
        <p className="text-[#DC6A00] cursor-pointer" onClick={onClick}>
          Log in
        </p>
      </div>
    </div>
  );
};
