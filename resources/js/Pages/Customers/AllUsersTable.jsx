import React, { useState, useEffect } from 'react'
// import {instance} from '../../api/instance'
import AllUsersTableRow from './AllUsersTableRow'
import Alert from '../../Components/DaisyUI/Alert'
import ReactPaginate from 'react-paginate';



export default function AllUsersTable({ users }) {

  return (
    <div className="overflow-x-auto">
      {/* <Pagination /> */}
  <table className="table">
    {/* head */}
    <thead>
      <tr className='bg-emerald-300'>
        <th>#</th>
        {/* <th>User Index</th> */}
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

          {/* {
            users.length && users.map(user => <AllUsersTableRow user={user} key={user.userIndex} />)

          } */}

          {
            users.length && users.map(user=> <AllUsersTableRow user={user}/>)

          } 

        </tbody>

        {/* foot */}
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
