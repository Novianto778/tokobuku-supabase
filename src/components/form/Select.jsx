import React, { forwardRef } from "react";

const Select = forwardRef((props, ref) => {
  const { name, label, spacing, optionheader, options, errors } = props;
  return (
    <div className={`mt-${spacing} xl:w-96`}>
      <label className="text-sm font-medium block" htmlFor={name}>
        {label}
      </label>
      <select
        {...props}
        ref={ref}
        defaultValue={0}
        className="mt-2 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="0">{optionheader}</option>
        {options.map((option) => (
          <option key={option.book_category_id} value={option.book_category_id}>
            {option.name_category}
          </option>
        ))}
      </select>
      <p className="text-sm text-red-600 mt-2">{errors}</p>
    </div>
  );
});

export default Select;
