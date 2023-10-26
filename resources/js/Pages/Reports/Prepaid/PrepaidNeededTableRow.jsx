import React from "react";

export default function PrepaidNeededTableRow ({ pre })
{
    return (
        <tr>

            <td>{ pre?.accountIndex }</td>

            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold text-gray-700">{ pre?.accountName }</div>

                        {/* <div><span className="text-sm opacity-50"> { pre?.userName }</span></div> */ }
                    </div>
                </div>
            </td>

            <td>{ pre?.count }</td>
            <td>{ pre?.available }</td>
            <td>{ pre?.needed }</td>
            <td>{ pre?.accountCost?.toLocaleString() } IQD</td>
            <td>{ (pre?.needed * pre?.accountCost).toLocaleString() } IQD</td>


        </tr>
    )
}
