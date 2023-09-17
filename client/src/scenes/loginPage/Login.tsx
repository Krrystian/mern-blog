import Input from "../../components/Input";
import { RiEyeOffLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface LoginProps {
  onClick: () => void;
}
export const Login: React.FC<LoginProps> = ({ onClick }) => {
  // const user = JSON.parse(localStorage.getItem("persist:root") || "{}");
  // // console.log(JSON.parse(user.user));
  // const user2 = useSelector((state: any) => state);
  // console.log(user2);
  const navigate = useNavigate();
  const dispach = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const savedUserResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (savedUserResponse.ok) {
      localStorage.clear();
      const savedUser = await savedUserResponse.json();
      dispach(
        setLogin({ user: savedUser.sanitizedUser, token: savedUser.token })
      );
      navigate("/home");
    } else {
      alert("Invalid credentials");
      setValue("password", "");
    }
    setDisabled(false);
  };
  return (
    <div className="text-white w-full h-full cursor-default flex justify-center items-center flex-col">
      <p className="font-bold text-2xl p-3">Sign in</p>
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
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            handleSubmit(onSubmit)();
          }
        }}
      />
      <Button onClick={handleSubmit(onSubmit)} label="Continue" />
      <div className="flex justify-between font-medium w-[60%]">
        <p className="text-white/80 ">Don't have an account? </p>
        <p className="text-[#DC6A00] cursor-pointer" onClick={onClick}>
          Sign in
        </p>
      </div>
    </div>
  );
};
