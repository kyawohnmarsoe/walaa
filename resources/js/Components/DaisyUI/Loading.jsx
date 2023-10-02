import React from "react";

export default function Loading ({ className })
{
    return (
        <div className={ `text-center ${ className }` }>
            <span className="loading loading-spinner loading-lg">
            </span>
        </div>
    )
}
