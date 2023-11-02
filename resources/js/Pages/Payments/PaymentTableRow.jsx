import React from "react";

export default function PaymentTableRow ({ item })
{
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold text-sky-700">{ item?.invoinceID }</div>

                        {/* <div><span className="text-sm opacity-50"> { log?.userName }</span></div> */ }
                    </div>
                </div>
            </td>

            <td></td>

        </tr>
    )
}
