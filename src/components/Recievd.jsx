import React from "react";

const Recievd = (props) => {
    return (
        <>
            <>
                <div className="flex justify-start my-2">
                    <div className="bg-white px-4 py-2 rounded-2xl shadow max-w-xs my-1">
                        <p>{props.message}</p>
                    </div>
                </div>
            </>
        </>
    )
}

export default Recievd