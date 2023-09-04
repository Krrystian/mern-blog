import { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
const LoginPage = () => {
  const [register, shouldRegister] = useState<boolean>(true);
  const loginHandler = () => {
    shouldRegister(!register);
  };
  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-row-reverse">
      <img
        className="hidden lg:block object-fit w-[70%]"
        src="/orange_theme.png"
        alt=""
      ></img>
      {register === false ? (
        <Login onClick={loginHandler} />
      ) : (
        <Register onClick={loginHandler} />
      )}
    </div>
  );
};

export default LoginPage;
