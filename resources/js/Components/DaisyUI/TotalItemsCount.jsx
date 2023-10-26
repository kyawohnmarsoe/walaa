import React from "react";

export default function TotalItemsCount ({ total, type = 'Items' })
{
    return (
        <div className="pl-3">
            Total { total } { type }
        </div>
    )
}
