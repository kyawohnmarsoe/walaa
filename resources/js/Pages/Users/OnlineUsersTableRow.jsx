import React from "react";

export default function OnlineUsersTableRow({user}) {

console.log(user)

  return (
    <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>

        <td>
          <div className="flex items-center space-x-3">
            {/* <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
            <div>
              <div className="font-bold">{user.userID && user.userID}</div>
             
              {/* <div className="text-sm opacity-50">United States</div> */}
            </div>
          </div>
        </td>

        <td>{user.customer && user.customer.customerFullName}</td>

        <td>
          <strong>Last Refill</strong> : {user.lastRefill && user.lastRefill}
          <br/>
          <strong>Payment</strong> : { !!user.unPaidInvoices ? <span style={{color:user.serviceStatusColorHex}}>{user.unPaidInvoices} Unpaid</span> : <span className="text-success">All Paid</span> } 
          <br/>
          <strong>Notes</strong> : {user.lastRefill && user.lastRefill}
          
          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>
        
        {/* <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th> */}
        <td>{user.manualExpirationDate && user.manualExpirationDate}</td>

        <td>
            <strong>Acc Name</strong> : {user.accountName && user.accountName}
          <br/>
          <strong>Acc Status</strong> : { user.accountStatus && user.accountStatus } 
          <br/>
          <strong>Days Left</strong> : {user.activeDaysLeft && +user.activeDaysLeft}
        </td>

        <td>
            <strong>Status</strong> : {user.onlineStatus && <span style={{color:user.onlineStatusColor}}>{user.onlineStatus}</span>}
          <br/>
          <strong>MAC</strong> : { user.mac && user.mac } 
          <br/>
          <strong>IP</strong> : {user.userIP && user.userIP}
          <br/>
          <strong>Lock MAC</strong> : {user.lockMac && +user.lockMac}
        </td>
      </tr>
  )
}
