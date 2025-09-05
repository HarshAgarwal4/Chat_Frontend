import React from "react";

const Recievd = ({ Time, message }) => {
  return (
    <div className="flex justify-start my-2">
      <div className="rounded-2xl shadow-md max-w-xs px-3 py-2 pb-5 relative bg-white">
        <p className="text-sm leading-snug break-words pr-10 mr-4">{message ?? ""}</p>
        <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[10px]">
          <span className="text-black">{Time ?? ""}</span>
        </div>
      </div>
    </div>
  );
};

export default Recievd;
