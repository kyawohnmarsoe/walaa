import React, { useState, useEffect } from 'react'
import AllUsersTableRow from './AllUsersTableRow'

export default function AllUsersTable ({ users, tableRef, accountTypes, apitoken })
{

  return (
    <div className="overflow-x-auto">

      <table className="table" ref={ tableRef }>
        {/* head */ }
        <thead>
          <tr className='bg-emerald-300'>
            <th>#Index</th>
            <th>Actions</th>
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
            !!users?.length ? users.map(user => <AllUsersTableRow user={ user } key={ user.userIndex } accountTypes={ accountTypes } apitoken={ apitoken } />)
              : <tr><td className='text-error'>No User Found!</td></tr>
          }

        </tbody>

        {/* foot */ }
        <tfoot>
          <tr>
            <th>#Index</th>
            <th>Actions</th>
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
