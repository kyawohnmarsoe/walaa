import React from "react";
import WalletTableRow from "./WalletTableRow";

export default function WalletTable ({ items, auth, users })
{
    const getUser = (id) =>
    {
        const user = users.filter(u => u.id == id)
        return user[0];
    }

    // console.log(getUser(1))

    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>

                        {/* <th>Wallet</th> */}
                        {/* <th>Type</th> */}
                        <th>From</th>
                        <th>To</th>
                        <th>Description</th>
                        <th>Amount</th>
                        {/* <th>Balance</th> */}
                        <th>Date</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>

             
                  <tbody>
                        {
                            !!items?.length ? items.map((item, index) => <WalletTableRow item={ item } key={ index } user={ getUser(item.user_id) } users={ users } auth={ auth } />)
                                : <tr><td className='text-error'>No item Found!</td></tr>
                        }
                    </tbody> 
                

                



            </table>
        </div>
    )
}
