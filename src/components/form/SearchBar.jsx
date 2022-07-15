import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [isSearch, setIsSearch] = useState(false);
  const searchInputRef = useRef(null);
  const handleSearchBar = () => {
    setIsSearch(true);
  };

  useEffect(() => {
    if (isSearch) searchInputRef.current.focus();
  }, [isSearch]);
  return (
    <div
      className={`flex items-center p-2 border-primary border-2 duration-200 rounded-full ${
        isSearch ? "w-48" : "w-9"
      }`}
    >
      <FiSearch className="w-4 h-4" onClick={handleSearchBar} />
      <input
        ref={searchInputRef}
        placeholder="Search"
        className={`${
          !isSearch && "hidden"
        } origin-left duration-200 text-sm w-full outline-none pl-4`}
      />

      <span
        className={`${!isSearch && "hidden"} origin-left duration-200 ml-auto`}
        onClick={() => setIsSearch(false)}
      >
        <IoIosClose />
      </span>
    </div>
  );
};

export default SearchBar;
