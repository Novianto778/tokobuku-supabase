import DashboardLayout from "layout/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "services/supabaseClient";
import { authStateChange, getUserData } from "store/userSlice";

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
