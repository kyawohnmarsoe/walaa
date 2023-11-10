import React from "react";
import { useForm, router, usePage } from '@inertiajs/react';


export default function PaymentTableRow ({ item })
{
    const color = item.invoiceStatus == 'Paid' && 'green' || item.invoiceStatus == 'NotPaid' && 'orange'

    const setPaid = (e) =>
    {
        e.preventDefault()
        console.log(item)
        router.post(`/invoice/update/${ item.id }`, { payment: { ...item, invoiceStatus: 'Paid' } })

    }
    return (
        <tr >

            <td className="font-bold text-sky-700">{ item?.invoinceID }</td>
            <td>{ item?.affiliateName }</td>
            <td className="font-bold text-sky-700"><a href={ `/invoice/${ item?.id }` } target="_blank">{ item?.userID }</a></td>
            <td>{ item?.invoiceType }</td>
            <td>{ item?.invoiceDescription }</td>
            <td>{ item?.salePrice }</td>
            {/* <td>{ item?.paidPrice }</td> */ }
            <td style={ { color: color } }>{ item?.invoiceStatus }</td>
            {/* <td>{ item?.notes }</td>
            <td>{ item?.paymentDueDate }</td> */}
            <td>{ item?.recordDate }</td>
            <td> { item?.invoiceStatus == 'NotPaid' && <><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ setPaid } >Set Paid</button><br /></> }</td>
        </tr>
    )
}
