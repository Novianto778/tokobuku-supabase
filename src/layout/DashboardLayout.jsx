import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="px-7 pt-4 text-2xl font-semibold flex-1 h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
