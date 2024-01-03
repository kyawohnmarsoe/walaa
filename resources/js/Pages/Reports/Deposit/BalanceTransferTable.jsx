

import React from "react";

export default function BalanceTransferTable ({ items, apitoken, auth, affiliates })
{
    console.log(items)
    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                       
                        <th>Affiliate</th>
                        <th>Amount</th>
                        <th>Date</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        !!items?.length ? items.map((item, index) => <tr key={ index }>
                            <td>{ item.affiliate_name }</td>
                            <td>{item.amount}</td>
                           
                            <td>{ new Date(item.created_at).toLocaleDateString('en-US') }</td>
                        </tr>)
                            : <tr><td className='text-error'>No item Found!</td></tr>
                    }

                   

                </tbody>



            </table>
        </div>
    )
}
