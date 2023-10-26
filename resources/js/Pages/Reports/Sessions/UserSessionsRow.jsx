import React from "react";

export default function UserSessionsTableRow ({ ses })
{
    return (
        <tr>

            <td>{ ses?.userIndex }</td>

            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold text-gray-700">{ ses?.userId }</div>

                        {/* <div><span className="text-sm opacity-50"> { ses?.userName }</span></div> */ }
                    </div>
                </div>
            </td>

            <td>{ ses?.loginTime }</td>
            <td>{ ses?.acctSessionTime }</td>
            <td>{ ses?.inMB }</td>
            <td>{ ses?.outMB }</td>
            <td>{ ses?.userMac }</td>


        </tr>
    )
}
