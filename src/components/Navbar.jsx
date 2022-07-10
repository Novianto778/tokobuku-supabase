import { RiNotification3Line } from "react-icons/ri";
import { BsChatLeft } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../assets/img/avatar.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex flex-1 items-center justify-between px-7 py-2 border-b-2">
      <SearchBar />
      <div className="flex items-center">
        <button className="relative text-xl rounded-full p-3 hover:bg-light-gray">
          <BsChatLeft className="w-5 h-5" />
          <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 bg-yellow-600" />
        </button>
        <button className="relative text-xl rounded-full p-3 hover:bg-light-gray">
          <RiNotification3Line className="w-5 h-5" />
          <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 bg-yellow-600" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-sm">Hi,</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-sm">
              Michael
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
