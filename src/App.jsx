import React from "react";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useHydrateStore } from "./hooks/useHydrateStore";
import HabitPage from "./pages/HabitPage";
import HabitDetailPage from "./pages/HabitDetailPage";
import Analytics from "./pages/Analytics";
import Awards from "./pages/Awards";

const App = () => {
  useHydrateStore();
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tool" element={<HabitPage />} />
        <Route path="/statistics" element={<Analytics />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/tool/habit/:id" element={<HabitDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
