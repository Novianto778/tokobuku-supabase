import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import { links } from "../constants/links";
import DropdownLink from "components/ui/DropdownLink";

const Sidebar = ({ open, setOpen }) => {
  const activeStylesClass = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "white" : "transparent",
      color: isActive ? "#18213E" : "rgb(209 213 219)",
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 p-5 pt-8 h-screen bg-primary fixed z-50`}
    >
      <div
        className="absolute cursor-pointer rounded-full -right-3 top-9 w-6 h-6 border-2 z-50 border-white bg-white"
        onClick={() => {
          setOpen(!open);
          localStorage.setItem("sidebarOpen", !open);
        }}
      >
        <FiChevronLeft
          size={20}
          color="black"
          className={`cursor-pointer duration-500 ${!open && "rotate-180"}`}
        />
      </div>
      <div className="flex gap-x-4 items-center">
        <img
          src={Logo}
          alt="libr logo"
          className={`w-10 cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-bold tracking-widest text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Libr
        </h1>
      </div>
      <ul className="pt-6">
        {links.map((link, index) => {
          return (
            <div key={index}>
              <h4
                className={`text-white font-semibold mt-6 px-2 text-lg ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                {link.title}
              </h4>
              {link.links.map((item, idx) => {
                const LinkItem = () => (
                  <>
                    <span>{item.icon}</span>
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200 font-semibold`}
                    >
                      {item.name}
                    </span>
                  </>
                );
                return (
                  <React.Fragment key={idx}>
                    {item.subLinks ? (
                      <DropdownLink
                        open={open}
                        subLinks={item.subLinks}
                        activeStylesClass={activeStylesClass}
                      >
                        <LinkItem />
                      </DropdownLink>
                    ) : (
                      <NavLink
                        style={activeStylesClass}
                        to={item.link}
                        className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md ${
                          !open ? "mt-4" : "mt-2"
                        }`}
                      >
                        <LinkItem />
                      </NavLink>
                    )}
                    {/* {item.subLinks &&
                      open &&
                      item.subLinks.map((subLink, idx) => (
                        <div
                          key={idx}
                          className={`gap-x-4 ${
                            subNav ? "flex" : "hidden"
                          } select-none`}
                        >
                          <NavLink
                            style={activeStylesClass}
                            to={subLink.link}
                            className="ml-10 text-gray-400 text-sm w-full inline-block p-2 rounded-md"
                          >
                            {subLink.name}
                          </NavLink>
                        </div>
                      ))} */}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
