import React, { useEffect } from "react";

const Message = (props) => {
    useEffect(() => {
        console.log(props.Time);
    }, [props.Time]);

    return (
        <div className="flex justify-end my-1 px-2">
            <div className="bg-purple-700 text-white rounded-2xl shadow-md max-w-xs px-3 py-2 relative">
                <p className="text-sm leading-snug break-words pr-10 mr-4">{props.message}</p>
                <div className="absolute bottom-1 right-3 flex items-center gap-1 text-[10px]">
                    <span className="opacity-80">{props.Time}</span>
                    <span
                        className={`text-[12px] ${props.status === "seen" ? "text-blue-300" : "text-gray-200"
                            }`}
                    >
                        {props.status === "sent" && "✓"}
                        {(props.status === "delivered" || props.status === "seen") && "✓✓"}
                    </span>
                </div>
            </div>
        </div>


    );
};

export default Message;