import React from "react";
import SideBar from "../components/SideBar";
import HabitMain from "../components/HabitMain";
import Details from "../components/Details";

const HabitDetailPage = () => {
  return (
    <div className="flex">
      <SideBar topic="Detail" />
      <Details />
    </div>
  );
};

export default HabitDetailPage;
