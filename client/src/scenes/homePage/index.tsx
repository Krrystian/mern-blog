import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Following from "../../components/Following";
const HomePage = () => {
  const token = useSelector((state: any) => state.token);
  const navigate = useNavigate();
  // Prevents user from accessing this page if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center flex-row-reverse">
        <Following />
        <p className="w-[40%] border h-full "></p>
        <p className="w-[30%] border h-full "></p>
      </div>
    </div>
  );
};

export default HomePage;
