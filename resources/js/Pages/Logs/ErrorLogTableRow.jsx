import React from "react";

export default function ErrorLogTableRow ({ log })
{
    return (
        <tr>

            {/* <td></td> */}

            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold text-gray-700">{ log?.userName }</div>

                        {/* <div><span className="text-sm opacity-50"> { log?.userName }</span></div> */ }
                    </div>
                </div>
            </td>

            <td>{ log?.errorMessage }</td>
            <td>{ log?.errorTime }</td>
            <td>{ log?.userMAC }</td>


        </tr>
    )
}
