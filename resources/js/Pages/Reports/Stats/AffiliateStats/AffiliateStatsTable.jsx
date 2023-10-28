import React from "react";

export default function AffiliateStatsTable ({ items })
{

    return <div className="overflow-x-auto">
        {/* <Pagination /> */ }
        <table className="table">
            {/* head */ }
            <thead>
                <tr className='bg-emerald-300'>
                    <th>#Index</th>
                    <th>Users</th>
                    <th>Count</th>

                </tr>

            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>All Users</td>
                    <td>{ items.allUsers }</td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Online Users</td>
                    <td>{ items.activeUsers }</td>
                </tr>

                <tr>
                    <td>3</td>
                    <td>New Users</td>
                    <td>{ items.newUsers }</td>
                </tr>

                <tr>
                    <td>4</td>
                    <td>Refilled Users</td>
                    <td>{ items.renewedUsers }</td>
                </tr>

                <tr>
                    <td>5</td>
                    <td>Active Users</td>
                    <td>{ items.activeUsers }</td>
                </tr>

                <tr>
                    <td>6</td>
                    <td>Expired Users</td>
                    <td>{ items.expiredUsers }</td>
                </tr>

                <tr>
                    <td>7</td>
                    <td>Manually Supsended Users</td>
                    <td>{ items.manualInactiveUsers }</td>
                </tr>

            </tbody>

            <tfoot>
                <tr className='bg-emerald-300'>
                    <th></th>
                    <th></th>
                    <th></th>

                </tr>
            </tfoot>

        </table>
    </div>
}
