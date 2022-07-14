import DashboardLayout from "layout/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "services/supabaseClient";
import { authStateChange } from "store/userSlice";

const PrivateRoutes = () => {
  const location = useLocation()
  const { session } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      dispatch(authStateChange(session));
    });
    const user = supabase.auth.user();
    // console.log(user?.id);
  }, [session]);
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
