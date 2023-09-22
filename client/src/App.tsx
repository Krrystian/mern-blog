import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const visibilityChange = () => {
    if (document.hidden) {
      document.title = "Why? Don't leave me! ";
    } else document.title = "Why?";
  };

  document.addEventListener("visibilitychange", visibilityChange);

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen text-white text-5xl text-center items-center">
          Loading...
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={2} transition={Slide} />
    </Suspense>
  );
}

export default App;
