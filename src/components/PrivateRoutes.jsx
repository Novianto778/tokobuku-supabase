import React from "react";
import DashboardLayout from "layout/DashboardLayout";
import {  useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRoutes = () => {
  const location = useLocation();
  const { session } = useSelector((state) => state.user);
  return (
    <>
      {session ? (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ) : (
        <Navigate to="/login" state={location.pathname} />
      )}
    </>
  );
};

export default PrivateRoutes;
