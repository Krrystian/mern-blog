import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
function App() {
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
    </Suspense>
  );
}

export default App;
