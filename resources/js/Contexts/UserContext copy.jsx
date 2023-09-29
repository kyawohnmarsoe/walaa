import React, { useState, useEffect, createContext } from "react";
import { instance } from './api/instance'

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userData, setuserData] = useState({ user: [], errMessage: '', loading: true })

  useEffect(() => {
    instance.get('/user/filter/WillBeDisabledIn2Days/10/20')
      .then(res => {
        setuserData({ user: res.data.value, errMessage: '', loading: false })
        console.log(res.data.value)
      })
      .catch(err => {
        setuserData({ user: [], errMessage: err.message, loading: false })
        console.log(err.message)
      })
  }, [])

  return (
    <UserContext.Provider value={userData}>
      {props.children}
    </UserContext.Provider>
  )
}
