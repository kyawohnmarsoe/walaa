import React, { useState, useEffect } from 'react'
import AllUsersTableRow from './AllUsersTableRow'

export default function AllUsersTable({ auth, users, tableRef, accountTypes, apitoken, deposit_password }) {

  return (
    <div className="overflow-x-auto">

      <table className="table" ref={tableRef}>
        {/* head */}
        <thead>
          <tr className='bg-emerald-300'>
            {/* <th>#Index</th> */}
            <th>Actions</th>
            <th>Username</th>
            <th>Customer Name</th>
            <th>Accounting Info</th>
            <th>Expiration Date</th>
            <th>Account Info</th>
            <th>Online Status</th>
            {/* <th>Others</th> */}
          </tr>
        </thead>

        <tbody>

          {
            !!users?.length ? users.map(user => <AllUsersTableRow user={user} key={user.userIndex} accountTypes={accountTypes} apitoken={apitoken} deposit_password={deposit_password} auth={auth} />)
              : <tr><td className='text-error'>No User Found!</td></tr>
          }

        </tbody>



      </table>
    </div>
  )
}
