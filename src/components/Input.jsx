import React from "react";

const Input = ({ spacing, label, type, placeholder, color }) => {
  return (
    <div className={`mt-${spacing}`}>
      <label className="text-sm font-medium block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`mt-2 border px-6 w-full rounded-full focus:outline-${color} py-2 text-sm`}
      />
    </div>
  );
};

export default Input;
