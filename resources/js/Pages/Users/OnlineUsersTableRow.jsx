import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Modal from '@/Components/DaisyUI/Modal';


export default function OnlineUsersTableRow({ user, index, apitoken }) {
  const [data, setData] = useState({ errMessage: '', loading: true })

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${apitoken}` }
  });

  const disconnectUser = () => {
    instance.post('/activesessions/disconnect', { userindex: user.userIndex, userid: user.userID })
      .then(res => {
        console.log(res.data.responseMessage)
        setData({ errMessage: '', loading: false })

      })
      .catch(err => {
        console.log(err.message)
        setData({ errMessage: err?.message, loading: false })

      })

    console.log('disconnectUser running..')
  }


  const disconnectHandler = () => {
    const result = confirm("Are you sure you want to disconnect this user!")
    result && disconnectUser()
  }

  return (
    <tr>
     

      {/* <td>{user?.userIndex}</td> */}


      <td>
        <div className="flex items-center space-x-3">
          {/* <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
          <div>
            <div className="font-bold text-sky-700"><Link href={`/user/${user?.userIndex}`}>{user?.userID}</Link></div>

            <div><span className="text-sm opacity-50"> {user?.userObject?.displayName}</span></div>
          </div>
        </div>
      </td>

      <td>
        <span className="text-emerald-500">{user?.onlineStatus}</span>
      </td>

      <td>{ user?.onlineTime }</td>
      <td>{ user?.onlineSince }</td>
      <td>{ user?.callerMAC }</td>
      <td>{ user?.expirationDate }</td>
      <td><a href={ `https://${ user?.userIP }` } className="text-sky-700" target="_blank">{ user?.userIP }</a></td>
      <td>{ user?.loginFrom }</td>
      <td>{ user?.affiliateName }</td>
      {/* <td><span className="text-sky-700" onClick={ disconnectHandler }>Disconnect</span></td> */}
      <td> <button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ disconnectHandler } >Disconnect</button><br /></td>

    </tr >
  )
}
