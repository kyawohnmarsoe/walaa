import React, { useState, useEffect } from 'react'
// import {instance} from '../../api/instance'
import OnlineUsersTableRow from './OnlineUsersTableRow'
import Alert from '../../Components/DaisyUI/Alert'
import Pagination from '@/Components/DaisyUI/Pagination'


export default function OnlineUsersTable({ users }) {

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
        <th>Online Status</th>
        <th>Online Time</th>
        <th>Online Since</th>
        <th>MAC Address</th>
        <th>Expiration Date</th>
        <th>UserIP</th>
        <th>Login From</th>
        <th>Login Affiliate</th>
        <th>Action</th>
      </tr>
    </thead>

        <tbody>
            { users?.map(user => <OnlineUsersTableRow user = {user} key={user.userIndex} />)}
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Online Status</th>
            <th>Online Time</th>
            <th>Online Since</th>
            <th>MAC Address</th>
            <th>Expiration Date</th>
            <th>UserIP</th>
            <th>Login From</th>
            <th>Login Affiliate</th>
            <th>Action</th>
          </tr>
        </tfoot>

      </table>
    </div>
  )
}
