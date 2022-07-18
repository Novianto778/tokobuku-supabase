import { RiNotification3Line } from "react-icons/ri";
import { BsChatLeft } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../assets/img/avatar.png";
import SearchBar from "../components/form/SearchBar";
import AccountPopover from "../components/AccountPopover";
import { PortalWithState } from "react-portal";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {  userData } = useSelector((state) => state.user);

  return (
    <>
      <nav className="flex flex-1 items-center justify-between relative px-7 py-2 border-b-2">
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
          <PortalWithState
          closeOnOutsideClick
          closeOnEsc
          node={document && document.getElementById("modal-root")}
        >
          {({ openPortal, isOpen, portal }) => (
            <>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg select-none"
            onClick={openPortal}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-sm">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-sm">
                {userData.username}
              </span>
            </p>
            <MdKeyboardArrowDown
              className={`text-gray-400 text-14 ${isOpen && "rotate-180"}`}
            />
          </div>
            {portal(<AccountPopover />)}
            </>
          )}
        </PortalWithState>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
