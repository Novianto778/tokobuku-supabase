import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const DropdownLink = ({ open, children, subLinks, activeStylesClass }) => {
  const [subNav, setSubNav] = useState(false);

  return (
    <>
      <div
        onClick={() => setSubNav(!subNav)}
        className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md ${
          !open ? "mt-4" : "mt-2"
        } text-gray-300 mb-4`}
      >
        {children}
        {open && (
          <span className={`ml-auto ${subNav && "rotate-90"}`}>
            <BiChevronRight size={20} />
          </span>
        )}
      </div>
      {open &&
        subLinks.map((subLink, idx) => (
          <div
            key={idx}
            className={`gap-x-4 ${subNav ? "flex" : "hidden"} select-none`}
          >
            <NavLink
              style={activeStylesClass}
              to={subLink.link}
              className="ml-10 text-gray-400 text-sm w-full inline-block p-2 rounded-md"
            >
              {subLink.name}
            </NavLink>
          </div>
        ))}
    </>
  );
};

export default DropdownLink;
