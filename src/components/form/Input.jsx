import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { spacing, label, color, errors, rounded, className, name, type } =
    props;
  return (
    <div className={`mt-${spacing} ${className}`}>
      <label className="text-sm font-medium block">{label}</label>
      <input
        {...props}
        name={name}
        type={type}
        ref={ref}
        className={`mt-2 border px-6 w-full ${
          rounded ? "rounded-full" : undefined
        } focus:outline-${color} py-2 text-sm`}
      />
      <p className="text-sm text-red-600 mt-2">{errors}</p>
    </div>
  );
});

export default Input;
