import Input from "../../components/Input";
import { CgNametag } from "react-icons/cg";
import { RiAccountBoxLine, RiEyeOffLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { useState } from "react";

interface RegisterProps {
  onClick: () => void;
}
export const Register: React.FC<RegisterProps> = ({ onClick }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
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
      picturePath: "",
      friends: [],
      location: "",
      occupation: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    setDisabled(false);
    window.location.reload();
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
