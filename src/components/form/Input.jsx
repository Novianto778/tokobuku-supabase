import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { spacing, label, color, errors } = props;
  return (
    <div className={`mt-${spacing}`}>
      <label className="text-sm font-medium block">{label}</label>
      <input
        {...props}
        ref={ref}
        className={`mt-2 border px-6 w-full rounded-full focus:outline-${color} py-2 text-sm`}
      />
      <p className="text-sm text-red-600 mt-2">{errors}</p>
    </div>
  );
});

export default Input;
