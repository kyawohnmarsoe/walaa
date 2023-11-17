import React, { useState } from "react";
import { Link } from '@inertiajs/react';
import RefillModal from "./RefillModal";
import ChangeModal from "./ChangeModal";

export default function AllUsersTableRow({ user, accountTypes, apitoken }) {
  const [modals, setModals] = useState({
    reFill: false,
    change: false,
    extend: false,
  })

  return (
    <>
      <RefillModal modals={modals} setModals={setModals} accountTypes={accountTypes} apitoken={apitoken} user={user} />
      <ChangeModal modals={modals} setModals={setModals} accountTypes={accountTypes} apitoken={apitoken} user={user} />

      <tr>
        {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}

        <td>{user?.userIndex}</td>
        <td>

          {user?.canRefill && <><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={() => setModals({ ...modals, reFill: true })}>Refill</button><br /></>}

          {user?.canChangeAccount && <><button className="btn btn-xs btn-outline btn-block btn-success mb-1" onClick={() => setModals({ ...modals, change: true })}>Change</button> <br /> </>}

          {user?.canExtendUser && <><button className="btn btn-xs btn-outline btn-block btn-warning">Extend</button> </>}

          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>

        <td>
          <div className="flex items-center space-x-3">
            {/* <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
            <div>
              <div className="font-bold text-sky-700"><Link href={`/user/${user?.userIndex}`}>{user?.userID}</Link></div>

              <div> <strong>Affiliate </strong><span className="text-sm opacity-50"> : {user?.affiliateName}</span></div>
            </div>
          </div>
        </td>

        <td> {user?.displayName}</td>

        <td>
          <strong>Last Refill</strong> : {user?.lastRefill}
          <br />
          <strong>Payment</strong> : {!!user?.unPaidInvoices ? <span style={{ color: user?.serviceStatusColorHex }}>{user?.unPaidInvoices} Unpaid</span> : <span className="text-emerald-700">All Paid</span>}
          <br />
          <strong>Notes</strong> : {user?.lastRefill}

          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>

        {/* <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th> */}

        <td>{user?.manualExpirationDate}</td>

        <td>
          <strong>Acc Name</strong> : {user?.accountName}
          <br />
          <strong>Acc Status</strong> : {user?.accountStatus}
          <br />
          <strong>Days Left</strong> : {+user?.activeDaysLeft}
        </td>

        <td>
          {/* <strong>Status</strong> : { user?.onlineStatus && <span style={ { color: user?.onlineStatusColor } }>{ user?.onlineStatus }</span> } */}
          <strong>Status</strong> : <span style={{ color: user?.onlineStatusColor }}>{user?.onlineStatus}</span>
          <br />
          <strong>MAC</strong> : {user?.callerID}
          <br />
          <strong>IP</strong> : <a href={`http://${user?.userIP}`} className="text-sky-700" target="_blank">{user?.userIP}</a>
          <br />
          <strong>Lock MAC</strong> : {+user?.lockMac}
        </td>

        <td>
          <strong>Mobile</strong> : {user?.mobileNumber}
          <br />
          <strong>Mobile 2</strong> : {user?.mobileNumber2}
          <br />
          <strong>User Notes</strong> : {user?.userNotes}
          <br />
          <strong>Router IP</strong> : {user?.router}
        </td>

      </tr>

    </>
  )
}
