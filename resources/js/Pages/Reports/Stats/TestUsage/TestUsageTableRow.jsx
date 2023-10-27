import React from "react";

export default function TestUsageTableRow ({ item, index })
{
    return (
        <tr>
            <td></td>
            <td>{ item?.affiliateName }</td>
            <td>{ item?.testCount }</td>
            <td>{ item?.lastDateUsed }</td>
            <td>{ item?.userId }</td>
        </tr>
    )
}
