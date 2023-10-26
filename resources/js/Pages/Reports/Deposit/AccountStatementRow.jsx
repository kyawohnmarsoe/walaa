import React from "react";

export default function AccountStatementRow ({ pre })
{
    return (
        <tr>


            <td>{ pre?.invoinceID }</td>
            <td></td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.invoiceDescription }</td>
            <td>{ pre?.accountCost?.toLocaleString() } IQD</td>
            <td>{ (pre?.needed * pre?.accountCost).toLocaleString() } IQD</td>


        </tr>
    )
}
