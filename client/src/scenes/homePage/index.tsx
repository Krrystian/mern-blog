import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
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
    <div className="bg-black w-screen h-screen">
      <Navbar />
    </div>
  );
};

export default HomePage;
