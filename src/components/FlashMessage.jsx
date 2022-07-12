import React from "react";

const getStatusColour = (type) => {
  let statusColour = "";
  switch (type) {
    case "delete":
      statusColour = "bg-red-400";
      break;
    default:
      statusColour = "bg-black text-white";
  }
  return statusColour;
};

const FlashMessage = ({ type, message }) => {
  return (
    <div
      className={`${getStatusColour(type)} px-4 py-2 w-[500px] rounded-md mb-4 font-semibold`}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
