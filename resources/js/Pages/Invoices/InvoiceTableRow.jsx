import React, { useState } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import SetPaymentModal from "./SetPaymentModal";

export default function InvoiceTableRow ({ item, apitoken, auth })
{
    const color = item.invoiceStatus == 'Paid' && 'green' || item.invoiceStatus == 'NotPaid' && 'orange'
    const [modals, setModals] = useState({
        setPayment: false
    })
    
    const setPaid = (e) =>
    {
        e.preventDefault()
        console.log(item)
        // router.post(`/invoice/update/${ item.id }`, { payment: { ...item, invoiceStatus: 'Paid' } })

    }
    return (
        <>
            <SetPaymentModal modals={ modals } setModals={ setModals } apitoken={ apitoken } item={ item } auth={ auth }/>
    
        <tr >

            {/* <td className="font-bold text-sky-700">{ item?.invoinceID }</td> */}
            <td>{ item?.affiliateName }</td>
            <td className="font-bold text-sky-700"><a href={ `/invoice/${ item?.id }` } target="_blank">{ item?.userID }</a></td>
            {/* <td>{ item?.invoiceType }</td> */}
            <td>{ item?.invoiceDescription }</td>
            <td>{ item?.salePrice }</td>
                <td>{ item?.paidPrice }</td>
                <td>{ item?.balance }</td> 
            <td style={ { color: color } }>{ item?.invoiceStatus }</td>
            <td>{ item?.notes }</td>
            {/* <td>{ item?.paymentDueDate }</td>  */}
            <td>{ item?.recordDate }</td>
                <td> { item?.invoiceStatus == 'NotPaid' && <><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => setModals({ setPayment :true}) } >Set Payment</button><br /></> }</td>
        </tr>
        </>
    )
}
