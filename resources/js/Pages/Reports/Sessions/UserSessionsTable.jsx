import React from "react";
import UserSessionsRow from "./UserSessionsRow";


export default function UserSessions ({ sess })
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
                        <th>Logout Time</th>
                        <th>Time Online</th>
                        {/* <th>Login From</th> */ }
                        <th>InMB</th>
                        <th>OutMB</th>
                        <th>UserMAC</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        !!sess?.length ? sess.map((ses, index) => <UserSessionsRow ses={ ses } key={ index } />)
                            : <tr><td className='text-error'>No Sessions Found!</td></tr>
                    }
                </tbody>

                {/* foot */ }
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Logout Time</th>
                        <th>Time Online</th>
                        {/* <th>Login From</th> */ }
                        <th>InMB</th>
                        <th>OutMB</th>
                        <th>UserMAC</th>

                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
