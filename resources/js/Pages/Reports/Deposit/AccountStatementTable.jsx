import React from "react";
import AccountStatementRow from "./AccountStatementRow";


export default function AccountStatementTable ({ prepaid })
{
    const totalNeeded = prepaid.map((p) => p.needed).reduce((acc, current) => acc + current, 0);
    const totalCost = prepaid.map((p) => p.needed * p.accountCost).reduce((acc, current) => acc + current, 0);

    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-sky-300'>
                        <th>#Transaction ID</th>
                        <th>BatchNo</th>
                        <th>Description</th>
                        <th>ItemsCount</th>
                        <th>Serials</th>
                        <th>Operation</th>
                        <th>Deposit</th>
                        <th>Withdrawal</th>
                        <th>Balance</th>
                        <th>Currency</th>
                        <th>Date</th>
                        <th>Related User</th>
                        <th>Note</th>
                        <th>Reseller</th>


                    </tr>
                </thead>

                <tbody>
                    {
                        !!prepaid?.length ? prepaid.map((pre, index) => <AccountStatementRow pre={ pre } key={ index } />)
                            : <tr><td className='text-error'>No Sessions Found!</td></tr>
                    }
                </tbody>

                {/* foot */ }
                <tfoot>
                    <tr className='bg-sky-300'>
                        <th colSpan={ 14 }></th>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
