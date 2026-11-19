import React from "react";
import SideBar from "../components/SideBar";
import AnalyticsDetail from "../components/AnalyticsDetail";

const Analytics = () => {
  return (
    <div className="flex">
      <SideBar topic="Analytics" />
      <AnalyticsDetail />
    </div>
  );
};

export default Analytics;
