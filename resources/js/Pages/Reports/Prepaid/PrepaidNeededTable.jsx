import React from "react";
import PrepaidNeededTableRow from "./PrepaidNeededTableRow";


export default function PrepaidNeededTable ({ prepaid })
{
    const totalNeeded = prepaid.map((p) => p.needed).reduce((acc, current) => acc + current, 0);
    const totalCost = prepaid.map((p) => p.needed * p.accountCost).reduce((acc, current) => acc + current, 0);

    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#Index</th>
                        <th>Account Type</th>
                        <th>Expire Users Count</th>
                        <th>Available Cards</th>
                        <th>Needed count</th>
                        <th>Account Cost</th>
                        <th>Total cost</th>


                    </tr>
                </thead>

                <tbody>
                    {
                        !!prepaid?.length ? prepaid.map((pre, index) => <PrepaidNeededTableRow pre={ pre } key={ index } />)
                            : <tr><td className='text-error'>No Sessions Found!</td></tr>
                    }
                </tbody>

                {/* foot */ }
                <tfoot>
                    <tr className='bg-emerald-300'>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>{ totalNeeded }</th>
                        <th></th>
                        <th>Total ≈ { totalCost.toLocaleString() } IQD</th>
                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
