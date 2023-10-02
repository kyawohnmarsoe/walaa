import React from "react";
import { Link } from "@inertiajs/react";

export default function OnlineUsersTableRow ({ user })
{

  return (
    <tr>
      {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
      <td></td>
      {/* <td>{user.userIndex && user.userIndex}</td> */ }

      <td>
        <div className="flex items-center space-x-3">
          {/* <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
          <div>
            <div className="font-bold text-sky-700"><Link href={ `/user/${ user?.userIndex }` }>{ user?.userID }</Link></div>

            <div><span className="text-sm opacity-50"> { user?.userObject?.displayName }</span></div>
          </div>
        </div>
      </td>

      <td>
        <span className="text-emerald-500">{ user?.onlineStatus }</span>
      </td>

      <td>{ user?.onlineTime }</td>
      <td>{ user?.onlineSince }</td>
      <td>{ user?.callerMAC }</td>
      <td>{ user?.expirationDate }</td>
      <td>{ user?.userIP }</td>
      <td>{ user?.loginFrom }</td>
      <td>{ user?.affiliateName }</td>
      <td><span className="text-sky-700">Disconnect</span></td>

    </tr>
  )
}
