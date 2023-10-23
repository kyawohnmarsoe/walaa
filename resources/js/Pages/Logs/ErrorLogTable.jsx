import React from "react";
import ErrorLogTableRow from "./ErrorLogTableRow";


export default function ErrorLogTable ({ logs })
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
                        <th>Username</th>
                        <th>Error Message</th>
                        <th>Error Time</th>
                        <th>UserMAC</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        !!logs?.length ? logs.map((log, index) => <ErrorLogTableRow log={ log } key={ index } />)
                            : <tr><td className='text-error'>No Log Found!</td></tr>
                    }
                </tbody>

                {/* foot */ }
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Error Message</th>
                        <th>Error Time</th>
                        <th>UserMAC</th>

                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
