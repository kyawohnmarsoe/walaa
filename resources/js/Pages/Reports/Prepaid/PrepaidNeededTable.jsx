import React from "react";
import PrepaidNeededTableRow from "./PrepaidNeededTableRow";


export default function PrepaidNeededTable ({ prepaid })
{
    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#</th>
                        {/* <th>User Index</th> */ }
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
                        <th>#</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Needed count</th>
                        <th></th>
                        <th>Total </th>


                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
