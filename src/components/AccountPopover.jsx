import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "services/supabaseClient";

const AccountPopover = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      supabase.auth.signOut();
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="absolute right-8 top-12 pt-4 shadow-lg rounded z-50 bg-white">
      <div className="px-4 pb-2">
        <p className="font-semibold">Michael</p>
        <p className="text-gray-500">michael@gmail.com</p>
      </div>
      <hr />
      <div className="px-4 py-2">
        <p className="text-gray-600 text-sm mb-4">Home</p>
        <p className="text-gray-600 text-sm mb-4">Profile</p>
        <p className="text-gray-600 text-sm mb-4">Settings</p>
      </div>
      <hr />
      <div className="px-4 pt-2">
        <p
          className="text-gray-600 text-sm mb-4 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default AccountPopover;
