import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";

const DropdownLink = ({ open, children, subLinks, activeStylesClass }) => {
  const [sameRoute, setSameRoute] = useState(false);
  const [subNav, setSubNav] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const isSameRoute = subLinks.some((item) => item.link === pathname);
    setSameRoute(isSameRoute);
  }, [pathname]);

  const sameRouteStyles = {
    backgroundColor: sameRoute ? "white" : "transparent",
    color: sameRoute ? "#18213E" : "rgb(209 213 219)",
    fontWeight: sameRoute ? "bold" : "normal",
  };

  return (
    <>
      <div
        onClick={() => setSubNav(!subNav)}
        className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md ${
          !open ? "mt-4" : "mt-2"
        } text-gray-300 mb-4`}
        style={sameRouteStyles}
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
