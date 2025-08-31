import React from "react";

const Message = (props) => {
    return (
        <>
            <div className="flex justify-end my-1">
                <div className="bg-red-500 text-white px-4 py-2 rounded-2xl shadow max-w-xs flex gap-2">
                <p>{props.message}</p>
                <div className="text-blue-500">
                     &#10003;
                </div>
                </div>
            </div>
        </>
    )
}

export default Message