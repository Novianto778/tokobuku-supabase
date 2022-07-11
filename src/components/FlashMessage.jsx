import React from "react";

const FlashMessage = ({color, message}) => {
  return (
    <div className={`bg-${color} px-4 py-2 w-[500px] rounded-md mb-4 font-semibold`}>
      {message}
    </div>
  );
};

export default FlashMessage;
