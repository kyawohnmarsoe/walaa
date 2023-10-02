import React, { useState, useEffect } from 'react'
import AllUsersTableRow from './AllUsersTableRow'

export default function AllUsersTable ({ users })
{

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */ }
        <thead>
          <tr className='bg-emerald-300'>
            <th>#</th>
            {/* <th>User Index</th> */ }
            <th>Username</th>
            <th>Customer Name</th>
            <th>Accounting Info</th>
            <th>Expiration Date</th>
            <th>Account Info</th>
            <th>Online Status</th>
            <th>Others</th>
          </tr>
        </thead>

        <tbody>

          {
            !!users?.length ? users.map(user => <AllUsersTableRow user={ user } key={ user.userIndex } />)
              : <tr><td className='text-error'>No User Found!</td></tr>
          }

        </tbody>

        {/* foot */ }
        <tfoot>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Customer Name</th>
            <th>Accounting Info</th>
            <th>Expiration Date</th>
            <th>Account Info</th>
            <th>Online Status</th>
            <th>Others</th>
          </tr>
        </tfoot>

      </table>
    </div>
  )
}
