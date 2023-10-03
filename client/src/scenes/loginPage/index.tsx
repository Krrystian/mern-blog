import { useEffect, useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [register, shouldRegister] = useState<boolean>(false);
  const loginHandler = () => {
    shouldRegister(!register);
  };

  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      return navigate("/home");
    }
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col lg:flex-row-reverse">
      <img
        className="hidden lg:block object-fit w-[70%]"
        src="/orange_theme.png"
        alt=""
      ></img>
      <div className="relative lg:hidden w-full h-[100px] bg-[#DC6A00] overflow-hidden">
        <p className="absolute font-bold text-5xl left-[50%] top-[50%] translate-y-[-70%] translate-x-[-50%]">
          Y
        </p>
        <p className="absolute font-bold text-5xl left-[50%] top-[50%] translate-y-[-22%] translate-x-[30%]">
          ?
        </p>
        <div className="absolute h-[80px] w-[80px] rounded-full right-[-40px] top-[-30px] bg-black/20" />
        <div className="absolute h-[160px] w-[160px] rounded-full right-[30%] top-[30px] bg-black/10" />
        <div className="absolute h-[60px] w-[60px] rounded-full left-[20%] top-[20%] bg-black/10" />
        <div className="absolute h-[100px] w-[100px] rounded-full left-[-50px] top-[30px] bg-black/20" />
        <div className="absolute h-[100px] w-[100px] rounded-full right-[10%] top-[-10px] bg-black/20" />
        <div className="absolute h-[160px] w-[160px] rounded-full left-[35%] top-[-120px] bg-black/20" />
      </div>
      {register === false ? (
        <Login onClick={loginHandler} />
      ) : (
        <Register
          onClick={loginHandler}
          onChange={(value) => shouldRegister(value)}
        />
      )}
      <div className="relative lg:hidden w-full h-[100px] bg-[#DC6A00] overflow-hidden">
        <div className="absolute h-[80px] w-[80px] rounded-full right-[-60px] bg-black/20" />
        <div className="absolute h-[160px] w-[160px] rounded-full right-[30%] top-[-80px] bg-black/10" />
        <div className="absolute h-[120px] w-[120px] rounded-full left-[20%] top-[-10%] bg-black/20" />
        <div className="absolute h-[100px] w-[100px] rounded-full left-[-30px] top-[-30px] bg-black/10" />
        <div className="absolute h-[100px] w-[100px] rounded-full right-[10%] top-[-10px] bg-black/20" />
        <div className="absolute h-[160px] w-[160px] rounded-full left-[40%] top-[40px] bg-black/20" />
      </div>
    </div>
  );
};

export default LoginPage;
