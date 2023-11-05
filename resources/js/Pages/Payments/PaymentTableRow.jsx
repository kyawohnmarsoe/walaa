import React from "react";

export default function PaymentTableRow ({ item })
{
    return (
        <tr>

            <td className="font-bold text-sky-700">{ item?.invoinceID }</td>
            <td>{ item?.affiliateName }</td>
            <td className="font-bold text-sky-700">{ item?.userID }</td>
            <td>{ item?.invoiceType }</td>
            <td>{ item?.invoiceDescription }</td>
            <td>{ item?.salePrice }</td>
            <td>{ item?.paidPrice }</td>
            <td>{ item?.invoiceStatus }</td>
            <td>{ item?.notes }</td>
            <td>{ item?.paymentDueDate }</td>
            <td>{ item?.recordDate }</td>

        </tr>
    )
}
