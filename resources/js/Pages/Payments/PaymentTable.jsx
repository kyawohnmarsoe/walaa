

import React from "react";
import PaymentTableRow from "./PaymentTableRow";

export default function PaymentTable ({ items, apitoken, auth })
{
    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                        {/* <th>#InvoinceID</th> */}
                        <th>AffiliateName</th>
                        <th>UserID</th>
                        <th>Invoice Type</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Paid Amount</th>
                        <th>Balance</th> 
                        <th>Status</th>
                        {/* <th>Notes</th>
                        <th>Due Date</th> */}
                        <th>Record Date</th>
                        {/* <th>Payment Date</th> */ }
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        !!items?.length ? items.map((item, index) => <PaymentTableRow item={ item } key={ index } apitoken={ apitoken } auth={ auth }/>)
                            : <tr><td className='text-error'>No item Found!</td></tr>
                    }
                </tbody>



            </table>
        </div>
    )
}
