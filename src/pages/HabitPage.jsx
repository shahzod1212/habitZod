import React from "react";
import SideBar from "../components/SideBar";
import HabitMain from "../components/HabitMain";

const HabitPage = () => {
  return (
    <div className="flex">
      <SideBar topic="HabitPage" />
      <HabitMain />
    </div>
  );
};

export default HabitPage;
