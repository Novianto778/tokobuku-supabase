import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen">
        <Navbar />
        <div className="mt-2 px-7 pt-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
