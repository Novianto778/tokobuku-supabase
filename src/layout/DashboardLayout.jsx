import Navbar from "layout/Navbar";
import Sidebar from "layout/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const localData = JSON.parse(localStorage.getItem("sidebarOpen")) || true;
  const [open, setOpen] = useState(localData);
  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("sidebarOpen"));
    setOpen(localState);
  }, [open]);
  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen}  />
      <div className={`${open ? 'ml-72' : 'ml-20'} flex-1 h-screen`}>
        <Navbar />
        <div className="mt-2 px-7 pt-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
