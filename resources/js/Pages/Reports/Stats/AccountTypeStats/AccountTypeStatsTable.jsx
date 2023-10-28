import React from "react";

export default function AccountTypeStatsTable ({ items })
{
    const totalCount = items.map((p) => p.count).reduce((acc, current) => acc + current, 0);

    return <div className="overflow-x-auto">
        {/* <Pagination /> */ }
        <table className="table">
            {/* head */ }
            <thead>
                <tr className='bg-emerald-300'>
                    <th>#Index</th>
                    <th>Account Type</th>
                    <th>Count</th>

                </tr>

            </thead>

            <tbody>

                {
                    !!items?.length ? items.map((item, index) => (<tr key={ index }>
                        <td>{ index + 1 }</td>
                        <td>{ item?.accountType }</td>
                        <td>{ item?.count }</td>

                    </tr>)) :
                        <tr ><td className='text-error'>No Items Found!</td></tr>
                }

            </tbody>

            <tfoot>
                <tr className='bg-emerald-300'>
                    <th></th>
                    <th></th>
                    <th>Total ≈ { totalCount.toLocaleString() }</th>
                </tr>
            </tfoot>

        </table>
    </div>
}
